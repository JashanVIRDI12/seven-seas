"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MEDIA } from "@/lib/motion";
import { getLenis, scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * Lenis drives the native scroll position, so sticky, pinning, keyboard
 * scrolling and find-in-page keep working. Touch and reduced motion keep
 * the platform's own scrolling.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia(MEDIA.reduced).matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Same-page anchors glide; Next's Link sees defaultPrevented and stands down.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element).closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname)
        return;
      const target = url.hash
        ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
        : null;
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToTarget(target);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  // Geometry settles once fonts and images arrive.
  useEffect(() => {
    let alive = true;
    const refresh = () => alive && ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      alive = false;
      window.removeEventListener("load", refresh);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
