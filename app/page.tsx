import ScrollDissolveWrapper from '@/components/ScrollDissolveWrapper';


export default function Home() {
  return (
    <div className="relative min-h-[200vh] bg-black">
      {/* Fixed Scroll-Driven Dissolve Background */}
      <ScrollDissolveWrapper
        image1="/images/image1.png"
        image2="/images/image2.png"
        video2="/images/VJ_LOOP_FREE_VJ_LOOPS_VJ_LOOP_FOR_VJ_DJ_LED_VISUALS_FREE_VISUALS_4K_1080_1080P.mp4"
        noiseMap="/images/gradient-noise.png"
        scrollRange={1000}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        <main className="flex min-h-screen w-full max-w-7xl mx-auto flex-col items-center justify-center px-6 py-20 text-center">
          {/* Tagline */}
          <p className="mb-8 text-sm font-medium uppercase tracking-widest text-zinc-400">
            ✦ Professional Event Production
          </p>

          {/* Main Headline */}
          <h1 className="mb-6 max-w-5xl text-6xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            Create Unforgettable Moments
          </h1>

          {/* Description */}
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Transform your vision into reality with cutting-edge sound systems,
            dazzling lighting solutions, and seamless event production.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#services"
              className="pointer-events-auto rounded-sm bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all hover:bg-zinc-200"
            >
              Explore Our Services
            </a>
            <a
              href="#events"
              className="pointer-events-auto rounded-sm border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10"
            >
              View Recent Events →
            </a>
          </div>
        </main>
      </div>

      {/* Spacer for scroll effect */}
      <div className="h-screen"></div>
    </div>
  );
}
