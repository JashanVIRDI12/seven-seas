"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";
import { useGlow } from "@/lib/useGlow";
import { RevealHeading } from "./RevealHeading";
import { Odometer } from "./Odometer";
import { ArrowUpRight, PinIcon, Stars } from "./Icons";

const clock = new Intl.DateTimeFormat("en-CA", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Vancouver",
});
const weekday = new Intl.DateTimeFormat("en-CA", {
  weekday: "long",
  timeZone: "America/Vancouver",
});

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 5000);
  return () => window.clearInterval(id);
}
const snapshot = () => {
  const now = new Date();
  return `${weekday.format(now)}|${clock.format(now)}`;
};

/** Prince George's time on odometer reels, rendered on the client only. */
export function LocalTime() {
  const value = useSyncExternalStore(subscribe, snapshot, () => null);
  const [day, time = ""] = value ? value.split("|") : ["", ""];
  const [digits, period = ""] = time.split(" ");
  return (
    <p className="time-value">
      <span className="sr-only">{time}</span>
      <span className="time-clock">
        {digits ? <Odometer value={digits} /> : "—"}
        {period && <span className="time-period"> {period}</span>}
      </span>
      <span className="time-day">{day}</span>
    </p>
  );
}

export function Local() {
  const root = useRef<HTMLElement>(null);
  const { latitude, longitude } = business.coordinates;
  const coords = `${latitude.toFixed(4)}° N, ${Math.abs(longitude).toFixed(4)}° W`;
  useGlow(root);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        gsap.from(q(".bento-card"), {
          y: 70,
          autoAlpha: 0,
          scale: 0.96,
          duration: 1.2,
          ease: "ss-out",
          stagger: { each: 0.08, grid: "auto", from: "start" },
          scrollTrigger: {
            trigger: q(".bento")[0],
            start: "top 82%",
            once: true,
          },
        });
        gsap.fromTo(
          q(".road-card img"),
          { yPercent: -6, scale: 1.14 },
          {
            yPercent: 6,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: q(".road-card")[0],
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        // The coordinates decode like a GPS fix.
        gsap.to(q(".place-coords-value"), {
          duration: 1.6,
          scrambleText: { text: coords, chars: "0123456789°.", speed: 0.6 },
          scrollTrigger: {
            trigger: q(".place-card")[0],
            start: "top 85%",
            once: true,
          },
        });
        gsap.fromTo(
          q(".rating-stars-fill"),
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: `inset(0% ${100 - (business.googleRating / 5) * 100}% 0% 0%)`,
            duration: 2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: q(".rating-card")[0],
              start: "top 85%",
              once: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="local section"
      id="shop"
      aria-labelledby="shop-title"
    >
      <div className="container">
        <header className="section-head">
          <RevealHeading id="shop-title" className="display">
            Local to Prince George
          </RevealHeading>
          <p className="section-lede">
            Long highways, hard winters and freight that has to keep moving.
            Prince George is home, and the north is the job.
          </p>
        </header>

        <div className="bento">
          <figure className="bento-card road-card glow-card">
            <Image
              src={photos.northernRoad.src}
              alt={photos.northernRoad.alt}
              style={{ objectPosition: photos.northernRoad.focus }}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
            <figcaption>
              <strong>Built for Northern BC roads</strong>
              <span>Highway miles. Northern conditions.</span>
            </figcaption>
          </figure>

          <a
            className="bento-card rating-card glow-card"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open Google Maps"
          >
            <span className="card-label">Google rating</span>
            <span className="rating-row">
              <span className="sr-only">{business.googleRating} out of 5</span>
              <Odometer
                className="rating-score"
                value={String(business.googleRating)}
                laps={2}
              />
              <span className="rating-stars" aria-hidden="true">
                <Stars className="rating-stars-base" />
                <Stars className="rating-stars-fill" />
              </span>
            </span>
            <span className="card-foot">
              From customers on Google Maps
              <span className="icon-chip">
                <ArrowUpRight />
              </span>
            </span>
          </a>

          <div className="bento-card time-card glow-card">
            <span className="card-label">
              <span className="live-dot" aria-hidden="true" />
              Local time in Prince George
            </span>
            <LocalTime />
            <p className="card-foot">Call ahead to confirm shop hours.</p>
          </div>

          <a
            className="bento-card place-card glow-card"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Get directions"
          >
            <span className="card-label">
              <PinIcon />
              The shop
            </span>
            <address>
              {business.address}
              <br />
              {business.city}, {business.provinceCode} {business.postalCode}
            </address>
            <span className="place-coords">
              <span className="sr-only">GPS coordinates: {coords}</span>
              <span className="place-coords-value" aria-hidden="true">
                {coords}
              </span>
            </span>
            <span className="card-foot">
              Get directions
              <span className="icon-chip">
                <ArrowUpRight />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
