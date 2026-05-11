// ============================================================
// Route handler tracking affiliation — /go/[slug]
//
// OBLIGATOIRE : tous les liens affiliation passent par ici.
// Jamais de lien direct vers le partenaire sans tracking.
//
// Flow :
//   1. Résoudre le slug → URL destination dans la table liens
//   2. Logger le clic (timestamp, IP anonymisée, slug, referrer)
//   3. Redirection 302 vers l'URL partenaire
//
// Pourquoi 302 et non 301 ?
//   → Les 301 sont mis en cache par les navigateurs.
//   → Si l'URL partenaire change, les utilisateurs seraient
//     redirigés vers l'ancienne URL sans repasser ici.
//   → 302 garantit que chaque clic repasse par notre tracker.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getLienAffiliation } from "@/lib/affiliations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const lien = await getLienAffiliation(slug);

  if (!lien) {
    // Slug inconnu → page 404
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }

  // ── Log du clic (RGPD : IP non stockée, juste un hash) ──
  await logClic({
    slug,
    destination: lien.url,
    referrer: request.headers.get("referer") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
    timestamp: new Date().toISOString(),
  });

  // ── Redirection 302 vers l'URL partenaire ─────────────
  return NextResponse.redirect(lien.url, {
    status: 302,
    headers: {
      // Pas de mise en cache de la redirection
      "Cache-Control": "no-store, no-cache, must-revalidate",
      // Politique de referrer pour que le partenaire voie notre domaine
      "Referrer-Policy": "unsafe-url",
    },
  });
}

// ── Logger de clics ───────────────────────────────────────────
async function logClic(data: {
  slug: string;
  destination: string;
  referrer: string;
  userAgent: string;
  timestamp: string;
}) {
  // En production : remplacer par un appel vers GA4 Measurement Protocol
  // ou une table de base de données (Supabase, PlanetScale, etc.)
  //
  // Pour l'instant : log console (remplacé en prod)
  if (process.env.NODE_ENV !== "production") {
    console.log("[AFFILIATION CLICK]", {
      slug: data.slug,
      destination: data.destination,
      referrer: data.referrer,
      timestamp: data.timestamp,
    });
  }

  // Exemple d'appel GA4 Measurement Protocol (à activer en prod) :
  // await fetch(`https://www.google-analytics.com/mp/collect?...`, { ... })
}
