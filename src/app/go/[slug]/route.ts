// ============================================================
// Route handler tracking affiliation — /go/[slug]
//
// OBLIGATOIRE : tous les liens affiliation passent par ici.
// Jamais de lien direct vers le partenaire sans tracking.
//
// Flow :
//   1. Résoudre le slug → URL destination dans la table liens
//   2. Logger le clic via GA4 Measurement Protocol (server-side)
//   3. Ajouter les paramètres UTM à l'URL de destination
//   4. Redirection 302 vers l'URL partenaire avec UTM
//
// Pourquoi 302 et non 301 ?
//   → Les 301 sont mis en cache par les navigateurs.
//   → Si l'URL partenaire change, les utilisateurs seraient
//     redirigés vers l'ancienne URL sans repasser ici.
//   → 302 garantit que chaque clic repasse par notre tracker.
//
// Variables d'environnement requises (server-side uniquement) :
//   GA4_MEASUREMENT_ID         → ex: G-XXXXXXXXXX
//   GA4_MEASUREMENT_API_SECRET → créer dans GA4 Admin > Flux de données
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getLienAffiliation } from "@/lib/affiliations";

const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace("https://", "").replace(
    "http://",
    ""
  ) ?? "notre-domaine.fr";

const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID;
const GA4_MEASUREMENT_API_SECRET = process.env.GA4_MEASUREMENT_API_SECRET;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const position = request.nextUrl.searchParams.get("pos") ?? "inconnu";

  const lien = await getLienAffiliation(slug);

  if (!lien) {
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }

  // ── Construire l'URL de destination avec paramètres UTM ──
  const destinationUrl = ajouterUTM(lien.url, {
    utmSource: SITE_DOMAIN,
    utmMedium: "affiliation",
    utmCampaign: slug,
    utmContent: position,
  });

  // ── Logger le clic côté serveur (non bloquant) ───────────
  logClicGA4({
    slug,
    position,
    reseau: lien.programme,
    referrer: request.headers.get("referer") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
  }).catch(() => {
    // Silencieux — le tracking ne doit jamais bloquer la redirection
  });

  // ── Redirection 302 vers l'URL partenaire ─────────────────
  return NextResponse.redirect(destinationUrl, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Referrer-Policy": "unsafe-url",
    },
  });
}

// ── Ajout des paramètres UTM à l'URL de destination ──────────
function ajouterUTM(
  baseUrl: string,
  params: {
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
  }
): string {
  try {
    const url = new URL(baseUrl);
    // Ne pas écraser les UTM déjà présents dans l'URL de base
    if (!url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", params.utmSource);
    }
    if (!url.searchParams.has("utm_medium")) {
      url.searchParams.set("utm_medium", params.utmMedium);
    }
    if (!url.searchParams.has("utm_campaign")) {
      url.searchParams.set("utm_campaign", params.utmCampaign);
    }
    if (!url.searchParams.has("utm_content")) {
      url.searchParams.set("utm_content", params.utmContent);
    }
    return url.toString();
  } catch {
    // URL mal formée → retourner telle quelle
    return baseUrl;
  }
}

// ── GA4 Measurement Protocol (server-side, RGPD-safe) ────────
//
// Avantage du Measurement Protocol : les clics sont trackés même
// si l'utilisateur a bloqué les scripts analytics (ad blocker).
// Le client_id est un hash du UserAgent + heure (pas de données perso).
async function logClicGA4(data: {
  slug: string;
  position: string;
  reseau: string;
  referrer: string;
  userAgent: string;
}): Promise<void> {
  if (!GA4_MEASUREMENT_ID || !GA4_MEASUREMENT_API_SECRET) {
    // Variables non configurées — log dev uniquement
    if (process.env.NODE_ENV !== "production") {
      console.log("[AFFILIATION CLICK]", data);
    }
    return;
  }

  // Client ID anonyme : hash simple de l'UserAgent (pas d'IP, pas de cookie)
  // RGPD : aucune donnée personnelle identifiante n'est transmise
  const clientId = hashSimple(data.userAgent + Math.floor(Date.now() / 86400000));

  const payload = {
    client_id: clientId,
    non_personalized_ads: true,
    events: [
      {
        name: "affiliation_click",
        params: {
          produit: data.slug,
          position: data.position,
          reseau: data.reseau,
          engagement_time_msec: 1,
        },
      },
    ],
  };

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_MEASUREMENT_API_SECRET}`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Hash djb2 simple — suffisant pour générer un client_id anonyme
function hashSimple(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash >>> 0).toString(36);
}
