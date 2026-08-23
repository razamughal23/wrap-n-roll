export const LOCATION_SESSION_KEY = "wrap-n-roll-location-checked";
export const LOCATION_ALLOWED_VALUE = "allowed";

export function hasAllowedLocationSession() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(LOCATION_SESSION_KEY) === LOCATION_ALLOWED_VALUE;
}

export function saveAllowedLocationSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LOCATION_SESSION_KEY, LOCATION_ALLOWED_VALUE);
}