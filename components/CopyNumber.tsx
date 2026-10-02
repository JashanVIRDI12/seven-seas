"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/data/business";
import { CheckIcon, CopyIcon } from "./Icons";

/**
 * After Framer University's click-to-copy: one click copies, the icon and
 * label roll to a confirmation, and screen readers hear what was copied.
 */
export function CopyButton({
  text,
  label,
  done = "Copied",
  announce,
  className = "",
  disabled = false,
}: {
  text: string;
  label: string;
  done?: string;
  announce: string;
  className?: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard access can be refused; the text stays visible to copy.
    }
  };

  return (
    <>
      <button
        type="button"
        className={`copy-btn ${className}`}
        data-state={copied ? "copied" : "idle"}
        onClick={copy}
        disabled={disabled}
      >
        <span className="copy-icon" aria-hidden="true">
          <CopyIcon />
          <CheckIcon />
        </span>
        <span className="copy-label">
          <span className="copy-label-a">{label}</span>
          <span className="copy-label-b" aria-hidden="true">
            {done}
          </span>
        </span>
      </button>
      <span className="sr-only" role="status">
        {copied ? announce : ""}
      </span>
    </>
  );
}

/** On a desk, a fleet coordinator can't tap a phone link. */
export function CopyNumber({ className = "" }: { className?: string }) {
  return (
    <CopyButton
      text={business.phoneDisplay}
      label="Copy number"
      announce="Phone number copied"
      className={className}
    />
  );
}
