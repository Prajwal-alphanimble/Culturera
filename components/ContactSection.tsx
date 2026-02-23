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
            className="relative py-32 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden"
            id="contact"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.15),_transparent_50%)] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h4 className="text-purple-400 font-medium tracking-[0.2em] uppercase mb-4 text-sm">Get In Touch</h4>
                            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                                Let's Create <br />
                                Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Extraordinary.</span>
                            </h2>
                            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                                Ready to bring your vision to life? Whether it's a massive festival or an intimate gathering, we're here to make it happen.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Contact Item: Email */}
                            <a href="mailto:hello@culturera.com" className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                                    ✉️
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">Email Us</h5>
                                    <p className="text-gray-400 group-hover:text-white transition-colors">hello@culturera.com</p>
                                </div>
                            </a>

                            {/* Contact Item: Phone */}
                            <a href="tel:+1234567890" className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-pink-400 group-hover:bg-pink-500/20 group-hover:border-pink-500/50 transition-colors">
                                    📞
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-1 group-hover:text-pink-300 transition-colors">Call Us</h5>
                                    <p className="text-gray-400 group-hover:text-white transition-colors">+91 98765 43210</p>
                                </div>
                            </a>

                            {/* Contact Item: Location */}
                            <div className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300 cursor-default">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                                    📍
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">Visit Us</h5>
                                    <p className="text-gray-400 group-hover:text-white transition-colors">
                                        123 Creative Avenue,<br />
                                        Event City, EC 560001
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-white/10">
                            <h6 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Follow Our Journey</h6>
                            <div className="flex gap-4">
                                {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Simple Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl -z-10" />
                        <form className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl space-y-6">
                            <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1">Name</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400 ml-1">Phone</label>
                                        <input 
                                            type="tel" 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                            placeholder="+91..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 ml-1">Message</label>
                                    <textarea 
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
                                        placeholder="Tell us about your event..."
                                    />
                                </div>
                            </div>

                            <button 
                                type="button"
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-purple-400 hover:scale-[1.02] transition-all duration-300 mt-4"
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
