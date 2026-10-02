import Link from "next/link";
import { business } from "@/data/business";
import { navLinks } from "@/data/content";
import { services } from "@/data/services";
import { FooterMark } from "./FooterMark";
import { ArrowUp, ArrowUpRight } from "./Icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="footer-label">Visit the shop</h2>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-strong"
            >
              {business.address}
              <br />
              {business.city}, {business.provinceCode} {business.postalCode}
              <ArrowUpRight />
            </a>
          </div>
          <div className="footer-col">
            <h2 className="footer-label">Call to arrange service</h2>
            <a href={business.phoneHref} className="footer-strong">
              {business.phoneDisplay}
            </a>
          </div>
          <nav className="footer-col" aria-label="Services">
            <h2 className="footer-label">Services</h2>
            <ul>
              {services.map(({ slug, title }) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="footer-col" aria-label="Footer">
            <h2 className="footer-label">On this site</h2>
            <ul>
              {navLinks.map(({ label, id, href }) => (
                <li key={id}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="footer-col" aria-label="Legal">
            <h2 className="footer-label">Website</h2>
            <ul>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/photo-credits">Image credits</Link>
              </li>
            </ul>
          </nav>
        </div>
        <FooterMark />
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {business.businessName}
          </p>
          <a href="#top" className="to-top">
            Back to top
            <span className="icon-chip">
              <ArrowUp />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
