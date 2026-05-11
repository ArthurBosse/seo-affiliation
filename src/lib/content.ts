// ============================================================
// Couche d'accès au contenu — pages avis et comparatifs
//
// Architecture :
//   Les fichiers de contenu sont dans /src/data/avis/*.ts
//   et /src/data/comparatifs/*.ts
//
//   Chaque fichier exporte un objet conforme à AvisProduit
//   ou PageComparatif. Aucune base de données nécessaire pour
//   commencer — migration possible vers un CMS headless ensuite.
//
// Pour ajouter un avis :
//   1. Créer /src/data/avis/nom-du-produit.ts
//   2. Exporter l'objet AvisProduit avec toutes les propriétés
//   3. Le fichier sera automatiquement découvert par getAvis()
// ============================================================

import type { AvisProduit, PageComparatif } from "@/types/produit";

// ── Avis produits ─────────────────────────────────────────────

// Import statique de tous les avis disponibles
// → À mettre à jour à chaque nouveau fichier d'avis ajouté
const AVIS_REGISTRY: Record<string, () => Promise<{ default: AvisProduit }>> = {
  "keto-actives": () => import("@/data/avis/keto-actives"),
  // Ajouter ici les nouveaux slugs d'avis
  // "nom-produit": () => import("@/data/avis/nom-produit"),
};

export async function getAvis(slug: string): Promise<AvisProduit | null> {
  const loader = AVIS_REGISTRY[slug];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default;
  } catch {
    return null;
  }
}

export async function getAllSlugsAvis(): Promise<string[]> {
  return Object.keys(AVIS_REGISTRY);
}

export async function getAllAvis(): Promise<AvisProduit[]> {
  const slugs = await getAllSlugsAvis();
  const results = await Promise.all(slugs.map(getAvis));
  return results.filter(Boolean) as AvisProduit[];
}

// ── Comparatifs ───────────────────────────────────────────────

const COMPARATIFS_REGISTRY: Record<
  string,
  () => Promise<{ default: PageComparatif }>
> = {
  "meilleurs-complements-perte-de-poids": () =>
    import("@/data/comparatifs/meilleurs-complements-perte-de-poids"),
  // Ajouter ici les nouveaux comparatifs
};

export async function getComparatif(
  slug: string
): Promise<PageComparatif | null> {
  const loader = COMPARATIFS_REGISTRY[slug];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default;
  } catch {
    return null;
  }
}

export async function getAllSlugsComparatif(): Promise<string[]> {
  return Object.keys(COMPARATIFS_REGISTRY);
}
