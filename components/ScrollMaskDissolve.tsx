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
    // Target background - matches ExperienceCarouselSection gradient
    targetGradient?: string;
}

export default function ScrollMaskDissolve({
    children,
    noiseTexture,
    scrollRange = '100vh',
    targetGradient = 'linear-gradient(to bottom, #18181b, #0f172a, #3b0764)', // zinc-900 -> slate-900 -> purple-950
}: ScrollMaskDissolveProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const grainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !triggerRef.current || !maskRef.current) return;

        const ctx = gsap.context(() => {
            // Timeline for the dissolve animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: `+=${scrollRange}`,
                    scrub: 0.3, // Slightly faster scrubbing for more responsive feel
                    pin: true,
                    markers: false, // Set to true for debugging
                },
            });

            // Phase 1: Start revealing the gradient overlay through noise mask
            tl.to(
                maskRef.current,
                {
                    maskSize: '150% 150%', // Slightly scale up noise for organic reveal
                    webkitMaskSize: '150% 150%',
                    opacity: 0.6,
                    ease: 'power1.in',
                    duration: 0.4,
                },
                0
            );

            // Phase 2: Complete the dissolve
            tl.to(
                maskRef.current,
                {
                    maskSize: '300% 300%', // Further scale for more grain detail
                    webkitMaskSize: '300% 300%',
                    opacity: 1,
                    ease: 'power2.out',
                    duration: 0.6,
                },
                0.4
            );

            // Animate grain overlay for extra texture during transition
            if (grainRef.current) {
                gsap.set(grainRef.current, { opacity: 0 });

                tl.to(
                    grainRef.current,
                    {
                        opacity: 0.15,
                        ease: 'power1.in',
                        duration: 0.3,
                    },
                    0.2
                );

                tl.to(
                    grainRef.current,
                    {
                        opacity: 0,
                        ease: 'power1.out',
                        duration: 0.3,
                    },
                    0.7
                );
            }

            // Fade out the content layer as dissolve progresses
            tl.to(
                containerRef.current,
                {
                    opacity: 0,
                    scale: 0.98,
                    ease: 'power2.inOut',
                    duration: 1,
                },
                0
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

            {/* Dissolve Overlay Layer - Gradient matching next section */}
            <div
                ref={maskRef}
                className="pointer-events-none absolute inset-0 w-full h-full"
                style={{
                    // Gradient matching ExperienceCarouselSection background
                    background: targetGradient,
                    // Use the noise texture as a mask
                    // White areas of noise = visible (show gradient)
                    // Black areas of noise = transparent (show content behind)
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

            {/* Grain texture overlay for extra organic feel during transition */}
            <div
                ref={grainRef}
                className="pointer-events-none absolute inset-0 w-full h-full mix-blend-overlay"
                style={{
                    backgroundImage: `url(${noiseTexture})`,
                    backgroundSize: '50% 50%',
                    backgroundRepeat: 'repeat',
                    opacity: 0,
                }}
            />
        </div>
    );
}
