import Image from "next/image";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { Button } from "./Button";
import { ArrowUpRight, PhoneIcon } from "./Icons";

/** A static editorial spread: the message stays readable throughout the scroll. */
export function Statement() {
  const photo = photos.workshop;

  return (
    <section className="statement section" id="about" aria-labelledby="about-title">
      <div className="container statement-grid">
        <div className="statement-copy">
          <h2 id="about-title" className="statement-title">
            <span className="statement-title-lead">Your truck doesn’t make money</span>{" "}
            <span>sitting still.</span>
          </h2>
          <div className="statement-body">
            <p>
              Freight to deliver. A crew waiting. Another long stretch ahead.
              We know what’s riding on your truck.
            </p>
            <p>
              Call our Prince George team, tell us what’s happening, and we’ll
              talk through the next step for your truck or trailer.
            </p>
          </div>
          <div className="statement-actions">
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              Call the shop
            </Button>
            <Button href="/how-it-works" variant="ghost" icon={<ArrowUpRight />}>
              How a repair works
            </Button>
          </div>
        </div>
        <figure className="statement-photo">
          <div className="statement-photo-frame">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1600px) 1020px, (min-width: 900px) 72vw, (min-width: 640px) 115vw, 125vw"
              style={{ objectPosition: photo.focus }}
            />
          </div>
          <figcaption className="statement-caption">
            <p>Back to work starts here.</p>
            <span>Truck &amp; trailer repair</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
