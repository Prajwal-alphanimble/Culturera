'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const { width, height } = heroRef.current.getBoundingClientRect();
            const x = (clientX / width - 0.5) * 20;
            const y = (clientY / height - 0.5) * 20;
            heroRef.current.style.setProperty('--mouse-x', `${x}px`);
            heroRef.current.style.setProperty('--mouse-y', `${y}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            className="hero-section relative min-h-screen w-full overflow-hidden flex flex-col"
            style={{
                background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 40%, #0f0a18 70%, #000000 100%)',
            }}
        >
            {/* Animated Background Elements */}
            <div className="hero-bg-elements">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <div className="grid-overlay" />
            </div>

            {/* Navigation Layer */}
            <nav className="relative z-20 flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20">
                <div className="logo-wrapper">
                    <span className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                        Culturera
                    </span>
                    <span className="logo-glow" />
                </div>
                <div className="hidden items-center gap-10 md:flex">
                    {['Home', 'Services', 'Projects', 'About'].map((item, index) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="nav-link"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="nav-link-text">{item}</span>
                            <span className="nav-link-line" />
                        </Link>
                    ))}
                </div>
                <button className="glass-button md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 flex flex-grow flex-col items-center justify-center px-6 py-12 md:py-0">

                {/* Video-Masked Title */}
                <div className="title-container">
                    <div className="title-wrapper">
                        {/* Video Background */}
                        <div className="absolute inset-0 z-0">
                            <video
                                className="h-full w-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* SVG Mask */}
                        <svg className="absolute inset-0 w-full h-full z-10" width="100%" height="100%">
                            <defs>
                                <mask id="hero-text-mask">
                                    <rect width="100%" height="100%" fill="white" />
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="black"
                                        className="hero-title-text"
                                    >
                                        CULTURERA
                                    </text>
                                </mask>
                                <linearGradient id="title-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#0a0a0f" />
                                    <stop offset="50%" stopColor="#1a1a2e" />
                                    <stop offset="100%" stopColor="#16213e" />
                                </linearGradient>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                fill="url(#title-gradient)"
                                mask="url(#hero-text-mask)"
                            />
                        </svg>

                        {/* Title Glow Effect */}
                        <div className="title-glow" />
                    </div>
                </div>

                {/* Subtitle Section */}
                <div className="subtitle-section">
                    <div className="subtitle-line" />
                    <div className="subtitle-content">
                        <p className="subtitle-text">
                            <span className="highlight">IMMERSE</span> YOURSELF IN THE
                        </p>
                        <p className="subtitle-text">
                            FUTURE OF <span className="highlight">DIGITAL ART</span> & CULTURE
                        </p>
                        <p className="subtitle-text">
                            EXPERIENCE THE <span className="highlight">UNIMAGINABLE</span>
                        </p>
                    </div>
                    <div className="subtitle-line" />
                </div>

                {/* CTA Section */}
                <div className="cta-section">
                    <button className="cta-primary">
                        <span className="cta-text">EXPLORE NOW</span>
                        <span className="cta-icon">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <span className="cta-glow" />
                    </button>
                    <button className="cta-secondary">
                        VIEW PROJECTS
                    </button>
                </div>

                {/* Floating Badges */}
                <div className="badges-container">
                    <FloatingBadge
                        label="3D Design"
                        delay={0}
                        position="top-left"
                    />
                    <FloatingBadge
                        label="Digital Art"
                        delay={0.2}
                        position="top-right"
                    />
                    <FloatingBadge
                        label="Immersive XR"
                        delay={0.4}
                        position="middle-left"
                    />
                    <FloatingBadge
                        label="Motion Graphics"
                        delay={0.6}
                        position="middle-right"
                    />
                    <FloatingBadge
                        label="Creative Tech"
                        delay={0.8}
                        position="bottom-left"
                    />
                    <FloatingBadge
                        label="Visual Stories"
                        delay={1.0}
                        position="bottom-right"
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span className="scroll-text">SCROLL TO EXPLORE</span>
            </div>

            {/* Bottom Fade Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

            <style jsx>{`
                .hero-section {
                    --mouse-x: 0px;
                    --mouse-y: 0px;
                }

                /* Background Elements */
                .hero-bg-elements {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    opacity: 0.7;
                    animation: orbFloat 20s ease-in-out infinite;
                }

                .orb-1 {
                    width: 600px;
                    height: 600px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    top: -200px;
                    left: -200px;
                    animation-delay: 0s;
                }

                .orb-2 {
                    width: 500px;
                    height: 500px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    bottom: -150px;
                    right: -150px;
                    animation-delay: -7s;
                }

                .orb-3 {
                    width: 400px;
                    height: 400px;
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: -14s;
                    opacity: 0.3;
                }

                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
                }

                @keyframes orbFloat {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(30px, -30px) scale(1.05);
                    }
                    50% {
                        transform: translate(-20px, 20px) scale(0.95);
                    }
                    75% {
                        transform: translate(-30px, -10px) scale(1.02);
                    }
                }

                /* Logo */
                .logo-wrapper {
                    position: relative;
                }

                .logo-glow {
                    position: absolute;
                    inset: -10px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
                    filter: blur(20px);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: -1;
                }

                .logo-wrapper:hover .logo-glow {
                    opacity: 1;
                }

                /* Navigation */
                .nav-link {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none;
                    animation: navFadeIn 0.6s ease forwards;
                    opacity: 0;
                }

                @keyframes navFadeIn {
                    to {
                        opacity: 1;
                    }
                }

                .nav-link-text {
                    font-size: 0.75rem;
                    font-weight: 500;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.6);
                    transition: all 0.3s ease;
                }

                .nav-link:hover .nav-link-text {
                    color: #fff;
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                }

                .nav-link-line {
                    width: 0;
                    height: 2px;
                    margin-top: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    transition: width 0.3s ease;
                }

                .nav-link:hover .nav-link-line {
                    width: 100%;
                }

                .glass-button {
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    color: white;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                .glass-button:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                /* Title Container */
                .title-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    animation: titleReveal 1.2s ease forwards;
                }

                @keyframes titleReveal {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .title-wrapper {
                    position: relative;
                    width: 100%;
                    height: 120px;
                    overflow: hidden;
                    border-radius: 20px;
                }

                @media (min-width: 768px) {
                    .title-wrapper {
                        height: 180px;
                        border-radius: 30px;
                    }
                }

                @media (min-width: 1024px) {
                    .title-wrapper {
                        height: 240px;
                    }
                }

                .hero-title-text {
                    font-family: system-ui, -apple-system, sans-serif;
                    font-weight: 900;
                    font-size: 15vw;
                    letter-spacing: -0.03em;
                }

                @media (min-width: 1024px) {
                    .hero-title-text {
                        font-size: 12vw;
                    }
                }

                .title-glow {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at center, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* Subtitle */
                .subtitle-section {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    margin-top: 40px;
                    animation: subtitleReveal 1s ease 0.3s forwards;
                    opacity: 0;
                }

                @keyframes subtitleReveal {
                    to {
                        opacity: 1;
                    }
                }

                .subtitle-line {
                    width: 60px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
                    display: none;
                }

                @media (min-width: 768px) {
                    .subtitle-line {
                        display: block;
                    }
                }

                .subtitle-content {
                    text-align: center;
                }

                .subtitle-text {
                    font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.3em;
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 2;
                }

                @media (min-width: 768px) {
                    .subtitle-text {
                        font-size: 0.85rem;
                    }
                }

                .subtitle-text .highlight {
                    color: #fff;
                    text-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
                }

                /* CTA Section */
                .cta-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    margin-top: 48px;
                    animation: ctaReveal 1s ease 0.6s forwards;
                    opacity: 0;
                }

                @media (min-width: 768px) {
                    .cta-section {
                        flex-direction: row;
                        gap: 24px;
                    }
                }

                @keyframes ctaReveal {
                    to {
                        opacity: 1;
                    }
                }

                .cta-primary {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 32px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 50px;
                    color: white;
                    font-weight: 600;
                    font-size: 0.875rem;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .cta-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
                }

                .cta-text {
                    position: relative;
                    z-index: 1;
                }

                .cta-icon {
                    position: relative;
                    z-index: 1;
                    transition: transform 0.3s ease;
                }

                .cta-primary:hover .cta-icon {
                    transform: translateX(4px);
                }

                .cta-glow {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .cta-primary:hover .cta-glow {
                    opacity: 1;
                }

                .cta-secondary {
                    padding: 16px 32px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50px;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                    font-size: 0.875rem;
                    letter-spacing: 0.1em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .cta-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.5);
                    color: white;
                }

                /* Floating Badges Container */
                .badges-container {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    display: none;
                }

                @media (min-width: 1024px) {
                    .badges-container {
                        display: block;
                    }
                }

                /* Scroll Indicator */
                .scroll-indicator {
                    position: absolute;
                    bottom: 32px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    animation: scrollPulse 2s ease-in-out infinite;
                }

                @keyframes scrollPulse {
                    0%, 100% {
                        opacity: 0.5;
                        transform: translateX(-50%) translateY(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translateX(-50%) translateY(5px);
                    }
                }

                .scroll-mouse {
                    width: 26px;
                    height: 40px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 15px;
                    display: flex;
                    justify-content: center;
                    padding-top: 8px;
                }

                .scroll-wheel {
                    width: 4px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 2px;
                    animation: scrollWheel 1.5s ease-in-out infinite;
                }

                @keyframes scrollWheel {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                }

                .scroll-text {
                    font-size: 0.65rem;
                    letter-spacing: 0.3em;
                    color: rgba(255, 255, 255, 0.4);
                }
            `}</style>
        </section>
    );
}

// Floating Badge Component
interface FloatingBadgeProps {
    label: string;
    delay: number;
    position: 'top-left' | 'top-right' | 'middle-left' | 'middle-right' | 'bottom-left' | 'bottom-right';
}

function FloatingBadge({ label, delay, position }: FloatingBadgeProps) {
    const positionClasses: Record<string, React.CSSProperties> = {
        'top-left': { top: '15%', left: '8%' },
        'top-right': { top: '12%', right: '10%' },
        'middle-left': { top: '45%', left: '5%' },
        'middle-right': { top: '40%', right: '6%' },
        'bottom-left': { bottom: '25%', left: '12%' },
        'bottom-right': { bottom: '20%', right: '8%' },
    };

    return (
        <div
            className="floating-badge"
            style={{
                ...positionClasses[position],
                animationDelay: `${delay}s`,
            }}
        >
            <div className="badge-inner">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="badge-video"
                >
                    <source src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" type="video/mp4" />
                </video>
                <span className="badge-label">{label}</span>
            </div>
            <style jsx>{`
                .floating-badge {
                    position: absolute;
                    animation: floatIn 1s ease forwards, badgeFloat 6s ease-in-out infinite;
                    opacity: 0;
                    pointer-events: auto;
                }

                @keyframes floatIn {
                    to {
                        opacity: 1;
                    }
                }

                @keyframes badgeFloat {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    25% {
                        transform: translateY(-15px) rotate(2deg);
                    }
                    75% {
                        transform: translateY(10px) rotate(-2deg);
                    }
                }

                .badge-inner {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 180px;
                    height: 60px;
                    border-radius: 30px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    transition: all 0.4s ease;
                    cursor: pointer;
                }

                .badge-inner:hover {
                    transform: scale(1.1);
                    border-color: rgba(255, 255, 255, 0.4);
                    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
                }

                .badge-video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    opacity: 0.4;
                }

                .badge-label {
                    position: relative;
                    z-index: 1;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    color: white;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
}
