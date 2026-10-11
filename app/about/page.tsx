import type { Metadata } from "next";
import { business } from "@/data/business";
import { canonical } from "@/lib/site";
import { PhotoHero } from "@/components/PhotoHero";
import { AboutIntro } from "@/components/AboutIntro";
import { PhotoCards } from "@/components/PhotoCards";
import { Facts } from "@/components/Facts";
import { Mosaic } from "@/components/Mosaic";
import { CallToAction } from "@/components/CallToAction";
import { Button } from "@/components/Button";
import { ArrowUpRight, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "We’re a heavy-duty truck and trailer repair shop in Prince George, BC, serving owner-operators and fleets. Our work starts with understanding your equipment, the problem and what you need to get back to business.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  return (
    <main id="main" className="svc-page">
      <PhotoHero
        photo="winter"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="Get to Know Seven Sea"
        lede="We’re a heavy-duty truck and trailer repair shop in Prince George, BC, serving owner-operators and fleets. Our work starts with understanding your equipment, the problem and what you need to get back to business."
        actions={
          <>
            <Button href={business.phoneHref} icon={<PhoneIcon />}>
              Talk to Our Team
            </Button>
            <Button href="/services" variant="glass" icon={<ArrowUpRight />}>
              Explore Our Services
            </Button>
          </>
        }
      />

      <AboutIntro />

      <Facts />

      <PhotoCards
        id="how-title"
        title="What You Can Expect From Us"
        lede="A straightforward approach to repairs, with attention to your equipment and the business behind it."
        items={[
          {
            photo: "convoy",
            label: "",
            title: "Our Focus",
            text: "Your truck and trailer have a job to do. Our focus is on addressing the repair needs that stand in the way.",
          },
          {
            photo: "mechanicRed",
            label: "",
            title: "Our Approach",
            text: "You know how your equipment normally runs. What you’ve noticed helps us understand the concern and discuss the work needed.",
          },
          {
            photo: "fleetYard",
            label: "",
            title: "Our Customers",
            text: "We work with owner-operators and fleet managers, giving attention to each truck or trailer and its role in your operation.",
          },
          {
            photo: "kenworth",
            label: "",
            title: "Our Home",
            text: "Seven Sea serves heavy-duty truck and trailer operators in Prince George, BC. Contact our local shop to discuss your repair needs.",
          },
        ]}
      />

      <Mosaic
        keys={["workshop", "wheel", "sparks", "winter"]}
        line="Got A Problem? We Have A Solution."
      />
      <CallToAction />
    </main>
  );
}
