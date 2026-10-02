"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, MEDIA } from "./motion";

/**
 * After Aceternity's Glowing Effect (via 21st.dev): a red-to-blue arc on
 * each `.glow-card` border turns to face the pointer while it is near,
 * and fades when the pointer rests in the middle of the card.
 */
export function useGlow(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MEDIA.fine} and ${MEDIA.motion}`, () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".glow-card",
          scope.current,
        );
        const angles = cards.map(() => ({ value: 0 }));
        let frame = 0;
        let px = -1e4;
        let py = -1e4;
        const proximity = 72;
        const update = () => {
          frame = 0;
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const near =
              px > r.left - proximity &&
              px < r.right + proximity &&
              py > r.top - proximity &&
              py < r.bottom + proximity;
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const resting =
              Math.hypot(px - cx, py - cy) < Math.min(r.width, r.height) * 0.25;
            card.classList.toggle("is-glowing", near && !resting);
            if (!near) return;
            const target = (Math.atan2(py - cy, px - cx) * 180) / Math.PI + 90;
            const current = angles[i].value;
            const delta = ((((target - current) % 360) + 540) % 360) - 180;
            gsap.to(angles[i], {
              value: current + delta,
              duration: 0.9,
              ease: "power3.out",
              overwrite: true,
              onUpdate: () =>
                card.style.setProperty("--start", String(angles[i].value)),
            });
          });
        };
        const onMove = (event: PointerEvent) => {
          px = event.clientX;
          py = event.clientY;
          if (!frame) frame = requestAnimationFrame(update);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          window.removeEventListener("pointermove", onMove);
          cancelAnimationFrame(frame);
          cards.forEach((card) => card.classList.remove("is-glowing"));
        };
      });
      return () => mm.revert();
    },
    { scope },
  );
}
