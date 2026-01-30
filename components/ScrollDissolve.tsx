'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Kampos, transitions } from 'kampos';

interface ScrollDissolveProps {
    image1: string;
    image2: string;
    video2?: string; // Optional video source
    noiseMap: string;
    scrollRange?: number;
    width?: number;
    height?: number;
    className?: string;
}

const ScrollDissolve: React.FC<ScrollDissolveProps> = ({
    image1,
    image2,
    video2,
    noiseMap,
    scrollRange = 1000,
    width = 1920,
    height = 1080,
    className,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const kamposRef = useRef<any>(null);
    const dissolveRef = useRef<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    // Initialize Kampos and load images/video
    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const init = async () => {
            try {
                const target = canvasRef.current;
                if (!target) return;

                // Load image helper
                const loadImage = (src: string) => {
                    return new Promise<HTMLImageElement>((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = () => resolve(img);
                        img.onerror = () => reject(new Error(`Failed to load: ${src}`));
                        img.src = src;
                    });
                };

                // Load video helper
                const loadVideo = (src: string) => {
                    return new Promise<HTMLVideoElement>((resolve, reject) => {
                        const video = document.createElement('video');
                        video.crossOrigin = 'anonymous';
                        video.loop = true;
                        video.muted = true;
                        video.playsInline = true;
                        video.autoplay = false; // Start paused

                        video.onloadeddata = () => {
                            video.play().then(() => resolve(video)).catch(reject);
                        };
                        video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
                        video.src = src;
                    });
                };

                // Load resources
                const [img1, media2, noiseImg] = await Promise.all([
                    loadImage(image1),
                    video2 ? loadVideo(video2) : loadImage(image2),
                    loadImage(noiseMap),
                ]);

                // Store video reference for cleanup
                if (video2 && media2 instanceof HTMLVideoElement) {
                    videoRef.current = media2;
                }

                // Create dissolve transition
                const dissolve = transitions.dissolve();
                dissolve.map = noiseImg;
                dissolve.to = media2;
                dissolve.progress = 0;

                dissolveRef.current = dissolve;

                // Initialize Kampos
                const kampos = new Kampos({
                    target,
                    effects: [dissolve],
                    plane: { width, height }
                });

                kampos.setSource({ media: img1, width, height });
                kamposRef.current = kampos;

                // Initial draw
                kampos.draw();
                setIsReady(true);

            } catch (err) {
                console.error('WebGL initialization failed:', err);
                setError('Failed to initialize transition');
            }
        };

        init();

        return () => {
            // Cleanup video
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = '';
                videoRef.current = null;
            }
            kamposRef.current?.destroy();
        };
    }, [image1, image2, video2, noiseMap, width, height]);

    // Handle scroll events
    useEffect(() => {
        if (!isReady || !kamposRef.current || !dissolveRef.current) return;

        let animationFrameId: number;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const progress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
            dissolveRef.current.progress = progress;
            // Don't call draw here - let the animation loop handle it
        };

        // Continuous rendering for video
        const animate = () => {
            if (kamposRef.current) {
                kamposRef.current.draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        // Initial call
        handleScroll();

        // Start animation loop (always, even without video for smooth dissolve)
        animate();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isReady, scrollRange]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div ref={containerRef} className={`fixed inset-0 ${className}`}>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="block w-full h-full object-cover"
            />
        </div>
    );
};

export default ScrollDissolve;
