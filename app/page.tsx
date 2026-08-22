import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappOrderUrl } from "@/lib/whatsapp";
import siteData from "@/data/site.json";
import dealsData from "@/data/deals.json";
import hotDealsData from "@/data/hotDeals.json";
import reviewsData from "@/data/reviews.json";
import { LocationGate } from "@/components/LocationGate";

export default function Home() {
  const {
    highlights,
    heroTitle,
    heroSubtitle,
    heroBadge,
    hours,
    phone1,
    googleRating,
  } = siteData;

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[90svh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Wrap & Roll hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-92" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
          <span className="inline-block rounded-full border border-white/25 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
            {heroBadge}
          </span>

          <h1 className="mt-5 font-display text-6xl leading-[0.9] text-white sm:text-8xl md:text-[9rem]">
            {heroTitle.split("\n").map((line, i) => (
              <span
                key={i}
                className={i === 1 ? "block text-primary" : "block"}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-lg text-base text-white/80 sm:text-lg leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LocationGate
              orderUrl={whatsappOrderUrl()}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.03] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
            </LocationGate>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              View Full Menu →
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/75">
            <span>🕒 {hours}</span>
            <span>📞 {phone1}</span>
            <span>⭐ {googleRating} on Google</span>
            <span>🚚 Free Delivery</span>
          </div>
        </div>
      </section>

      {/* ── DEALS OF THE DAY ── */}
      <section className="relative overflow-hidden bg-secondary py-16 sm:py-20">
        {/* Decorative flame glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                🔥 Limited Time
              </div>
              <h2 className="mt-3 font-display text-5xl text-white sm:text-6xl md:text-7xl leading-none">
                DEALS OF
                <br />
                THE DAY
              </h2>
              <p className="mt-3 text-sm text-secondary-foreground/60 max-w-md">
                Unbeatable combos — fresh daily. Tap to order instantly on
                WhatsApp.
              </p>
            </div>
            <Link
              href="/menu#deals"
              className="shrink-0 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              All deals on menu →
            </Link>
          </div>

          {/* Deal cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {dealsData.map((deal, idx) => (
              <LocationGate
                key={deal.id}
                orderUrl={whatsappOrderUrl(`${deal.title} — ${deal.description}`)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur transition hover:border-primary hover:bg-primary/10 hover:-translate-y-1 active:scale-95"
              >
                {/* Popular / badge pill */}
                {deal.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    {deal.badge}
                  </span>
                )}
                {deal.popular && !deal.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Popular
                  </span>
                )}

                {/* Deal number */}
                <div className="font-display text-5xl text-white/10 leading-none select-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="mt-2">
                  <div className="font-display text-2xl tracking-wider text-primary">
                    {deal.title}
                  </div>
                  <p className="mt-2 text-sm text-secondary-foreground/70 leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="mt-5 flex items-center justify-between gap-2">
                  <div className="font-display text-2xl text-white">
                    {deal.price}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-whatsapp)] px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                    <WhatsAppIcon className="h-3 w-3" /> Order
                  </span>
                </div>
              </LocationGate>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S COOKING ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Fresh from the grill
            </div>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl">
              WHAT&apos;S COOKING
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:block text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            See full menu →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <a
              key={h.name}
              href={h.href}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={h.image}
                  alt={h.name}
                  fill
                  loading="lazy"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="font-display text-2xl tracking-wide">
                  {h.name}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/menu"
            className="text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            See full menu →
          </Link>
        </div>
      </section>

      {/* ── Hot DEALS OF THE DAY ── */}
      <section className="bg-secondary py-16 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Save more, eat more
            </div>
            <h2 className="font-display text-4xl sm:text-5xl">HOT DEALS</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {hotDealsData?.map((d) => (
              <LocationGate
                key={d.t}
                orderUrl={whatsappOrderUrl(d.t + " — " + d.d)}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-primary hover:bg-primary/10"
              >
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-2xl tracking-wider text-primary">
                    {d.t}
                  </div>
                  <div className="font-display text-xl">{d.p}</div>
                </div>
                <p className="mt-3 text-sm text-secondary-foreground/70">
                  {d.d}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                  Order now <WhatsAppIcon className="h-3.5 w-3.5" />
                </div>
              </LocationGate>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            The people have spoken
          </div>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl">
            {googleRating} ★ ON GOOGLE
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviewsData.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-flame font-display text-lg text-primary-foreground">
                    {r.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold leading-tight">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.date}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-primary text-lg">
                  {"★".repeat(r.rating)}
                  <span className="text-muted-foreground/30">
                    {"★".repeat(5 - r.rating)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HUNGRY YET CTA ── */}
      <section className="bg-gradient-flame py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-5xl sm:text-7xl">HUNGRY YET?</h2>
          <p className="mt-4 text-base opacity-90 sm:text-lg max-w-md mx-auto">
            Tap once. We&apos;ll bring the flavour. Free delivery in Karim Park.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LocationGate
              orderUrl={whatsappOrderUrl()}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-secondary shadow-glow transition hover:scale-[1.03] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5 text-[var(--color-whatsapp)]" />{" "}
              Order on WhatsApp
            </LocationGate>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
