import { business } from "@/data/business";
import { canonical } from "@/lib/site";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Statement } from "@/components/Statement";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Local } from "@/components/Local";
import { Faq } from "@/components/Faq";
import { XRay } from "@/components/XRay";
import { CallToAction } from "@/components/CallToAction";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.businessName,
    telephone: business.phone,
    ...(canonical() ? { url: canonical() } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.provinceCode,
      postalCode: business.postalCode,
      addressCountry: business.countryCode,
    },
    geo: { "@type": "GeoCoordinates", ...business.coordinates },
    hasMap: business.googleMapsUrl,
    ...(business.email ? { email: business.email } : {}),
    ...(business.hours ? { openingHours: business.hours } : {}),
  };

  return (
    <>
      <Preloader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Hero />
        <Ticker />
        <Statement />
        <Services />
        <XRay />
        <Process />
        <Local />
        <Faq />
        <CallToAction />
      </main>
    </>
  );
}
