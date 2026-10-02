"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { business } from "@/data/business";
import { gsap, ScrollTrigger, useGSAP, MEDIA } from "@/lib/motion";
import { PhoneIcon } from "./Icons";

/**
 * For a driver beside a stopped truck: the call is always under the thumb,
 * stepping aside only while the full contact panel is on screen.
 */
export function MobileCallBar() {
  const root = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const contact = document.getElementById("contact");
      if (!contact) return;
      const reduced = window.matchMedia(MEDIA.reduced).matches;
      ScrollTrigger.create({
        trigger: contact,
        start: "top 85%",
        end: "bottom top",
        onToggle: (self) =>
          gsap.to(root.current, {
            yPercent: self.isActive ? 160 : 0,
            duration: reduced ? 0 : 0.5,
            ease: "ss-out",
          }),
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <a ref={root} className="mobile-call" href={business.phoneHref}>
      <span className="icon-chip icon-chip-night">
        <PhoneIcon />
      </span>
      <span className="mobile-call-text">
        <strong>Call the shop</strong>
        <span>{business.phoneDisplay}</span>
      </span>
    </a>
  );
}
