type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChurchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} aria-hidden>
      <path d="M24 4v8M21 7h6" />
      <path d="M16 20l8-8 8 8v22H16z" />
      <path d="M8 42V28l8-6M40 42V28l-8-6" />
      <path d="M21 42v-7a3 3 0 016 0v7" />
      <path d="M24 21.5c-1.4-1.8-4-.9-4 1 0 2 4 4 4 4s4-2 4-4c0-1.9-2.6-2.8-4-1z" />
      <path d="M5 42h38" />
    </svg>
  );
}

export function ReceptionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} aria-hidden>
      <path d="M13 10h9l-1 9a3.5 3.5 0 01-7 0z" transform="rotate(-12 17.5 18)" />
      <path d="M26 10h9l-1 9a3.5 3.5 0 01-7 0z" transform="rotate(12 30.5 18)" />
      <path d="M16.5 25.5l2 13M31.5 25.5l-2 13M14 39h9M25 39h9" />
      <path d="M24 4v3M19 6l1.5 2M29 6l-1.5 2" />
      <path d="M15 13.5h6M27 13.5h6" opacity=".6" />
    </svg>
  );
}

export function TraditionalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} aria-hidden>
      <ellipse cx="24" cy="14" rx="12" ry="4" />
      <path d="M12 14v18c0 2.2 5.4 4 12 4s12-1.8 12-4V14" />
      <path d="M12 20l6 14M18 18l6 18M24 18l6 18M30 18l6 14" opacity=".6" />
      <path d="M8 6l8 6M40 6l-8 6" />
    </svg>
  );
}

export function GiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...base} aria-hidden>
      <rect x="8" y="18" width="32" height="8" rx="1.5" />
      <path d="M11 26v15h26V26M24 18v23" />
      <path d="M24 18c-3-6-11-8-11-3 0 3 6 3 11 3zM24 18c3-6 11-8 11-3 0 3-6 3-11 3z" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8} aria-hidden>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M12 17.2s-2.6-1.5-2.6-3.1c0-1.3 1.7-1.8 2.6-.7.9-1.1 2.6-.6 2.6.7 0 1.6-2.6 3.1-2.6 3.1z" />
    </svg>
  );
}

export const eventIcons = {
  church: ChurchIcon,
  reception: ReceptionIcon,
  traditional: TraditionalIcon,
};
