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
            <span>Got A Problem?</span>{" "}
            <span>We Have A Solution.</span>
          </h2>
          <div className="about-intro-copy">
            <p>
              Seven Sea provides heavy-duty truck and trailer repair in Prince
              George, BC. We work with the people behind the equipment, from
              owner-operators earning their living on the road to fleet managers
              coordinating the day’s deliveries.
            </p>
            <p>
              Our approach starts with listening. We want to know what you’ve
              noticed, what needs attention, and what your schedule looks like.
              From there, we discuss the repair needs and make a plan to bring
              your equipment into the shop.
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
            <figcaption>Your Next Haul Starts Here.</figcaption>
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
              <h3>Talk to Our Team</h3>
              <p>
                Tell us what’s wrong with your truck or trailer. We’ll help you
                plan the next step.
              </p>
              <Button href={business.phoneHref} icon={<PhoneIcon />}>
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
