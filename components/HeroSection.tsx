'use client';

import React from 'react';
import Link from 'next/link';

import GifBadge from './GifBadge';

export default function HeroSection() {

    return (
        <section className="relative min-h-screen w-full bg-[#E5E5E5] overflow-hidden flex flex-col">
            {/* Navigation Layer */}
            <nav className="relative z-20 flex w-full items-center justify-between px-6 py-8 md:px-12">
                <div className="text-2xl font-bold tracking-tighter text-black">
                    Culturera
                </div>
                <div className="hidden items-center gap-8 md:flex">
                    {['Home', 'Services', 'Projects', 'About'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium uppercase tracking-widest text-black/70 transition-colors hover:text-black"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Main Content Grid */}
            <div className="relative z-10 flex flex-grow flex-col md:grid md:grid-cols-2">

                {/* Left Column: Text & Video Mask */}
                <div className="flex flex-col justify-center px-6 md:pl-12 lg:pl-20 py-12">

                    {/* Video Mask Container - SVG Stencil Approach */}
                    <div className="relative mb-8 select-none w-full h-[20rem] md:h-[40vh] lg:h-[30rem] flex items-center">

                        {/* Layer 1: The Video (Bottom) */}
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

                        {/* Layer 2: The SVG Stencil (Top) 
                        This SVG creates a wall of the background color (#E5E5E5)
                        but "cuts out" the text using a mask.
                    */}
                        <svg className="absolute inset-0 w-full h-full z-10" width="100%" height="100%">
                            <defs>
                                <mask id="hero-text-mask">
                                    {/* White pixel = Opaque (Show the wall) */}
                                    <rect width="100%" height="100%" fill="white" />

                                    {/* Black pixel = Transparent (Show the video) */}
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="black"
                                        className="font-black tracking-tighter text-6xl md:text-8xl lg:text-9xl"
                                        style={{ fontSize: '13vw' }} // Responsive SVG text
                                    >
                                        CULTURERA
                                    </text>
                                </mask>
                            </defs>

                            {/* The Wall: A solid rectangle matching the page background, 
                            with the 'text hole' punched into it. */}
                            <rect
                                width="100%"
                                height="100%"
                                fill="#E5E5E5"
                                mask="url(#hero-text-mask)"
                            />
                        </svg>
                    </div>

                    <div className="space-y-2 max-w-md text-zinc-600 font-mono text-xs md:text-sm">
                        <p>IMMERSE YOURSELF IN THE</p>
                        <p>FUTURE OF DIGITAL ART & CULTURE</p>
                        <p>EXPERIENCE THE UNIMAGINABLE</p>
                    </div>

                    <div className="mt-8">
                        <button className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
                            GET STARTED
                        </button>
                    </div>
                </div>

                {/* Right Column: Badges (Honeycmb/Staggered Grid) */}
                <div className="relative flex items-center justify-center p-6 md:p-12">
                    {/* Staggered Grid Layout - Mimicking the reference: 
                        3 Rows, solid grey rounded pills.
                        Row 1: 3 items
                        Row 2: 3 items (Offset)
                        Row 3: 2 items (Offset more)
                    */}
                    <div className="flex flex-col gap-3 md:gap-4 w-full max-w-xl">
                        {/* Row 1 */}
                        <div className="flex gap-3 md:gap-4 justify-end">
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-24 md:w-32 h-10 md:h-14 bg-[#BDBDBD] rounded-full" />
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-24 md:w-32 h-10 md:h-14 bg-[#BDBDBD] rounded-full" />
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-24 md:w-32 h-10 md:h-14 bg-[#A8A8A8] rounded-full" />
                        </div>
                        {/* Row 2 */}
                        <div className="flex gap-3 md:gap-4 justify-center md:justify-end md:pr-12">
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-28 md:w-36 h-10 md:h-14 bg-[#A8A8A8] rounded-full" />
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-28 md:w-36 h-10 md:h-14 bg-[#BDBDBD] rounded-full" />
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-28 md:w-36 h-10 md:h-14 bg-[#A8A8A8] rounded-full" />
                        </div>
                        {/* Row 3 */}
                        <div className="flex gap-3 md:gap-4 justify-center md:justify-end md:pr-24">
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-28 md:w-36 h-10 md:h-14 bg-[#BDBDBD] rounded-full" />
                            <GifBadge src="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4" className="w-28 md:w-36 h-10 md:h-14 bg-[#A8A8A8] rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
