"use client";

import { useRef } from "react";
import { business } from "@/data/business";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";
import { RevealHeading } from "./RevealHeading";
import { Magnetic } from "./Magnetic";
import { CopyNumber } from "./CopyNumber";
import { ArrowUpRight, PhoneIcon } from "./Icons";

/** The page closes the way it opened: a framed panel opening to full width. */
export function CallToAction() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const panel = q(".cta-panel")[0] as HTMLElement;
        const inset = () =>
          parseFloat(getComputedStyle(panel).getPropertyValue("--inset")) || 0;
        gsap.fromTo(
          panel,
          {
            clipPath: () =>
              `inset(0px ${inset()}px 0px ${inset()}px round 32px)`,
          },
          {
            clipPath: "inset(0px 0px 0px 0px round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "top 15%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
        gsap.from(q(".cta-phone-wrap > *, .cta-button, .cta-meta > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "ss-out",
          scrollTrigger: {
            trigger: q(".cta-row")[0],
            start: "top 88%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="cta"
      id="contact"
      aria-labelledby="cta-title"
    >
      <div className="cta-panel">
        <div className="container">
          <RevealHeading id="cta-title" className="cta-title">
            Truck down? Let’s get you moving.
          </RevealHeading>
          <div className="cta-row">
            <div className="cta-phone-wrap">
              <a className="cta-phone" href={business.phoneHref}>
                <span className="cta-phone-label">Call Seven Sea</span>
                <span className="cta-phone-number">
                  {business.phoneDisplay}
                </span>
              </a>
              <CopyNumber />
            </div>
            <Magnetic strength={0.4} className="cta-magnet">
              <a
                className="cta-button"
                href={business.phoneHref}
                aria-label={`Call now: ${business.phoneDisplay}`}
              >
                <span className="cta-button-ring" aria-hidden="true" />
                <PhoneIcon />
                <span>Call now</span>
              </a>
            </Magnetic>
          </div>
          <div className="cta-meta">
            <p>
              {business.address}, {business.city}, {business.provinceCode}{" "}
              {business.postalCode}
            </p>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Get directions
              <ArrowUpRight />
            </a>
            <p>Tell us where you are and what you need.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
