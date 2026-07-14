import { Link } from "@tanstack/react-router";
import { whatsappOrderUrl } from "@/lib/whatsapp";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-flame text-primary-foreground font-display text-lg">W</span>
          <span className="font-display text-xl tracking-wider sm:text-2xl">WRAP & ROLL</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Link to="/" className="px-2 py-2 text-sm font-medium hover:text-primary sm:px-3" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/menu" className="px-2 py-2 text-sm font-medium hover:text-primary sm:px-3" activeProps={{ className: "text-primary" }}>Menu</Link>
          <a href={whatsappOrderUrl()} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-3 py-2 text-xs font-semibold text-white shadow-card transition hover:opacity-90 sm:px-4 sm:text-sm">
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Order on WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.35-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.4-8.44Zm-8.47 18.24h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.77.99 1-3.67-.24-.38a9.85 9.85 0 0 1-1.5-5.2c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.45-4.43 9.87-9.85 9.87Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.16c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/>
    </svg>
  );
}
