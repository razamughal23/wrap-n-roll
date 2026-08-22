import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import {
  whatsappOrderUrl,
  PHONE_1,
  PHONE_2,
  ADDRESS,
  HOURS,
} from "@/lib/whatsapp";
import siteData from "@/data/site.json";
import { LocationGate } from "@/components/LocationGate";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="font-display text-3xl tracking-wider">
            {siteData.name.toUpperCase()}
          </div>
          <p className="mt-3 max-w-xs text-sm text-secondary-foreground/70">
            {siteData.tagline}. Serving Karim Park with pizzas, shawarma, wraps,
            burgers and deals.
          </p>
          <LocationGate
            orderUrl={whatsappOrderUrl()}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:opacity-90"
          >
            <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
          </LocationGate>
        </div>
        <div>
          <div className="font-display text-lg tracking-wider text-primary">
            CONTACT
          </div>
          <ul className="mt-3 space-y-2 text-sm text-secondary-foreground/80">
            <li>
              <a
                href={`tel:${PHONE_1.replace(/-/g, "")}`}
                className="hover:text-primary transition"
              >
                📞 {PHONE_1}
              </a>
            </li>
            <li>
              <a
                href={`tel:${PHONE_2.replace(/-/g, "")}`}
                className="hover:text-primary transition"
              >
                📞 {PHONE_2}
              </a>
            </li>
            <li>🕒 {HOURS}</li>
            <li>🚚 Free Delivery</li>
          </ul>
        </div>
        <div>
          <div className="font-display text-lg tracking-wider text-primary">
            VISIT US
          </div>
          <p className="mt-3 text-sm text-secondary-foreground/80 leading-relaxed">
            {ADDRESS}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-secondary-foreground/50">
        © {new Date().getFullYear()} {siteData.name} — Karim Park, Lahore
      </div>
    </footer>
  );
}
