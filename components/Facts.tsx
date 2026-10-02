import { business } from "@/data/business";
import { ArrowUpRight, Stars } from "./Icons";

/** Four verified facts in large type on navy. */
export function Facts() {
  const { latitude, longitude } = business.coordinates;
  return (
    <section className="facts" aria-label="Seven Sea at a glance">
      <div className="container">
        <dl className="facts-grid">
          <div className="fact">
            <dt>Google rating</dt>
            <dd>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fact-link"
              >
                <span className="fact-value">{business.googleRating}</span>
                <span className="sr-only"> out of 5, on Google Maps</span>
                <Stars className="fact-stars" />
                <ArrowUpRight />
              </a>
            </dd>
          </div>
          <div className="fact">
            <dt>What we repair</dt>
            <dd className="fact-value">Trucks &amp; trailers</dd>
          </div>
          <div className="fact">
            <dt>Where</dt>
            <dd className="fact-value">Prince George, BC</dd>
          </div>
          <div className="fact">
            <dt>On the map</dt>
            <dd className="fact-value fact-coords">
              {latitude.toFixed(2)}° N, {Math.abs(longitude).toFixed(2)}° W
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
