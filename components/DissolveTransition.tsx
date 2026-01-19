'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Kampos, effects, transitions, noise } from 'kampos';

interface DissolveTransitionProps {
    image1: string;
    image2: string;
    noiseMap?: string;
    duration?: number;
    width?: number;
    height?: number;
    className?: string;
    onComplete?: () => void;
}

const DissolveTransition: React.FC<DissolveTransitionProps> = ({
    image1,
    image2,
    noiseMap,
    duration = 2000,
    width = 1920,
    height = 1080,
    className,
    onComplete,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        let kampos: any | null = null;
        let animationFrameId: number;
        let startTime: number | null = null;

        const init = async () => {
            try {
                const target = canvasRef.current;
                if (!target) return;

                // Load images first
                const loadImage = (src: string) => {
                    return new Promise<HTMLImageElement>((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = () => resolve(img);
                        img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
                        img.src = src;
                    });
                };

                const [img1, img2, noiseImg] = await Promise.all([
                    loadImage(image1),
                    loadImage(image2),
                    noiseMap ? loadImage(noiseMap) : Promise.resolve(null),
                ]);

                // Create dissolve transition
                const dissolve = transitions.dissolve();

                if (noiseImg) {
                    dissolve.map = noiseImg;
                }
                dissolve.to = img2;

                // Initialize Kampos with the effect
                kampos = new Kampos({
                    target,
                    effects: [dissolve],
                    plane: { width, height }
                });

                // Set source
                kampos.setSource({ media: img1, width, height });

                // Animation loop
                const animate = (timestamp: number) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1.0);

                    dissolve.progress = progress;

                    if (kampos) {
                        kampos.draw();
                    }

                    if (progress < 1.0) {
                        animationFrameId = requestAnimationFrame(animate);
                    } else {
                        if (onComplete) onComplete();
                    }
                };

                animationFrameId = requestAnimationFrame(animate);

            } catch (err) {
                console.error('WebGL implementation failed:', err);
                setError('Failed to initialize transition');
            }
        };

        init();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            kampos?.destroy();
        };
    }, [image1, image2, noiseMap, duration, width, height, onComplete]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="block w-full h-full object-cover"
            />
        </div>
    );
};

export default DissolveTransition;
