// ============================================================
// Template page comparatif — /comparatif/[slug]
//
// Structure SEO :
//   H1 → Intro → TableauComparatif → Verdict → FAQ schema.org
//
// Schema.org : ItemList de produits
// ============================================================

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TableauComparatif from "@/components/TableauComparatif";
import FAQSchema from "@/components/FAQSchema";
import NoteEtoiles from "@/components/NoteEtoiles";
import BoutonCTA from "@/components/BoutonCTA";
import {
  buildComparatifSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  jsonLd,
} from "@/lib/schema";
import { getComparatif, getAllSlugsComparatif } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getAllSlugsComparatif();
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getComparatif(slug);
  if (!page) return { title: "Page introuvable" };

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    title: page.titre,
    description: page.metaDescription,
    robots: page.indexable ? "index,follow" : "noindex,nofollow",
    alternates: {
      canonical: page.canonical ?? `${SITE_URL}/comparatif/${page.slug}`,
    },
    openGraph: {
      title: page.titre,
      description: page.metaDescription,
      type: "article",
      publishedTime: page.datePublication,
      modifiedTime: page.dateMiseAJour,
    },
  };
}

export default async function PageComparatif({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getComparatif(slug);
  if (!page) notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const breadcrumbs = [
    { nom: "Accueil", url: "/" },
    { nom: "Comparatifs", url: "/comparatif" },
    { nom: page.titre, url: `/comparatif/${page.slug}` },
  ];

  // Produit #1 = meilleur rapport qualité/prix
  const meilleurProduit = page.produits[0];

  return (
    <>
      {/* ── JSON-LD ─────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildComparatifSchema(page)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildFAQSchema(page.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(buildBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ── Breadcrumb ──────────────────────────────────── */}
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

        {/* ── H1 ──────────────────────────────────────────── */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {page.titre}
        </h1>

        {/* ── Méta auteur / date ───────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
          <span>Par {page.auteur}</span>
          <span>·</span>
          <time dateTime={page.dateMiseAJour}>
            Mis à jour le{" "}
            {new Date(page.dateMiseAJour).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        {/* ── Box meilleur choix ───────────────────────────── */}
        {meilleurProduit && (
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">
                🏆 Notre meilleur choix
              </p>
              <p className="text-xl font-bold text-gray-900">
                {meilleurProduit.nomProduit}
              </p>
              <NoteEtoiles
                note={meilleurProduit.note}
                taille="sm"
                afficherChiffre
                className="mt-1"
              />
              <p className="text-sm text-green-800 font-medium mt-1">
                {meilleurProduit.prix}
              </p>
            </div>
            <BoutonCTA
              slug={meilleurProduit.lienAffiliation.slug}
              texte={meilleurProduit.lienAffiliation.ctaTexte}
              partenaire={meilleurProduit.lienAffiliation.partenaire}
              prix={meilleurProduit.lienAffiliation.prix}
              variante="principal"
              taille="lg"
            />
          </div>
        )}

        {/* ── Introduction ─────────────────────────────────── */}
        <div
          className="prose prose-lg prose-gray max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: page.introduction }}
        />

        {/* ── Tableau comparatif ───────────────────────────── */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tableau comparatif ({page.produits.length} produits)
        </h2>
        <TableauComparatif produits={page.produits} colonnes={page.colonnes} />

        {/* ── Verdict ──────────────────────────────────────── */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-5 my-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            ⚡ Notre verdict
          </h2>
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: page.verdict }}
          />
        </div>

        {/* ── CTA final ────────────────────────────────────── */}
        {meilleurProduit && (
          <div className="text-center my-8">
            <p className="text-gray-600 mb-3">
              Notre top recommandation :{" "}
              <strong>{meilleurProduit.nomProduit}</strong>
            </p>
            <BoutonCTA
              slug={meilleurProduit.lienAffiliation.slug}
              texte={`Voir ${meilleurProduit.nomProduit}`}
              partenaire={meilleurProduit.lienAffiliation.partenaire}
              prix={meilleurProduit.lienAffiliation.prix}
              variante="principal"
              taille="lg"
            />
          </div>
        )}

        {/* ── FAQ ──────────────────────────────────────────── */}
        <FAQSchema faqs={page.faq} />

        {/* ── Disclaimer ───────────────────────────────────── */}
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-xs text-gray-500 leading-relaxed">
          <strong>Transparence :</strong> Ce comparatif peut contenir des liens
          d&apos;affiliation. Nos classements sont basés sur nos tests et
          analyses indépendantes.
        </div>
      </main>
    </>
  );
}
