"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, Navigation, X } from "lucide-react";
import {
  DELIVERY_MESSAGE,
  DELIVERY_RADIUS_KM,
  distanceInKm,
  isWithinDeliveryRadius,
} from "@/lib/delivery";
import {
  LOCATION_SESSION_KEY,
  saveAllowedLocationSession,
} from "@/lib/locationSession";

type PromptState = "hidden" | "ready" | "checking" | "allowed" | "outside" | "error";

function getErrorMessage(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) {
    return "Location permission was denied. You can allow it from your browser settings and try again.";
  }
  if (error.code === error.TIMEOUT) {
    return "We could not get your location in time. Please try again.";
  }
  return "We could not find your location. Please try again.";
}

export default function LocationPrompt() {
  const [state, setState] = useState<PromptState>("hidden");
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ask once per browser tab. The order button still verifies again before checkout.
    if (window.sessionStorage.getItem(LOCATION_SESSION_KEY)) return;
    const timer = window.setTimeout(() => setState("ready"), 750);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state === "hidden") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  function checkLocation() {
    setError("");
    setDistance(null);
    setState("checking");

    if (!navigator.geolocation) {
      setError("Location services are not available in this browser.");
      setState("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const km = distanceInKm(coords.latitude, coords.longitude);
        setDistance(km);
        const allowed = isWithinDeliveryRadius(coords.latitude, coords.longitude);
        if (allowed) saveAllowedLocationSession();
        setState(allowed ? "allowed" : "outside");
      },
      (locationError) => {
        setError(getErrorMessage(locationError));
        setState("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    );
  }

  function closePrompt() {
    window.sessionStorage.setItem(LOCATION_SESSION_KEY, "dismissed");
    setState("hidden");
  }

  if (state === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/65 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-prompt-title"
    >
      <button
        type="button"
        aria-label="Close location popup"
        className="absolute inset-0 cursor-default"
        onClick={closePrompt}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-glow sm:p-6">
        <button
          type="button"
          aria-label="Close"
          disabled={state === "checking"}
          onClick={closePrompt}
          className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-40"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 items-start gap-3 pr-8">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <MapPin className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 id="location-prompt-title" className="font-display text-2xl leading-tight">
              CHECK YOUR DELIVERY AREA
            </h2>
            <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">
              {DELIVERY_MESSAGE} Check now before you choose your food.
            </p>
          </div>
        </div>

        {state === "ready" && (
          <>
            <button
              type="button"
              onClick={checkLocation}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90 active:scale-95"
            >
              <Navigation className="h-5 w-5" />
              Check My Location
            </button>
            <button
              type="button"
              onClick={closePrompt}
              className="mt-3 w-full rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:border-foreground hover:text-foreground"
            >
              Maybe later
            </button>
          </>
        )}

        {state === "checking" && (
          <div className="mt-6 rounded-2xl bg-muted p-5 text-center">
            <Navigation className="mx-auto h-8 w-8 animate-pulse text-primary" />
            <p className="mt-2 text-sm font-medium">Checking your current location…</p>
            <p className="mt-1 break-words text-xs text-muted-foreground">
              Please allow location access when your browser asks.
            </p>
          </div>
        )}

        {state === "allowed" && (
          <div className="mt-6 rounded-2xl border border-[var(--color-whatsapp)]/30 bg-[var(--color-whatsapp)]/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-whatsapp)]">
              <CheckCircle2 className="h-5 w-5" />
              Good news — we deliver to you!
            </div>
            {distance !== null && (
              <p className="mt-1 text-xs text-muted-foreground">
                You are approximately {distance.toFixed(1)}KM away.
              </p>
            )}
            <button
              type="button"
              onClick={() => setState("hidden")}
              className="mt-4 w-full rounded-full bg-[var(--color-whatsapp)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue to Website
            </button>
          </div>
        )}

        {state === "outside" && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <p className="break-words text-sm font-semibold text-primary">
              Sorry, we only deliver within {DELIVERY_RADIUS_KM}KM.
            </p>
            {distance !== null && (
              <p className="mt-1 break-words text-xs text-muted-foreground">
                Your location is approximately {distance.toFixed(1)}KM away.
              </p>
            )}
            <button
              type="button"
              onClick={closePrompt}
              className="mt-4 w-full rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              Continue Browsing
            </button>
          </div>
        )}

        {state === "error" && (
          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <p className="break-words text-sm font-medium text-primary">{error}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={checkLocation}
                className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={closePrompt}
                className="flex-1 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}