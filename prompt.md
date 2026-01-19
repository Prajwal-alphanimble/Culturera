You are an expert WebGL/Next.js performance engineer.
User site: static-export Next.js (no SSR runtime).
Goal: add a single, ultra-light dissolve transition (image-to-image) that ships < 10 kB gzip and runs 60 fps on 4-year-old phones.
Before you write a single line of code:
Open the following URLs with your anti-gravity browsing skill and ingest the latest docs / source:
https://github.com/metehus/kampos
https://github.com/oframe/ogl/tree/master/examples/post-processing
https://github.com/pmndrs/postprocessing (look for “glsl-transition” or “dissolve” pass)
Compare the current bundle sizes, draw-call counts and mobile benchmarks reported in those repos (do NOT rely on old data).
Recommend the single most efficient library for a static Next.js site that must survive next export.
Then provide a complete, copy-pasteable Next.js page (TypeScript, App Router) that:
imports only the chosen library,
preloads the two images and an optional noise map,
triggers the dissolve once on mount,
total client-side JS ≤ 12 kB brotli,
no hydration errors,
no server WebGL code.
Show the exact npm i command, the next.config.js (if any), and the final next build && next export output size.
Do NOT invent version numbers or bundle sizes—quote only what you just fetched.
