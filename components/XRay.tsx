"use client";

import Image from "next/image";
import { useRef } from "react";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { checklist } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MEDIA } from "@/lib/motion";
import { RevealHeading } from "./RevealHeading";
import { Button } from "./Button";
import { CheckIcon, PhoneIcon } from "./Icons";

/**
 * After Framer University's X-Ray hover reveal: a lens over the truck shows
 * the machinery underneath in a blueprint tint. It follows the pointer;
 * on touch screens it patrols the photo by itself.
 */
export function XRay() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const stage = q(".xray-stage")[0] as HTMLElement;
      const lens = { x: 62, y: 46, r: 0 };
      const apply = () => {
        stage.style.setProperty("--x", `${lens.x}%`);
        stage.style.setProperty("--y", `${lens.y}%`);
        stage.style.setProperty("--r", `${lens.r}px`);
      };
      const radius = () => Math.min(stage.offsetWidth, 900) * 0.2;

      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, fine: MEDIA.fine }, (context) => {
        const { motion, fine } = context.conditions!;
        stage.classList.add("is-live");
        if (!motion) {
          lens.r = radius();
          apply();
          return;
        }
        gsap.from(q(".xray-checklist li"), {
          x: -24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "ss-out",
          scrollTrigger: {
            trigger: q(".xray-checklist")[0],
            start: "top 88%",
            once: true,
          },
        });

        if (fine) {
          apply();
          const xTo = gsap.quickTo(lens, "x", {
            duration: 0.55,
            ease: "power3.out",
            onUpdate: apply,
          });
          const yTo = gsap.quickTo(lens, "y", {
            duration: 0.55,
            ease: "power3.out",
            onUpdate: apply,
          });
          const move = (event: PointerEvent) => {
            const r = stage.getBoundingClientRect();
            xTo(((event.clientX - r.left) / r.width) * 100);
            yTo(((event.clientY - r.top) / r.height) * 100);
          };
          const enter = (event: PointerEvent) => {
            const r = stage.getBoundingClientRect();
            lens.x = ((event.clientX - r.left) / r.width) * 100;
            lens.y = ((event.clientY - r.top) / r.height) * 100;
            gsap.to(lens, {
              r: radius(),
              duration: 0.7,
              ease: "ss-out",
              onUpdate: apply,
              overwrite: "auto",
            });
            stage.classList.add("is-scanning");
          };
          const leave = () => {
            gsap.to(lens, {
              r: 0,
              duration: 0.5,
              ease: "power3.in",
              onUpdate: apply,
              overwrite: "auto",
            });
            stage.classList.remove("is-scanning");
          };
          stage.addEventListener("pointermove", move);
          stage.addEventListener("pointerenter", enter);
          stage.addEventListener("pointerleave", leave);
          // A brief demonstration when the photo first comes into view.
          ScrollTrigger.create({
            trigger: stage,
            start: "top 65%",
            once: true,
            onEnter: () => {
              if (stage.matches(":hover")) return;
              gsap
                .timeline({ onUpdate: apply })
                .set(lens, { x: 30, y: 60 })
                .to(lens, { r: radius(), duration: 0.6, ease: "ss-out" })
                .to(lens, { x: 70, y: 40, duration: 1.4, ease: "sine.inOut" })
                .to(lens, { r: 0, duration: 0.5, ease: "power3.in" });
            },
          });
          return () => {
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerenter", enter);
            stage.removeEventListener("pointerleave", leave);
          };
        }

        // Touch: the lens sweeps a slow figure eight while in view.
        lens.r = radius() * 0.85;
        const patrol = gsap
          .timeline({ repeat: -1, paused: true, onUpdate: apply })
          .to(lens, { x: 75, y: 35, duration: 2.2, ease: "sine.inOut" })
          .to(lens, { x: 30, y: 65, duration: 2.6, ease: "sine.inOut" })
          .to(lens, { x: 62, y: 46, duration: 2, ease: "sine.inOut" });
        apply();
        ScrollTrigger.create({
          trigger: stage,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? patrol.play() : patrol.pause()),
        });
      });
      return () => {
        mm.revert();
        stage.classList.remove("is-live", "is-scanning");
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="xray section"
      id="diagnose"
      aria-labelledby="xray-title"
    >
      <div className="container xray-grid">
        <div className="xray-copy">
          <RevealHeading id="xray-title" className="display">
            Not sure what’s wrong?
          </RevealHeading>
          <p className="section-lede">
            Describe the noise, the warning light or what the trailer is doing.
            We’ll talk you through the next step.
          </p>
          <div className="xray-ready">
            <h3>Have this ready when you call</h3>
            <ul className="xray-checklist">
              {checklist.map((item) => (
                <li key={item}>
                  <span className="xray-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Button href={business.phoneHref} icon={<PhoneIcon />}>
            {`Call ${business.phoneDisplay}`}
          </Button>
        </div>
        <figure className="xray-stage">
          <Image
            className="xray-top"
            src={photos.kenworth.src}
            alt={photos.kenworth.alt}
            style={{ objectPosition: photos.kenworth.focus }}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <div className="xray-under" aria-hidden="true">
            <Image
              src={photos.engineDetail.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <span className="xray-grid-lines" />
            <span className="xray-scan" />
          </div>
          <span className="xray-ring" aria-hidden="true" />
          <figcaption className="xray-hint">
            <span className="live-dot" aria-hidden="true" />
            Under the hood
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
