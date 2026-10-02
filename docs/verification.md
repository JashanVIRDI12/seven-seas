# Verification: red and blue revision

Run on 2026-10-02 against a production build (`next start`, port 3100),
installed Google Chrome, headless.

| Check                                   | Result                          |
| --------------------------------------- | ------------------------------- |
| `npm run typecheck`                     | Pass                            |
| `npm run lint`                          | Pass                            |
| `npm run build`                         | Pass, all routes static         |
| `npm run test:browser`                  | Pass                            |
| Viewports                               | 1440×1000, 1440×900, 1280×720,  |
|                                         | 1024×768, 768×1024, 390×844,    |
|                                         | 360×800, 320×640                |
| Horizontal overflow                     | None at any viewport            |
| axe (WCAG 2.1 A/AA), home + 3 pages     | 0 violations                    |
| Console errors                          | None                            |
| Pins                                    | 2 at ≥1024 wide and ≥680 tall   |
|                                         | (services split, road); 0 on    |
|                                         | tablet portrait, phones,        |
|                                         | reduced motion and no-JS        |
| Pins on resize                          | Removed at 640 tall and on      |
|                                         | mobile, restored when tall      |
| Intro                                   | Shows on first visit, releases  |
|                                         | scrolling, skipped on reload    |
| Mobile menu                             | Enter opens, Escape closes and  |
|                                         | returns focus, links navigate   |
| Content hidden by animation             | None after scrolling the page   |
| Reduced motion and no JavaScript        | Complete static page            |
| Inner pages (7) × desktop, 390, 320,    | 200, no overflow, nothing left  |
| reduced motion                          | hidden, 0 axe violations, no    |
|                                         | console errors                  |
| Unknown service slug                    | 404                             |
| Page transitions                        | Cover, navigate, lift; scroll   |
|                                         | released; hash targets and back |
|                                         | button work                     |

Issues found and fixed during review:

- `next/image` rejects a width override with `fill`; the services photo
  slices use a positioned wrapper instead.
- The hero lettering measured 10.6% wider than its container at 15.6cqi;
  it is now 14cqi, and the tagline fades while the lettering flies over it.
- The hero card's call buttons sat below the fold at 900px tall; the card
  height now fits the first screen, and on phones it stops above the call
  bar (whose button replaces the card's duplicate).
- Dimmed statement lines start at 50% opacity, keeping large text at 3:1.
- Stacking cards on phones dimmed as soon as the next card peeked in; they
  now sink back only as the next card covers them.
- Wide screens without the 3D sequence show the three service cards in a
  row instead of a single column.

Service pages, found and fixed in review:

- The Flowing Menu marquee stayed off-screen: a CSS resting transform
  stacked with GSAP's `yPercent`. GSAP now takes over the offset.
- Long words in the proximity headings could wrap inside themselves (each
  letter is its own box), leaving an empty line; words are now unbreakable
  and the mobile size fits "Owner-operators" at 320px.
- The work-order ticket's tilt and stamp poked past the edge on phones.

Screenshots are written to `test-results/` (ignored by git).

## Image replacement audit — October 3, 2026

All 16 active photographic assets were recreated with built-in image_gen,
visually inspected, and installed through `data/photos.ts`. Native PNG
masters are preserved in `assets/image-masters/`; optimized WebPs total
approximately 4.6 MiB. The full prompts and native dimensions are in
`docs/image-prompts.json`. Both 1200 × 630 social previews use the new
highway image. Current credits describe the set as AI-created illustrations.

- Lint, TypeScript, and the production build passed.
- Nine routes checked at 1440px, 390px, and 320px: every image loaded,
  all 16 unique replacements were used, and no legacy image references,
  horizontal overflow, or page errors were found.
- Production checks at desktop and mobile widths passed for the same
  nine routes, with zero axe WCAG A/AA violations.
- The animated desktop home page retained its two existing pins and
  produced no runtime errors while scrolling through every section.
- Desktop and mobile hero, service-spread, and share-image crops were
  visually inspected. Mobile hero delivery sizes were increased to match
  the height of their cover crops; the technician and fleet subjects were
  reframed to remain visible on phones.

Evidence: `test-results/images/checks.json`,
`test-results/images/production-checks.json`, and the adjacent screenshots.

## Home-page statement redesign — October 3, 2026

The former split-word image capsule is replaced with a static editorial
spread: full workshop imagery, left-aligned headline, practical local copy,
direct call action, and a link to `/how-it-works`. The component renders
without client-side animation, so neither the words nor the image depends
on scroll progress. Legacy statement animation and styles were removed.

- Lint and production build (including TypeScript) passed.
- Production browser checks passed at 1440, 1024, 768, 390, and 320px,
  plus 844px landscape, reduced motion, and JavaScript disabled.
- No image-loading errors, horizontal overflow, or page exceptions.
- All seven scripted scenarios returned zero scoped axe WCAG A/AA
  violations; the no-JavaScript scenario was checked visually and for
  content, image loading, and link targets.
- Both links have 56px touch targets. Keyboard focus has a visible
  outline, the configured telephone is correct, and the process link
  successfully navigates to `/how-it-works`.
- The existing two desktop pins remain intact. An existing animated
  call-panel overflow on tablets was contained with `overflow: clip`.

Screenshots and results: `test-results/statement/verification.json` and
the adjacent `*-final.png` files.

## About introduction redesign — October 3, 2026

The large highlighted paragraph and overlapping photographs were replaced
with a dedicated server-rendered introduction: a two-line headline,
supporting paragraphs, aligned workshop and detail photography, and a
direct telephone action. Phone and tablet layouts stack with one photograph.

- Lint and production build, including TypeScript, passed.
- Production checks passed at 1440, 1024, 768, 390, and 320px, plus
  844px landscape, reduced motion, and JavaScript disabled.
- Both headline lines fit at every checked width. Visible photographs
  loaded successfully, with no horizontal overflow or browser errors.
- Seven scripted scenarios returned zero scoped axe WCAG A/AA violations;
  the no-JavaScript scenario retained the full content and working link.
- The telephone matches business configuration. Its button has a 56px
  touch target and a visible keyboard focus outline.
- Desktop, tablet, and phone crops and the section beneath the actual
  fixed navigation were visually reviewed.

Evidence: `test-results/about-intro/verification.json` and the adjacent
`*-final.png` and `*-in-page.png` screenshots.
