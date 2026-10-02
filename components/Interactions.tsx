"use client";

import { useEffect } from "react";

/**
 * Directional button fill, after Framer University's hover buttons: the
 * fill grows from where the pointer enters and retracts toward where it
 * leaves. One delegated listener serves every `.btn` on the page.
 */
export function Interactions() {
  useEffect(() => {
    const place = (event: PointerEvent) => {
      const button = (event.target as Element).closest?.<HTMLElement>(".btn");
      if (!button) return;
      const related = event.relatedTarget as Node | null;
      if (related && button.contains(related)) return;
      const r = button.getBoundingClientRect();
      button.style.setProperty("--fx", `${event.clientX - r.left}px`);
      button.style.setProperty("--fy", `${event.clientY - r.top}px`);
    };
    document.addEventListener("pointerover", place);
    document.addEventListener("pointerout", place);
    return () => {
      document.removeEventListener("pointerover", place);
      document.removeEventListener("pointerout", place);
    };
  }, []);
  return null;
}
