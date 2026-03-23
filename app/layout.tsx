import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://premiumtravels.pk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Premium Travels | Hajj & Umrah Packages",
    template: "%s | Premium Travels",
  },
  description:
    "Pakistan's trusted travel agency for Hajj, Umrah, and International Tours. Explore premium brochures and contact us directly on WhatsApp.",
  keywords: ["Hajj packages", "Umrah packages", "Pakistan travel agency", "international tours", "Premium Travels"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Premium Travels",
    title: "Premium Travels | Hajj & Umrah Packages",
    description:
      "Pakistan's trusted travel agency for Hajj, Umrah, and International Tours. View our brochures and contact us on WhatsApp.",
    images: [
      {
        url: "/og-image.jpg",       // Place a 1200×630 image at /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Premium Travels – Hajj & Umrah Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Travels | Hajj & Umrah Packages",
    description:
      "Pakistan's trusted travel agency for Hajj, Umrah, and International Tours.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>{children}</body>
    </html>
  );
}
