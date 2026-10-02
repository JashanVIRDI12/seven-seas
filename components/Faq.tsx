"use client";

import { useRef, type MouseEvent } from "react";
import { business } from "@/data/business";
import { faqs as homeFaqs } from "@/data/content";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/motion";
import { RevealHeading } from "./RevealHeading";
import { Button } from "./Button";
import { PhoneIcon, PlusIcon } from "./Icons";

/**
 * Native <details> keeps the answers usable without JavaScript; GSAP only
 * animates the height between the two states the browser already knows.
 */
export function Faq({
  items = homeFaqs,
  title = "Before you call",
}: {
  items?: readonly { question: string; answer: string }[];
  title?: string;
} = {}) {
  const root = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: root });

  const toggle = contextSafe((event: MouseEvent<HTMLElement>) => {
    const details = event.currentTarget.parentElement as HTMLDetailsElement;
    const answer = details.querySelector<HTMLElement>(".faq-answer")!;
    if (prefersReducedMotion()) return;
    event.preventDefault();
    if (details.dataset.animating) return;
    details.dataset.animating = "true";
    const done = () => {
      delete details.dataset.animating;
      ScrollTrigger.refresh();
    };
    if (!details.open) {
      details.open = true;
      gsap.fromTo(
        answer,
        { height: 0, autoAlpha: 0 },
        {
          height: "auto",
          autoAlpha: 1,
          duration: 0.6,
          ease: "ss-out",
          clearProps: "height,opacity,visibility",
          onComplete: done,
        },
      );
    } else {
      details.dataset.closing = "true";
      gsap.to(answer, {
        height: 0,
        autoAlpha: 0,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          details.open = false;
          delete details.dataset.closing;
          gsap.set(answer, { clearProps: "height,opacity,visibility" });
          done();
        },
      });
    }
  });

  return (
    <section
      ref={root}
      className="faq section"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="container faq-grid">
        <div className="faq-side">
          <RevealHeading id="faq-title" className="display">
            {title}
          </RevealHeading>
          <div className="faq-help">
            <p>Still have a question? The fastest answer is a phone call.</p>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              {business.phoneDisplay}
            </Button>
          </div>
        </div>
        <div className="faq-list">
          {items.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary onClick={toggle}>
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  <PlusIcon />
                </span>
              </summary>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
