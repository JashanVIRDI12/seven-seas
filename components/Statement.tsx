"use client";

import Image from "next/image";
import { photos } from "@/data/photos";
import { useRef } from "react";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";
import { Button } from "./Button";
import { ArrowDown } from "./Icons";

/**
 * After the Framer text-image reveal: as the reader scrolls, the middle
 * line parts and the truck slides in between "make" and "money".
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const media = q(".sl-media")[0] as HTMLElement;
        const half = () => media.offsetWidth / 2;
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: q(".split-lines")[0],
              start: "top 85%",
              end: "bottom 45%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(q(".sl-l"), { x: () => half() }, { x: 0 }, 0)
          .fromTo(q(".sl-r"), { x: () => -half() }, { x: 0 }, 0)
          .fromTo(
            media,
            { clipPath: "inset(0% 50% 0% 50% round 999px)" },
            { clipPath: "inset(0% 0% 0% 0% round 999px)" },
            0,
          )
          .fromTo(q(".sl-media img"), { scale: 1.5 }, { scale: 1 }, 0)
          .fromTo(
            q(".sl-line:not(.sl-split)"),
            { opacity: 0.5 },
            { opacity: 1, stagger: 0.3 },
            0,
          );
        gsap.from(q(".statement-foot > *"), {
          y: 32,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "ss-out",
          scrollTrigger: {
            trigger: q(".statement-foot")[0],
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
      className="statement section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="container">
        <h2 id="about-title" className="split-lines">
          <span className="sl-line">Your truck doesn’t</span>{" "}
          <span className="sl-line sl-split">
            <span className="sl-l">make</span>
            <span className="sl-media" aria-hidden="true">
              <Image
                src={photos.kenworth.src}
                style={{ objectPosition: photos.kenworth.focus }}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 40vw"
              />
            </span>
            <span className="sl-r">money</span>
          </span>{" "}
          <span className="sl-line">sitting still.</span>
        </h2>
        <div className="statement-foot">
          <p>
            Seven Sea is a heavy-duty truck and trailer repair shop in Prince
            George, built around one job: getting you back on the road. Freight
            to deliver, a crew waiting, another long stretch of highway ahead.
            We know what’s riding on your truck.
          </p>
          <Button href="#process" variant="ghost" icon={<ArrowDown />}>
            How a repair works
          </Button>
        </div>
      </div>
    </section>
  );
}
