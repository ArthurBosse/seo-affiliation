// ============================================================
// Page d'accueil — /
// CAS-17 : utilise les composants du design system
// ============================================================

import { getAllAvis } from "@/lib/content";
import CardAvis from "@/components/ui/CardAvis";

export default async function PageAccueil() {
  const avis = await getAllAvis();
  const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Avis indépendants sur les compléments{" "}
          <span className="text-brand-600">santé &amp; bien-être</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Nous testons pour vous les compléments alimentaires les plus populaires.
          Nos avis sont basés sur des tests réels, pas sur la publicité.
        </p>
      </div>

      {/* ── Derniers avis ────────────────────────────────────── */}
      <section aria-labelledby="section-avis">
        <h2 id="section-avis" className="text-2xl font-bold text-gray-900 mb-6">
          Derniers avis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {avis.map((a, index) => (
            <CardAvis
              key={a.slug}
              slug={a.slug}
              titre={a.titre}
              categorie={a.categorie}
              noteCertifiee={a.noteCertifiee}
              nombreAvis={a.nombreAvis}
              metaDescription={a.metaDescription}
              meilleurChoix={index === 0}
            />
          ))}
        </div>
      </section>

      {/* ── CTA comparatifs ──────────────────────────────────── */}
      <section className="mt-14 bg-brand-50 border border-brand-200 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Besoin de comparer plusieurs produits ?
        </h2>
        <p className="text-gray-600 mb-5 max-w-lg mx-auto">
          Nos comparatifs mettent côte à côte les meilleurs produits de chaque
          catégorie pour vous aider à choisir.
        </p>
        <a href="/comparatif" className="btn-brand">
          Voir les comparatifs
        </a>
      </section>

      {/* ── Disclaimer SEO ───────────────────────────────────── */}
      <p className="text-xs text-gray-400 text-center mt-10">
        {SITE_NOM} participe à des programmes d&apos;affiliation. Nous
        percevons une commission sur les achats effectués via nos liens, sans
        surcoût pour vous.
      </p>
    </main>
  );
}
