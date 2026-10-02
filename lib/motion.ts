import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    CustomEase,
    DrawSVGPlugin,
    MotionPathPlugin,
    ScrambleTextPlugin,
  );
  // One easing family for the whole site: a long, settled deceleration
  // for entrances and a symmetrical curve for things that open and close.
  CustomEase.create("ss-out", "0.16, 1, 0.3, 1");
  CustomEase.create("ss-inout", "0.76, 0, 0.24, 1");
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Breakpoints shared by CSS and gsap.matchMedia(). */
export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  fine: "(hover: hover) and (pointer: fine)",
  desktop: "(min-width: 1024px)",
  pinnable: "(min-width: 1024px) and (min-height: 680px)",
} as const;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia(MEDIA.reduced).matches
  );
}

/** Position in the document, ignoring transforms. */
export function documentOffset(element: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
