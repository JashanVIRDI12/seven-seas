"use client";

import { useRef } from "react";
import { business } from "@/data/business";
import { steps } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP, MEDIA } from "@/lib/motion";
import { RevealHeading } from "./RevealHeading";
import { PhoneIcon } from "./Icons";

function Truck() {
  return (
    <svg className="truck" viewBox="0 0 72 32" aria-hidden="true">
      <rect className="truck-box" x="1" y="3" width="42" height="20" rx="2.5" />
      <path
        className="truck-cab"
        d="M46 9h11.5c1.5 0 2.8.8 3.5 2l5.6 8.6c.3.5.4 1 .4 1.6V23H46Z"
      />
      <path className="truck-glass" d="M55 12h3.2l3.6 5.5H55Z" />
      <rect
        className="truck-light-red"
        x="48"
        y="5"
        width="4"
        height="3"
        rx="1"
      />
      <rect
        className="truck-light-blue"
        x="53"
        y="5"
        width="4"
        height="3"
        rx="1"
      />
      {[12, 30, 58].map((cx) => (
        <circle key={cx} className="truck-wheel" cx={cx} cy="25.5" r="4.5" />
      ))}
    </svg>
  );
}

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const q = gsap.utils.selector(section);
      const cards = q(".step-card");
      const stops = q(".road-stop") as HTMLElement[];
      const count = q(".process-count-current")[0];
      const setActive = (index: number) => {
        cards.forEach((card, i) => {
          card.classList.toggle("is-active", i === index);
          card.classList.toggle("is-done", i < index);
        });
        stops.forEach((stop, i) =>
          stop.classList.toggle("is-passed", i <= index),
        );
        if (count) count.textContent = String(index + 1).padStart(2, "0");
      };

      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, pinnable: MEDIA.pinnable }, (context) => {
        const { motion, pinnable } = context.conditions!;
        if (!motion) {
          setActive(-1);
          return;
        }

        if (pinnable) {
          // Signature, after Framer University's path-on-scroll: a winding
          // road is drawn in red behind a truck that drives it, while the
          // steps travel past.
          section.classList.add("is-horizontal");
          const viewport = q(".process-viewport")[0] as HTMLElement;
          const track = q(".process-track")[0] as HTMLElement;
          const road = q(".road")[0] as HTMLElement;
          const svg = section.querySelector<SVGSVGElement>(".road-svg")!;
          const paths = Array.from(
            section.querySelectorAll<SVGPathElement>(".road-svg path"),
          );
          const route = section.querySelector<SVGPathElement>(".road-route")!;
          const truck = q(".road-truck")[0] as HTMLElement;

          const build = () => {
            const w = road.clientWidth;
            const h = road.clientHeight;
            const d = [
              `M 0 ${h * 0.62}`,
              `C ${w * 0.14} ${h * 0.62}, ${w * 0.2} ${h * 0.2}, ${w * 0.34} ${h * 0.24}`,
              `S ${w * 0.58} ${h * 0.86}, ${w * 0.7} ${h * 0.72}`,
              `S ${w * 0.9} ${h * 0.3}, ${w} ${h * 0.36}`,
            ].join(" ");
            svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
            paths.forEach((path) => path.setAttribute("d", d));
            const length = route.getTotalLength();
            stops.forEach((stop, i) => {
              const point = route.getPointAtLength(
                (length * i) / (steps.length - 1),
              );
              stop.style.left = `${point.x}px`;
              stop.style.top = `${point.y}px`;
              // Labels line up beneath the whole road, clear of the curve.
              stop.style.setProperty("--below", `${h - point.y + 14}px`);
            });
          };
          build();
          ScrollTrigger.addEventListener("refreshInit", build);

          const travel = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);
          setActive(0);
          // Follow the smoothed timeline, not the raw scroll, so a stop
          // lights up as the truck actually arrives at it.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: () =>
              setActive(Math.floor(tl.progress() * (steps.length - 1) + 0.1)),
            scrollTrigger: {
              trigger: section,
              pin: q(".process-pin")[0],
              start: "top top",
              end: () => `+=${travel() * 1.4 + window.innerHeight * 0.7}`,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          tl.to(track, { x: () => -travel() }, 0)
            .fromTo(route, { drawSVG: "0%" }, { drawSVG: "100%" }, 0)
            .to(
              truck,
              {
                motionPath: {
                  path: route,
                  align: route,
                  alignOrigin: [0.5, 0.82],
                  autoRotate: true,
                },
              },
              0,
            );
          gsap.from(q(".step-card"), {
            x: 160,
            autoAlpha: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "ss-out",
            scrollTrigger: { trigger: section, start: "top 70%", once: true },
          });
          return () => {
            ScrollTrigger.removeEventListener("refreshInit", build);
            section.classList.remove("is-horizontal");
            setActive(-1);
          };
        }

        // After Aceternity's tracing beam: the route runs down a rail that
        // fills red to blue as the steps pass.
        gsap.fromTo(
          q(".rail-fill"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: q(".process-track")[0],
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
        cards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: "ss-out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          });
        });
        return () => setActive(-1);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="process"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="process-pin">
        <div className="container process-head">
          <RevealHeading id="process-title" className="display">
            The road back
          </RevealHeading>
          <div className="process-aside">
            <p className="section-lede">
              From a stopped truck to a moving one. This is how a repair with
              Seven Sea goes.
            </p>
            <p className="process-count" aria-hidden="true">
              <span className="process-count-current">01</span>
              <span className="process-count-total">
                / {String(steps.length).padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>

        <div className="process-viewport">
          <span className="process-rail" aria-hidden="true">
            <span className="rail-fill" />
          </span>
          <ol className="process-track">
            {steps.map((step, i) => (
              <li className="step-card" key={step.title}>
                <span className="step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="step-body">
                  <h3>
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p>{step.text}</p>
                  {i === 0 && (
                    <a className="step-link" href={business.phoneHref}>
                      <PhoneIcon />
                      {business.phoneDisplay}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="container process-road" aria-hidden="true">
          <div className="road">
            <svg className="road-svg" preserveAspectRatio="none">
              <path className="road-base" />
              <path className="road-lane" />
              <path className="road-route" />
            </svg>
            {steps.map((step) => (
              <span key={step.stop} className="road-stop">
                <i />
                <em>{step.stop}</em>
              </span>
            ))}
            <span className="road-truck">
              <Truck />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
