// ============================================================
// Page index des comparatifs — /comparatif
// CAS-17 : composants design system (Breadcrumb, CardComparatif)
// ============================================================

import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getAllSlugsComparatif, getComparatif } from "@/lib/content";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Comparatifs compléments alimentaires — Nos classements 2025",
  description:
    "Nos comparatifs indépendants des meilleurs compléments alimentaires santé, bien-être et minceur. Classements testés en conditions réelles.",
  alternates: {
    canonical: `${SITE_URL}/comparatif`,
  },
  openGraph: {
    title: "Comparatifs compléments alimentaires 2025",
    description:
      "Classements et tests complets des meilleurs produits santé et bien-être.",
    type: "website",
  },
};

export default async function PageComparatifIndex() {
  const slugs = await getAllSlugsComparatif();
  const comparatifs = (
    await Promise.all(slugs.map((slug) => getComparatif(slug)))
  ).filter(Boolean);

  const breadcrumbs = [
    { nom: "Accueil", url: "/" },
    { nom: "Comparatifs", url: "/comparatif" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} className="mb-6" />

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        Comparatifs{" "}
        <span className="text-brand-700">compléments alimentaires</span>
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
        Nous avons testé et comparé les produits les plus populaires de chaque
        catégorie pour vous aider à faire le meilleur choix. Nos classements
        sont basés sur des tests réels, pas sur la publicité.
      </p>

      {/* ── Grille comparatifs ───────────────────────────────── */}
      {comparatifs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {comparatifs.map((comp) => {
            if (!comp) return null;
            const meilleur = comp.produits[0];
            return (
              <a
                key={comp.slug}
                href={`/comparatif/${comp.slug}`}
                className="group block rounded-2xl border bg-surface-card p-5
                           hover:border-brand-500 transition-all duration-200 card-hover"
              >
                <span className="inline-block bg-brand-100 text-brand-800 text-xs
                                 font-medium px-2.5 py-1 rounded-full mb-3">
                  {comp.produits.length} produits comparés
                </span>

                <h2 className="font-bold text-gray-900 group-hover:text-brand-700 leading-snug mb-2">
                  {comp.titre}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                  {comp.metaDescription}
                </p>

                {meilleur && (
                  <div className="flex items-center gap-2 text-sm">
                    <span aria-hidden="true">🏆</span>
                    <span className="text-gray-700">
                      Notre top :{" "}
                      <span className="font-semibold text-gray-900">
                        {meilleur.nomProduit}
                      </span>{" "}
                      — {meilleur.prix}
                    </span>
                  </div>
                )}

                <p className="text-sm text-brand-700 font-semibold mt-3 group-hover:underline">
                  Voir le comparatif →
                </p>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 bg-surface-muted rounded-2xl border border-gray-200">
          <p className="text-lg font-medium mb-2">Comparatifs en cours de rédaction.</p>
          <p className="text-sm">
            Revenez bientôt ou consultez nos{" "}
            <a href="/" className="text-brand-700 underline hover:text-brand-800">
              avis produits
            </a>
            .
          </p>
        </div>
      )}

      {/* ── CTA vers avis ────────────────────────────────────── */}
      <div className="mt-12 bg-surface-muted border border-gray-200 rounded-3xl p-6 text-center">
        <p className="text-gray-700 mb-4">
          Vous cherchez l&apos;avis complet d&apos;un produit spécifique ?
        </p>
        <a href="/" className="btn-brand">
          Voir tous nos avis produits
        </a>
      </div>
    </main>
  );
}
