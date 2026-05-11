// ============================================================
// Template page avis produit — /avis/[slug]
// CAS-17 : composants design system (ProsCons, VerdictBox,
//           ScoreGlobal, Breadcrumb)
//
// Structure SEO intacte (CAS-4, CAS-7) :
//   H1 → ScoreGlobal → Résumé pros/cons → VerdictBox → CTA
//   → Contenu détaillé → CTA ancrage → FAQ schema.org
//
// Rendu : SSG (generateStaticParams) avec ISR (revalidate 86400)
// ============================================================

import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import BoutonCTA from "@/components/BoutonCTA";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProsCons from "@/components/ui/ProsCons";
import VerdictBox from "@/components/ui/VerdictBox";
import ScoreGlobal from "@/components/ui/ScoreGlobal";
import BadgeCategorie from "@/components/ui/BadgeCategorie";
import CTABanniereSticky from "@/components/CTABanniereSticky";
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

  const lienPrincipal = avis.liens[0];

  return (
    <>
      {/* ── JSON-LD Schema.org (SEO — CAS-4, CAS-7) ──────── */}
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
        <Breadcrumb items={breadcrumbs} className="mb-6" />

        {/* ── H1 ──────────────────────────────────────────── */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {avis.titre}
        </h1>

        {/* ── Méta auteur / date ───────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
          <span>Par {avis.auteur}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={avis.dateMiseAJour}>
            Mis à jour le{" "}
            {new Date(avis.dateMiseAJour).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <BadgeCategorie categorie={avis.categorie} />
        </div>

        {/* ── Image principale ─────────────────────────────── */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100">
          <Image
            src={avis.imagePrincipale}
            alt={avis.imageAlt}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* ── Note globale + CTA hero ───────────────────────── */}
        <ScoreGlobal
          note={avis.noteCertifiee}
          nombreAvis={avis.nombreAvis}
          lienPrincipal={lienPrincipal}
        />

        {/* ── Introduction ─────────────────────────────────── */}
        <div
          className="prose prose-lg prose-gray max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: avis.introduction }}
        />

        {/* ── Tableau Pros / Cons ──────────────────────────── */}
        <ProsCons
          avantages={avis.prosCons.avantages}
          inconvenients={avis.prosCons.inconvenients}
        />

        {/* ── Verdict ──────────────────────────────────────── */}
        <VerdictBox html={avis.verdict} />

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
          <div className="my-8 p-5 bg-surface-muted border border-gray-200 rounded-2xl">
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
        <div className="mt-12 p-4 bg-surface-muted rounded-xl text-xs text-gray-500 leading-relaxed border border-gray-200">
          <strong className="text-gray-600">Transparence :</strong> Cet article
          peut contenir des liens d&apos;affiliation. Si vous achetez via nos
          liens, nous percevons une commission sans coût supplémentaire pour
          vous. Nos avis restent indépendants et objectifs.
        </div>

        {/* Espaceur mobile pour éviter le chevauchement avec le sticky CTA */}
        {lienPrincipal && <div className="h-16 sm:hidden" aria-hidden="true" />}
      </main>

      {/* ── CTA sticky mobile ─────────────────────────────────── */}
      {lienPrincipal && (
        <CTABanniereSticky
          slug={lienPrincipal.slug}
          texte={lienPrincipal.ctaTexte}
          nomProduit={avis.nomProduit}
          partenaire={lienPrincipal.partenaire}
          prix={lienPrincipal.prix}
        />
      )}
    </>
  );
}
