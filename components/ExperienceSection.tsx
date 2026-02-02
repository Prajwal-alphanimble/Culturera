'use client';

import React from 'react';

export default function ExperienceSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-900 to-black">


            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
                {/* Circular Profile Image */}
                <div className="absolute left-8 top-1/4 md:left-16 lg:left-24">
                    <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl md:h-40 md:w-40 lg:h-48 lg:w-48">
                        {/* Placeholder - Replace with actual image */}
                        <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    </div>
                </div>

                {/* Main Headline */}
                <h2 className="mb-8 max-w-4xl font-serif text-5xl font-bold italic leading-tight tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
                    WHAT YOU
                    <br />
                    EXPERIENCE
                </h2>

                {/* Description */}
                <p className="max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
                    Culturera is your partner in creating unforgettable events. With years of industry experience, we
                    provide comprehensive event production services, including cutting-edge{' '}
                    <a href="#sound" className="text-amber-400 transition-colors hover:text-amber-300">
                        sound systems
                    </a>
                    , dazzling{' '}
                    <a href="#lighting" className="text-amber-400 transition-colors hover:text-amber-300">
                        lighting solutions
                    </a>
                    , and sturdy{' '}
                    <a href="#trussing" className="text-amber-400 transition-colors hover:text-amber-300">
                        trussing structures
                    </a>
                    . Our commitment to quality and innovation ensures every event is a resounding success.
                </p>
            </div>
        </section>
    );
}
