import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { services } from "@/data/services";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const origin = siteUrl;
  return [
    "/",
    "/services",
    ...services.map((service) => `/services/${service.slug}`),
    "/about",
    "/how-it-works",
    "/contact",
    "/privacy",
    "/terms",
    "/photo-credits",
  ].map((path) => ({
    url: new URL(path, origin).toString(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.3,
  }));
}
