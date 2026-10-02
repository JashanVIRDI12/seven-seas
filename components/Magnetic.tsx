"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";

/**
 * Pulls its child toward the pointer. Reserved for the one or two primary
 * actions on screen; inert on touch and with reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MEDIA.fine} and ${MEDIA.motion}`, () => {
        const el = root.current!;
        const target = el.firstElementChild as HTMLElement;
        const xTo = gsap.quickTo(target, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(target, "y", {
          duration: 0.6,
          ease: "power3.out",
        });
        const move = (event: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((event.clientX - r.left - r.width / 2) * strength);
          yTo((event.clientY - r.top - r.height / 2) * strength);
        };
        const leave = () => {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.45)",
            overwrite: true,
          });
        };
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
    <span ref={root} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
