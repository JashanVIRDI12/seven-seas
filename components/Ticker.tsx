"use client";

import { Fragment, useRef } from "react";
import { scope } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MEDIA } from "@/lib/motion";
import { NutIcon } from "./Icons";

/**
 * After Framer University's Ticker Scroll and 21st.dev's Scroll Velocity:
 * two rows run in opposite directions, speed up with the scroll, flip with
 * its direction and lean into fast movement.
 */
export function Ticker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const tracks = gsap.utils.toArray<HTMLElement>(
          ".ticker-track",
          root.current,
        );
        const loops = tracks.map((track, i) => {
          const loop = gsap.fromTo(
            track,
            { xPercent: i === 0 ? 0 : -50 },
            {
              xPercent: i === 0 ? -50 : 0,
              duration: 42,
              ease: "none",
              repeat: -1,
            },
          );
          // Leave room to run backwards without reaching the start.
          loop.totalTime(loop.duration() * 100);
          return loop;
        });
        const skewTo = gsap.quickTo(tracks, "skewX", {
          duration: 0.5,
          ease: "power3.out",
        });
        let settle: gsap.core.Tween | undefined;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const direction = self.direction;
            const boost = gsap.utils.clamp(1, 7, Math.abs(velocity) / 200);
            loops.forEach((loop) =>
              gsap.to(loop, {
                timeScale: boost * direction,
                duration: 0.2,
                overwrite: true,
              }),
            );
            skewTo(gsap.utils.clamp(-10, 10, velocity / -260));
            settle?.kill();
            settle = gsap.delayedCall(0.2, () => {
              skewTo(0);
              loops.forEach((loop) =>
                gsap.to(loop, {
                  timeScale: direction,
                  duration: 1.2,
                  ease: "power2.out",
                  overwrite: true,
                }),
              );
            });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = (hidden: boolean, label?: string) => (
    <ul
      className="ticker-row"
      {...(hidden ? { "aria-hidden": true } : { "aria-label": label })}
    >
      {scope.map((item) => (
        <Fragment key={item}>
          <li>{item}</li>
          <li className="ticker-nut" aria-hidden="true">
            <NutIcon />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div ref={root} className="ticker">
      <div className="ticker-band ticker-band-a">
        <div className="ticker-track">
          {row(false, "What we repair and where")}
          {row(true)}
        </div>
      </div>
      <div className="ticker-band ticker-band-b" aria-hidden="true">
        <div className="ticker-track">
          {row(true)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
