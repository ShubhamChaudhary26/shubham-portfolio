type IconProps = { id: string };

const svgProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function FeatureIcon({ name }: { name: string }) {
  switch (name) {
    case "Inbound calls":
      return (
        <svg {...svgProps}>
          <path d="M8 4h3l1.5 3.5-2 1.2a12 12 0 0 0 5 5l1.2-2L20.5 13v3a2 2 0 0 1-2.2 2A16 16 0 0 1 6 6.2 2 2 0 0 1 8 4z" />
          <path d="M15 5v4h4" />
          <path d="M19 5l-4 4" />
        </svg>
      );
    case "Outbound calls":
      return (
        <svg {...svgProps}>
          <path d="M8 4h3l1.5 3.5-2 1.2a12 12 0 0 0 5 5l1.2-2L20.5 13v3a2 2 0 0 1-2.2 2A16 16 0 0 1 6 6.2 2 2 0 0 1 8 4z" />
          <path d="M15 9V5h4" />
          <path d="M15 5l4 4" />
        </svg>
      );
    case "Instagram & Facebook Leads":
      return (
        <svg {...svgProps}>
          <path d="M16 19v-1.2A3.2 3.2 0 0 0 12.8 14.6H7.2A3.2 3.2 0 0 0 4 17.8V19" />
          <circle cx="10" cy="8" r="3" />
          <path d="M20 19v-1a3 3 0 0 0-2.2-2.9" />
          <path d="M16 5.1a3 3 0 0 1 0 5.8" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <rect height="14" rx="2" width="10" x="7" y="5" />
          <path d="M11 5V4a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v1" />
          <path d="M10 12h4" />
        </svg>
      );
  }
}

export function BusinessIcon({ id }: IconProps) {
  switch (id) {
    case "clinic":
      return (
        <svg {...svgProps}>
          <rect height="16" rx="3" width="16" x="4" y="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "real-estate":
      return (
        <svg {...svgProps}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
          <path d="M10 21v-6h4v6" />
        </svg>
      );
    case "restaurant":
      return (
        <svg {...svgProps}>
          <path d="M6 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
          <path d="M8 3v18M16 3v7c0 2 2 3 2 3v8" />
        </svg>
      );
    case "salon":
      return (
        <svg {...svgProps}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M8 7.5 18 17.5M8 16.5 18 6.5" />
        </svg>
      );
    case "coaching":
      return (
        <svg {...svgProps}>
          <path d="M4 5.5h7v13H4zM13 5.5h7v13h-7z" />
          <path d="M11 5.5v13" />
        </svg>
      );
    case "gym":
      return (
        <svg {...svgProps}>
          <path d="M7 8v8M17 8v8M4 10v4M20 10v4M7 12h10" />
        </svg>
      );
    case "hotel":
      return (
        <svg {...svgProps}>
          <path d="M3 18V9a2 2 0 0 1 2-2h7v11" />
          <path d="M12 11h7a2 2 0 0 1 2 2v5" />
          <path d="M3 18h18" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <circle cx="6" cy="12" fill="currentColor" r="1.2" />
          <circle cx="12" cy="12" fill="currentColor" r="1.2" />
          <circle cx="18" cy="12" fill="currentColor" r="1.2" />
        </svg>
      );
  }
}
