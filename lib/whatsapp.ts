import type { CartItem } from "@/store/cart";
import siteData from "@/data/site.json";

export const WHATSAPP_NUMBER = siteData.whatsappNumber;
export const PHONE_1 = siteData.phone1;
export const PHONE_2 = siteData.phone2;
export const ADDRESS = siteData.address;
export const HOURS = siteData.hours;

export function whatsappOrderUrl(item?: string) {
  const msg = item
    ? `Hi Wrap & Roll! I want to order: ${item}`
    : `Hi Wrap & Roll! I want to place an order`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function whatsappCartOrderUrl(items: CartItem[]): string {
  const lines = items.map(
    (i) =>
      `• ${i.name}${i.size ? ` (${i.size})` : ""} × ${i.quantity}  —  Rs. ${(i.price * i.quantity).toLocaleString()}`
  );
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const msg = [
    "🛒 New Order — Wrap & Roll Website",
    "",
    ...lines,
    "",
    `💰 Total: Rs. ${total.toLocaleString()}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
