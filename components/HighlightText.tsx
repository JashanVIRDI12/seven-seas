import Image from "next/image";
import { photos as library, type PhotoKey } from "@/data/photos";

/**
 * A statement with its key phrases underlined in red, as a marker would.
 * Phrases wrapped in [[ ]] get the stroke. With photos, two overlapping
 * frames sit beside it.
 */
export function HighlightText({
  text,
  label,
  photos,
}: {
  text: string;
  label: string;
  photos?: [PhotoKey, PhotoKey];
}) {
  const pieces = text.split(/(\[\[.+?\]\])/g).filter(Boolean);

  return (
    <section
      className={`hl-section section${photos ? " hl-with-photos" : ""}`}
      aria-label={label}
    >
      <div className="container hl-grid">
        <p className="hl-text">
          {pieces.map((piece, i) =>
            piece.startsWith("[[") ? (
              <span key={i} className="hl">
                {piece.slice(2, -2)}
              </span>
            ) : (
              piece
            ),
          )}
        </p>
        {photos && (
          <div className="hl-photos">
            {photos.map((key, i) => (
              <figure
                key={`${key}-${i}`}
                className={`hl-photo hl-photo-${i === 0 ? "a" : "b"}`}
              >
                <Image
                  src={library[key].src}
                  alt={library[key].alt}
                  style={{ objectPosition: library[key].focus }}
                  fill
                  sizes="(min-width: 1024px) 30vw, 60vw"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
