"use client";

import Image from "next/image";
import { useRef } from "react";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { flipWords } from "@/data/content";
import { documentOffset, gsap, useGSAP, MEDIA } from "@/lib/motion";
import { onIntroDone } from "@/lib/intro";
import { Button } from "./Button";
import { Magnetic } from "./Magnetic";
import { FlipWord } from "./FlipWord";
import { ArrowDown, ArrowUpRight, PhoneIcon, Stars } from "./Icons";

const letters = "SEVEN SEA".split("");

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, fine: MEDIA.fine }, (context) => {
        const { motion, fine } = context.conditions!;
        const containers = q("[data-hero-reveal]");
        if (!motion) {
          gsap.set(containers, { autoAlpha: 1 });
          return;
        }
        const mark = q(".hero-mark-inner")[0] as HTMLElement;
        const stage = q(".hero-stage")[0] as HTMLElement;
        const header = document.querySelector<HTMLElement>(".site-header");
        const navText = header?.querySelector<HTMLElement>(".wordmark-text");
        const navWord = header?.querySelector<HTMLElement>(".brand-word");

        // Entrance: the lettering rises plate by plate, the photo card
        // swings up into its tilted resting angle, then the headline.
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "ss-out" } })
          .set(containers, { autoAlpha: 1 })
          .from(
            q(".hero-mark-letter > span"),
            { yPercent: 105, duration: 1.3, stagger: 0.05 },
            0,
          )
          .from(
            q(".hero-meta > *"),
            { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 },
            0.5,
          )
          .from(
            q(".hero-card-wrap"),
            { yPercent: 24, rotateX: 28, autoAlpha: 0, duration: 1.7 },
            0.25,
          )
          .from(q(".hero-card img"), { scale: 1.35, duration: 2.2 }, 0.25)
          .from(
            q(".ht-in"),
            { yPercent: 118, duration: 1.2, stagger: 0.1 },
            0.85,
          )
          .from(
            q(".hero-actions > *"),
            { y: 28, autoAlpha: 0, duration: 1, stagger: 0.08 },
            1.05,
          );
        const unsubscribe = onIntroDone(() => {
          if (window.scrollY > 120) intro.progress(1);
          else intro.play();
        });

        // After Framer University's animated navigation bar: the lettering
        // shrinks and flies into the nav, where the logo takes over.
        if (header && navText && navWord) {
          gsap.set(navText, { autoAlpha: 0 });
          const distance = () => window.innerHeight * 0.5;
          const target = () => {
            let x = 0;
            let y = 0;
            let node: HTMLElement | null = navWord;
            while (node && node !== header) {
              x += node.offsetLeft;
              y += node.offsetTop;
              node = node.offsetParent as HTMLElement | null;
            }
            return { x, y };
          };
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root.current,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
            .to(
              mark,
              {
                x: () => target().x - documentOffset(mark).x,
                y: () => target().y - documentOffset(mark).y + distance(),
                scale: () => navWord.offsetWidth / mark.offsetWidth,
                duration: 1,
              },
              0,
            )
            .to(q(".hero-meta"), { autoAlpha: 0, y: -16, duration: 0.35 }, 0)
            .to(mark, { autoAlpha: 0, duration: 0.06 }, 0.94)
            .to(navText, { autoAlpha: 1, duration: 0.06 }, 0.94);
        }

        // After Aceternity's container scroll: the photo card lies back in
        // perspective and comes upright as the page scrolls.
        gsap.fromTo(
          q(".hero-card"),
          { rotateX: 20, scale: 0.94 },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${Math.max(stage.offsetTop, 1)}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
        gsap.to(q(".hero-card img"), {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        let cleanupPointer = () => {};
        if (fine) {
          const wrap = q(".hero-card-wrap")[0] as HTMLElement;
          const rx = gsap.quickTo(wrap, "rotationX", {
            duration: 1,
            ease: "power3.out",
          });
          const ry = gsap.quickTo(wrap, "rotationY", {
            duration: 1,
            ease: "power3.out",
          });
          const move = (event: PointerEvent) => {
            const r = wrap.getBoundingClientRect();
            ry(((event.clientX - r.left) / r.width - 0.5) * 4);
            rx(((event.clientY - r.top) / r.height - 0.5) * -3);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          wrap.addEventListener("pointermove", move);
          wrap.addEventListener("pointerleave", leave);
          cleanupPointer = () => {
            wrap.removeEventListener("pointermove", move);
            wrap.removeEventListener("pointerleave", leave);
          };
        }
        return () => {
          unsubscribe();
          cleanupPointer();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="container hero-top" data-hero-reveal>
        <p className="hero-mark" aria-hidden="true">
          <span className="hero-mark-inner">
            {letters.map((letter, i) => (
              <span key={i} className="hero-mark-letter">
                <span>{letter === " " ? "\u00a0" : letter}</span>
              </span>
            ))}
          </span>
        </p>
        <div className="hero-meta">
          <p className="hero-tag">
            Heavy-duty truck and trailer repair in Prince George, BC
          </p>
          <a
            className="hero-rating"
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open Google Maps"
          >
            <Stars />
            <span>
              <strong>{business.googleRating}</strong>
              <span className="sr-only"> out of 5</span> on Google
            </span>
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <div className="container hero-stage" data-hero-reveal>
        <div className="hero-card-wrap">
          <figure className="hero-card">
            <div className="hero-screen">
              <Image
                src={photos.convoy.src}
                alt={photos.convoy.alt}
                style={{ objectPosition: photos.convoy.focus }}
                fill
                sizes="(max-width: 639px) 840px, (min-width: 1500px) 1440px, 100vw"
                loading="eager"
                fetchPriority="high"
              />
              <div className="hero-copy">
                <h1 id="hero-title" className="hero-title">
                  <span className="sr-only">Keep the north moving.</span>
                  <span className="ht-line" aria-hidden="true">
                    <span className="ht-in">Keep the</span>
                  </span>
                  <span className="ht-line" aria-hidden="true">
                    <span className="ht-in">
                      <FlipWord words={flipWords} /> moving.
                    </span>
                  </span>
                </h1>
                <div className="hero-actions">
                  <Magnetic>
                    <Button
                      href={business.phoneHref}
                      variant="red"
                      icon={<PhoneIcon />}
                    >
                      Call the shop
                    </Button>
                  </Magnetic>
                  <Button href="#services" variant="glass" icon={<ArrowDown />}>
                    See services
                  </Button>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
