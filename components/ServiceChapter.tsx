import Image from "next/image";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import type { Service } from "@/data/services";
import { RevealHeading } from "./RevealHeading";
import { Button } from "./Button";
import { ArrowUpRight, PhoneIcon } from "./Icons";

const tones = ["paper", "ink", "red"] as const;

/**
 * One service as an editorial spread: a large photograph with a second
 * one overlapping it, a sticker, and the essentials beside them.
 */
export function ServiceChapter({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const tone = tones[index % tones.length];
  const reverse = index % 2 === 1;
  const main = photos[service.hero];
  const inset = photos[service.inset];

  return (
    <section
      id={service.slug}
      className={`ch ch-${tone}${reverse ? " ch-rev" : ""}`}
      aria-labelledby={`ch-${service.slug}`}
    >
      <div className="container ch-grid">
        <div className="ch-media">
          <figure className="ch-main">
            <Image
              src={main.src}
              alt={main.alt}
              style={{ objectPosition: main.focus }}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </figure>
          <figure className="ch-inset">
            <Image
              src={inset.src}
              alt={inset.alt}
              style={{ objectPosition: inset.focus }}
              fill
              sizes="(min-width: 1024px) 24vw, 50vw"
            />
          </figure>
          <span className="ch-sticker" aria-hidden="true">
            {service.sticker}
          </span>
        </div>
        <div className="ch-copy">
          <RevealHeading id={`ch-${service.slug}`} className="ch-title">
            {service.title}
          </RevealHeading>
          <p className="ch-lede">{service.lede}</p>
          <div className="ch-tells">
            <p className="ch-tells-label">Have this ready when you call</p>
            <ul>
              {service.tellUs.map((item) => (
                <li key={item.field}>{item.title}</li>
              ))}
            </ul>
          </div>
          <div className="ch-actions">
            <Button
              href={`/services/${service.slug}`}
              variant={tone === "red" ? "white" : "red"}
              icon={<ArrowUpRight />}
            >
              {`Explore ${service.word.toLowerCase()}`}
            </Button>
            <a className="ch-call" href={business.phoneHref}>
              <PhoneIcon />
              {service.action}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
