"use client";

import {
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { MapPin, Navigation, X } from "lucide-react";
import {
  DELIVERY_MESSAGE,
  DELIVERY_RADIUS_KM,
  distanceInKm,
  isWithinDeliveryRadius,
} from "@/lib/delivery";
import { hasAllowedLocationSession } from "@/lib/locationSession";

type GateState = "closed" | "requesting" | "allowed" | "outside" | "error";

interface Props {
  children: ReactNode;
  orderUrl: string;
  className?: string;
  ariaLabel?: string;
  onAllowed?: () => void;
}

function getLocationErrorMessage(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) {
    return "Location permission was denied. Please allow location access to confirm delivery.";
  }
  if (error.code === error.TIMEOUT) {
    return "We could not get your location in time. Please try again.";
  }
  return "Your location could not be found. Please try again.";
}

export function LocationGate({
  children,
  orderUrl,
  className,
  ariaLabel,
  onAllowed,
}: Props) {
  const [state, setState] = useState<GateState>("closed");
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state === "closed") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state !== "requesting") setState("closed");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [state]);

  useEffect(() => {
    if (state === "closed") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  function requestLocation() {
    setError("");
    setDistance(null);
    setState("requesting");

    if (!navigator.geolocation) {
      setError("Location services are not available in this browser.");
      setState("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const km = distanceInKm(latitude, longitude);
        setDistance(km);
        setState(isWithinDeliveryRadius(latitude, longitude) ? "allowed" : "outside");
      },
      (locationError) => {
        setError(getLocationErrorMessage(locationError));
        setState("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    );
  }

  function openOrder(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (hasAllowedLocationSession()) {
      onAllowed?.();
      window.open(orderUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setState("requesting");
    requestLocation();
  }

  function continueToWhatsApp() {
    onAllowed?.();
    window.open(orderUrl, "_blank", "noopener,noreferrer");
    setState("closed");
  }

  return (
    <>
      <a
        href={orderUrl}
        onClick={openOrder}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>

      {state !== "closed" && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-gate-title"
        >
          <button
            type="button"
            aria-label="Close location dialog"
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
            onClick={() => state !== "requesting" && setState("closed")}
          />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-glow sm:p-6">
            <button
              type="button"
              aria-label="Close"
              disabled={state === "requesting"}
              onClick={() => setState("closed")}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 items-start gap-3 pr-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 id="location-gate-title" className="font-display text-2xl leading-tight">
                  CHECK DELIVERY AREA
                </h2>
                <p className="mt-1 break-words text-sm leading-relaxed text-muted-foreground">
                  {DELIVERY_MESSAGE}
                </p>
              </div>
            </div>

            {state === "requesting" && (
              <div className="mt-6 rounded-2xl bg-muted p-4 text-center">
                <Navigation className="mx-auto h-7 w-7 animate-pulse text-primary" />
                <p className="mt-2 text-sm font-medium">Checking your current location…</p>
                <p className="mt-1 break-words text-xs text-muted-foreground">
                  Please allow location access when your browser asks.
                </p>
              </div>
            )}

            {state === "allowed" && (
              <div className="mt-6 rounded-2xl border border-[var(--color-whatsapp)]/30 bg-[var(--color-whatsapp)]/10 p-4">
                <p className="text-sm font-semibold text-[var(--color-whatsapp)]">
                  Great! We deliver to your location.
                </p>
                {distance !== null && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    You are approximately {distance.toFixed(1)}KM away.
                  </p>
                )}
                <button
                  type="button"
                  onClick={continueToWhatsApp}
                  className="mt-4 w-full rounded-full bg-[var(--color-whatsapp)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                >
                  Continue to WhatsApp
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
                    Your location is approximately {distance.toFixed(1)}KM away, so this order cannot be placed for delivery.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setState("closed")}
                  className="mt-4 w-full rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Close
                </button>
              </div>
            )}

            {state === "error" && (
              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4">
                <p className="break-words text-sm font-medium text-primary">{error}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={requestLocation}
                    className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={() => setState("closed")}
                    className="flex-1 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}