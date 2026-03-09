"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
    title: string;
    slug: string;
    variant?: "sidebar" | "inline";
}

const BASE_URL = "https://getcrewtrace.com";

export default function ShareButtons({ title, slug, variant = "sidebar" }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const url = `${BASE_URL}/blog/${slug}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareToTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            "_blank",
            "noopener,noreferrer,width=550,height=420"
        );
    };

    const shareToLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            "_blank",
            "noopener,noreferrer,width=550,height=600"
        );
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = url;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (variant === "inline") {
        return (
            <div className="flex gap-4">
                <button
                    onClick={shareToTwitter}
                    aria-label="Share on Twitter"
                    className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center text-foreground hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-colors cursor-pointer"
                >
                    <Twitter className="w-4 h-4" />
                </button>
                <button
                    onClick={shareToLinkedIn}
                    aria-label="Share on LinkedIn"
                    className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center text-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors cursor-pointer"
                >
                    <Linkedin className="w-4 h-4" />
                </button>
                <button
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="w-10 h-10 rounded-full bg-white dark:bg-black border border-border shadow-sm flex items-center justify-center text-foreground hover:text-primary hover:border-primary/30 transition-colors cursor-pointer"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={shareToTwitter}
                aria-label="Share on Twitter"
                className="flex items-center gap-3 text-sm font-medium text-foreground/60 hover:text-[#1DA1F2] transition-colors group cursor-pointer"
            >
                <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-[#1DA1F2]/10 flex items-center justify-center transition-colors">
                    <Twitter className="w-4 h-4" />
                </div>
                Twitter
            </button>
            <button
                onClick={shareToLinkedIn}
                aria-label="Share on LinkedIn"
                className="flex items-center gap-3 text-sm font-medium text-foreground/60 hover:text-[#0A66C2] transition-colors group cursor-pointer"
            >
                <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-[#0A66C2]/10 flex items-center justify-center transition-colors">
                    <Linkedin className="w-4 h-4" />
                </div>
                LinkedIn
            </button>
            <button
                onClick={copyLink}
                aria-label="Copy link"
                className="flex items-center gap-3 text-sm font-medium text-foreground/60 hover:text-primary transition-colors group cursor-pointer"
            >
                <div className="w-8 h-8 rounded-full bg-foreground/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                </div>
                {copied ? "Copied!" : "Copy Link"}
            </button>
        </div>
    );
}
