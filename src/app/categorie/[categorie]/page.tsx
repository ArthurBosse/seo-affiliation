// ============================================================
// Page Catégorie — /categorie/[categorie]
//
// Hub de silo thématique : liste tous les avis d'une catégorie.
// Structure SEO : H1 → Introduction → Grille avis → Liens internes
//
// Les catégories correspondent au champ `categorie` des AvisProduit.
// Exemples : "Perte de poids", "Bien-être", "Compléments sportifs"
// ============================================================

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NoteEtoiles from "@/components/NoteEtoiles";
import { getAllAvis } from "@/lib/content";

// ── Génération statique des pages catégories ─────────────────
export async function generateStaticParams() {
  const avis = await getAllAvis();
  const categories = [...new Set(avis.map((a) => a.categorie))];
  return categories.map((cat) => ({
    categorie: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export const revalidate = 86400;

// ── Normalisation slug ↔ nom catégorie ───────────────────────
function slugToNom(slug: string): string {
  return slug
    .split("-")
    .map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1))
    .join(" ");
}

// ── Métadonnées dynamiques ───────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie } = await params;
  const nomCategorie = slugToNom(decodeURIComponent(categorie));

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    title: `Avis ${nomCategorie} — Comparatifs et tests complets`,
    description: `Découvrez nos avis indépendants sur les meilleurs produits ${nomCategorie.toLowerCase()}. Tests complets, comparatifs et conseils d'achat pour bien choisir.`,
    alternates: {
      canonical: `${SITE_URL}/categorie/${categorie}`,
    },
    openGraph: {
      title: `Avis ${nomCategorie}`,
      description: `Meilleurs avis ${nomCategorie.toLowerCase()} — Tests et comparatifs`,
      type: "website",
    },
  };
}

// ── Page catégorie ────────────────────────────────────────────
export default async function PageCategorie({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;
  const nomCategorie = slugToNom(decodeURIComponent(categorie));

  const tousAvis = await getAllAvis();
  const avisCategorie = tousAvis.filter(
    (a) =>
      a.indexable &&
      a.categorie.toLowerCase().replace(/\s+/g, "-") ===
        categorie.toLowerCase()
  );

  if (avisCategorie.length === 0) notFound();

  // Descriptions SEO par catégorie
  const DESCRIPTIONS: Record<string, string> = {
    "perte-de-poids":
      "Vous cherchez à perdre du poids sainement ? Découvrez nos tests complets des compléments minceur les plus populaires du marché. Compositions détaillées, résultats réels, prix et programmes d'affiliation.",
    "bien-etre":
      "Améliorez votre quotidien avec les meilleurs compléments bien-être. Nos experts testent pour vous les produits les plus efficaces pour l'énergie, le sommeil et la vitalité.",
    "complements-sportifs":
      "Protéines, BCAA, pre-workout... Nos avis complets sur les compléments sportifs pour optimiser vos performances et votre récupération.",
    "sante-digestive":
      "Probiotiques, prébiotiques, enzymes digestives : nos tests des meilleurs produits pour la santé intestinale et le microbiome.",
    "sommeil-stress":
      "Mélatonine, ashwagandha, magnésium... Nos avis détaillés sur les compléments naturels pour mieux dormir et gérer le stress.",
    "beaute-anti-age":
      "Collagène, acide hyaluronique, antioxydants : nos comparatifs des meilleurs compléments beauté pour une peau lumineuse et un anti-âge efficace.",
  };

  const description =
    DESCRIPTIONS[categorie] ??
    `Retrouvez tous nos avis sur les produits ${nomCategorie.toLowerCase()}.`;

  const breadcrumbs = [
    { nom: "Accueil", url: "/" },
    { nom: nomCategorie, url: `/categorie/${categorie}` },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-6">
        {breadcrumbs.map((item, i) => (
          <span key={item.url}>
            {i > 0 && <span className="mx-2">›</span>}
            {i < breadcrumbs.length - 1 ? (
              <a href={item.url} className="hover:text-green-700 underline">
                {item.nom}
              </a>
            ) : (
              <span className="text-gray-700">{item.nom}</span>
            )}
          </span>
        ))}
      </nav>

      {/* ── H1 ──────────────────────────────────────────────── */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        Avis{" "}
        <span className="text-green-700">{nomCategorie}</span>{" "}
        — Nos tests complets
      </h1>

      {/* ── Introduction ─────────────────────────────────────── */}
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>

      {/* ── Compteur ──────────────────────────────────────────── */}
      <p className="text-sm text-gray-500 mb-6">
        {avisCategorie.length} avis{" "}
        {avisCategorie.length > 1 ? "disponibles" : "disponible"} dans cette
        catégorie
      </p>

      {/* ── Grille des avis ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {avisCategorie.map((a) => (
          <a
            key={a.slug}
            href={`/avis/${a.slug}`}
            className="group block rounded-xl border border-gray-200 p-5 hover:border-green-500
                       hover:shadow-md transition-all duration-200 bg-white"
          >
            <h2 className="font-bold text-gray-900 group-hover:text-green-700 leading-snug mb-2">
              {a.titre}
            </h2>
            <NoteEtoiles
              note={a.noteCertifiee}
              taille="sm"
              afficherChiffre
              nombreAvis={a.nombreAvis}
              className="mb-3"
            />
            <p className="text-sm text-gray-600 line-clamp-2">
              {a.metaDescription}
            </p>
            <p className="text-sm text-green-700 font-medium mt-3 group-hover:underline">
              Lire l&apos;avis complet →
            </p>
          </a>
        ))}
      </div>

      {/* ── Lien vers comparatif ─────────────────────────────── */}
      <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <p className="text-gray-700 mb-3 font-medium">
          Vous hésitez entre plusieurs produits ?
        </p>
        <a
          href="/comparatif"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold
                     px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Voir nos comparatifs {nomCategorie.toLowerCase()}
        </a>
      </div>
    </main>
  );
}
