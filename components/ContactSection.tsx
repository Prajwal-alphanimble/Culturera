'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden"
            id="contact"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.15),_transparent_50%)] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-indigo-900/10 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-8 sm:space-y-12">
                        <div>
                            <h4 className="text-purple-400 font-medium tracking-[0.2em] uppercase mb-3 sm:mb-4 text-xs sm:text-sm">Get In Touch</h4>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                                Let&apos;s Create <br />
                                Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Extraordinary.</span>
                            </h2>
                            <p className="text-gray-400 text-base sm:text-lg max-w-md leading-relaxed">
                                Ready to bring your vision to life? Whether it&apos;s a massive festival or an intimate gathering, we&apos;re here to make it happen.
                            </p>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            {/* Contact Item: Email */}
                            <a href="mailto:contact@cultureraentertainments.com" className="flex items-start gap-4 sm:gap-6 group hover:translate-x-2 transition-transform duration-300">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl sm:text-2xl text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-colors shrink-0">
                                    ✉️
                                </div>
                                <div className="min-w-0">
                                    <h5 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">Email Us</h5>
                                    <p className="text-gray-400 text-sm sm:text-base group-hover:text-white transition-colors break-all">contact@cultureraentertainments.com</p>
                                </div>
                            </a>

                            {/* Contact Item: WhatsApp */}
                            <a href="https://wa.me/919945132308" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 sm:gap-6 group hover:translate-x-2 transition-transform duration-300">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl sm:text-2xl text-pink-400 group-hover:bg-pink-500/20 group-hover:border-pink-500/50 transition-colors shrink-0">
                                    📞
                                </div>
                                <div>
                                    <h5 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-pink-300 transition-colors">WhatsApp</h5>
                                    <p className="text-gray-400 text-sm sm:text-base group-hover:text-white transition-colors">+91 99451 32308</p>
                                </div>
                            </a>

                            {/* Contact Item: Calls */}
                            <a href="tel:+918139982308" className="flex items-start gap-4 sm:gap-6 group hover:translate-x-2 transition-transform duration-300">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl sm:text-2xl text-amber-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/50 transition-colors shrink-0">
                                    ☎️
                                </div>
                                <div>
                                    <h5 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-amber-200 transition-colors">Call Us</h5>
                                    <p className="text-gray-400 text-sm sm:text-base group-hover:text-white transition-colors">+91 81399 82308</p>
                                </div>
                            </a>

                            {/* Contact Item: Location */}
                            <div className="flex items-start gap-4 sm:gap-6 group hover:translate-x-2 transition-transform duration-300 cursor-default">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl sm:text-2xl text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-colors shrink-0">
                                    📍
                                </div>
                                <div>
                                    <h5 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">Visit Us</h5>
                                    <p className="text-gray-400 text-sm sm:text-base group-hover:text-white transition-colors">
                                        3rd street greenfield bank avenue Babusapalya,<br />
                                        Bangalore-560043
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-6 sm:pt-8 border-t border-white/10">
                            <h6 className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-4 sm:mb-6">Follow Our Journey</h6>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                {[
                                    {
                                        label: 'Instagram',
                                        href: 'https://www.instagram.com/culturera.entertainments/?hl=en',
                                    },
                                    // { label: 'LinkedIn', href: '#' },
                                    // { label: 'Twitter', href: '#' },
                                    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61586747804176' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target={social.href.startsWith('http') ? '_blank' : undefined}
                                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        {social.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Simple Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl sm:rounded-3xl blur-xl -z-10" />
                        <form className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6">
                            <h3 className="text-xl sm:text-2xl font-bold mb-2">Send a Message</h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs sm:text-sm text-gray-400 ml-1">Name</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs sm:text-sm text-gray-400 ml-1">Phone</label>
                                        <input 
                                            type="tel" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                            placeholder="+91..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm text-gray-400 ml-1">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm text-gray-400 ml-1">Message</label>
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
                                        placeholder="Tell us about your event..."
                                    />
                                </div>
                            </div>

                            <button 
                                type="button"
                                className="w-full bg-white text-black font-bold py-3 sm:py-4 rounded-xl hover:bg-purple-400 hover:scale-[1.02] transition-all duration-300 mt-4 text-sm sm:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
