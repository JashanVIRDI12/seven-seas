import { photos, type PhotoKey } from "@/data/photos";

/** Giant lettering cut out of a photograph. */
export function ImageType({ text, photo }: { text: string; photo: PhotoKey }) {
  return (
    <section className="it">
      <div className="container it-inner">
        <p
          className="it-text"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 22, 51, 0.15), rgba(10, 22, 51, 0.15)), url(${photos[photo].src})`,
            backgroundPosition: photos[photo].focus,
          }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}
