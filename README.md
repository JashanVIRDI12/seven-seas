# Seven Sea Truck & Trailer Repair

A premium, interactive red-and-blue website for Seven Sea in Prince George,
BC. Next.js App Router, TypeScript, self-hosted Bricolage Grotesque and
Unbounded,
GSAP (ScrollTrigger, SplitText, DrawSVG, MotionPath, ScrambleText,
CustomEase) and Lenis smooth scrolling. Components are GSAP rebuilds of
Framer University and 21st.dev patterns (see DESIGN.md). Two pinned
sequences on wide screens, complete static mobile, reduced-motion and
no-JavaScript experiences, and direct phone booking.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview, run `npm run build`, then
`npm start`.

## Content and domain

- `data/business.ts` holds verified contacts, the Google rating, and confirmed
  truck/trailer repair categories. Unknown email and weekly hours remain null.
- `docs/business-contact-sources.md` records the Google listing and directory
  address discrepancy. The site uses the directly observed Google address.
- No production domain has been selected. Copy `.env.example` to `.env.local`
  and set `NEXT_PUBLIC_SITE_URL` to the final origin when available. Rebuild to
  enable absolute canonical URLs and populate the sitemap. Until then, canonical
  URLs are omitted and `/sitemap.xml` contains no invented addresses. Social
  image URLs use the local preview origin during local development.
- No genuine review text, full weekly schedule, emergency availability, or
  additional repair capabilities were supplied. The site does not invent them.
- No original logo or company photographs were present. The road-built seven
  with an amber beacon is a new design asset. All 16 editorial images were
  recreated with built-in image generation on October 3, 2026. They illustrate
  trucking and repair work; they do not depict the actual business or staff.

## Structure

- `app/page.tsx` composes the home page sections in `components/`.
- `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/about/page.tsx`,
  `app/how-it-works/page.tsx` and `app/contact/page.tsx` are the inner pages. Service copy is in
  `data/services.ts`; every image, description, and crop focus is in `data/photos.ts`.
- `public/images/generated/` contains the 16 optimized WebP replacements.
  `assets/image-masters/` retains native PNG masters; `docs/image-prompts.json`
  records the complete prompts and generated dimensions.
- `node scripts/generate-share-image.mjs` rebuilds both social previews from
  the generated highway image, self-hosted fonts, and configured phone number.
- `data/content.ts` holds navigation, process steps and FAQ copy.
- `lib/motion.ts` registers GSAP plugins, the two site eases and the shared
  media queries. `lib/scroll.ts` wraps Lenis; `lib/intro.ts` coordinates the
  once-per-session intro with the hero; `lib/useGlow.ts` drives the card
  border glow.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test:browser
```

The browser test uses installed Google Chrome on macOS. Override `CHROME_PATH`
for another Chromium executable and `TEST_ORIGIN` for a different preview URL.
It checks responsive layouts, keyboard menu behavior, image loads, local links,
the once-per-session intro, pin rules and cleanup on resize, content left hidden
by animation, reduced motion, no JavaScript, console errors, and axe
accessibility. Run it against a production server (`npm run build`, then
`npx next start --port 3100` and `TEST_ORIGIN=http://localhost:3100`).
Screenshots and JSON evidence go into the ignored `test-results/` directory.

## Design and sources

`PRODUCT.md`, `DESIGN.md`, and `BRIEF.md` record the supplied direction and
implementation decisions. `docs/verification.md` records the final audit.
Image provenance and archived source records are documented in
`docs/asset-licenses.md`; the public `/photo-credits` page identifies the
current imagery as AI-created. The Bricolage Grotesque and
Unbounded licences (SIL OFL 1.1) accompany their WOFF2 files.

No analytics, tracking pixels, contact forms, or third-party map embeds are
included. The contact and booking flows open the phone app or Google Maps.
