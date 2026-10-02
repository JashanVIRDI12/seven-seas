import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/data/business";
import { getService, services } from "@/data/services";
import { canonical } from "@/lib/site";
import { PhotoHero } from "@/components/PhotoHero";
import { HighlightText } from "@/components/HighlightText";
import { PhotoCards } from "@/components/PhotoCards";
import { Mosaic } from "@/components/Mosaic";
import { OtherServices } from "@/components/OtherServices";
import { Faq } from "@/components/Faq";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/Button";
import { ArrowDown, PhoneIcon } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: canonical(`/services/${slug}`) },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = canonical(`/services/${slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    areaServed: `${business.city}, ${business.province}`,
    provider: {
      "@type": "AutoRepair",
      name: business.businessName,
      telephone: business.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address,
        addressLocality: business.city,
        addressRegion: business.provinceCode,
        postalCode: business.postalCode,
        addressCountry: business.countryCode,
      },
    },
    ...(url ? { url } : {}),
  };

  return (
    <main id="main" className="svc-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <PhotoHero
        photo={service.hero}
        compact
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        title={service.title}
        lede={service.lede}
        actions={
          <>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              {service.action}
            </Button>
            <Button href="#tell-title" variant="glass" icon={<ArrowDown />}>
              What to tell us
            </Button>
          </>
        }
      />
      <HighlightText
        text={service.highlight}
        label={`About ${service.title.toLowerCase()}`}
        photos={service.statement}
      />
      <PhotoCards
        id="tell-title"
        title="What to tell us"
        lede="Four things that make the first call quick. Have what you can; we’ll ask about the rest."
        items={service.tellUs.map((item) => ({
          photo: item.photo,
          label: item.field,
          title: item.title,
          text: item.text,
        }))}
      />
      <Mosaic keys={service.gallery} line={`${service.sticker}.`} />
      <OtherServices current={service.slug} />
      <Faq
        items={service.faqs}
        title={`Questions about ${service.title.toLowerCase()}`}
      />
      <CallToAction />
    </main>
  );
}
