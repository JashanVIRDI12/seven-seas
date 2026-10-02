import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "red" | "navy" | "ghost" | "glass" | "white";

/** Label that rolls to a duplicate on hover; the copy is hidden from AT. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function Button({
  href,
  children,
  icon,
  variant = "red",
  external = false,
  className = "",
  ...rest
}: {
  href: string;
  children: string;
  icon?: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const classes = `btn btn-${variant} ${className}`;
  const content = (
    <>
      <Roll>{children}</Roll>
      {icon && <span className="btn-icon">{icon}</span>}
    </>
  );
  if (href.startsWith("/"))
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
