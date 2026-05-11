// ============================================================
// Sitemap dynamique — app/sitemap.ts
// Next.js génère automatiquement /sitemap.xml à partir de ce fichier
//
// Inclut :
//   - Page d'accueil
//   - Toutes les pages avis (/avis/[slug])
//   - Toutes les pages comparatifs (/comparatif/[slug])
//   - Pages catégories (/categorie/[slug])
//   - Pages statiques (mentions légales, etc.)
// ============================================================

import type { MetadataRoute } from "next";
import { getAllAvis, getAllSlugsComparatif } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const avis = await getAllAvis();
  const comparatifSlugs = await getAllSlugsComparatif();

  // Extraire les catégories uniques depuis les avis
  const categories = [...new Set(avis.map((a) => a.categorie))];

  const now = new Date().toISOString();

  // ── Pages statiques ────────────────────────────────────────
  const pagesStatiques: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/comparatif`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ── Pages avis (/avis/[slug]) ──────────────────────────────
  const pagesAvis: MetadataRoute.Sitemap = avis
    .filter((a) => a.indexable)
    .map((a) => ({
      url: `${SITE_URL}/avis/${a.slug}`,
      lastModified: a.dateMiseAJour,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  // ── Pages comparatifs (/comparatif/[slug]) ─────────────────
  const pagesComparatifs: MetadataRoute.Sitemap = comparatifSlugs.map(
    (slug) => ({
      url: `${SITE_URL}/comparatif/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  // ── Pages catégories (/categorie/[slug]) ───────────────────
  const pagesCategories: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/categorie/${encodeURIComponent(
      cat.toLowerCase().replace(/\s+/g, "-")
    )}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...pagesStatiques,
    ...pagesAvis,
    ...pagesComparatifs,
    ...pagesCategories,
  ];
}
