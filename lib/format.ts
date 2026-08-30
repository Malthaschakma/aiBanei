const BDT = "\u09f3";

/**
 * South Asian short-scale money. 1 lakh = 100,000 and 1 crore = 10,000,000, so
 * `2500000` renders as "৳25L" rather than "৳2.5M".
 */
export function formatBdt(
  amount: number | null | undefined,
  options: { compact?: boolean } = {},
): string {
  if (amount === null || amount === undefined) return "\u2014";
  const { compact = true } = options;

  if (!compact) {
    return `${BDT}${new Intl.NumberFormat("en-IN").format(Math.round(amount))}`;
  }

  if (amount >= 10_000_000) {
    return `${BDT}${trim(amount / 10_000_000)}Cr`;
  }
  if (amount >= 100_000) {
    return `${BDT}${trim(amount / 100_000)}L`;
  }
  if (amount >= 1_000) {
    return `${BDT}${trim(amount / 1_000)}K`;
  }
  return `${BDT}${Math.round(amount)}`;
}

/** Drops a trailing ".0" so "25.0L" reads as "25L". */
function trim(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "\u2014";
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatPercent(
  value: number | null | undefined,
  options: { signed?: boolean; decimals?: number } = {},
): string {
  if (value === null || value === undefined) return "\u2014";
  const { signed = false, decimals = 0 } = options;
  const sign = signed && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Coarse relative time for "last active" signals. Deliberately imprecise past
 * a week — exact timestamps invite over-reading someone's availability.
 */
export function formatRelativeTime(
  input: string | Date,
  now: Date = new Date(),
): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3_600_000);

  if (diffHours < 1) return "Active just now";
  if (diffHours < 24) return `Active ${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Active yesterday";
  if (diffDays < 7) return `Active ${diffDays} days ago`;
  if (diffDays < 30) return `Active ${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `Active ${Math.floor(diffDays / 30)}mo ago`;
  return "Active over a year ago";
}

export function formatLocation(location: {
  city: string;
  region: string | null;
  country: string;
}): string {
  return [location.city, location.country].filter(Boolean).join(", ");
}
