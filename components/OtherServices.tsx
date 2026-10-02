import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";
import { services, type ServiceSlug } from "@/data/services";
import { RevealHeading } from "./RevealHeading";
import { ArrowUpRight } from "./Icons";

/** The other two services as full photographs to step into. */
export function OtherServices({ current }: { current: ServiceSlug }) {
  const others = services.filter((service) => service.slug !== current);
  return (
    <section className="os section" aria-labelledby="os-title">
      <div className="container">
        <header className="section-head">
          <RevealHeading id="os-title" className="display">
            Other services
          </RevealHeading>
          <p className="section-lede">
            The same shop and the same first step: a call.
          </p>
        </header>
        <ul className="os-grid">
          {others.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="os-card"
                data-cursor={`Explore ${service.word.toLowerCase()}`}
              >
                <span className="os-media">
                  <Image
                    src={photos[service.hero].src}
                    style={{ objectPosition: photos[service.hero].focus }}
                    alt=""
                    fill
                    sizes="(min-width: 900px) 50vw, 100vw"
                  />
                </span>
                <span className="os-word" aria-hidden="true">
                  {service.word}
                </span>
                <span className="os-body">
                  <span className="os-title">{service.title}</span>
                  <span className="os-line">{service.menuLine}</span>
                </span>
                <span className="icon-chip os-arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
