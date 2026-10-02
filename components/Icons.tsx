type IconProps = { className?: string };

function Svg({
  className = "",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.2 3.5h3.1l1.6 4.2-2.1 1.4a11.4 11.4 0 0 0 7.1 7.1l1.4-2.1 4.2 1.6v3.1a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2Z" />
    </Svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </Svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 6.5h10.5v9H2.5zM13 9.5h4l3.5 3.5v2.5H13" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
    </Svg>
  );
}

export function TrailerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 5.5h15v10h-15zM17.5 13.5h4M2.5 10.5h15" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="11" cy="17.5" r="1.8" />
    </Svg>
  );
}

export function FleetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4.5h8v5M15 6.5h3l2.5 2.5v2" />
      <path d="M2.5 10.5h9v6h-9zM11.5 12.5h3.5l2.5 2.5v1.5h-6" />
      <circle cx="5.5" cy="18.5" r="1.6" />
      <circle cx="14.5" cy="18.5" r="1.6" />
    </Svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
      <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

/** A hex nut: the separator in the scope ticker. */
export function NutIcon(props: IconProps) {
  return (
    <svg
      className={`icon ${props.className ?? ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 1.6 21 6.8v10.4L12 22.4 3 17.2V6.8Zm0 6.4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      />
    </svg>
  );
}

export function Stars({ className = "" }: IconProps) {
  const star =
    "M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.5-4.2 6.1-.8Z";
  return (
    <svg
      className={`stars ${className}`}
      viewBox="0 0 120 24"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 24, 48, 72, 96].map((x) => (
        <path key={x} d={star} transform={`translate(${x} 0)`} />
      ))}
    </svg>
  );
}
