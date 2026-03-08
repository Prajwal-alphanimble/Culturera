'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventCard {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    accentColor: string;
}

const eventCards: EventCard[] = [
    {
        title: 'Concert',
        subtitle: 'Electrifying Live Performances',
        description: 'From intimate acoustic sets to massive stadium tours, we engineer sound and light to create unforgettable musical journeys.',
        image: '/actual/concert.png',
        accentColor: 'rgb(236, 72, 153)', // Pink
    },
    {
        title: 'Weddings',
        subtitle: 'Dream Celebrations',
        description: 'We turn your special day into a fairy tale with breathtaking decor, mood lighting, and flawless coordination for a seamless experience.',
        image: '/actual/mirrage.jpg',
        accentColor: 'rgb(251, 146, 60)', // Orange
    },
    {
        title: 'College',
        subtitle: 'Campus Energy Unleashed',
        description: 'We bring the hype to campus with high-energy productions, celebrity management, and seamless execution for the ultimate student experience.',
        image: '/actual/college.jpg',
        accentColor: 'rgb(59, 130, 246)', // Blue
    },
    {
        title: 'Launch',
        subtitle: 'Unveiling Innovation',
        description: 'Make a powerful first impression. We craft immersive reveal sequences that highlight your product\'s unique value and wow your audience.',
        image: '/actual/product.avif',
        accentColor: 'rgb(168, 85, 247)', // Purple
    },
    {
        title: 'Corporate',
        subtitle: 'Professional Excellence',
        description: 'Elevate your brand with sophisticated conferences, galas, and networking events that reflect your company\'s prestige and vision.',
        image: '/actual/corporate.avif',
        accentColor: 'rgb(161, 161, 170)', // Slate
    },
    {
        title: 'Social',
        subtitle: 'Celebrating Connections',
        description: 'Whether it\'s a milestone birthday or a community get-together, we create warm, inviting atmospheres for meaningful celebrations.',
        image: '/actual/social.jpg',
        accentColor: 'rgb(20, 184, 166)', // Teal
    },
    {
        title: 'Political',
        subtitle: 'Rallies & Outreach',
        description: 'Large-scale stage setups and crystal-clear audio ensuring your message reaches every corner of the crowd with impact and authority.',
        image: '/actual/political.jpg',
        accentColor: 'rgb(239, 68, 68)', // Red
    },
];

export default function WhatWeDoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        
        // Only run horizontal scroll on desktop (lg and above)
        if (isMobile || !section || !trackRef.current) {
            // When on mobile, kill any pins from this section (e.g. after resize from desktop)
            if (section) {
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger === section) {
                        st.kill();
                    }
                });
            }
            return;
        }

        const track = trackRef.current;
        
        // Calculate total scroll distance
        const getScrollAmount = () => {
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            return -(trackWidth - viewportWidth);
        };

        // Wait for images to load before calculating
        const images = track.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        const initScrollTrigger = () => {
            const scrollAmount = getScrollAmount();
            
            // If there's nothing to scroll, don't create the animation
            if (scrollAmount >= 0) return null;

            const ctx = gsap.context(() => {
                // Create the horizontal scroll animation with pinning
                gsap.to(track, {
                    x: scrollAmount,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${Math.abs(scrollAmount)}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onLeave: () => {
                            // Ensure track is at final position when leaving
                            gsap.set(track, { x: scrollAmount });
                        },
                        onEnterBack: () => {
                            // Reset when scrolling back up
                            gsap.set(track, { x: 0 });
                        }
                    },
                });

                // Animate individual cards as they scroll into view
                const cards = track.querySelectorAll('.event-card');
                cards.forEach((card) => {
                    gsap.fromTo(card,
                        { opacity: 0.6, scale: 0.95 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            scrollTrigger: {
                                trigger: card,
                                start: 'left 90%',
                                end: 'left 50%',
                                scrub: true,
                            },
                        }
                    );
                });
            }, section);

            return ctx;
        };

        let ctx: ReturnType<typeof gsap.context> | null = null;

        const handleImageLoad = () => {
            loadedImages++;
            if (loadedImages >= totalImages) {
                // All images loaded, initialize scrollTrigger
                ctx = initScrollTrigger();
                ScrollTrigger.refresh();
            }
        };

        if (totalImages === 0) {
            // No images, init immediately
            ctx = initScrollTrigger();
        } else {
            // Wait for images
            images.forEach((img) => {
                if (img.complete) {
                    handleImageLoad();
                } else {
                    img.addEventListener('load', handleImageLoad);
                    img.addEventListener('error', handleImageLoad);
                }
            });
        }

        return () => {
            // Clean up event listeners
            images.forEach((img) => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
            
            // Clean up GSAP context and ScrollTriggers
            if (ctx) {
                ctx.revert();
            }
            
            // Kill any remaining ScrollTriggers for this section
            if (section) {
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger === section) {
                        st.kill();
                    }
                });
            }
        };
    }, [isMobile]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-black"
            style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a12 30%, #0f0a18 60%, #0a0a12 90%, #000000 100%)' }}
        >
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-violet-600/10 rounded-full blur-[100px] sm:blur-[150px] lg:blur-[180px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] sm:blur-[140px] lg:blur-[180px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-cyan-600/5 rounded-full blur-[80px] sm:blur-[120px] lg:blur-[150px]" />
            </div>

            {/* Mobile View - Vertical Grid */}
            <div className="lg:hidden relative z-10 py-16 sm:py-20">
                {/* Section header */}
                <div className="px-4 sm:px-6 mb-10 sm:mb-12">
                    <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-purple-400 mb-3 sm:mb-4">
                        Our Expertise
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                        What We Do
                    </h2>
                    <p className="text-base sm:text-lg text-white/60 max-w-xl">
                        From intimate gatherings to grand celebrations, we bring every event to life with precision and passion.
                    </p>
                </div>

                {/* Mobile Cards Grid */}
                <div className="px-4 sm:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {eventCards.map((card, index) => (
                            <div
                                key={card.title}
                                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                                style={{
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: `0 15px 30px -8px ${card.accentColor}40`,
                                }}
                            >
                                <div className="aspect-[4/3] sm:aspect-[16/10] relative">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90 group-hover:via-black/60 group-hover:to-black transition-all duration-500" />
                                    
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                                        style={{
                                            background: `linear-gradient(to top, ${card.accentColor}, transparent)`,
                                        }}
                                    />
                                    
                                    <div className="absolute top-3 left-4 sm:top-4 sm:left-6 text-5xl sm:text-6xl font-black z-10 select-none pointer-events-none"
                                        style={{
                                            color: 'transparent',
                                            WebkitTextStroke: '1.5px rgba(255,255,255,0.8)',
                                            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                                            opacity: 0.9
                                        }}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-purple-300 text-sm sm:text-base font-medium mb-2 sm:mb-3">
                                            {card.subtitle}
                                        </p>
                                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop View - Horizontal Scroll with Pinning */}
            <div className="hidden lg:block relative z-10">
                <div className="h-screen flex flex-col justify-center overflow-hidden">
                    {/* Section header */}
                    <div className="px-16 mb-12 shrink-0">
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-purple-400 mb-4">
                            Our Expertise
                        </p>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                            What We Do
                        </h2>
                        <p className="text-xl text-white/60 max-w-xl">
                            From intimate gatherings to grand celebrations, we bring every event to life with precision and passion.
                        </p>
                    </div>

                    {/* Horizontal scroll track */}
                    <div className="relative overflow-visible">
                        <div
                            ref={trackRef}
                            className="flex gap-8 pl-16 pr-[50vw]"
                            style={{ width: 'max-content' }}
                        >
                            {eventCards.map((card, index) => (
                                <div
                                    key={card.title}
                                    className="event-card group relative flex-shrink-0 w-[350px] h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: `0 25px 50px -12px ${card.accentColor}40`,
                                    }}
                                >
                                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/90 group-hover:via-black/70 group-hover:to-black transition-all duration-500" />

                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                                        style={{
                                            background: `linear-gradient(to top, ${card.accentColor}, transparent)`,
                                        }}
                                    />

                                    <div className="absolute top-4 left-6 text-8xl font-black z-10 select-none pointer-events-none"
                                        style={{
                                            color: 'transparent',
                                            WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                                            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
                                            opacity: 0.9
                                        }}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="relative h-full flex flex-col justify-end p-8 z-20">
                                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-y-[-10px] transition-transform duration-300">
                                            {card.title}
                                        </h3>
                                        <p className="text-purple-300 text-lg font-medium mb-4 group-hover:translate-y-[-10px] transition-transform duration-300 delay-75">
                                            {card.subtitle}
                                        </p>
                                        <p className="text-white/70 text-sm leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 h-0 group-hover:h-auto overflow-hidden">
                                            {card.description}
                                        </p>
                                        <div className="mt-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-150 border border-white/20">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                        <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
