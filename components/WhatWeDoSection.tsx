'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const cards = track.querySelectorAll('.event-card');

        // Calculate total scroll width
        const totalWidth = track.scrollWidth - window.innerWidth;

        const ctx = gsap.context(() => {
            // Horizontal scroll animation
            const scrollTween = gsap.to(track, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${totalWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // Animate cards as they come into view
            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0.5, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: 'left 80%',
                            end: 'left 20%',
                            scrub: true,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a12 30%, #0f0a18 60%, #0a0a12 90%, #000000 100%)' }}
        >
            {/* Background gradient orbs - Matching theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[180px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[150px]" />
            </div>

            {/* Content container */}
            <div className="relative h-screen flex flex-col justify-center">
                {/* Section header */}
                <div className="px-16 mb-12 relative z-10">
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
                            {/* Background Image */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/90 group-hover:via-black/70 group-hover:to-black transition-all duration-500" />

                            {/* Accent Glow on Hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                                style={{
                                    background: `linear-gradient(to top, ${card.accentColor}, transparent)`,
                                }}
                            />

                            {/* Number indicator - Bold and outlined for visibility */}
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

                            {/* Card content */}
                            <div className="relative h-full flex flex-col justify-end p-8 z-20">
                                {/* Title */}
                                <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-y-[-10px] transition-transform duration-300">
                                    {card.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-purple-300 text-lg font-medium mb-4 group-hover:translate-y-[-10px] transition-transform duration-300 delay-75">
                                    {card.subtitle}
                                </p>

                                {/* Description - Visible on hover or always visible but subtle */}
                                <p className="text-white/70 text-sm leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 h-0 group-hover:h-auto overflow-hidden">
                                    {card.description}
                                </p>

                                {/* Hover arrow */}
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

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                    <span className="text-sm uppercase tracking-wider">Scroll down</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
