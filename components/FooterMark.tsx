"use client";

import { useRef } from "react";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";

const letters = "SEVEN SEA".split("");

/**
 * The name rises out of the bottom of the page as the reader arrives, and
 * after Framer University's text lift, its letters lift in a wave around
 * the pointer.
 */
export function FooterMark() {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, fine: MEDIA.fine }, (context) => {
        const { motion, fine } = context.conditions!;
        if (!motion) return;
        const items = gsap.utils.toArray<HTMLElement>(
          ".footer-mark-letter",
          root.current,
        );
        gsap.fromTo(
          items,
          { yPercent: 105 },
          {
            yPercent: 0,
            ease: "none",
            stagger: 0.06,
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.6,
            },
          },
        );
        if (!fine) return;
        const lifts = items.map((item) =>
          gsap.quickTo(item, "y", { duration: 0.6, ease: "power3.out" }),
        );
        const el = root.current!;
        const move = (event: PointerEvent) => {
          const height = el.offsetHeight;
          items.forEach((item, i) => {
            const r = item.getBoundingClientRect();
            const distance = Math.abs(event.clientX - (r.left + r.width / 2));
            const falloff = Math.exp(-((distance / (r.width * 1.2)) ** 2));
            lifts[i](-height * 0.16 * falloff);
          });
        };
        const leave = () => lifts.forEach((lift) => lift(0));
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <p ref={root} className="footer-mark" aria-hidden="true">
      {letters.map((letter, i) => (
        <span key={i} className="footer-mark-letter">
          {letter === " " ? " " : letter}
        </span>
      ))}
    </p>
  );
}
