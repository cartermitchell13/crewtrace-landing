"use client";

import { useEffect, useRef } from "react";

type ScrollPlaybackVideoProps = {
    src: string;
    ariaLabel: string;
    className?: string;
};

export default function ScrollPlaybackVideo({
    src,
    ariaLabel,
    className,
}: ScrollPlaybackVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    void video.play();
                    return;
                }

                video.pause();
            },
            {
                threshold: 0.45,
                rootMargin: "0px 0px -10% 0px",
            },
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            className={className}
            aria-label={ariaLabel}
        >
            <source src={src} type="video/mp4" />
        </video>
    );
}
