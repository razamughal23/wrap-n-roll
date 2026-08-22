import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { AddToCartButton } from "@/components/AddToCartButton";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import menuData from "@/data/menu.json";
import siteData from "@/data/site.json";
import { LocationGate } from "@/components/LocationGate";

export const metadata: Metadata = {
  title: `Menu — ${siteData.name} | Pizzas, Shawarma, Wraps, Burgers`,
  description: `Full menu of ${siteData.name} Karim Park Lahore: pizzas, shawarma, wraps, burgers, loaded fries, pastas, rolls & deals. Order on WhatsApp.`,
};

export default function MenuPage() {
  const categories = menuData.categories;

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Header */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">The full menu</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl leading-none">
            EAT THE<br className="sm:hidden" /> WHOLE THING
          </h1>
          <p className="mt-4 max-w-xl text-white/75 text-sm sm:text-base">
            Everything we make, priced honestly. Add items to cart and place the full order on WhatsApp — we&apos;ll start as soon as we see it.
          </p>

          {/* Category jump nav — scrollable on mobile */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="shrink-0 rounded-full border border-white/25 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur transition hover:bg-primary hover:border-primary"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-24">
            {/* Category header */}
            <div className="flex items-end justify-between gap-4 border-b-2 border-primary pb-4">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {cat.items.length} item{cat.items.length !== 1 ? "s" : ""}
                </div>
                <h2 className="mt-1 font-display text-4xl leading-none sm:text-5xl">
                  {cat.title.toUpperCase()}
                </h2>
              </div>
              <LocationGate
                orderUrl={whatsappOrderUrl(cat.title)}
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-3 py-2 text-xs font-semibold text-white shadow-card hover:opacity-90 sm:px-4 sm:text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Order {cat.title}</span>
                <span className="sm:hidden">Order</span>
              </LocationGate>
            </div>

            {/* Items */}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
                >
                  {item.image && (
                    <div className="relative w-24 shrink-0 overflow-hidden sm:w-28">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        loading="lazy"
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="font-display text-lg leading-tight tracking-wide">{item.name}</h3>
                      {item.desc && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.desc}</p>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-primary whitespace-nowrap">{item.price}</span>
                      <AddToCartButton
                        name={item.name}
                        price={item.price}
                        image={item.image ?? null}
                        category={cat.title}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Extra toppings table */}
        <section className="rounded-2xl bg-secondary p-5 text-secondary-foreground sm:p-8">
          <div className="font-display text-2xl tracking-wider text-primary">EXTRA TOPPINGS</div>
          <p className="mt-1 text-sm text-secondary-foreground/60">Add-ons per size (S / M / L / XL)</p>
          <div className="mt-5 overflow-x-auto -mx-2 px-2">
            <table className="w-full min-w-[360px] text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-secondary-foreground/50">
                  <th className="py-2 text-left">Topping</th>
                  <th className="py-2 text-center">S</th>
                  <th className="py-2 text-center">M</th>
                  <th className="py-2 text-center">L</th>
                  <th className="py-2 text-center">XL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["Cheese", 50, 100, 150, 200],
                  ["Chicken", 50, 100, 150, 200],
                  ["Veggies", 30, 30, 50, 60],
                  ["Dressing Sauce", 30, 40, 50, 60],
                ].map(([label, ...prices]) => (
                  <tr key={String(label)}>
                    <td className="py-2.5 text-left">{label}</td>
                    {prices.map((p, i) => (
                      <td key={i} className="py-2.5 text-center text-secondary-foreground/70">
                        {p}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
