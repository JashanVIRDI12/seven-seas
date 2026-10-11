import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/data/business";
import { checklist, contactFaqs } from "@/data/content";
import { photos } from "@/data/photos";
import { canonical } from "@/lib/site";
import { PhotoHero } from "@/components/PhotoHero";
import { Faq } from "@/components/Faq";
import { Button } from "@/components/Button";
import { CopyNumber } from "@/components/CopyNumber";
import { LocalTime } from "@/components/Local";
import { RevealHeading } from "@/components/RevealHeading";
import {
  ArrowUpRight,
  CheckIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what’s happening with your truck or trailer. Call Seven Sea in Prince George to discuss the issue, check availability and arrange your shop visit.",
  alternates: { canonical: canonical("/contact") },
};

export default function ContactPage() {
  const { latitude, longitude } = business.coordinates;
  return (
    <main id="main" className="svc-page">
      <PhotoHero
        photo="convoy"
        compact
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Need Help? Let’s Talk"
        lede="Tell us what’s happening with your truck or trailer. Call Seven Sea in Prince George to discuss the issue, check availability and arrange your shop visit."
        actions={
          <>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              Call the Shop
            </Button>
            <Button
              href={business.googleMapsUrl}
              external
              variant="glass"
              icon={<ArrowUpRight />}
            >
              Get Directions
            </Button>
          </>
        }
      />

      <section className="cx section" aria-labelledby="cx-title">
        <div className="container">
          <header className="section-head">
            <RevealHeading id="cx-title" className="display">
              Before You Head Over
            </RevealHeading>
            <p className="section-lede">
              Need to check availability or discuss a repair? Give us a call so
              you have the details before making the trip.
            </p>
          </header>

          <div className="cx-grid">
            <article className="cx-card cx-call">
              <h3 className="cx-label">Call Seven Sea</h3>
              <a className="cx-phone" href={business.phoneHref}>
                {business.phoneDisplay}
              </a>
              <p>
                Call the shop with your truck or trailer details and explain what
                needs attention. We’ll discuss availability and arrange a time to
                bring it in.
              </p>
              <div className="cx-actions">
                <Button
                  href={business.phoneHref}
                  variant="white"
                  icon={<PhoneIcon />}
                >
                  Call now
                </Button>
                <CopyNumber />
              </div>
            </article>

            <article className="cx-card cx-visit">
              <h3 className="cx-label">
                <PinIcon />
                Visit the shop
              </h3>
              <address className="cx-address">
                {business.address}
                <br />
                {business.city}, {business.provinceCode} {business.postalCode}
              </address>
              <p className="cx-coords">
                <span className="sr-only">GPS coordinates: </span>
                {latitude.toFixed(4)}° N, {Math.abs(longitude).toFixed(4)}° W
              </p>
              <Button
                href={business.googleMapsUrl}
                external
                variant="navy"
                icon={<ArrowUpRight />}
                className="cx-push"
              >
                Open in Google Maps
              </Button>
            </article>

            <article className="cx-card cx-hours">
              <h3 className="cx-label">
                <span className="live-dot" aria-hidden="true" />
                Local time in Prince George
              </h3>
              <LocalTime />
              <p className="cx-push">
                Please call ahead to confirm shop hours and availability.
                This also gives us a chance to discuss your equipment and any
                drop-off requirements.
              </p>
            </article>

            <article className="cx-card cx-ready">
              <figure className="cx-ready-photo">
                <Image
                  src={photos.truckEngine.src}
                  alt={photos.truckEngine.alt}
                  style={{ objectPosition: photos.truckEngine.focus }}
                  fill
                  sizes="(min-width: 1024px) 24vw, 100vw"
                />
              </figure>
              <div className="cx-ready-body">
                <h3 className="cx-label">Have this ready when you call</h3>
                <ul className="cx-list">
                  {checklist.map((item) => (
                    <li key={item}>
                      <span className="cx-check" aria-hidden="true">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Faq
        items={contactFaqs}
        title="Before You Head Over"
        lede="Need to check availability or discuss a repair? Give us a call so you have the details before making the trip."
        action="Call Seven Sea"
      />
    </main>
  );
}
