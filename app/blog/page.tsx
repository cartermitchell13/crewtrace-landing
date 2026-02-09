import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
    title: "Blog | Crewtrace",
    description: "Industry insights, best practices, and tips for construction contractors looking to improve their operations.",
    openGraph: {
        title: "Blog | Crewtrace",
        description: "Industry insights, best practices, and tips for construction contractors looking to improve their operations.",
        images: [
            {
                url: "/images/og-ct.png",
                width: 1200,
                height: 630,
                alt: "The Crewtrace Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Crewtrace",
        description: "Industry insights, best practices, and tips for construction contractors looking to improve their operations.",
        images: ["/images/og-ct.png"],
    },
};

export default async function BlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            The Crewtrace Blog
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                            Insights, tips, and best practices for construction contractors
                            looking to run more profitable businesses.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white border border-foreground/5 rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Placeholder Image */}
                                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                        <span className="text-4xl">{post.icon || "📝"}</span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs text-foreground/50 mb-3">
                                            <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded">
                                                {post.category}
                                            </span>
                                            <span>·</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h2 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-foreground/60 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📝</span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
                            <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                                We're working on some great content for you. Check back soon for
                                industry insights and best practices.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
