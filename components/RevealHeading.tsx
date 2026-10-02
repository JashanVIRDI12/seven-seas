"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MEDIA } from "@/lib/motion";

/**
 * Section headings rise out of their own line masks once, as they enter.
 * Lines re-split on resize without replaying the reveal.
 */
export function RevealHeading({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        let played = false;
        const split = SplitText.create(ref.current, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            if (played) return;
            return gsap.from(self.words, {
              yPercent: 118,
              duration: 1.25,
              stagger: 0.05,
              ease: "ss-out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 88%",
                once: true,
              },
              onComplete: () => {
                played = true;
              },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <h2 ref={ref} id={id} className={className}>
      {children}
    </h2>
  );
}
