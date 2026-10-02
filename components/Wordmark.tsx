/**
 * The mark is a road-built seven with a beacon that flashes red and blue,
 * like the light bar on a service truck. Colors follow --mark-* tokens.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mark ${className}`}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect className="mark-plate" width="40" height="40" rx="11" />
      <path className="mark-seven" d="M11 12.5h17.5L18 29" />
      <path className="mark-lane" d="M14.5 19.5h6.5" />
      <circle className="mark-beacon" cx="28.5" cy="27.5" r="3" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="wordmark">
      <Mark />
      <span className="wordmark-text">
        <strong className="brand-word">SEVEN SEA</strong>
        {!compact && <small>Truck &amp; Trailer Repair</small>}
      </span>
    </span>
  );
}
