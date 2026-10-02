"use client";

import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/motion";

/**
 * After 21st.dev's Number Ticker and Sliding Number, built like a truck
 * odometer: each digit sits on a reel. With `laps`, reels spin through
 * full turns when they scroll into view; otherwise they roll to new values.
 */
export function Odometer({
  value,
  laps = 0,
  className = "",
}: {
  value: string;
  laps?: number;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  const count = (laps + 1) * 10;
  const offset = (digit: number) => -((laps * 10 + digit) / count) * 100;

  useGSAP(
    () => {
      const reels = gsap.utils.toArray<HTMLElement>(".odo-reel", root.current);
      gsap.set(reels, { y: 0 });
      const settle = (reel: HTMLElement) => offset(Number(reel.dataset.digit));
      if (prefersReducedMotion()) {
        reels.forEach((reel) => gsap.set(reel, { yPercent: settle(reel) }));
        return;
      }
      if (laps > 0 && first.current) {
        gsap.set(reels, { yPercent: 0 });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 85%",
          once: true,
          onEnter: () =>
            reels.forEach((reel, i) =>
              gsap.to(reel, {
                yPercent: settle(reel),
                duration: 2 + i * 0.35,
                ease: "expo.out",
              }),
            ),
        });
      } else if (first.current) {
        reels.forEach((reel) => gsap.set(reel, { yPercent: settle(reel) }));
      } else {
        reels.forEach((reel) =>
          gsap.to(reel, {
            yPercent: settle(reel),
            duration: 0.9,
            ease: "ss-inout",
          }),
        );
      }
      first.current = false;
    },
    { scope: root, dependencies: [value] },
  );

  return (
    <span ref={root} className={`odo ${className}`} aria-hidden="true">
      {value.split("").map((char, i) =>
        /\d/.test(char) ? (
          <span key={i} className="odo-digit">
            <span
              className="odo-reel"
              data-digit={char}
              style={{ transform: `translateY(${offset(Number(char))}%)` }}
            >
              {Array.from({ length: count }, (_, k) => (
                <span key={k}>{k % 10}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} className="odo-char">
            {char}
          </span>
        ),
      )}
    </span>
  );
}
