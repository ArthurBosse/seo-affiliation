// ============================================================
// Page index des comparatifs — /comparatif
//
// Hub principal listant tous les comparatifs disponibles.
// Structure SEO : H1 → Introduction → Grille comparatifs
// ============================================================

import type { Metadata } from "next";
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

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-700 underline">
          Accueil
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Comparatifs</span>
      </nav>

      {/* ── H1 ──────────────────────────────────────────────── */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        Comparatifs{" "}
        <span className="text-green-700">compléments alimentaires</span>
      </h1>

      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Nous avons testé et comparé les produits les plus populaires de chaque
        catégorie pour vous aider à faire le meilleur choix. Nos classements
        sont basés sur des tests réels, pas sur la publicité.
      </p>

      {/* ── Grille comparatifs ───────────────────────────────── */}
      {comparatifs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {comparatifs.map((comp) => {
            if (!comp) return null;
            const meilleur = comp.produits[0];
            return (
              <a
                key={comp.slug}
                href={`/comparatif/${comp.slug}`}
                className="group block rounded-xl border border-gray-200 p-5 hover:border-green-500
                           hover:shadow-md transition-all duration-200 bg-white"
              >
                {/* Badge nombre de produits */}
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
                  {comp.produits.length} produits comparés
                </span>

                <h2 className="font-bold text-gray-900 group-hover:text-green-700 leading-snug mb-2">
                  {comp.titre}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {comp.metaDescription}
                </p>

                {/* Meilleur choix */}
                {meilleur && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500">🏆</span>
                    <span className="text-gray-700">
                      Notre top :{" "}
                      <span className="font-semibold text-gray-900">
                        {meilleur.nomProduit}
                      </span>{" "}
                      — {meilleur.prix}
                    </span>
                  </div>
                )}

                <p className="text-sm text-green-700 font-medium mt-3 group-hover:underline">
                  Voir le comparatif →
                </p>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Comparatifs en cours de rédaction.</p>
          <p className="text-sm mt-2">
            Revenez bientôt ou consultez nos{" "}
            <a href="/" className="text-green-700 underline">
              avis produits
            </a>
            .
          </p>
        </div>
      )}

      {/* ── CTA vers avis ────────────────────────────────────── */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-gray-700 mb-3">
          Vous cherchez l&apos;avis complet d&apos;un produit spécifique ?
        </p>
        <a
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold
                     px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Voir tous nos avis produits
        </a>
      </div>
    </main>
  );
}
