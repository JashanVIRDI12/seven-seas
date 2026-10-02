import type { Metadata } from "next";
import { business } from "@/data/business";
import { canonical } from "@/lib/site";
import { PhotoHero } from "@/components/PhotoHero";
import { HighlightText } from "@/components/HighlightText";
import { PhotoCards } from "@/components/PhotoCards";
import { Facts } from "@/components/Facts";
import { Mosaic } from "@/components/Mosaic";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/Button";
import { ArrowUpRight, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Seven Sea Truck & Trailer Repair Ltd. is a heavy-duty truck and trailer repair shop in Prince George, BC, built around getting you back on the road.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  return (
    <main id="main" className="svc-page">
      <PhotoHero
        photo="winter"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About Seven Sea"
        lede="A heavy-duty truck and trailer repair shop in Prince George, built around one job: getting you back on the road."
        actions={
          <>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              Call the shop
            </Button>
            <Button href="/services" variant="glass" icon={<ArrowUpRight />}>
              Our services
            </Button>
          </>
        }
      />

      <HighlightText
        label="Why we work the way we do"
        text="We know what a stopped truck costs. [[Freight to deliver]], a crew waiting, another long stretch of highway ahead. So the first step is always [[a straight conversation]]: what’s wrong, [[whether we can take it on]] and [[when you can bring it in]]."
        photos={["hands", "truckEngine"]}
      />

      <Facts />

      <PhotoCards
        id="how-title"
        title="How we work"
        lede="What matters to us, from the first call to the road."
        items={[
          {
            photo: "convoy",
            label: "The job",
            title: "Back on the road",
            text: "Every repair is measured by one thing: your truck or trailer moving again.",
          },
          {
            photo: "mechanicRed",
            label: "The first step",
            title: "A real conversation",
            text: "Call, describe what’s happening, and we’ll tell you whether it’s work we can take on.",
          },
          {
            photo: "fleetYard",
            label: "Who we work with",
            title: "One truck or a fleet",
            text: "Owner-operators and fleet coordinators start the same way: a call about the work.",
          },
          {
            photo: "kenworth",
            label: "Where",
            title: "Prince George, BC",
            text: `Our shop is at ${business.address}, on the roads that keep Northern BC moving.`,
          },
        ]}
      />

      <Mosaic
        keys={["workshop", "wheel", "sparks", "winter"]}
        line="Truck down? Start with a call."
      />
      <CallToAction />
    </main>
  );
}
