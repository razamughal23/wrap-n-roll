"use client";

import { useEffect, useState } from "react";
import { Download, Share, Smartphone, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function InstallPWA() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

    setIsIOS(ios);
    setIsStandalone(standalone);
    if (!standalone) {
      // A small delay keeps the install card from appearing before the page
      // has painted, especially when opened from the PWA launch URL.
      const timer = window.setTimeout(() => setOpen(true), 500);
      return () => window.clearTimeout(timer);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!prompt) return;

    await prompt.prompt();
    await prompt.userChoice;

    setPrompt(null);
    setOpen(false);
  };

  if (isStandalone || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-pwa-title"
    >
      <button
        type="button"
        aria-label="Close install popup"
        className="absolute inset-0 cursor-default"
        onClick={() => setOpen(false)}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-glow sm:p-6">
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 items-start gap-3 pr-8">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Smartphone className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 id="install-pwa-title" className="font-display text-2xl leading-tight">
              INSTALL WRAP &amp; ROLL
            </h2>
            <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">
              Install our app for faster ordering and easy access from your home screen.
            </p>
          </div>
        </div>

        {isIOS ? (
          <div className="mt-5 rounded-2xl bg-muted p-4">
            <p className="text-sm font-semibold">Install on iPhone / iPad</p>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                <span>Tap the <Share className="mx-1 inline h-4 w-4 text-primary" /> Share button in Safari.</span>
              </li>
              <li className="flex gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                <span>Scroll down and tap <strong className="text-foreground">Add to Home Screen</strong>.</span>
              </li>
              <li className="flex gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                <span>Tap <strong className="text-foreground">Add</strong> to install the app.</span>
              </li>
            </ol>
          </div>
        ) : prompt ? (
          <button
            type="button"
            onClick={installApp}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90 active:scale-95"
          >
            <Download className="h-5 w-5" />
            Download &amp; Install App
          </button>
        ) : (
          <div className="mt-5 rounded-2xl bg-muted p-4">
            <p className="text-sm font-semibold">Install on Android</p>
            <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">
              Tap your browser&apos;s menu <strong className="text-foreground">⋮</strong>, then choose
              <strong className="text-foreground"> Install app</strong> or
              <strong className="text-foreground"> Add to Home screen</strong>.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 w-full rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:border-foreground hover:text-foreground"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
