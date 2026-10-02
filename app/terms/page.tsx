import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/data/business";
import { canonical } from "@/lib/site";
import { Button } from "@/components/Button";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Website information",
  alternates: { canonical: canonical("/terms") },
};
export default function Terms() {
  return (
    <main id="main" className="doc-page">
      <p className="doc-kicker">Website information</p>
      <h1>Before your visit.</h1>
      <p>
        This website is an introduction to {business.businessName}. Call the
        shop to discuss your truck or trailer, service availability, hours, and
        the work you need arranged.
      </p>
      <h2>Arranging service</h2>
      <p>
        A website visit does not book an appointment or provide a quote. The
        call buttons open your phone app so you can arrange service directly
        with the shop.
      </p>
      <h2>Business information</h2>
      <p>
        Contact details were checked against the public Google Maps listing on
        October 2, 2026. Please confirm your visit with the team before
        travelling to the shop.
      </p>
      <h2>Imagery</h2>
      <p>
        The AI-created images illustrate trucking, repair work, and northern
        road conditions. They do not depict Seven Sea’s actual premises,
        staff, equipment, or customer vehicles, or a specific location.
        Details appear on the <Link href="/photo-credits">image credits page</Link>.
      </p>
      <Button href="/#contact" variant="navy" icon={<ArrowUpRight />}>
        Contact Seven Sea
      </Button>
    </main>
  );
}
