'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden"
        >
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div ref={contentRef} className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <h4 className="text-purple-400 font-medium tracking-[0.2em] uppercase mb-4 text-sm">Who We Are</h4>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Crafting Moments that <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Matter</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                            <p>
                                At <span className="text-white font-medium">Culturera</span>, we don't just manage events; we engineer experiences.
                                Born from a passion for the arts and a dedication to technical precision, we bridge the gap between
                                creative vision and flawless execution.
                            </p>
                            <p>
                                Our team comprises seasoned sound engineers, lighting designers, and production specialists who understand
                                the nuance of live performance. We believe every beat, every beam of light, and every stage element tells a story.
                            </p>
                            <p>
                                Whether it's the roar of a stadium concert or the elegance of a corporate gala, we bring the same level of
                                intensity and professionalism to ensure your event isn't just seen or heard—but truly felt.
                            </p>
                        </div>

                        {/* Signature/Quote */}
                        <div className="pt-4 border-l-4 border-purple-500 pl-6 italic text-gray-400">
                            "Excellence is not an act, but a habit. We live by this every single day."
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {[
                                { number: "500+", label: "Events Delivered", color: "text-purple-400" },
                                { number: "10+", label: "Years Experience", color: "text-pink-400" },
                                { number: "100%", label: "Client Satisfaction", color: "text-cyan-400" },
                                { number: "50+", label: "Partner Venues", color: "text-amber-400" }
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-300 group"
                                >
                                    <div className={`text-4xl md:text-5xl font-bold mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.number}
                                    </div>
                                    <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
