import siteData from "@/data/site.json";

export const DELIVERY_RADIUS_KM = siteData.delivery.radiusKm;
export const DELIVERY_CENTER = siteData.delivery.center;
export const DELIVERY_MESSAGE = siteData.delivery.message;

export function distanceInKm(
  latitude: number,
  longitude: number,
  center = DELIVERY_CENTER
) {
  const earthRadiusKm = 6371;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(latitude - center.latitude);
  const dLon = toRadians(longitude - center.longitude);
  const lat1 = toRadians(center.latitude);
  const lat2 = toRadians(latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function isWithinDeliveryRadius(latitude: number, longitude: number) {
  return distanceInKm(latitude, longitude) <= DELIVERY_RADIUS_KM;
}