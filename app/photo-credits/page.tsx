import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { photos } from "@/data/photos";
import { Button } from "@/components/Button";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Image credits",
  alternates: { canonical: canonical("/photo-credits") },
};

export default function Credits() {
  return (
    <main id="main" className="doc-page">
      <p className="doc-kicker">Image credits</p>
      <h1>The road, in focus.</h1>
      <p>
        This website uses AI-created editorial imagery, made for Seven Sea on
        October 3, 2026. The scenes illustrate heavy-duty trucking and repair
        work. They do not depict Seven Sea’s actual premises, employees,
        equipment, or customer vehicles, or document a specific road or place.
      </p>
      <p>
        All 16 images were created with the built-in image generation tool and
        optimized as WebP files. Layout crops and the blue engine-detail
        treatment adapt them for the website.
      </p>
      <ul className="credit-list">
        {Object.values(photos).map((photo) => (
          <li key={photo.src}>
            <span>{photo.title}</span>
            <span>
              {photo.provenance} · <a href={photo.src}>View image</a>
            </span>
          </li>
        ))}
      </ul>
      <Button href="/" variant="navy" icon={<ArrowUpRight />}>
        Back to Seven Sea
      </Button>
    </main>
  );
}
