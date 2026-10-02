import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/data/business";
import { checklist, stepPages, steps } from "@/data/content";
import { photos } from "@/data/photos";
import { canonical } from "@/lib/site";
import { PhotoHero } from "@/components/PhotoHero";
import { RevealHeading } from "@/components/RevealHeading";
import { Faq } from "@/components/Faq";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/Button";
import {
  ArrowDown,
  ArrowUpRight,
  CheckIcon,
  PhoneIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How a repair with Seven Sea works, from the first phone call to your truck back on the road. Heavy-duty truck and trailer repair in Prince George, BC.",
  alternates: { canonical: canonical("/how-it-works") },
};

/** The extra, practical piece each step carries. */
function StepExtra({ index }: { index: number }) {
  if (index === 0)
    return (
      <ul className="hw-list">
        {checklist.map((item) => (
          <li key={item}>
            <span className="hw-check" aria-hidden="true">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>
    );
  if (index === 1)
    return (
      <Button href={business.phoneHref} variant="navy" icon={<PhoneIcon />}>
        {business.phoneDisplay}
      </Button>
    );
  if (index === 2)
    return (
      <div className="hw-place">
        <address>
          {business.address}
          <br />
          {business.city}, {business.provinceCode} {business.postalCode}
        </address>
        <Button
          href={business.googleMapsUrl}
          external
          variant="ghost"
          icon={<ArrowUpRight />}
        >
          Get directions
        </Button>
      </div>
    );
  return (
    <Button href={business.phoneHref} icon={<PhoneIcon />}>
      Start with a call
    </Button>
  );
}

export default function HowItWorksPage() {
  return (
    <main id="main" className="svc-page">
      <PhotoHero
        photo="wheel"
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "How it works" }]}
        title="How it works"
        lede="Four steps from a stopped truck to a moving one. Every repair starts with a phone call."
        actions={
          <>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              Call the shop
            </Button>
            <Button href="#steps-title" variant="glass" icon={<ArrowDown />}>
              See the steps
            </Button>
          </>
        }
      />

      <section className="hw section" aria-labelledby="steps-title">
        <div className="container">
          <header className="section-head">
            <RevealHeading id="steps-title" className="display">
              The road back
            </RevealHeading>
            <p className="section-lede">
              The same four steps every time, whether it’s one truck or a whole
              fleet.
            </p>
          </header>

          <ol className="hw-steps">
            {steps.map((step, i) => {
              const photo = photos[stepPages[i].photo];
              return (
                <li key={step.title} className="hw-step">
                  <span className="hw-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="hw-copy">
                    <span className="hw-stop">
                      Step {i + 1} of {steps.length}
                    </span>
                    <h3>{step.title}</h3>
                    <p className="hw-text">{step.text}</p>
                    <p className="hw-more">{stepPages[i].more}</p>
                    <StepExtra index={i} />
                  </div>
                  <figure className="hw-photo">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      style={{ objectPosition: photo.focus }}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                  </figure>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <Faq />
      <CallToAction />
    </main>
  );
}
