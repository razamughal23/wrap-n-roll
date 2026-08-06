import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import siteData from "@/data/site.json";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteData.name} — ${siteData.tagline} | Karim Park, Lahore`,
  description: `${siteData.name} Lahore — pizzas, shawarma, wraps, burgers, loaded fries & deals. Free delivery, open ${siteData.hours}. Order on WhatsApp.`,

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteData.name,
  },

  openGraph: {
    title: `${siteData.name} — Fast Food in Karim Park, Lahore`,
    description:
      "Pizzas, shawarma, wraps, burgers & deals. Free delivery. Order now on WhatsApp.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e12e30",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
