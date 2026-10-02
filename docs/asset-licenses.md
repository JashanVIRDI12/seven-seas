# Image provenance and asset records

## Current imagery — October 3, 2026

All 16 active photographic assets were newly created with the built-in
image_gen tool at the client's request. They are AI-generated editorial
illustrations, not documentary photographs of Seven Sea's premises, staff,
equipment, customer vehicles, or specific geographic locations.

The set uses natural industrial lighting, white/navy/service-red equipment,
plausible workshop scenes, conifer forests, and northern road conditions.
No stock image downloads are used by the current pages or share previews.

Native PNG masters are retained in `assets/image-masters/`. Website files
are WebP, encoded with Sharp at quality 88 and effort 6. Native resolution
is preserved without upscaling. Next.js creates responsive delivery sizes.
Subject focus is centralized in `data/photos.ts`; complete prompts and
dimensions are recorded in `docs/image-prompts.json`. The public
`/photo-credits` page describes this provenance.

| Image | Website file | Native dimensions | File size |
| --- | --- | --- | --- |
| Highway freight | `/images/generated/convoy-v2.webp` | 1536 × 1024 | 322 KB |
| Diesel engine detail | `/images/generated/engine-detail-v2.webp` | 1672 × 941 | 383 KB |
| Heavy-duty tractor | `/images/generated/kenworth-v2.webp` | 1536 × 1024 | 258 KB |
| Northern highway | `/images/generated/northern-road-v2.webp` | 1672 × 941 | 421 KB |
| Repair bay | `/images/generated/workshop-v2.webp` | 1536 × 1024 | 297 KB |
| Technician at work | `/images/generated/mechanic-red-v2.webp` | 1536 × 1024 | 229 KB |
| Engine inspection | `/images/generated/truck-engine-v2.webp` | 1536 × 1024 | 235 KB |
| Wheel and hub service | `/images/generated/wheel-v2.webp` | 1536 × 1024 | 235 KB |
| Trailer at dusk | `/images/generated/reefer-v2.webp` | 1536 × 1024 | 208 KB |
| Winter reliability | `/images/generated/winter-v2.webp` | 1536 × 1024 | 356 KB |
| Trailer fabrication detail | `/images/generated/sparks-v2.webp` | 1024 × 1536 | 228 KB |
| Fleet equipment | `/images/generated/truck-row-v2.webp` | 1672 × 941 | 307 KB |
| Fleet yard | `/images/generated/fleet-yard-v2.webp` | 1672 × 941 | 273 KB |
| Working hands | `/images/generated/hands-v2.webp` | 1536 × 1024 | 184 KB |
| Heavy workshop tools | `/images/generated/wrenches-v2.webp` | 1536 × 1024 | 458 KB |
| Cylinder-head work | `/images/generated/cylinder-head-v2.webp` | 1024 × 1536 | 290 KB |

Open Graph and Twitter JPGs use the new highway image in a branded layout.

## Archived source records

The previous files and `public/images/original_backup/` were preserved.
The table below retains their earlier attribution records; those records
do not apply to the newly generated images. Prior stock-source assertions
for the old service images have not been independently reverified.

| Asset | Primary source | Licence | Changes |
| --- | --- | --- | --- |
| `convoy.webp` | [Pexels 2199293](https://www.pexels.com/photo/2199293/) | [Pexels licence](https://www.pexels.com/license/) | Resize to 1800px, WebP, responsive layout crops |
| `engine-detail.webp` | [Unsplash image](https://images.unsplash.com/photo-1486262715619-67b85e0b08d3) | [Unsplash licence](https://unsplash.com/license) | Resize to 1600px, WebP, layout crop, CSS desaturation |
| `kenworth.webp` | [2022 Kenworth W900L Studio Sleeper in White, Front Left, 04-21-2022](https://commons.wikimedia.org/wiki/File:2022_Kenworth_W900L_Studio_Sleeper_in_White,_Front_Left,_04-21-2022.jpg), Elise240SX | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Resize to 1400px, WebP, layout crops. Adaptation remains CC BY-SA 4.0 |
| `pine-pass-road.webp` | [Driving through Pine Pass in 2009](https://commons.wikimedia.org/wiki/File:Driving_through_Pine_Pass_in_2009.jpg), RyAwesome | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) | Crop lower 3500×1200 region, resize to 1800px, WebP, layout crops. Adaptation remains CC BY-SA 2.0 |
| `services/*.webp` (12 files) | Pexels; photographer and source for each are in `data/photos.ts` and on `/photo-credits` | [Pexels licence](https://www.pexels.com/license/) | Resize to 2000px (1800px for portrait), WebP |



## Fonts and native design assets

Bricolage Grotesque and Unbounded are self-hosted under the SIL Open Font
License 1.1; licence copies accompany their WOFF2 files in `public/fonts`.
The site mark, icons, truck glyph, and share-image typography are native
design assets.
