import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";

export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title} | Crewtrace Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <article className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary mb-8 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 text-sm text-foreground/50 mb-4">
                            <span className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <span>·</span>
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            {post.title}
                        </h1>
                        {post.author && (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                                    {post.author.charAt(0)}
                                </div>
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA */}
                    <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                            Ready to stop the payroll leaks?
                        </h3>
                        <p className="text-foreground/60 mb-6">
                            Book a free demo and see how Crewtrace can save your business thousands every month.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all"
                        >
                            Book Your Free Demo
                        </Link>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
