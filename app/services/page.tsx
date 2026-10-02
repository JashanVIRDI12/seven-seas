import type { Metadata } from "next";
import Image from "next/image";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { services } from "@/data/services";
import { canonical } from "@/lib/site";
import { PhotoHero } from "@/components/PhotoHero";
import { ServiceChapter } from "@/components/ServiceChapter";
import { ImageType } from "@/components/ImageType";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/Button";
import { PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Heavy-duty truck repair, trailer repair, and work for owner-operators and fleets at Seven Sea in Prince George, BC.",
  alternates: { canonical: canonical("/services") },
};

export default function ServicesPage() {
  return (
    <main id="main" className="svc-page">
      <PhotoHero
        photo="workshop"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title="What we fix"
        lede="Heavy-duty truck and trailer repair in Prince George, for owner-operators and fleets alike."
        actions={
          <Button href={business.phoneHref} icon={<PhoneIcon />}>
            Call the shop
          </Button>
        }
      >
        <nav className="ph-quick" aria-label="Jump to a service">
          {services.map((service) => (
            <a key={service.slug} href={`#${service.slug}`} className="ph-chip">
              <span className="ph-chip-img" aria-hidden="true">
                <Image
                  src={photos[service.hero].src}
                  style={{ objectPosition: photos[service.hero].focus }}
                  alt=""
                  fill
                  sizes="64px"
                />
              </span>
              {service.title}
            </a>
          ))}
        </nav>
      </PhotoHero>

      {services.map((service, i) => (
        <ServiceChapter key={service.slug} service={service} index={i} />
      ))}

      <ImageType text="Keep the north moving." photo="mechanicRed" />
      <CallToAction />
    </main>
  );
}
