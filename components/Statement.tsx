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
            <span className="statement-title-lead">Your Next Haul</span>{" "}
            <span>Starts Here.</span>
          </h2>
          <div className="statement-body">
            <p>
              Truck and trailer repair in Prince George, BC. Seven Sea helps you
              handle repair needs and get your equipment ready for the work ahead.
            </p>
            <p>
              Tell us what’s wrong with your truck or trailer. We’ll help you
              plan the next step.
            </p>
          </div>
          <div className="statement-actions">
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              Call the Shop
            </Button>
            <Button href="/services" variant="ghost" icon={<ArrowUpRight />}>
              Explore Our Services
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
            <p>Your Next Haul Starts Here.</p>
            <span>Truck &amp; Trailer Repair</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
