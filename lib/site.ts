/** Supply the final origin at build time, once a production domain is chosen. */
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = configuredOrigin
  ? new URL(configuredOrigin).origin
  : null;

export function canonical(path = "/") {
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}
