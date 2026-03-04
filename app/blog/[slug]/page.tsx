import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookedCallLink from "@/components/BookedCallLink";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { ChevronLeft, Twitter, Linkedin, Link as LinkIcon, Calendar, Clock, Tag } from "lucide-react";

export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return createPageMetadata({
            title: "Post Not Found",
            description: "The requested blog post could not be found.",
            path: "/blog",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: `${post.title} | Crewtrace Blog`,
        description: post.excerpt,
        path: `/blog/${slug}`,
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const articleJsonLd = articleSchema({
        headline: post.title,
        description: post.excerpt,
        path: `/blog/${slug}`,
        datePublished: post.date,
        authorName: post.author,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
    ]);

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            <Navbar />
            <main className="pb-20">
                {/* Hero Section */}
                <header className="relative w-full overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/60 mb-8 font-medium">
                            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold shadow-sm">
                                <Tag className="w-3.5 h-3.5" />
                                {post.category}
                            </span>
                            <span className="hidden sm:inline text-foreground/30">•</span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="hidden sm:inline text-foreground/30">•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.15]">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed balance-text">
                                {post.excerpt}
                            </p>
                        )}

                        {post.author && (
                            <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/40 max-w-xs mx-auto">
                                <div className="w-12 h-12 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shadow-sm">
                                    {post.author.charAt(0)}
                                </div>
                                <div className="text-left flex flex-col">
                                    <span className="font-bold text-foreground text-base tracking-tight">{post.author}</span>
                                    <span className="text-sm text-foreground/50 font-medium">Crewtrace Team</span>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                <div className="max-w-6xl mx-auto px-6 mt-12 lg:mt-16 flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Sidebar - Nav & Actions */}
                    <aside className="lg:w-48 flex-shrink-0 hidden lg:block">
                        <div className="sticky top-32 space-y-10">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-primary transition-colors group"
                            >
                                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Blog
                            </Link>

                            <div className="pt-8 border-t border-border/40">
                                <h4 className="text-xs font-bold text-foreground/40 mb-5 uppercase tracking-widest">Share this article</h4>
                                <div className="flex flex-col gap-4">
                                    <button className="flex items-center gap-3 text-sm font-medium text-foreground/60 hover:text-[#1DA1F2] transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-[#1DA1F2]/10 flex items-center justify-center transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </div>
                                        Twitter
                                    </button>
                                    <button className="flex items-center gap-3 text-sm font-medium text-foreground/60 hover:text-[#0A66C2] transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-[#0A66C2]/10 flex items-center justify-center transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </div>
                                        LinkedIn
                                    </button>
                                    <button className="flex items-center gap-3 text-sm font-medium text-foreground/60 hover:text-primary transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                            <LinkIcon className="w-4 h-4" />
                                        </div>
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Back Link (only visible on small screens) */}
                    <div className="lg:hidden block">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Back to Blog
                        </Link>
                    </div>

                    {/* Main Content Article */}
                    <article className="flex-1 min-w-0">
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                        />
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                        />

                        {/* Article Content Body */}
                        <div
                            className="prose prose-lg md:prose-xl max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                                prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-3xl
                                prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-2xl
                                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-foreground prose-strong:font-bold
                                prose-ul:text-foreground/80
                                prose-ol:text-foreground/80
                                prose-li:my-2
                                prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-border/50
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-foreground/70 prose-blockquote:font-medium prose-blockquote:italic"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <hr className="my-16 border-border/40" />

                        {/* Mobile Share Actions */}
                        <div className="lg:hidden flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 p-6 rounded-2xl bg-foreground/5">
                            <span className="text-sm font-bold text-foreground/60 uppercase tracking-widest">Share this article</span>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center text-foreground hover:text-[#1DA1F2] transition-colors"><Twitter className="w-4 h-4" /></button>
                                <button className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center text-foreground hover:text-[#0A66C2] transition-colors"><Linkedin className="w-4 h-4" /></button>
                                <button className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"><LinkIcon className="w-4 h-4" /></button>
                            </div>
                        </div>

                        {/* Author Bio Section */}
                        <div className="flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-secondary/30 border border-border/50">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0 shadow-sm border border-primary/20">
                                {post.author ? post.author.charAt(0) : "C"}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Written by {post.author || "Crewtrace Team"}</h3>
                                <p className="text-foreground/70 text-base leading-relaxed max-w-2xl">
                                    Crewtrace helps construction and field service companies eliminate payroll leaks, automate GPS time tracking, and streamline their bottom line operations.
                                </p>
                            </div>
                        </div>

                        {/* Beautiful CTA Module */}
                        <div className="mt-20 relative overflow-hidden rounded-[2rem] bg-foreground text-background">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 z-0"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/3 z-0"></div>

                            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center flex flex-col items-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 border border-background/20 text-background mb-8">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-sm font-medium">Ready to take control?</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                                    Stop the payroll leakage today.
                                </h3>
                                <p className="text-lg md:text-xl text-background/80 mb-10 max-w-xl mx-auto leading-relaxed balance-text">
                                    Book a free demo and see exactly how Crewtrace can save your business thousands of dollars every single month.
                                </p>
                                <BookedCallLink
                                    cluster="blog"
                                    templateType="blog_detail"
                                    landingPath={`/blog/${slug}`}
                                    ctaLabel="Book Your Free Demo"
                                    ctaLocation="footer_cta"
                                    className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary),0.5)] hover:scale-105 active:scale-95 transition-all text-lg min-w-[200px]"
                                >
                                    Book Your Free Demo
                                </BookedCallLink>
                            </div>
                        </div>

                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
