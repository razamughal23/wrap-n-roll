"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useCartStore } from "@/store/cart";
import { whatsappCartOrderUrl } from "@/lib/whatsapp";

export default function CartPage() {
  const items      = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty  = useCartStore((s) => s.updateQty);
  const clearCart  = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);

  // Avoid SSR/hydration mismatch with localStorage
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Header */}
      <section className="bg-gradient-hero py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Menu
          </Link>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Your Order</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl leading-none">YOUR CART</h1>
          <p className="mt-3 text-white/75 text-sm">Review items then place the order on WhatsApp.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Loading skeleton */}
        {!mounted && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-muted" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {mounted && items.length === 0 && (
          <div className="py-28 text-center">
            <ShoppingCart className="mx-auto h-20 w-20 text-muted-foreground/20" />
            <h2 className="mt-6 font-display text-4xl">YOUR CART IS EMPTY</h2>
            <p className="mt-3 text-muted-foreground">Browse the menu and add some items to get started.</p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90 active:scale-95"
            >
              Browse Menu
            </Link>
          </div>
        )}

        {/* Cart items */}
        {mounted && items.length > 0 && (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
                  {item.image && (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 min-w-0 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-display text-xl leading-tight truncate">{item.name}</div>
                        {item.size && <div className="text-xs text-muted-foreground">Size: {item.size}</div>}
                        <div className="text-sm font-semibold text-primary mt-0.5">{item.priceLabel} each</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-full p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-1 py-0.5">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease"
                          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-background"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase"
                          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-background"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-bold">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Order summary */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="font-display text-2xl tracking-wider">ORDER SUMMARY</div>
              <div className="mt-4 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                    <span className="truncate pr-4">
                      {item.name}{item.size ? ` (${item.size})` : ""} × {item.quantity}
                    </span>
                    <span className="shrink-0">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="font-semibold text-base">Grand Total</span>
                <span className="font-display text-3xl text-primary">
                  Rs. {totalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={clearCart}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:border-destructive hover:text-destructive"
              >
                Clear Cart
              </button>
              <a
                href={whatsappCartOrderUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-90 active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Place Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
