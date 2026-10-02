import Image from "next/image";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { Button } from "./Button";
import { PhoneIcon } from "./Icons";

export function AboutIntro() {
  return (
    <section
      id="our-approach"
      className="about-intro section"
      aria-labelledby="about-approach-title"
    >
      <div className="container">
        <div className="about-intro-head">
          <h2 id="about-approach-title" className="about-intro-title">
            <span>Straight talk.</span>{" "}
            <span>Heavy-duty work.</span>
          </h2>
          <div className="about-intro-copy">
            <p>
              A stopped truck puts more than a load on hold. It affects the
              people, schedules, and work that depend on it.
            </p>
            <p>
              Our Prince George team starts with a conversation: what’s
              happening, whether we can take it on, and when you can bring
              your truck or trailer in.
            </p>
          </div>
        </div>

        <div className="about-intro-gallery">
          <figure className="about-intro-main">
            <div className="about-intro-main-photo">
              <Image
                src={photos.mechanicRed.src}
                alt={photos.mechanicRed.alt}
                fill
                sizes="(min-width: 1600px) 940px, (min-width: 900px) 66vw, 125vw"
                style={{ objectPosition: photos.mechanicRed.focus }}
              />
            </div>
            <figcaption>The work behind the next mile.</figcaption>
          </figure>

          <div className="about-intro-detail">
            <figure className="about-intro-detail-photo">
              <Image
                src={photos.hands.src}
                alt={photos.hands.alt}
                fill
                sizes="(min-width: 1600px) 480px, (min-width: 900px) 34vw, 60vw"
                style={{ objectPosition: photos.hands.focus }}
              />
            </figure>
            <div className="about-intro-next">
              <h3>Start with a conversation.</h3>
              <p>
                Tell us the make, the symptoms, and where the truck is now.
                We’ll talk through the next step.
              </p>
              <Button href={business.phoneHref} icon={<PhoneIcon />}>
                Call the shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
