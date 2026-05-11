// ============================================================
// robots.ts — Génère /robots.txt automatiquement
// Next.js App Router : ce fichier suffit, pas besoin de /public/robots.txt
//
// Règles :
//   - Autorise tous les bots sur les pages publiques
//   - Bloque /go/ (tracking affiliation, pas indexable)
//   - Bloque /api/ (routes internes)
//   - Pointe vers le sitemap
// ============================================================

import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/go/",   // Redirections affiliation — pas d'indexation
          "/api/",  // Routes API internes
          "/_next/", // Assets Next.js
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
