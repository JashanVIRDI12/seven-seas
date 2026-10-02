"use client";

import Image from "next/image";
import { useRef } from "react";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { serviceCards } from "@/data/content";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";
import { scrollToTarget } from "@/lib/scroll";
import { RevealHeading } from "./RevealHeading";
import Link from "next/link";
import {
  ArrowUpRight,
  FleetIcon,
  PhoneIcon,
  TrailerIcon,
  TruckIcon,
} from "./Icons";

const glyphs = {
  "truck-repair": TruckIcon,
  "trailer-repair": TrailerIcon,
  fleets: FleetIcon,
} as const;

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: MEDIA.motion,
          pinnable: MEDIA.pinnable,
          desktop: MEDIA.desktop,
        },
        (context) => {
          const { motion, pinnable, desktop } = context.conditions!;
          if (!motion) return;
          const cards = q(".split-card") as HTMLElement[];
          const inners = q(".split-inner");
          const fronts = q(".split-front");

          if (pinnable) {
            // After Framer University's 3D image split: one photograph of
            // the rig opens along its seams, then each part turns over to
            // show what we do with it.
            section.classList.add("is-3d");
            const grid = q(".split-grid")[0];
            const gap = () => parseFloat(getComputedStyle(grid).columnGap) || 0;
            const r = 24;
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                pin: q(".services-pin")[0],
                start: "top top",
                end: () => `+=${window.innerHeight * 1.7}`,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            tl.fromTo(cards[0], { x: () => gap() }, { x: 0, duration: 0.3 }, 0)
              .fromTo(cards[2], { x: () => -gap() }, { x: 0, duration: 0.3 }, 0)
              .fromTo(
                fronts[0],
                { borderRadius: `${r}px 0px 0px ${r}px` },
                { borderRadius: `${r}px ${r}px ${r}px ${r}px`, duration: 0.3 },
                0,
              )
              .fromTo(
                fronts[1],
                { borderRadius: "0px 0px 0px 0px" },
                { borderRadius: `${r}px ${r}px ${r}px ${r}px`, duration: 0.3 },
                0,
              )
              .fromTo(
                fronts[2],
                { borderRadius: `0px ${r}px ${r}px 0px` },
                { borderRadius: `${r}px ${r}px ${r}px ${r}px`, duration: 0.3 },
                0,
              )
              .fromTo(
                q(".split-slice"),
                { scale: 1.08 },
                { scale: 1, duration: 0.3 },
                0,
              )
              .to(
                inners,
                {
                  rotateY: 180,
                  duration: 0.5,
                  stagger: 0.12,
                  ease: "power2.inOut",
                },
                0.34,
              )
              .to(
                cards,
                {
                  keyframes: { scale: [1, 0.92, 1], y: [0, -24, 0] },
                  duration: 0.5,
                  stagger: 0.12,
                  ease: "power1.inOut",
                },
                0.34,
              );

            // A keyboard user reaching a call link before the cards have
            // turned is taken to the end of the sequence, where it shows.
            const onFocus = (event: FocusEvent) => {
              const end = tl.scrollTrigger?.end;
              if (
                end !== undefined &&
                tl.progress() < 0.98 &&
                (event.target as Element).closest(".split-back")
              )
                scrollToTarget(end);
            };
            section.addEventListener("focusin", onFocus);
            return () => {
              section.removeEventListener("focusin", onFocus);
              section.classList.remove("is-3d");
            };
          }

          // Wide screens without the 3D sequence keep a plain card row.
          if (desktop) return;
          // After 21st.dev's stacking cards: each card holds under the nav
          // and the one beneath sinks back as the next one arrives.
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            gsap.to(inners[i], {
              scale: 0.92,
              filter: "brightness(0.78)",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top 65%",
                end: () => `top ${parseFloat(getComputedStyle(next).top)}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="services"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="services-pin">
        <div className="container">
          <header className="section-head">
            <RevealHeading id="services-title" className="display">
              What we fix
            </RevealHeading>
            <p className="section-lede">
              One shop for the truck, the trailer behind it and the fleet they
              belong to. Pick the one that’s holding you up.
            </p>
          </header>
          <ul className="split-grid">
            {serviceCards.map((card, i) => {
              const Glyph = glyphs[card.id];
              return (
                <li
                  key={card.id}
                  id={card.id}
                  className={`split-card split-${card.tone}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="split-inner">
                    <div className="split-front" aria-hidden="true">
                      {/* Each front shows its third of one photograph. */}
                      <div
                        className="split-slice"
                        style={{ left: `${-100 * i}%` }}
                      >
                        <Image
                          src={photos.convoy.src}
                          style={{ objectPosition: photos.convoy.focus }}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 100vw, 300vw"
                        />
                      </div>
                    </div>
                    <div className="split-back">
                      <div className="split-head">
                        <h3>{card.title}</h3>
                        <span className="split-glyph" aria-hidden="true">
                          <Glyph />
                        </span>
                      </div>
                      <p>{card.description}</p>
                      <p className="split-prompt">{card.prompt}</p>
                      <a
                        className="split-call stretched"
                        href={business.phoneHref}
                        aria-label={`${card.action}: ${business.phoneDisplay}`}
                        data-cursor={card.action}
                      >
                        <span className="icon-chip">
                          <PhoneIcon />
                        </span>
                        {card.action}
                      </a>
                      <Link
                        href={`/services/${card.id}`}
                        className="split-more"
                      >
                        Details
                        <ArrowUpRight />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
