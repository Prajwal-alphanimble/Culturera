import HeroSection from '@/components/HeroSection';
import ExperienceCarouselSection from '@/components/ExperienceCarouselSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import SectionTransition from '@/components/SectionTransition';
import Image from 'next/image';
import { SlideData } from '@/components/ScrollCarousel';

// Carousel slide data
const carouselSlides: SlideData[] = [
  {
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <Image src="/carousel-1.png" alt="Sound Systems" fill className="object-cover" />
      </div>
    ),
    title: "Sound Systems",
    subtitle: "Crystal Clear Audio",
    description: "Experience unparalleled sound quality with our state-of-the-art speaker systems. From intimate gatherings to massive festivals, we deliver audio perfection.",
    metadata: "Audio · Professional"
  },
  {
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <Image src="/carousel-2.png" alt="Lighting Solutions" fill className="object-cover" />
      </div>
    ),
    title: "Lighting Design",
    subtitle: "Illuminate Your Vision",
    description: "Transform any venue with our cutting-edge lighting solutions. From moving heads to LED walls, we create atmospheres that leave lasting impressions.",
    metadata: "Lighting · LED"
  },
  {
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <Image src="/carousel-3.png" alt="Stage Production" fill className="object-cover" />
      </div>
    ),
    title: "Stage Production",
    subtitle: "Built to Impress",
    description: "Our robust trussing and staging solutions provide the foundation for spectacular events. Safety, reliability, and visual impact—all in one package.",
    metadata: "Stage · Structure"
  },
  {
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <Image src="/carousel-4.png" alt="Event Management" fill className="object-cover" />
      </div>
    ),
    title: "Event Management",
    subtitle: "Seamless Execution",
    description: "From concept to completion, our experienced team handles every detail. Relax and enjoy while we bring your vision to life flawlessly.",
    metadata: "Events · Full Service"
  },
  {
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <Image src="/carousel-5.png" alt="Visual Effects" fill className="object-cover" />
      </div>
    ),
    title: "Visual Effects",
    subtitle: "Sensory Spectacle",
    description: "Fog machines, lasers, confetti, and pyrotechnics—we add the wow factor that transforms ordinary events into unforgettable experiences.",
    metadata: "Effects · Atmosphere"
  },
];

export default function Home() {
  return (
    <div className="relative bg-black">
      {/* Hero Section */}
      <HeroSection />

      {/* Transition: Hero (light gray) → Experience (dark purple/slate) */}
      <SectionTransition
        fromColor="#E5E5E5"
        toColor="#18181b"
        height="30vh"
      />

      {/* Experience + Carousel Section (Merged) */}
      <ExperienceCarouselSection slides={carouselSlides} />

      {/* Transition: Experience (purple) → What We Do (black) */}
      <SectionTransition
        fromColor="#3b0764"
        toColor="#000000"
        height="20vh"
      />

      {/* What We Do Section */}
      <WhatWeDoSection />

      {/* Spacer for additional content */}
      <div className="h-screen bg-black" />
    </div>
  );
}


