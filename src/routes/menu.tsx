import { createFileRoute } from "@tanstack/react-router";
import { Nav, WhatsAppIcon } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MENU } from "@/data/menu";
import { whatsappOrderUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Wrap & Roll | Pizzas, Shawarma, Wraps, Burgers" },
      { name: "description", content: "Full menu of Wrap & Roll Karim Park Lahore: pizzas, shawarma, wraps, burgers, loaded fries, pastas, rolls & deals. Order on WhatsApp." },
      { property: "og:title", content: "Wrap & Roll Menu — Karim Park, Lahore" },
      { property: "og:description", content: "Pizzas, shawarma, wraps, burgers, loaded fries & deals. Order on WhatsApp." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* header */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">The full menu</div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl">EAT THE WHOLE THING</h1>
          <p className="mt-4 max-w-2xl text-white/80">Everything we make, priced honestly. Tap any item to order it on WhatsApp — we'll get started as soon as we see it.</p>

          {/* category jump nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {MENU.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur transition hover:bg-primary hover:border-primary">
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* categories */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6">
        {MENU.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-24">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b-2 border-primary pb-4 sm:flex sm:justify-between">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{cat.items.length} items</div>
                <h2 className="mt-1 font-display text-4xl leading-none sm:text-5xl">{cat.title.toUpperCase()}</h2>
              </div>
              <a href={whatsappOrderUrl(cat.title)} target="_blank" rel="noopener noreferrer"
                 className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-3 py-2 text-xs font-semibold text-white shadow-card hover:opacity-90 sm:px-4 sm:text-sm">
                <WhatsAppIcon className="h-4 w-4" /> Order
              </a>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <li key={item.name} className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
                  {item.image && (
                    <div className="aspect-square w-28 shrink-0 overflow-hidden sm:w-32">
                      <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg leading-tight tracking-wide">{item.name}</h3>
                      </div>
                      {item.desc && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.desc}</p>}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-primary">{item.price}</span>
                      <a href={whatsappOrderUrl(item.name)} target="_blank" rel="noopener noreferrer"
                         aria-label={`Order ${item.name} on WhatsApp`}
                         className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground">
                        <WhatsAppIcon className="h-3.5 w-3.5" /> Order
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Extra topping notice */}
        <section className="rounded-2xl bg-secondary p-6 text-secondary-foreground sm:p-8">
          <div className="font-display text-2xl tracking-wider text-primary">EXTRA TOPPINGS</div>
          <p className="mt-1 text-sm text-secondary-foreground/70">Sizes: S · M · L · XL</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[400px] text-sm">
              <thead className="text-xs uppercase tracking-widest text-secondary-foreground/60">
                <tr><th className="py-2 text-left">Topping</th><th>S</th><th>M</th><th>L</th><th>XL</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr><td className="py-2 text-left">Cheese</td><td className="text-center">50</td><td className="text-center">100</td><td className="text-center">150</td><td className="text-center">200</td></tr>
                <tr><td className="py-2 text-left">Chicken</td><td className="text-center">50</td><td className="text-center">100</td><td className="text-center">150</td><td className="text-center">200</td></tr>
                <tr><td className="py-2 text-left">Veggies</td><td className="text-center">30</td><td className="text-center">30</td><td className="text-center">50</td><td className="text-center">60</td></tr>
                <tr><td className="py-2 text-left">Dressing Sauce</td><td className="text-center">30</td><td className="text-center">40</td><td className="text-center">50</td><td className="text-center">60</td></tr>
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
