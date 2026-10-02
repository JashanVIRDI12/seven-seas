import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Interactions } from "@/components/Interactions";
import { PageTransition } from "@/components/PageTransition";
import { MobileCallBar } from "@/components/MobileCallBar";
import { business } from "@/data/business";
import { canonical, siteUrl } from "@/lib/site";
import { introScript } from "@/lib/intro";
import "./globals.css";

// Bricolage Grotesque sets every word; its optical-size axis sharpens the
// ink traps at headline sizes and opens the letters up for reading.
const sans = localFont({
  src: "../public/fonts/bricolage-grotesque-variable.woff2",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});
// Unbounded is reserved for the SEVEN SEA lettering, like a truck's
// sleeper-cab decal.
const brand = localFont({
  src: "../public/fonts/unbounded-variable.woff2",
  weight: "200 900",
  variable: "--font-brand",
  display: "swap",
});

const title =
  "Heavy-Duty Truck & Trailer Repair in Prince George, BC | Seven Sea";
const description =
  "Keep the north moving. Seven Sea Truck & Trailer Repair Ltd. provides heavy-duty truck and trailer repair in Prince George, British Columbia. Call to arrange service.";
export const metadata: Metadata = {
  // Local social previews work while the production origin remains unset.
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  ...(siteUrl ? { alternates: { canonical: canonical() } } : {}),
  title: { default: title, template: "%s | Seven Sea Truck & Trailer Repair" },
  description,
  applicationName: "Seven Sea",
  category: "Truck & trailer repair",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_CA",
    siteName: business.businessName,
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = {
  themeColor: "#F3F5F9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The pre-paint script adds motion and intro classes to <html>.
    <html
      lang="en-CA"
      className={`${sans.variable} ${brand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <div id="top" />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Navigation />
        {children}
        <Footer />
        <MobileCallBar />
        <Cursor />
        <Interactions />
        <PageTransition />
      </body>
    </html>
  );
}
