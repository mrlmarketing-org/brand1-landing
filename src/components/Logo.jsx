import { BRAND } from "../data/content.js";

// Brand mark: the outline of an employee access card, with an upward
// analytics line zigzagging across the front of it — staffing the
// right people, and the efficiency/growth that follows. Colors are
// hardcoded (not theme vars) so this matches /public/favicon.svg exactly.
export default function Logo({ size = 30, showWord = true }) {
  return (
    <span className="brand">
      <svg
        className="brand-mark"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
      >
        <rect width="32" height="32" rx="9" fill="#071b24" />

        {/* Access card outline */}
        <rect x="5" y="9" width="17" height="16" rx="2.6" stroke="#eef2f0" strokeWidth="1.5" />
        <rect x="11.5" y="6.6" width="7" height="3" rx="1.2" fill="#071b24" stroke="#eef2f0" strokeWidth="1.4" />
        <circle cx="10" cy="14.6" r="2" stroke="#eef2f0" strokeWidth="1.3" />
        <path
          d="M7.4 19.4c0-1.9 1.5-2.8 2.6-2.8s2.6 0.9 2.6 2.8"
          stroke="#eef2f0"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M15 12.6h5.4M15 15.4h5.4" stroke="#eef2f0" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
        <rect x="15" y="18.6" width="3.4" height="2.6" rx="0.6" stroke="#eef2f0" strokeWidth="1.1" opacity="0.55" />

        {/* Upward analytics line, layered in front of the card */}
        <polyline
          points="4.5,25.5 10,19.5 14,22.5 19,14.5 24.5,8"
          stroke="#d3ed05"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.6 8h3.9v3.9"
          stroke="#d3ed05"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWord && <span className="brand-word">{BRAND}</span>}
    </span>
  );
}
