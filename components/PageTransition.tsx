"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, MEDIA } from "@/lib/motion";
import { getLenis, lockScroll, unlockScroll } from "@/lib/scroll";
import { Mark } from "./Wordmark";

/**
 * Between pages, the same layered curtain as the intro: red then navy
 * close over the page, the route changes underneath, and the curtain
 * lifts. Same-page anchors, new tabs, downloads, modified clicks and
 * reduced motion all keep the browser's own behaviour.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const fallback = useRef<number | undefined>(undefined);

  const reveal = () => {
    const el = root.current;
    if (!el || !pending.current) return;
    window.clearTimeout(fallback.current);
    if (!location.hash)
      getLenis()?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
    gsap
      .timeline({
        onComplete: () => {
          el.style.visibility = "hidden";
          pending.current = false;
          unlockScroll();
        },
      })
      .to(el.querySelector(".pt-mark"), { autoAlpha: 0, duration: 0.25 })
      .to(
        el.querySelector(".pt-navy"),
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "ss-inout" },
        0.1,
      )
      .to(
        el.querySelector(".pt-red"),
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "ss-inout" },
        0.22,
      );
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const link = (event.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      )
        return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname)
        return;
      if (window.matchMedia(MEDIA.reduced).matches || pending.current) return;

      event.preventDefault();
      const el = root.current!;
      pending.current = true;
      lockScroll();
      el.style.visibility = "visible";
      gsap
        .timeline({
          onComplete: () => {
            router.push(url.pathname + url.search + url.hash);
            // If the route never settles, never leave the curtain down.
            fallback.current = window.setTimeout(reveal, 4000);
          },
        })
        .fromTo(
          el.querySelector(".pt-red"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "ss-inout" },
        )
        .fromTo(
          el.querySelector(".pt-navy"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "ss-inout" },
          0.1,
        )
        .fromTo(
          el.querySelector(".pt-mark"),
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "ss-out" },
          0.35,
        );
    };
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      window.clearTimeout(fallback.current);
    };
    // reveal only reads refs; the listener is installed once per router.
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    const id = requestAnimationFrame(reveal);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div ref={root} className="page-curtain" aria-hidden="true">
      <span className="pt-red" />
      <span className="pt-navy" />
      <Mark className="pt-mark" />
    </div>
  );
}
