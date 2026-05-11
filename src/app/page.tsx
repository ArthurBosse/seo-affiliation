// ============================================================
// Page d'accueil — /
// Liste les avis disponibles par catégorie
// ============================================================

import { getAllAvis } from "@/lib/content";
import NoteEtoiles from "@/components/NoteEtoiles";

export default async function PageAccueil() {
  const avis = await getAllAvis();
  const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* ── Hero ────────────────────────────────────────────── */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Avis indépendants sur les compléments{" "}
          <span className="text-green-600">santé & bien-être</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nous testons pour vous les compléments alimentaires les plus populaires.
          Nos avis sont basés sur des tests réels, pas sur la publicité.
        </p>
      </div>

      {/* ── Derniers avis ────────────────────────────────────── */}
      <section aria-labelledby="section-avis">
        <h2 id="section-avis" className="text-2xl font-bold text-gray-900 mb-6">
          Derniers avis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {avis.map((a) => (
            <a
              key={a.slug}
              href={`/avis/${a.slug}`}
              className="group block rounded-xl border border-gray-200 p-5 hover:border-green-500
                         hover:shadow-md transition-all duration-200 bg-white"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 leading-snug">
                  {a.titre}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                  {a.categorie}
                </span>
              </div>
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
      </section>

      {/* ── Lien comparatifs ─────────────────────────────────── */}
      <section className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Besoin de comparer plusieurs produits ?
        </h2>
        <p className="text-gray-600 mb-5">
          Nos comparatifs mettent côte à côte les meilleurs produits de chaque
          catégorie pour vous aider à choisir.
        </p>
        <a
          href="/comparatif"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold
                     px-6 py-3 rounded-lg transition-colors duration-200"
        >
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
