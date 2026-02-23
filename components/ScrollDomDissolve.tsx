'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollDomDissolveProps {
    children: React.ReactNode;
}

export default function ScrollDomDissolve({ children }: ScrollDomDissolveProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !triggerRef.current) return;

        const ctx = gsap.context(() => {
            // Pin the container while dissolving
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top top',
                    end: '+=100%', // Dissolve over 100% of viewport height
                    scrub: true,
                    pin: true,
                    markers: false, // Set to true for debugging
                },
            });

            // Animate the mask to create a dissolve effect
            // We use a CSS mask with a gradient to simulate the dissolve
            // Start: Fully opaque (mask covers everything)
            // End: Fully transparent (mask reveals nothing)

            // Note: Efficient dissolve on DOM is hard. 
            // We'll use a simple opacity fade combined with a scale for a 'zoom out' feel
            // mimicking the dissolve somewhat, or stick to opacity if mask is too heavy.

            // To mimic the "Dissolve" texture look, we would ideally animate mask-position of a noise texture.
            // Let's try combining opacity with a slight blur for a "fade out/dissolve" feel.

            tl.to(containerRef.current, {
                opacity: 0,
                // backdropFilter: 'blur(10px)', // Optional: adds a blurry dissolve feel
                ease: 'none',
            });

            // If we had a CSS mask set up in CSS, we could animate its property here.
            // But straightforward opacity is safest for complex DOM children like Video/SVG.
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        // The trigger div defines the scroll area
        <div ref={triggerRef} className="relative h-screen w-full">

            {/* The sticky container holding the content */}
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full will-change-opacity"
            >
                {children}
            </div>

        </div>
    );
}
