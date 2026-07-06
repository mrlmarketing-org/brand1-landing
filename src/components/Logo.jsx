import { BRAND } from "../data/content.js";

// Brand mark: a rounded square with an abstract checkmark, plus a
// two-tone wordmark ("Staffing" in ink, "Fixed" in accent teal). Splits
// on capitalized word boundaries, so it works whether BRAND in
// content.js is written as "StaffingFixed" or "Staffing Fixed".
export default function Logo({ size = 30 }) {
  const words = BRAND.match(/[A-Z][a-z]*/g) || [BRAND];
  const first = words[0];
  const second = words.slice(1).join("");

  return (
    <span className="brand">
      <svg
        className="brand-mark"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-dark)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#logoGradient)" />
        <path
          d="M9 17.5l4.5 4.5L23 11"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span>
        {first}
        {second && <span className="brand-word-fixed">{second}</span>}
      </span>
    </span>
  );
}
