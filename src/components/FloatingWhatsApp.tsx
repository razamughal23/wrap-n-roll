import { whatsappOrderUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Nav";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappOrderUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--color-whatsapp)] text-white shadow-glow transition hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
