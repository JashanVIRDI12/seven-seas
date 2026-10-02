# Seven Sea visual system: red and blue

Revised 2026-10-02 at the client's request: red and blue theme, more polish,
and more engaging interaction drawn from Framer University and 21st.dev
components. Every component is rebuilt in GSAP so the site keeps one motion
engine; no Framer Motion or Tailwind was added.

## Color

| Token      | Hex       | Role                                               |
| ---------- | --------- | -------------------------------------------------- |
| Ink        | `#0A1633` | Text, services section, footer                     |
| Blue       | `#0A3D78` | Seven Sea blue: process section, trailer card      |
| Blue 2     | `#1D5BD6` | Links, focus on light, glow arc                    |
| Red        | `#E3262F` | Every action: buttons, call bar, CTA, progress     |
| Paper      | `#F3F5F9` | Page background                                    |
| Steel      | `#586378` | Secondary text on light (5.4:1)                    |
| Mist       | `#A9B4CA` | Secondary text on ink (8.4:1)                      |
| Blue soft  | `#C9D6EE` | Secondary text on blue (7.2:1)                     |

Red and blue flash together on a service truck's light bar; the preloader
beacon and the process truck use that motif. Red never sits directly on
saturated blue (it vibrates), so the road on the blue section is ink.

## Type

- **Bricolage Grotesque** (variable weight, width and optical size; OFL)
  sets every word. Its optical-size axis follows the font size
  automatically: at headline sizes the ink traps sharpen, at reading sizes
  the letters open up. Headlines run at weight 740–780 with −0.02 to
  −0.025em tracking; body at 420.
- **Unbounded** (variable weight; OFL) is reserved for the SEVEN SEA
  lettering: the hero plate, the nav logo it flies into, the footer and the
  preloader. Its wide forms read like a decal on a sleeper cab.
- Both are self-hosted WOFF2 files in `public/fonts`, loaded with
  `next/font/local`. Chosen from a side-by-side specimen against Hubot
  Sans, Syne, Funnel Display, Big Shoulders, Clash Display and Cabinet
  Grotesk; the last two were set aside because their ITF licence restricts
  passing the font files to a client.

## Page and component sources

| Section    | Behavior                                                   | Inspired by                                |
| ---------- | ---------------------------------------------------------- | ------------------------------------------ |
| Preloader  | Mark draws, beacon flashes red/blue, layered curtain lifts | Light bar motif                            |
| Hero       | Giant SEVEN SEA lettering flies into the nav logo          | Framer University, Animated Navigation Bar |
| Hero       | Photo card tilted back in 3D comes upright on scroll       | Aceternity / 21st.dev, Container Scroll    |
| Hero       | "Keep the [north/fleet/freight/rig] moving." letter roll   | 21st.dev Flip Words, Text Roll             |
| Ticker     | Two crossing tapes, velocity speed, direction and skew     | Framer University Ticker; Scroll Velocity  |
| Statement  | "make [photo] money": the line parts to show a truck       | Framer text-image reveal                   |
| Services   | One photo splits into three panels that flip to cards      | Framer University, 3D Image Split Scroll   |
| Services   | Phones and tablets: sticky cards that sink as next arrives | 21st.dev Stacking Cards                    |
| Diagnosis  | Lens over the truck shows the engine in a blueprint tint   | Framer University, X-Ray Hover Reveal      |
| Process    | Winding road drawn in red; the truck follows the curve     | Framer University, Animate Path on Scroll  |
| Process    | Phones: rail that fills red to white                       | Aceternity Tracing Beam                    |
| Location   | Border arc that turns to face the pointer                  | Aceternity / 21st.dev Glowing Effect       |
| Location   | Rating and clock on odometer reels; GPS digits decode      | 21st.dev Number Ticker / Sliding Number    |
| Buttons    | Fill grows from the pointer's entry point; label roll      | Framer University directional hover        |
| CTA        | Copy number with confirmation, for desk-based callers      | Framer University, Click to Copy           |
| Footer     | Letters lift in a wave around the pointer                  | Framer University, Text Lift on Hover      |

## Inner pages: services, about, how it works, contact

The client found the first services design too "SaaS" and later too
animated. The inner pages are now photographic and deliberately calm:
large workshop and road imagery, bold type, and almost no
motion. All 16 images were recreated with built-in image generation on
October 3, 2026: natural daylight, believable heavy-duty equipment, navy
workwear, restrained service red, and northern forest and industrial context.
The scenes are illustrative, with that provenance stated on `/photo-credits`.
Images and their crop focus live in `data/photos.ts`; service
copy lives in `data/services.ts` and stays within verified facts.

| Page               | Sections                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `/services`        | Photo hero with jump links; three service chapters (paper, navy, red); lettering cut from a photo; call panel |
| `/services/[slug]` | Photo hero; statement with red marker underlines and a photo pair; "What to tell us" photo cards; mosaic with a red call tile; other services as photo cards; FAQ; call panel |
| `/about`           | Photo hero; statement; facts band (rating, scope, place, coordinates); "How we work" photo cards; mosaic; call panel |
| `/how-it-works`    | Photo hero; the four repair steps on a red-to-blue rail, each with a photograph and its practical piece (checklist, phone, address and directions, call); FAQ; call panel |
| `/contact`         | Photo hero; call card with copy button; visit card with Google Maps; live Prince George clock with "call ahead" note; checklist; FAQ |

Service slugs are statically generated; unknown slugs return 404.

## Motion rules

- Two eases: `ss-out` (0.16, 1, 0.3, 1) and `ss-inout` (0.76, 0, 0.24, 1).
- The home page carries the motion: two pins, both only at
  `(min-width: 1024px) and (min-height: 680px)` (the services split and the
  road). Inner pages are limited to heading reveals, hover feedback, the
  shared call panel and the page-transition curtain.
- The navigation turns white while it sits over a dark hero photograph.
- Pointer effects only on `(hover: hover) and (pointer: fine)`.
- Reduced motion: no Lenis, pins, preloader or rolls; a fixed X-ray lens;
  everything visible. Without JavaScript every section and link works.
- Every animation is created inside `useGSAP` / `gsap.matchMedia()` and
  reverted on unmount or breakpoint change.

## Interaction

44px targets, visible focus (blue on light, white on dark), keyboard focus
on an unflipped home service card scrolls to its flipped state, real `tel:`
links, a copy-number button for desk callers, and a mobile call bar that
steps aside on the contact panel. The nav marks the current page with
`aria-current`.
