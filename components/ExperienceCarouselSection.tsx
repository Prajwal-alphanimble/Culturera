'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import ScrollCarousel, { SlideData } from './ScrollCarousel';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCarouselSectionProps {
    slides: SlideData[];
}

export default function ExperienceCarouselSection({ slides }: ExperienceCarouselSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const decorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current) return;

        const ctx = gsap.context(() => {
            // Animate header elements on scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 0.5,
                },
            });

            // Headline animation
            if (headlineRef.current) {
                gsap.set(headlineRef.current, { opacity: 0, y: 60 });
                tl.to(headlineRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                }, 0);
            }

            // Subtitle animation
            if (subtitleRef.current) {
                gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
                tl.to(subtitleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                }, 0.2);
            }

            // Decorative circle animation
            if (decorRef.current) {
                gsap.set(decorRef.current, { scale: 0.5, opacity: 0 });
                tl.to(decorRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                }, 0.1);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full"
        >
            {/* Premium Gradient Background - Matching Hero */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a12 20%, #0f0a18 50%, #0a0a12 80%, #000000 100%)' }} />

            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none" />

            {/* Header Section - "What You Experience" */}
            <div
                ref={headerRef}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
            >
                {/* Decorative floating circle */}
                <div
                    ref={decorRef}
                    className="absolute left-8 top-1/4 md:left-16 lg:left-24"
                >
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/20 shadow-2xl md:h-40 md:w-40 lg:h-48 lg:w-48">
                        <img
                            src="/actual/singer.jpg"
                            alt="Live singer performance"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl -z-10 scale-125" />
                </div>

                {/* Main Headline */}
                <h2
                    ref={headlineRef}
                    className="mb-8 max-w-5xl font-serif text-5xl font-bold italic leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
                >
                    <span className="block">WHAT YOU</span>
                    <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        EXPERIENCE
                    </span>
                </h2>

                {/* Description */}
                <p
                    ref={subtitleRef}
                    className="max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg lg:text-xl"
                >
                    Culturera is your partner in creating unforgettable events. With years of industry experience, we
                    provide comprehensive event production services, including cutting-edge{' '}
                    <span className="text-amber-400 font-medium">sound systems</span>
                    , dazzling{' '}
                    <span className="text-purple-400 font-medium">lighting solutions</span>
                    , and sturdy{' '}
                    <span className="text-cyan-400 font-medium">trussing structures</span>.
                </p>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
                    <span className="text-xs uppercase tracking-widest text-white/60">Scroll to explore</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Carousel Section */}
            <div className="relative z-10">
                <ScrollCarousel slides={slides} />
            </div>
        </section>
    );
}
