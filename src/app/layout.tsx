import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics, { GTMBodyTag } from "@/components/Analytics";
import BanniereConsentement from "@/components/BanniereConsentement";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NOM} — Avis produits santé et bien-être`,
    template: `%s | ${SITE_NOM}`,
  },
  description:
    "Avis indépendants sur les compléments alimentaires santé, bien-être et perte de poids. Tests complets, comparatifs et conseils d'achat.",
  keywords: ["avis", "complément alimentaire", "santé", "bien-être", "perte de poids"],
  authors: [{ name: SITE_NOM }],
  creator: SITE_NOM,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NOM,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface-page text-gray-900 min-h-screen flex flex-col`}
      >
        <GTMBodyTag />
        <Header />
        <div className="flex-1">{children}</div>
        <BanniereConsentement />
        <Footer />
      </body>
    </html>
  );
}
