'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamically import DissolveTransition to ensure client-side only (no SSR)
const DissolveTransition = dynamic(
    () => import('@/components/DissolveTransition'),
    { ssr: false }
);

export default function DissolveDemoPage() {
    const [key, setKey] = useState(0);

    const handleRestart = () => {
        setKey((prev) => prev + 1);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
            <h1 className="mb-8 text-2xl font-bold">Ultra-light WebGL Dissolve Demo</h1>

            <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl">
                <DissolveTransition
                    key={key}
                    image1="/images/image1.png"
                    image2="/images/image2.png"
                    noiseMap="/images/noise.png"
                    duration={2500}
                    onComplete={() => console.log('Transition complete')}
                />
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={handleRestart}
                    className="rounded bg-white px-6 py-2 text-black transition hover:bg-zinc-200 active:scale-95"
                >
                    Replay Transition
                </button>
            </div>

            <div className="mt-8 max-w-lg text-center text-sm text-zinc-500">
                <p>
                    Powered by <strong>kampos</strong> (~4KB gzipped).
                    <br />
                    Optimized for static export and mobile performance.
                </p>
            </div>
        </main>
    );
}
