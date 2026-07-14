import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import shawarmaImg from "@/assets/shawarma.jpg";
import burgerImg from "@/assets/burger.jpg";
import friesImg from "@/assets/fries.jpg";
import wrapImg from "@/assets/wrap.jpg";
import { Nav, WhatsAppIcon } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { REVIEWS } from "@/data/menu";
import { HOURS, PHONE_1, whatsappOrderUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  component: Home,
});

const highlights = [
  { name: "Signature Pizzas", desc: "12 varieties — from Cheese Lover to Lazania.", img: pizzaImg, href: "/menu#pizzas" },
  { name: "Shawarma & Platters", desc: "Simple, Zinger, Jumbo, Pita Special.", img: shawarmaImg, href: "/menu#shawarma" },
  { name: "Wraps & Twisters", desc: "Mexican Wrap, W&R Special, Crispy.", img: wrapImg, href: "/menu#wraps" },
  { name: "Burgers", desc: "Zinger, Double Zinger, Crazy Beef.", img: burgerImg, href: "/menu#burgers" },
  { name: "Loaded Fries", desc: "Cheesy, jalapeño-topped, done right.", img: friesImg, href: "/menu#potato" },
  { name: "Value Deals", desc: "Family deals starting from Rs. 450.", img: pizzaImg, href: "/menu#deals" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Wrap & Roll fast food spread" className="h-full w-full object-cover" width={1600} height={1000} />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 md:py-40">
          <span className="inline-block rounded-full border border-white/25 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
            Karim Park · Lahore · Free Delivery
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] text-white sm:text-7xl md:text-8xl">
            EAT WELL, <span className="text-primary">FEEL WELL.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Freshly rolled wraps, wood-fired pizzas, crispy zingers and loaded fries — hot at your door till 3 AM.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={whatsappOrderUrl()} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]">
              <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
            </a>
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              View Full Menu →
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
            <div>🕒 {HOURS}</div>
            <div>📞 {PHONE_1}</div>
            <div>⭐ 4.4 · 7 reviews</div>
          </div>
        </div>
      </section>

      {/* CATEGORY HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Fresh from the grill</div>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">WHAT'S COOKING</h2>
          </div>
          <Link to="/menu" className="hidden text-sm font-semibold text-primary hover:underline sm:block">See full menu →</Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <a key={h.name} href={h.href} className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition hover:-translate-y-1 hover:shadow-glow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={h.img} alt={h.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <div className="font-display text-2xl tracking-wide">{h.name}</div>
                <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-card">Popular</span>
            </a>
          ))}
        </div>
      </section>

      {/* DEALS STRIP */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Save more, eat more</div>
            <h2 className="font-display text-4xl sm:text-5xl">HOT DEALS</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: "DEAL 1", p: "Rs. 950", d: "2 Small Pizzas + Half Ltr Bottle" },
              { t: "DEAL 2", p: "Rs. 450", d: "Zinger Burger + Fries + 345ml" },
              { t: "DEAL 3", p: "Rs. 2399", d: "Large Pizza + 2 Zingers + Fries + 1.5L" },
              { t: "DEAL 4", p: "Rs. 1450", d: "2 Mexican Wrap + Tortilla + 1.5L" },
              { t: "DEAL 5", p: "Rs. 2700", d: "XL Pizza + Sandwich + Fries + 5 Wings + 1.5L" },
            ].map((d) => (
              <a key={d.t} href={whatsappOrderUrl(d.t + " — " + d.d)} target="_blank" rel="noopener noreferrer"
                 className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-primary hover:bg-primary/10">
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-2xl tracking-wider text-primary">{d.t}</div>
                  <div className="font-display text-xl">{d.p}</div>
                </div>
                <p className="mt-3 text-sm text-secondary-foreground/70">{d.d}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                  Order now <WhatsAppIcon className="h-3.5 w-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">The people have spoken</div>
        <h2 className="mt-1 font-display text-4xl sm:text-5xl">4.4 ★ ON GOOGLE</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-flame font-display text-lg text-primary-foreground">
                  {r.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
              <div className="mt-3 text-primary" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}<span className="text-muted-foreground/40">{"★".repeat(5 - r.rating)}</span>
              </div>
              <p className="mt-3 text-sm text-foreground/80">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-flame py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl sm:text-6xl">HUNGRY YET?</h2>
          <p className="mt-3 text-base opacity-90 sm:text-lg">Tap once. We'll bring the flavour. Free delivery in Karim Park.</p>
          <a href={whatsappOrderUrl()} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-secondary shadow-glow transition hover:scale-[1.02]">
            <WhatsAppIcon className="h-5 w-5 text-[var(--color-whatsapp)]" /> Order on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
