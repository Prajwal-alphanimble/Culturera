'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollMaskDissolveProps {
    children: React.ReactNode;
    noiseTexture: string;
    scrollRange?: string; // e.g., "100vh" or "+=500"
}

export default function ScrollMaskDissolve({
    children,
    noiseTexture,
    scrollRange = '100vh',
}: ScrollMaskDissolveProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !triggerRef.current || !maskRef.current) return;

        const ctx = gsap.context(() => {
            // Timeline for the dissolve animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: `+=${scrollRange}`,
                    scrub: 0.5, // Smooth scrubbing
                    pin: true,
                    markers: false, // Set to true for debugging
                },
            });

            // Animate the mask layer from fully transparent to fully opaque
            // The noise texture acts as an alpha channel - we scale it up while moving it
            // This creates a "dissolve" effect as different parts of the noise reach threshold
            tl.to(
                maskRef.current,
                {
                    maskSize: '400% 400%', // Scale up the noise texture
                    webkitMaskSize: '400% 400%',
                    opacity: 1, // The mask overlay becomes fully visible (black background)
                    ease: 'power1.inOut',
                    duration: 1,
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, [scrollRange]);

    return (
        <div ref={triggerRef} className="relative h-screen w-full">
            {/* Content Layer */}
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full"
            >
                {children}
            </div>

            {/* Mask Overlay Layer - This creates the dissolve effect */}
            <div
                ref={maskRef}
                className="pointer-events-none absolute inset-0 w-full h-full bg-black"
                style={{
                    // Use the noise texture as a mask
                    // Black areas of noise = transparent (show content)
                    // White areas of noise = opaque (show black overlay)
                    maskImage: `url(${noiseTexture})`,
                    WebkitMaskImage: `url(${noiseTexture})`,
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    opacity: 0, // Start fully transparent
                }}
            />
        </div>
    );
}
