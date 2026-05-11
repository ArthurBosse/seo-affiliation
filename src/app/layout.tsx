import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics, { GTMBodyTag } from "@/components/Analytics";
import BanniereConsentement from "@/components/BanniereConsentement";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        {/* GTM noscript fallback */}
        <GTMBodyTag />
        {/* ── Header ── */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-bold text-xl text-green-700 hover:text-green-800">
              {SITE_NOM}
            </a>
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="/categorie/perte-de-poids" className="hover:text-green-700">
                Perte de poids
              </a>
              <a href="/categorie/bien-etre" className="hover:text-green-700">
                Bien-être
              </a>
              <a href="/comparatif" className="hover:text-green-700">
                Comparatifs
              </a>
            </nav>
          </div>
        </header>

        {/* ── Contenu principal ── */}
        <div className="flex-1">{children}</div>

        {/* ── Bannière cookies RGPD ── */}
        <BanniereConsentement />

        {/* ── Footer ── */}
        <footer className="bg-gray-900 text-gray-400 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-bold text-white mb-3">{SITE_NOM}</p>
                <p className="text-sm">
                  Avis indépendants sur les compléments alimentaires pour votre
                  santé et bien-être.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Catégories</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/categorie/perte-de-poids" className="hover:text-white">
                      Perte de poids
                    </a>
                  </li>
                  <li>
                    <a href="/categorie/bien-etre" className="hover:text-white">
                      Bien-être
                    </a>
                  </li>
                  <li>
                    <a href="/comparatif" className="hover:text-white">
                      Comparatifs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-3">Légal</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/mentions-legales" className="hover:text-white">
                      Mentions légales
                    </a>
                  </li>
                  <li>
                    <a href="/politique-confidentialite" className="hover:text-white">
                      Politique de confidentialité
                    </a>
                  </li>
                  <li>
                    <a href="/politique-cookies" className="hover:text-white">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 text-xs text-center">
              <p>
                © {new Date().getFullYear()} {SITE_NOM}. Les liens de ce site
                peuvent être des liens d&apos;affiliation. Nous percevons une
                commission sur les achats effectués via nos liens.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
