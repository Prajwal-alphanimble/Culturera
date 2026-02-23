import HeroSection from '@/components/HeroSection';
import ExperienceCarouselSection from '@/components/ExperienceCarouselSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import AboutUsSection from '@/components/AboutUsSection';
import ContactSection from '@/components/ContactSection';
import Image from 'next/image';
import { SlideData } from '@/components/ScrollCarousel';

// Carousel slide data
const carouselSlides: SlideData[] = [
  {
    visual: (
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <Image src="/actual/sounds.avif" alt="Sound Systems" fill className="object-cover" />
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
        <Image src="/actual/lighting.jpg" alt="Lighting Solutions" fill className="object-cover" />
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
        <Image src="/actual/stage.jpg" alt="Stage Production" fill className="object-cover" />
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
        <Image src="/actual/event.jpg" alt="Event Management" fill className="object-cover" />
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
        <Image src="/actual/visual.jpg" alt="Visual Effects" fill className="object-cover" />
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

      {/* Experience + Carousel Section (Merged) */}
      <ExperienceCarouselSection slides={carouselSlides} />

      {/* What We Do Section */}
      <WhatWeDoSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Spacer for additional content */}
      <div className="h-20 bg-black" />
    </div>
  );
}

