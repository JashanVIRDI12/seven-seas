"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/data/business";
import { navLinks } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MEDIA } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { Wordmark } from "./Wordmark";
import { Button, Roll } from "./Button";
import { Magnetic } from "./Magnetic";
import { PhoneIcon, PinIcon } from "./Icons";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  // Solid on scroll, tucked away while reading down, back on any scroll up.
  useGSAP(
    () => {
      const bar = header.current!.querySelector(".nav-bar");
      const reduced = window.matchMedia(MEDIA.reduced).matches;
      // A thin red line along the nav tracks progress down the page.
      gsap.fromTo(
        ".nav-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.current!.classList.toggle("is-solid", y > 24);
          const hide = y > 640 && self.direction === 1;
          gsap.to(bar, {
            yPercent: hide ? -160 : 0,
            duration: reduced ? 0 : 0.6,
            ease: "ss-out",
            overwrite: "auto",
          });
        },
      });
    },
    { scope: header },
  );

  // A beacon pill follows the section being read.
  useGSAP(
    (_context, contextSafe) => {
      const links = gsap.utils.toArray<HTMLElement>(
        ".nav-link",
        header.current,
      );
      const reduced = window.matchMedia(MEDIA.reduced).matches;
      // On an inner page the pill simply marks the page you are on.
      if (pathname !== "/") {
        const index = navLinks.findIndex(
          ({ href }) => !href.includes("#") && pathname.startsWith(href),
        );
        const link = links[index];
        if (!link) return;
        link.classList.add("is-active");
        const placeIndicator = contextSafe!(() => {
          gsap.set(indicator.current, {
            x: link.offsetLeft,
            width: link.offsetWidth,
            autoAlpha: link.offsetWidth > 0 ? 1 : 0,
          });
        });
        placeIndicator();
        // The desktop links can start hidden on phones. Re-measure when
        // the menu becomes visible or fonts change the link dimensions.
        const resizeObserver = new ResizeObserver(placeIndicator);
        resizeObserver.observe(link);
        resizeObserver.observe(link.parentElement!);
        return () => {
          resizeObserver.disconnect();
          link.classList.remove("is-active");
        };
      }
      // One tween at a time: a slow slide finishing after a quick fade-out
      // would leave a navy pill behind a navy (inactive) label.
      const moveTo = (index: number) => {
        const link = links[index];
        links.forEach((l, i) => l.classList.toggle("is-active", i === index));
        if (!link) {
          gsap.to(indicator.current, {
            autoAlpha: 0,
            duration: reduced ? 0 : 0.3,
            overwrite: true,
          });
          return;
        }
        gsap.to(indicator.current, {
          x: link.offsetLeft,
          width: link.offsetWidth,
          autoAlpha: 1,
          duration: reduced ? 0 : 0.6,
          ease: "ss-out",
          overwrite: true,
        });
      };
      // The pill follows whichever home section is under the reading line;
      // between tracked sections it steps aside.
      const active = new Set<number>();
      let last = -1;
      navLinks.forEach(({ id }, index) => {
        const section = document.getElementById(id);
        if (!section) return;
        // "Not sure what's wrong?" belongs with Services.
        const endTrigger =
          id === "services"
            ? (document.getElementById("diagnose") ?? section)
            : section;
        ScrollTrigger.create({
          trigger: section,
          endTrigger,
          start: "top 45%",
          end: "bottom 45%",
          // Measured after the page's pinned sections, whose scroll
          // distance moves every section below them.
          refreshPriority: -1,
          onToggle: (self) => {
            if (self.isActive) {
              active.add(index);
              last = index;
            } else active.delete(index);
            moveTo(
              active.has(last) ? last : (active.values().next().value ?? -1),
            );
          },
        });
      });
    },
    { scope: header, dependencies: [pathname], revertOnUpdate: true },
  );

  const close = useCallback(() => setOpen(false), []);

  useGSAP(
    () => {
      const el = panel.current!;
      const reduced = window.matchMedia(MEDIA.reduced).matches;
      menuTimeline.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "ss-out", duration: reduced ? 0 : 0.8 },
          onReverseComplete: () => {
            el.hidden = true;
          },
        })
        .fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: reduced ? 0 : 0.7,
            ease: "ss-inout",
          },
        )
        .from(
          ".menu-link-inner",
          { yPercent: 110, stagger: reduced ? 0 : 0.06 },
          reduced ? 0 : 0.3,
        )
        .from(
          ".menu-foot > *",
          { autoAlpha: 0, y: 16, stagger: reduced ? 0 : 0.06 },
          reduced ? 0 : 0.45,
        );
    },
    { scope: header },
  );

  useEffect(() => {
    const el = panel.current!;
    const tl = menuTimeline.current;
    if (!open) {
      if (tl && tl.progress() > 0) tl.timeScale(1.6).reverse();
      return;
    }
    el.hidden = false;
    tl?.timeScale(1).play();
    lockScroll();
    el.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(el.querySelectorAll<HTMLAnchorElement>("a")),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header ref={header} className={`site-header${open ? " menu-open" : ""}`}>
        <div className="nav-bar">
          <Link
            href="/"
            className="brand-link"
            aria-label="Seven Sea Truck & Trailer Repair, home"
            onClick={close}
          >
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <span
              ref={indicator}
              className="nav-indicator"
              aria-hidden="true"
            />
            {navLinks.map(({ label, id, href }) => (
              <Link
                key={id}
                className="nav-link"
                href={href}
                aria-current={
                  !href.includes("#") && pathname.startsWith(href)
                    ? "page"
                    : undefined
                }
              >
                <Roll>{label}</Roll>
              </Link>
            ))}
          </nav>
          <Magnetic className="nav-call">
            <Button
              href={business.phoneHref}
              icon={<PhoneIcon />}
              aria-label={`Call Seven Sea at ${business.phoneDisplay}`}
            >
              {business.phoneDisplay}
            </Button>
          </Magnetic>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
          <span className="nav-progress" aria-hidden="true" />
        </div>
        <div ref={panel} id="mobile-menu" className="mobile-menu" hidden>
          <nav aria-label="Mobile navigation">
            <ol>
              {navLinks.map(({ label, id, href }) => (
                <li key={id}>
                  <Link href={href} className="menu-link" onClick={close}>
                    <span className="menu-link-inner">{label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="menu-foot">
            <a className="menu-phone" href={business.phoneHref}>
              <PhoneIcon />
              {business.phoneDisplay}
            </a>
            <a
              className="menu-address"
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PinIcon />
              {business.address}, {business.city}
            </a>
          </div>
        </div>
      </header>
      <noscript>
        <nav className="noscript-nav" aria-label="Section navigation">
          {navLinks.map(({ label, id, href }) => (
            <a key={id} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </noscript>
    </>
  );
}
