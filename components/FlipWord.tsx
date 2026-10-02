"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MEDIA } from "@/lib/motion";
import { onIntroDone } from "@/lib/intro";

/**
 * After 21st.dev's Flip Words and Text Roll: the word in the pill rolls
 * letter by letter to the next one. The pill is always as wide as the
 * longest word, so nothing around it moves. The cycle pauses whenever the
 * headline is off screen.
 */
export function FlipWord({ words }: { words: readonly string[] }) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const el = root.current!;
        el.classList.add("is-live");
        const slots = gsap.utils.toArray<HTMLElement>(".flip-word", el);
        const splits = slots.map((slot) =>
          SplitText.create(slot, { type: "chars", aria: "none" }),
        );
        let index = 0;
        gsap.set(slots.slice(1), { autoAlpha: 0 });

        const roll = () => {
          const next = (index + 1) % slots.length;
          gsap
            .timeline({ defaults: { ease: "ss-out" } })
            .to(splits[index].chars, {
              yPercent: -110,
              rotateX: 90,
              opacity: 0,
              duration: 0.45,
              stagger: 0.03,
              ease: "power3.in",
            })
            .set(slots[next], { autoAlpha: 1 }, 0.35)
            .fromTo(
              splits[next].chars,
              { yPercent: 110, rotateX: -90, opacity: 0 },
              {
                yPercent: 0,
                rotateX: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.035,
              },
              0.35,
            )
            .set(slots[index], { autoAlpha: 0 })
            .set(splits[index].chars, { yPercent: 0, rotateX: 0, opacity: 1 });
          index = next;
        };

        let timer: gsap.core.Tween | undefined;
        let visible = true;
        const queue = () => {
          timer = gsap.delayedCall(2.4, () => {
            roll();
            queue();
          });
          if (!visible) timer.pause();
        };
        const unsubscribe = onIntroDone(() => gsap.delayedCall(1.6, queue));
        // Watch the hero section itself: the word sits inside a card that
        // is tilted in 3D, which would skew a position-based check.
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) timer?.resume();
          else timer?.pause();
        });
        observer.observe(el.closest("section") ?? el);
        return () => {
          observer.disconnect();
          unsubscribe();
          timer?.kill();
          splits.forEach((split) => split.revert());
          el.classList.remove("is-live");
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <span ref={root} className="flip" aria-hidden="true">
      {words.map((word) => (
        <span key={word} className="flip-word">
          {word}
        </span>
      ))}
    </span>
  );
}
