import Image from "next/image";
import { photos, type PhotoKey } from "@/data/photos";
import { RevealHeading } from "./RevealHeading";

/** A heading and a row of photo cards, each a label, a title and a line. */
export function PhotoCards({
  id,
  title,
  lede,
  items,
}: {
  id: string;
  title: string;
  lede?: string;
  items: { photo: PhotoKey; label: string; title: string; text: string }[];
}) {
  return (
    <section className="pc section" aria-labelledby={id}>
      <div className="container">
        <header className="section-head">
          <RevealHeading id={id} className="display">
            {title}
          </RevealHeading>
          {lede && <p className="section-lede">{lede}</p>}
        </header>
        <ul className="pc-grid">
          {items.map((item) => (
            <li key={item.title} className="pc-card">
              <figure className="pc-photo">
                <Image
                  src={photos[item.photo].src}
                  alt={photos[item.photo].alt}
                  style={{ objectPosition: photos[item.photo].focus }}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </figure>
              <div className="pc-body">
                <span className="pc-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
