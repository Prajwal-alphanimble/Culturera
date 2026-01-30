'use client';

import React from 'react';
import Image from 'next/image';

interface GifBadgeProps {
    src?: string;
    delay?: number;
    className?: string;
    alt?: string;
}

export default function GifBadge({ src, delay = 0, className = '', alt = "Badge GIF" }: GifBadgeProps) {
    return (
        <div
            className={`relative overflow-hidden ${className} animate-float shadow-lg`}
            style={{ animationDelay: `${delay}s` }}
        >
            {src ? (
                <div className="absolute inset-0 w-full h-full">
                    {(src.endsWith('.mp4') || src.endsWith('.webm')) ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            <source src={src} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            ) : (
                /* Fallback Gradient/Solid if no GIF provided */
                <div className="absolute inset-0 bg-white/10" />
            )}
        </div>
    );
}
