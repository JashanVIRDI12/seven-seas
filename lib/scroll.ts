import type Lenis from "lenis";

let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  if (lenis && locks > 0) lenis.stop();
}

export function getLenis() {
  return lenis;
}

/** Freeze page scrolling (menus, the intro). Calls are counted. */
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    document.documentElement.classList.add("scroll-locked");
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    lenis?.start();
    document.documentElement.classList.remove("scroll-locked");
  }
}

/** Scroll smoothly when Lenis runs, natively otherwise. */
export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else target.scrollIntoView();
}
