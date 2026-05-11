// ============================================================
// Table des liens d'affiliation
//
// AJOUT D'UN NOUVEAU LIEN :
//   1. Ajouter une entrée dans LIENS ci-dessous
//   2. Utiliser le slug dans les fichiers de contenu /data/avis/
//   3. Le lien sera automatiquement accessible via /go/[slug]
//
// Format URL : mettre l'URL complète avec les paramètres UTM
// si le réseau affiliation le permet.
// ============================================================

interface LienAffiliationRecord {
  slug: string;
  url: string;
  partenaire: string;
  programme: string; // Ex: "TradeTracker", "Awin", "Amazon PA"
  actif: boolean;
}

// ── Table principale des liens ────────────────────────────────
// Remplacer les URLs "#" par les vrais liens affiliation
const LIENS: LienAffiliationRecord[] = [
  // ── Exemples Keto / Perte de poids ─────────────────────────
  {
    slug: "keto-actives-officiel",
    url: "https://example.com/go/keto-actives", // Remplacer par URL réelle
    partenaire: "Site officiel",
    programme: "TradeTracker",
    actif: true,
  },
  {
    slug: "keto-actives-amazon",
    url: "https://amazon.fr/dp/EXEMPLE", // Remplacer par ASIN réel
    partenaire: "Amazon",
    programme: "Amazon Associates",
    actif: true,
  },
  {
    slug: "garcinia-cambogia-officiel",
    url: "https://example.com/go/garcinia",
    partenaire: "Site officiel",
    programme: "Awin",
    actif: true,
  },
  // ── Exemples Bien-être ──────────────────────────────────────
  {
    slug: "melatonine-natrol-amazon",
    url: "https://amazon.fr/dp/EXEMPLE2",
    partenaire: "Amazon",
    programme: "Amazon Associates",
    actif: true,
  },
  // ── Template vide (copier pour nouveau produit) ─────────────
  // {
  //   slug: "nom-produit-partenaire",
  //   url: "https://...",
  //   partenaire: "Nom du partenaire",
  //   programme: "Nom du réseau",
  //   actif: true,
  // },
];

// ── Fonctions d'accès ─────────────────────────────────────────

export async function getLienAffiliation(
  slug: string
): Promise<LienAffiliationRecord | null> {
  const lien = LIENS.find((l) => l.slug === slug && l.actif);
  return lien ?? null;
}

export async function getAllLiensActifs(): Promise<LienAffiliationRecord[]> {
  return LIENS.filter((l) => l.actif);
}
