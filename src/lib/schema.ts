// ============================================================
// Helpers Schema.org — Données structurées pour le SEO
// Cibles : Review, Product, Article, FAQPage
// ============================================================

import type { AvisProduit, PageComparatif, FAQ } from "@/types/produit";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

// ── Auteur générique (ajuster selon les rédacteurs) ──────────
function buildAuteur(nom: string) {
  return {
    "@type": "Person",
    name: nom,
    url: `${SITE_URL}/auteur/${encodeURIComponent(nom.toLowerCase().replace(/\s+/g, "-"))}`,
  };
}

// ── Schema Review + Product combinés ─────────────────────────
export function buildReviewSchema(avis: AvisProduit): object {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: avis.titre,
    datePublished: avis.datePublication,
    dateModified: avis.dateMiseAJour,
    author: buildAuteur(avis.auteur),
    publisher: {
      "@type": "Organization",
      name: SITE_NOM,
      url: SITE_URL,
    },
    url: `${SITE_URL}/avis/${avis.slug}`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: avis.noteCertifiee,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "Product",
      name: avis.nomProduit,
      image: avis.imagePrincipale,
      description: avis.metaDescription,
      // Prix du premier lien si disponible
      ...(avis.liens[0]?.prix && {
        offers: {
          "@type": "Offer",
          price: avis.liens[0].prix.replace(/[^0-9,.]/g, "").replace(",", "."),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/go/${avis.liens[0].slug}`,
        },
      }),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avis.noteCertifiee,
        reviewCount: avis.nombreAvis,
        bestRating: 5,
        worstRating: 1,
      },
    },
  };
}

// ── Schema Article ────────────────────────────────────────────
export function buildArticleSchema(avis: AvisProduit): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: avis.titre,
    description: avis.metaDescription,
    image: avis.imagePrincipale,
    datePublished: avis.datePublication,
    dateModified: avis.dateMiseAJour,
    author: buildAuteur(avis.auteur),
    publisher: {
      "@type": "Organization",
      name: SITE_NOM,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/avis/${avis.slug}`,
    },
  };
}

// ── Schema FAQPage ─────────────────────────────────────────────
export function buildFAQSchema(faqs: FAQ[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.reponse,
      },
    })),
  };
}

// ── Schema BreadcrumbList ─────────────────────────────────────
export function buildBreadcrumbSchema(
  items: { nom: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nom,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ── Schema comparatif (ItemList de produits) ──────────────────
export function buildComparatifSchema(page: PageComparatif): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.titre,
    description: page.metaDescription,
    url: `${SITE_URL}/comparatif/${page.slug}`,
    numberOfItems: page.produits.length,
    itemListElement: page.produits.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: p.nomProduit,
        image: p.image,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.note,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 1,
        },
        offers: {
          "@type": "Offer",
          price: p.prix.replace(/[^0-9,.]/g, "").replace(",", "."),
          priceCurrency: "EUR",
          url: `${SITE_URL}/go/${p.lienAffiliation.slug}`,
        },
      },
    })),
  };
}

// ── Helper : injection dans <head> via script JSON-LD ─────────
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
