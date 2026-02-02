'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface EventCard {
    title: string;
    subtitle: string;
    icon: string;
    gradient: string;
    accentColor: string;
}

const eventCards: EventCard[] = [
    {
        title: 'Concert',
        subtitle: 'Live Music Events',
        icon: '🎸',
        gradient: 'from-rose-500 via-pink-500 to-purple-600',
        accentColor: 'rgb(236, 72, 153)',
    },
    {
        title: 'Marriage',
        subtitle: 'Wedding Celebrations',
        icon: '💒',
        gradient: 'from-amber-400 via-orange-500 to-rose-500',
        accentColor: 'rgb(251, 146, 60)',
    },
    {
        title: 'College',
        subtitle: 'Campus Festivals',
        icon: '🎓',
        gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
        accentColor: 'rgb(59, 130, 246)',
    },
    {
        title: 'Launch',
        subtitle: 'Product Reveals',
        icon: '🚀',
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        accentColor: 'rgb(168, 85, 247)',
    },
    {
        title: 'Corporate',
        subtitle: 'Business Events',
        icon: '🏢',
        gradient: 'from-slate-400 via-zinc-500 to-neutral-600',
        accentColor: 'rgb(161, 161, 170)',
    },
    {
        title: 'Social',
        subtitle: 'Community Gatherings',
        icon: '🎉',
        gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
        accentColor: 'rgb(20, 184, 166)',
    },
    {
        title: 'Political',
        subtitle: 'Campaign Events',
        icon: '🏛️',
        gradient: 'from-red-500 via-orange-500 to-amber-500',
        accentColor: 'rgb(239, 68, 68)',
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
            gsap.to(track, {
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
                            containerAnimation: gsap.to(track, { x: -totalWidth }),
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
            ref={sectionRef}
            className="relative bg-black overflow-hidden"
        >
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]" />
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
                            className="event-card group relative flex-shrink-0 w-[350px] h-[450px] rounded-3xl overflow-hidden cursor-pointer"
                            style={{
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: `0 25px 50px -12px ${card.accentColor}40`,
                            }}
                        >
                            {/* Gradient background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                            />

                            {/* Number indicator */}
                            <div className="absolute top-6 left-6 text-8xl font-black text-white/5">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            {/* Card content */}
                            <div className="relative h-full flex flex-col justify-end p-8">
                                {/* Icon */}
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        background: `linear-gradient(145deg, ${card.accentColor}30, ${card.accentColor}10)`,
                                        boxShadow: `0 10px 40px ${card.accentColor}40`,
                                    }}
                                >
                                    {card.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                    {card.title}
                                </h3>

                                {/* Subtitle */}
                                <p className="text-white/60 text-lg">
                                    {card.subtitle}
                                </p>

                                {/* Hover arrow */}
                                <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    <svg
                                        className="w-6 h-6 text-white"
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

                            {/* Glow effect on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 100%, ${card.accentColor}30, transparent 60%)`,
                                }}
                            />
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
