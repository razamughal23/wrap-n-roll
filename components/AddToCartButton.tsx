"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { parsePrice, type PriceOption } from "@/lib/priceUtils";

interface Props {
  name: string;
  price: string;
  image?: string | null;
  category: string;
}

export function AddToCartButton({ name, price, image, category }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const parsed = parsePrice(price);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PriceOption | null>(null);
  const [added, setAdded] = useState(false);

  function flash() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  }

  function handleSingle() {
    addItem({ id: name, name, price: parsed.singlePrice ?? 0, priceLabel: `Rs. ${(parsed.singlePrice ?? 0).toLocaleString()}`, image, category });
    flash();
  }

  function handleMulti() {
    if (!selected) return;
    addItem({ id: `${name}-${selected.size}`, name, price: selected.price, priceLabel: `Rs. ${selected.price.toLocaleString()}`, size: selected.size, image, category });
    setOpen(false);
    setSelected(null);
    flash();
  }

  const btnClass =
    "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground active:scale-95";

  if (!parsed.isMultiSize) {
    return (
      <button onClick={handleSingle} className={btnClass}>
        {added ? <><Check className="h-3.5 w-3.5" /> Added!</> : <><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</>}
      </button>
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={btnClass}>
        {added ? <><Check className="h-3.5 w-3.5" /> Added!</> : <><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</>}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setOpen(false); setSelected(null); }} />

          {/* Sheet — slides up on mobile, centered dialog on sm+ */}
          <div className="relative z-10 w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl border border-border bg-card p-6 shadow-glow">
            <div className="mb-1 h-1 w-10 rounded-full bg-border mx-auto sm:hidden" />
            <h2 className="mt-3 sm:mt-0 font-display text-2xl tracking-wide">{name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose your size:</p>

            <div className="mt-4 grid gap-2">
              {parsed.options?.map((opt) => (
                <button
                  key={opt.size}
                  onClick={() => setSelected(opt)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition ${selected?.size === opt.size ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50 hover:bg-muted"}`}
                >
                  <span className="font-display text-xl">{opt.size}</span>
                  <span className="font-semibold">Rs. {opt.price.toLocaleString()}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => { setOpen(false); setSelected(null); }}
                className="flex-1 rounded-full border border-border py-3 text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground transition"
              >
                Cancel
              </button>
              <button
                onClick={handleMulti}
                disabled={!selected}
                className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
