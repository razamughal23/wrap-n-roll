import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import { LocationGate } from "@/components/LocationGate";

export function FloatingWhatsApp() {
  return (
    <LocationGate
      orderUrl={whatsappOrderUrl()}
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--color-whatsapp)] text-white shadow-glow transition hover:scale-105 active:scale-95"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </LocationGate>
  );
}
