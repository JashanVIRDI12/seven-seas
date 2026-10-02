import Image from "next/image";
import { business } from "@/data/business";
import { photos, type PhotoKey } from "@/data/photos";
import { PhoneIcon } from "./Icons";

/** A photo mosaic with one red tile of type that calls the shop. */
export function Mosaic({
  keys,
  line,
}: {
  keys: [PhotoKey, PhotoKey, PhotoKey, PhotoKey];
  line: string;
}) {
  return (
    <section className="mo" aria-label="Photographs">
      <div className="container mo-grid">
        {keys.map((key, i) => (
          <figure key={`${key}-${i}`} className={`mo-frame mo-${i}`}>
            <Image
              src={photos[key].src}
              alt={photos[key].alt}
              style={{ objectPosition: photos[key].focus }}
              fill
              sizes={i === 3 ? "100vw" : "(min-width: 1024px) 40vw, 100vw"}
            />
          </figure>
        ))}
        <a className="mo-tile" href={business.phoneHref}>
          <span className="mo-line">{line}</span>
          <span className="mo-call">
            <span className="icon-chip">
              <PhoneIcon />
            </span>
            {business.phoneDisplay}
          </span>
        </a>
      </div>
    </section>
  );
}
