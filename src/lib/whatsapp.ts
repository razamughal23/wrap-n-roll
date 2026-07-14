export const WHATSAPP_NUMBER = "923000500811"; // 0300-0500811
export const PHONE_1 = "0300-0500811";
export const PHONE_2 = "0324-9191229";
export const ADDRESS = "Shop # 2, Block #3, Farooqi Girls High School Near Karachi Store, Karim Park, Ravi Road, Lahore";
export const HOURS = "Mon–Sun · 5PM to 3AM";

export function whatsappOrderUrl(itemName?: string) {
  const msg = itemName
    ? `Hi Wrap & Roll! I want to order fast food: ${itemName}`
    : `Hi Wrap & Roll! I want to order fast food`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
