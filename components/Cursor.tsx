"use client";

import { useRef } from "react";
import { gsap, useGSAP, MEDIA } from "@/lib/motion";

/**
 * A label that names what a click will do, shown only over elements that
 * carry data-cursor. The system pointer stays visible.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MEDIA.fine, () => {
      const el = root.current!;
      const reduced = window.matchMedia(MEDIA.reduced).matches;
      const xTo = gsap.quickTo(el, "x", {
        duration: reduced ? 0 : 0.55,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: reduced ? 0 : 0.55,
        ease: "power3.out",
      });
      let current: Element | null = null;

      const show = (text: string) => {
        label.current!.textContent = text;
        gsap.to(el, {
          scale: 1,
          autoAlpha: 1,
          duration: reduced ? 0 : 0.45,
          ease: "ss-out",
          overwrite: "auto",
        });
      };
      const hide = () =>
        gsap.to(el, {
          scale: 0.4,
          autoAlpha: 0,
          duration: reduced ? 0 : 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

      const move = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        const host = (event.target as Element).closest?.("[data-cursor]");
        if (host === current) return;
        current = host;
        if (host) show(host.getAttribute("data-cursor") ?? "");
        else hide();
      };
      const out = (event: PointerEvent) => {
        if (!event.relatedTarget) {
          current = null;
          hide();
        }
      };
      gsap.set(el, { scale: 0.4, autoAlpha: 0, transformOrigin: "0 0" });
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerout", out);
      return () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerout", out);
      };
    });
    return () => mm.revert();
  });

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
