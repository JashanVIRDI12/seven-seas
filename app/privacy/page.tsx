import type { Metadata } from "next";
import { business } from "@/data/business";
import { canonical } from "@/lib/site";
import { Button } from "@/components/Button";
import { ArrowUpRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Website privacy",
  alternates: { canonical: canonical("/privacy") },
};
export default function Privacy() {
  return (
    <main id="main" className="doc-page">
      <p className="doc-kicker">Website information</p>
      <h1>Website privacy.</h1>
      <p>
        This website provides information about {business.businessName} and
        links to call the shop or open its Google Maps listing.
      </p>
      <h2>Using this website</h2>
      <p>
        There are no enquiry forms, advertising pixels, or analytics
        integrations on this website. Fonts and photographs are served with the
        website. The website does not set tracking cookies.
      </p>
      <h2>Calls and external links</h2>
      <p>
        Calling the shop opens the calling application on your device.
        Directions and Google rating links open Google Maps. Those services
        handle information according to their own privacy practices.
      </p>
      <h2>Technical information</h2>
      <p>
        The hosting provider may process technical request information, such as
        an IP address and browser details, to deliver and maintain the website.
      </p>
      <h2>Contact</h2>
      <p>
        For questions about this website, call{" "}
        <a href={business.phoneHref}>{business.phoneDisplay}</a>.
      </p>
      <Button href="/" variant="navy" icon={<ArrowUpRight />}>
        Back to the road ahead
      </Button>
    </main>
  );
}
