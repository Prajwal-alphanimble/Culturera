import ScrollCarousel, { SlideData } from '@/components/ScrollCarousel';
import Image from 'next/image';

export default function CarouselPage() {
    const slides: SlideData[] = [
        {
            visual: (
                <div className="w-full h-full relative overflow-hidden rounded-3xl">
                    <Image
                        src="/carousel-1.png"
                        alt="Abstract geometric waves"
                        fill
                        className="object-cover"
                    />
                </div>
            ),
            title: "Vibrant Waves",
            subtitle: "Abstract Geometry",
            description: "Experience the flow of color and form as vibrant waves cascade across the canvas. This abstract composition explores the intersection of geometry and organic movement, creating a mesmerizing visual rhythm.",
            metadata: "Digital Art · 2024"
        },

        {
            visual: (
                <div className="w-full h-full relative overflow-hidden rounded-3xl">
                    <Image
                        src="/carousel-2.png"
                        alt="Sunset mountain landscape"
                        fill
                        className="object-cover"
                    />
                </div>
            ),
            title: "Mountain Sunset",
            subtitle: "Nature's Canvas",
            description: "As the sun dips below the horizon, the mountains stand in silent majesty. Warm hues paint the sky in shades of amber and rose, reflecting the timeless beauty of the natural world.",
            metadata: "Landscape · Minimalist"
        },

        {
            visual: (
                <div className="w-full h-full relative overflow-hidden rounded-3xl">
                    <Image
                        src="/carousel-3.png"
                        alt="Cyberpunk cityscape"
                        fill
                        className="object-cover"
                    />
                </div>
            ),
            title: "Neon City",
            subtitle: "Future Vision",
            description: "Step into a world where technology and humanity collide. Neon lights illuminate rain-slicked streets in this cyberpunk metropolis, where every corner tells a story of tomorrow.",
            metadata: "Cyberpunk · Urban"
        },

        {
            visual: (
                <div className="w-full h-full relative overflow-hidden rounded-3xl">
                    <Image
                        src="/carousel-4.png"
                        alt="Tropical beach paradise"
                        fill
                        className="object-cover"
                    />
                </div>
            ),
            title: "Beach Paradise",
            subtitle: "Tropical Escape",
            description: "Crystal clear waters meet golden sands beneath swaying palms. This tropical haven offers a moment of tranquility, where time slows and the worries of the world fade away.",
            metadata: "Travel · Paradise"
        },

        {
            visual: (
                <div className="w-full h-full relative overflow-hidden rounded-3xl">
                    <Image
                        src="/carousel-5.png"
                        alt="Northern lights aurora"
                        fill
                        className="object-cover"
                    />
                </div>
            ),
            title: "Aurora Borealis",
            subtitle: "Celestial Dance",
            description: "Witness nature's most spectacular light show as the aurora borealis dances across the Arctic sky. Green and purple ribbons of light weave through the stars, creating magic in the frozen wilderness.",
            metadata: "Nature · Phenomenon"
        },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <ScrollCarousel slides={slides} />
        </div>
    );
}
