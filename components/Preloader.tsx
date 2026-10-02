"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion";
import { finishIntro } from "@/lib/intro";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { Mark } from "./Wordmark";

/**
 * Once per session: the mark draws, the beacon pulses while fonts and the
 * hero photograph arrive, then the curtain lifts onto the hero. CSS keeps
 * it hidden without JavaScript, with reduced motion and on repeat visits.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (
        !html.classList.contains("motion-ok") ||
        html.classList.contains("intro-skip")
      ) {
        finishIntro();
        return;
      }
      lockScroll();
      let alive = true;
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        html.classList.add("intro-skip");
        try {
          sessionStorage.setItem("ss-intro", "1");
        } catch {}
        unlockScroll();
      };

      const heroImage =
        document.querySelector<HTMLImageElement>(".hero-card img");
      const ready = Promise.race([
        Promise.all([
          document.fonts.ready,
          heroImage?.decode().catch(() => undefined),
        ]),
        new Promise((resolve) => setTimeout(resolve, 2400)),
      ]);

      // The beacon flashes red and blue, like a light bar, while waiting.
      const pulse = gsap
        .timeline({ repeat: -1, paused: true })
        .to(".preloader .mark-beacon", {
          fill: "#2f6fe4",
          duration: 0.01,
          delay: 0.32,
        })
        .to(".preloader .mark-beacon", {
          fill: "#e3262f",
          duration: 0.01,
          delay: 0.32,
        });

      // A layered curtain: the navy panel lifts with a red one trailing it.
      const exit = gsap
        .timeline({ paused: true, onComplete: release })
        .to(".preloader-inner", {
          yPercent: -40,
          autoAlpha: 0,
          duration: 0.7,
          ease: "ss-inout",
        })
        .to(
          ".preloader-panel",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.05,
            ease: "ss-inout",
          },
          0.15,
        )
        .to(
          ".preloader-trail",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.05,
            ease: "ss-inout",
          },
          0.3,
        )
        .add(finishIntro, 0.55);

      gsap
        .timeline({ defaults: { ease: "ss-out" } })
        .from(".preloader .mark-plate", {
          scale: 0.6,
          autoAlpha: 0,
          transformOrigin: "50% 50%",
          duration: 0.8,
        })
        .from(
          ".preloader .mark-seven, .preloader .mark-lane",
          { drawSVG: 0, duration: 0.8, stagger: 0.12 },
          0.2,
        )
        .from(
          ".preloader .mark-beacon",
          { scale: 0, transformOrigin: "50% 50%", duration: 0.5 },
          0.75,
        )
        .from(
          ".preloader-word .mask > span",
          { yPercent: 110, duration: 0.9, stagger: 0.08 },
          0.35,
        )
        .fromTo(
          ".preloader-progress",
          { scaleX: 0 },
          { scaleX: 0.8, duration: 1.2, ease: "power2.out" },
          0.1,
        )
        .add(() => {
          pulse.play();
          ready.then(() => {
            if (!alive) return;
            pulse.kill();
            gsap.set(".preloader .mark-beacon", { fill: "#e3262f" });
            gsap.to(".preloader-progress", {
              scaleX: 1,
              duration: 0.35,
              ease: "power2.out",
              onComplete: () => {
                exit.play();
              },
            });
          });
        });

      // Unmounting mid-intro only gives scrolling back; the intro counts
      // as played once the curtain has actually lifted.
      return () => {
        alive = false;
        if (!released) unlockScroll();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <span className="preloader-trail" />
      <span className="preloader-panel" />
      <div className="preloader-inner">
        <Mark className="preloader-mark" />
        <p className="preloader-word">
          <span className="mask">
            <span>Seven Sea</span>
          </span>
          <span className="mask">
            <span>Truck &amp; Trailer Repair, Prince George</span>
          </span>
        </p>
      </div>
      <span className="preloader-progress" />
    </div>
  );
}
