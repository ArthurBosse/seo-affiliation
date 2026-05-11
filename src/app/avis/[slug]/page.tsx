// ============================================================
// Template page avis produit — /avis/[slug]
//
// Structure SEO optimisée :
//   H1 → Note globale → Résumé pros/cons → Verdict → CTA
//   → Contenu détaillé → CTA ancrage → FAQ schema.org
//
// Rendu : SSG (generateStaticParams) avec ISR (revalidate 86400)
// ============================================================

import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import NoteEtoiles from "@/components/NoteEtoiles";
import BoutonCTA from "@/components/BoutonCTA";
import FAQSchema from "@/components/FAQSchema";
import {
  buildReviewSchema,
  buildArticleSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  jsonLd,
} from "@/lib/schema";
import { getAvis, getAllSlugsAvis } from "@/lib/content";

// ── Génération statique ───────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllSlugsAvis();
  return slugs.map((slug) => ({ slug }));
}

// Revalidation toutes les 24h (ISR)
export const revalidate = 86400;

// ── Métadonnées dynamiques (SEO) ─────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const avis = await getAvis(slug);
  if (!avis) return { title: "Page introuvable" };

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    title: avis.titre,
    description: avis.metaDescription,
    robots: avis.indexable ? "index,follow" : "noindex,nofollow",
    alternates: {
      canonical: avis.canonical ?? `${SITE_URL}/avis/${avis.slug}`,
    },
    openGraph: {
      title: avis.titre,
      description: avis.metaDescription,
      type: "article",
      publishedTime: avis.datePublication,
      modifiedTime: avis.dateMiseAJour,
      images: [{ url: avis.imagePrincipale, alt: avis.imageAlt }],
    },
  };
}

// ── Page principale ───────────────────────────────────────────
export default async function PageAvis({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const avis = await getAvis(slug);
  if (!avis) notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  const breadcrumbs = [
    { nom: "Accueil", url: "/" },
    { nom: avis.categorie, url: `/categorie/${avis.categorie.toLowerCase()}` },
    { nom: avis.titre, url: `/avis/${avis.slug}` },
  ];

  // Lien affiliation principal (premier de la liste)
  const lienPrincipal = avis.liens[0];

  return (
    <>
      {/* ── JSON-LD Schema.org ─────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildReviewSchema(avis)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildArticleSchema(avis)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildFAQSchema(avis.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(buildBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <main className="max-w-3xl mx-auto px-4 py-8">
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
          {avis.titre}
        </h1>

        {/* ── Méta auteur / date ───────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
          <span>Par {avis.auteur}</span>
          <span>·</span>
          <time dateTime={avis.dateMiseAJour}>
            Mis à jour le{" "}
            {new Date(avis.dateMiseAJour).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>·</span>
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
            {avis.categorie}
          </span>
        </div>

        {/* ── Image principale ─────────────────────────────── */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image
            src={avis.imagePrincipale}
            alt={avis.imageAlt}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* ── Note globale ─────────────────────────────────── */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-green-800 uppercase tracking-wide mb-1">
                Notre note globale
              </p>
              <NoteEtoiles
                note={avis.noteCertifiee}
                taille="lg"
                afficherChiffre
                nombreAvis={avis.nombreAvis}
              />
            </div>
            {lienPrincipal && (
              <BoutonCTA
                slug={lienPrincipal.slug}
                texte={lienPrincipal.ctaTexte}
                partenaire={lienPrincipal.partenaire}
                prix={lienPrincipal.prix}
                position="hero"
                variante="principal"
                taille="lg"
              />
            )}
          </div>
        </div>

        {/* ── Introduction ─────────────────────────────────── */}
        <div
          className="prose prose-lg prose-gray max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: avis.introduction }}
        />

        {/* ── Tableau Pros / Cons ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {/* Avantages */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">✅</span> Avantages
            </h2>
            <ul className="space-y-2">
              {avis.prosCons.avantages.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-green-900">
                  <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Inconvénients */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">❌</span> Inconvénients
            </h2>
            <ul className="space-y-2">
              {avis.prosCons.inconvenients.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-red-900">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Verdict rapide ───────────────────────────────── */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-5 my-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>⚡</span> Notre verdict
          </h2>
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: avis.verdict }}
          />
        </div>

        {/* ── CTA ancrage (après verdict) ──────────────────── */}
        {lienPrincipal && (
          <div className="text-center my-8">
            <BoutonCTA
              slug={lienPrincipal.slug}
              texte={`Commander ${avis.nomProduit}`}
              partenaire={lienPrincipal.partenaire}
              prix={lienPrincipal.prix}
              position="verdict"
              variante="principal"
              taille="lg"
            />
          </div>
        )}

        {/* ── Contenu détaillé ─────────────────────────────── */}
        {avis.contenuDetaille && (
          <div
            className="prose prose-lg prose-gray max-w-none my-8"
            dangerouslySetInnerHTML={{ __html: avis.contenuDetaille }}
          />
        )}

        {/* ── Liens affiliation alternatifs ────────────────── */}
        {avis.liens.length > 1 && (
          <div className="my-8 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Où acheter {avis.nomProduit} ?
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {avis.liens.map((lien) => (
                <BoutonCTA
                  key={lien.slug}
                  slug={lien.slug}
                  texte={lien.ctaTexte}
                  partenaire={lien.partenaire}
                  prix={lien.prix}
                  position="liens"
                  variante="secondaire"
                />
              ))}
            </div>
          </div>
        )}

        {/* ── FAQ schema.org ───────────────────────────────── */}
        <FAQSchema faqs={avis.faq} />

        {/* ── Disclaimer affiliation ───────────────────────── */}
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-xs text-gray-500 leading-relaxed">
          <strong>Transparence :</strong> Cet article peut contenir des liens
          d&apos;affiliation. Si vous achetez via nos liens, nous percevons une
          commission sans coût supplémentaire pour vous. Nos avis restent
          indépendants et objectifs.
        </div>
      </main>
    </>
  );
}
