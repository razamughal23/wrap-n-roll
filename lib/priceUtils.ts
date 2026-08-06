export interface PriceOption {
  size: string;
  price: number;
  label: string;
}

export interface ParsedPrice {
  isMultiSize: boolean;
  singlePrice?: number;
  options?: PriceOption[];
}

/** Parses "Rs. 400" or "S 450 / M 850 / L 1400 / XL 1800" etc. */
export function parsePrice(raw: string): ParsedPrice {
  if (!raw.includes("/")) {
    const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
    return { isMultiSize: false, singlePrice: isNaN(num) ? 0 : num };
  }

  const options: PriceOption[] = raw
    .split("/")
    .map((p) => p.trim())
    .map((part) => {
      const m = part.match(/^(XL|S|M|L)\s+(?:Rs\.\s*)?(\d+)$/);
      if (!m) return null;
      const [, size, n] = m;
      const price = parseInt(n, 10);
      return { size, price, label: `${size} — Rs. ${price.toLocaleString()}` };
    })
    .filter(Boolean) as PriceOption[];

  if (!options.length) {
    const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
    return { isMultiSize: false, singlePrice: isNaN(num) ? 0 : num };
  }
  return { isMultiSize: true, options };
}

export function getPriceRange(raw: string): string {
  const p = parsePrice(raw);
  if (!p.isMultiSize) return `Rs. ${p.singlePrice?.toLocaleString()}`;
  const prices = p.options!.map((o) => o.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? `Rs. ${min.toLocaleString()}`
    : `Rs. ${min.toLocaleString()} – ${max.toLocaleString()}`;
}
