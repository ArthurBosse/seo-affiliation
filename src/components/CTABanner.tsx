// ============================================================
// CTABanner — Bandeau CTA mi-page / bas de page
// Gradient vert, texte impactant, bouton orange
// Utilisé sur la homepage et optionnellement dans les comparatifs
// ============================================================

interface CTABannerProps {
  titre: string;
  sousTitre?: string;
  ctaTexte: string;
  ctaHref: string;
  variante?: "vert" | "orange" | "neutre";
  className?: string;
}

const VARIANTES = {
  vert: "bg-gradient-to-r from-green-700 to-green-600 text-white",
  orange: "bg-gradient-to-r from-orange-600 to-orange-500 text-white",
  neutre: "bg-gray-900 text-white",
};

export default function CTABanner({
  titre,
  sousTitre,
  ctaTexte,
  ctaHref,
  variante = "vert",
  className = "",
}: CTABannerProps) {
  return (
    <section
      className={`rounded-2xl p-8 md:p-10 text-center shadow-lg ${VARIANTES[variante]} ${className}`}
      aria-label={titre}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
        {titre}
      </h2>

      {sousTitre && (
        <p className="text-base opacity-90 max-w-xl mx-auto mb-6 leading-relaxed">
          {sousTitre}
        </p>
      )}

      <a
        href={ctaHref}
        className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400
                   text-white font-bold text-lg rounded-xl shadow-xl
                   transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {ctaTexte}
      </a>
    </section>
  );
}
