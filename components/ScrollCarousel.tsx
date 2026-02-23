'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SlideData {
    visual: ReactNode;
    title: string;
    subtitle?: string;
    description: string;
    metadata?: string;
}

interface ScrollCarouselProps {
    slides: SlideData[];
}

export default function ScrollCarousel({ slides }: ScrollCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!containerRef.current || slides.length === 0) return;

        const ctx = gsap.context(() => {
            // Set initial positions for all cards
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                if (index === 0) {
                    // First card starts centered
                    gsap.set(card, {
                        x: 0,
                        scale: 1,
                        rotation: 0,
                    });
                } else {
                    // Other cards start off-screen right
                    gsap.set(card, {
                        x: '100vw',
                        scale: 0.85,
                        rotation: -4,
                    });
                }
            });

            // Set initial opacity for text elements
            textRefs.current.forEach((text, index) => {
                if (!text) return;
                gsap.set(text, { opacity: index === 0 ? 1 : 0 });
            });

            // ScrollTrigger to detect when carousel section is in view
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => setIsInView(true),
                onLeave: () => setIsInView(false),
                onEnterBack: () => setIsInView(true),
                onLeaveBack: () => setIsInView(false),
            });

            // Create ScrollTrigger for each card transition
            slides.forEach((_, index) => {
                if (index === slides.length - 1) return; // Skip last card

                const currentCard = cardsRef.current[index];
                const nextCard = cardsRef.current[index + 1];
                const currentText = textRefs.current[index];
                const nextText = textRefs.current[index + 1];

                if (!currentCard || !nextCard) return;

                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: `top+=${index * window.innerHeight} top`,
                    end: `top+=${(index + 1) * window.innerHeight} top`,
                    scrub: 1,
                    snap: {
                        snapTo: 1,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    },
                    onUpdate: (self) => {
                        const progress = self.progress;

                        // Animate current card out (center to left)
                        gsap.to(currentCard, {
                            x: gsap.utils.interpolate(0, '-100vw' as any, progress),
                            scale: gsap.utils.interpolate(1, 0.6, progress),
                            rotation: gsap.utils.interpolate(0, 6, progress),
                            duration: 0,
                        });

                        // Animate next card in (right to center)
                        gsap.to(nextCard, {
                            x: gsap.utils.interpolate('100vw', 0 as any, progress),
                            scale: gsap.utils.interpolate(0.85, 1, progress),
                            rotation: gsap.utils.interpolate(-4, 0, progress),
                            duration: 0,
                        });

                        // Text animations - fade out then fade in
                        if (currentText) {
                            if (progress < 0.5) {
                                // Fade out current text (0 to 0.5)
                                gsap.to(currentText, {
                                    opacity: gsap.utils.interpolate(1, 0, progress * 2),
                                    duration: 0,
                                });
                            } else {
                                // Keep at 0
                                gsap.set(currentText, { opacity: 0 });
                            }
                        }

                        if (nextText) {
                            if (progress < 0.5) {
                                // Keep at 0
                                gsap.set(nextText, { opacity: 0 });
                            } else {
                                // Fade in next text (0.5 to 1)
                                gsap.to(nextText, {
                                    opacity: gsap.utils.interpolate(0, 1, (progress - 0.5) * 2),
                                    duration: 0,
                                });
                            }
                        }
                    },
                    onLeave: () => setCurrentIndex(index + 1),
                    onEnterBack: () => setCurrentIndex(index),
                });
            });
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [slides]);

    // Determine which three slides to render
    const getVisibleSlides = () => {
        const prev = currentIndex > 0 ? currentIndex - 1 : null;
        const curr = currentIndex;
        const next = currentIndex < slides.length - 1 ? currentIndex + 1 : null;

        return { prev, curr, next };
    };

    const { prev, curr, next } = getVisibleSlides();

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Accessibility */}
            <div
                className="sr-only"
                aria-live="polite"
                aria-atomic="true"
            >
                Slide {currentIndex + 1} of {slides.length}
            </div>

            {/* Sticky Wrapper - contains both panels */}
            <div className="sticky top-0 h-screen flex">
                {/* Left Panel - Text Content */}
                <div className="relative w-1/2 h-full flex items-center px-8 lg:px-16">
                    {slides.map((slide, index) => (
                        <div
                            key={`text-${index}`}
                            ref={(el) => { textRefs.current[index] = el; }}
                            className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16"
                        >
                            {/* Metadata Badge */}
                            {slide.metadata && (
                                <div className="mb-6">
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white/70 backdrop-blur-sm border border-white/10">
                                        {slide.metadata}
                                    </span>
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-5xl lg:text-7xl font-bold mb-4 text-white leading-tight">
                                {slide.title}
                            </h1>

                            {/* Subtitle */}
                            {slide.subtitle && (
                                <p className="text-xl lg:text-2xl text-purple-300 mb-6 font-light">
                                    {slide.subtitle}
                                </p>
                            )}

                            {/* Description */}
                            <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-xl">
                                {slide.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right Panel - Carousel Cards */}
                <div className="relative h-full flex items-center justify-center pointer-events-none overflow-hidden" style={{ width: '50%', perspective: '1500px', transformStyle: 'preserve-3d' }}>
                    {slides.map((slide, index) => {
                        const isVisible = index === prev || index === curr || index === next;

                        return (
                            <div
                                key={`card-${index}`}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="absolute w-72 lg:w-80 h-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl"
                                style={{
                                    display: isVisible ? 'block' : 'none',
                                    // Dynamic z-index: current card on top, next card below, others behind
                                    zIndex: index === curr ? 100 : index === next ? 50 : 1,
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px -20px rgba(168, 85, 247, 0.3)',
                                }}
                            >
                                {slide.visual}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Spacer for scroll - creates scrollable area */}
            <div style={{ height: `${(slides.length - 1) * 100}vh` }} />

            {/* Progress indicator - Only visible when carousel is in view */}
            <div
                ref={indicatorRef}
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50 pointer-events-none transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
            >
                {/* Background pill */}
                <div className="absolute inset-0 -m-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10" />

                {slides.map((_, index) => (
                    <div
                        key={`progress-${index}`}
                        className={`relative z-10 h-2 rounded-full transition-all duration-500 ${index === currentIndex
                            ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                            : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
