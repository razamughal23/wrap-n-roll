"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useCartStore } from "@/store/cart";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import siteData from "@/data/site.json";
import { LocationGate } from "@/components/LocationGate";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
];

export function Nav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-flame font-display text-lg text-primary-foreground">
            W
          </span>
          <span className="font-display text-xl tracking-wider sm:text-2xl">
            {siteData.name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop nav */}
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium rounded-full transition hover:bg-muted ${pathname === l.href ? "text-primary font-semibold" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          {/* Cart */}
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative inline-flex items-center justify-center rounded-full p-2 transition hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* WhatsApp CTA */}
          <LocationGate
            orderUrl={whatsappOrderUrl()}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:opacity-90 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
          </LocationGate>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden rounded-full p-2 transition hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border/60 bg-background px-4 pb-4 pt-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl px-4 py-3 text-base font-medium transition hover:bg-muted ${pathname === l.href ? "text-primary font-semibold" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <LocationGate
            orderUrl={whatsappOrderUrl()}
            className="mt-2 flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
          </LocationGate>
        </div>
      )}
    </header>
  );
}
