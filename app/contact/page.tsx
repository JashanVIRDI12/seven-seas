import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/data/business";
import { checklist } from "@/data/content";
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
    "Call Seven Sea Truck & Trailer Repair at +1 639-336-0003 or visit 7063 Trygg Ct, Prince George, BC. Repairs are arranged by phone.",
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
        title="Contact"
        lede="Repairs are arranged by phone. Call the shop, tell us what’s happening, and we’ll talk through the next step."
        actions={
          <>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              {business.phoneDisplay}
            </Button>
            <Button
              href={business.googleMapsUrl}
              external
              variant="glass"
              icon={<ArrowUpRight />}
            >
              Get directions
            </Button>
          </>
        }
      />

      <section className="cx section" aria-labelledby="cx-title">
        <div className="container">
          <header className="section-head">
            <RevealHeading id="cx-title" className="display">
              Reach the shop
            </RevealHeading>
            <p className="section-lede">
              One number, one address. Everything else is settled on the call.
            </p>
          </header>

          <div className="cx-grid">
            <article className="cx-card cx-call">
              <h3 className="cx-label">Call to arrange service</h3>
              <a className="cx-phone" href={business.phoneHref}>
                {business.phoneDisplay}
              </a>
              <p>
                Bookings are made by phone. This website doesn’t take
                appointments or give quotes.
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
                Please call ahead to confirm hours before you bring a truck or
                trailer in.
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

      <Faq />
    </main>
  );
}
