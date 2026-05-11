// ============================================================
// Page d'accueil — /
// CAS-16 : identité visuelle, hero impactant, trust signals
// CAS-17 : composants design system (CardAvis)
// ============================================================

import { getAllAvis } from "@/lib/content";
import CardAvis from "@/components/ui/CardAvis";
import TrustSignals from "@/components/TrustSignals";
import CTABanner from "@/components/CTABanner";

export default async function PageAccueil() {
  const avis = await getAllAvis();
  const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-green-50 to-white pt-14 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge trust */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold
                          px-4 py-1.5 rounded-full mb-6 border border-green-200">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Testés par notre équipe · 1 200+ avis vérifiés
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
            Avis indépendants sur les{" "}
            <span className="text-green-600">compléments santé</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Nous testons pour vous les compléments alimentaires les plus populaires.
            Nos avis sont basés sur des tests terrain réels — pas sur la publicité.
          </p>

          {/* Stats inline */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="text-yellow-400 text-base">★</span>
              <strong className="text-gray-900">4,8/5</strong> note moyenne
            </span>
            <span className="w-px h-4 bg-gray-300 hidden sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <strong className="text-gray-900">1 200+</strong> avis vérifiés
            </span>
            <span className="w-px h-4 bg-gray-300 hidden sm:block" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <strong className="text-gray-900">100%</strong> indépendant
            </span>
          </div>

          {/* CTA principal */}
          <a
            href="#meilleurs-avis"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-600 hover:bg-green-700
                       text-white font-bold rounded-xl shadow-lg hover:shadow-xl
                       transition-all duration-200 hover:-translate-y-0.5 text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Voir les meilleurs avis
          </a>
        </div>
      </section>

      {/* ── Trust signals ─────────────────────────────────────── */}
      <TrustSignals />

      {/* ── Derniers avis ─────────────────────────────────────── */}
      <section
        id="meilleurs-avis"
        aria-labelledby="section-avis"
        className="max-w-5xl mx-auto px-4 py-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="section-avis" className="text-2xl font-bold text-gray-900">
            Derniers avis
          </h2>
          <a
            href="/comparatif"
            className="text-sm text-green-700 font-medium hover:underline hidden sm:inline"
          >
            Voir les comparatifs →
          </a>
        </div>

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

      {/* ── CTA comparatifs ───────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <CTABanner
          titre="Besoin de comparer plusieurs produits ?"
          sousTitre="Nos comparatifs mettent côte à côte les meilleurs produits de chaque
catégorie pour vous aider à choisir le bon complément."
          ctaTexte="Voir tous les comparatifs"
          ctaHref="/comparatif"
          variante="vert"
        />
      </div>

      {/* ── Disclaimer SEO ────────────────────────────────────── */}
      <p className="text-xs text-gray-400 text-center pb-10 px-4">
        {SITE_NOM} participe à des programmes d&apos;affiliation. Nous
        percevons une commission sur les achats effectués via nos liens, sans
        surcoût pour vous.
      </p>
    </main>
  );
}
