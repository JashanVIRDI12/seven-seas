"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { photos, type PhotoKey } from "@/data/photos";
import { ScrollTrigger, useGSAP } from "@/lib/motion";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * A full-bleed photograph with the page title along the bottom. Static by
 * design; the only script keeps the navigation legible over the image.
 */
export function PhotoHero({
  photo,
  crumbs,
  title,
  lede,
  actions,
  children,
  compact = false,
}: {
  photo: PhotoKey;
  crumbs: { label: string; href?: string }[];
  title: string;
  lede: string;
  actions?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const image = photos[photo];

  useGSAP(
    () => {
      // The header lives outside this section, so pass the element itself.
      const header = document.querySelector(".site-header");
      if (!header) return;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom 72px",
        toggleClass: { targets: header, className: "on-dark" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={`ph${compact ? " ph-compact" : ""}`}
      aria-labelledby="page-title"
    >
      <div className="ph-media">
        <Image
          src={image.src}
          alt={image.alt}
          style={{ objectPosition: image.focus }}
          fill
          sizes="(max-width: 899px) max(150svh, 1050px), 100vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <span className="ph-shade" aria-hidden="true" />
      <div className="container ph-inner">
        <Breadcrumbs items={crumbs} />
        <div className="ph-bottom">
          <h1 id="page-title" className="ph-title">
            {title}
          </h1>
          <div className="ph-row">
            <p className="ph-lede">{lede}</p>
            {actions && <div className="ph-actions">{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
