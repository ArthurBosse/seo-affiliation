// ============================================================
// TrustSignals — Bande de réassurance
// Icônes + textes courts pour asseoir la crédibilité du site
// Placé juste après le hero sur la homepage
// ============================================================

const SIGNAUX = [
  {
    icone: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titre: "Tests terrain réels",
    sousTitre: "Produits achetés & testés",
  },
  {
    icone: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    titre: "4,8 / 5 en moyenne",
    sousTitre: "Sur plus de 1 200 avis",
  },
  {
    icone: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    titre: "100% indépendant",
    sousTitre: "Aucune influence publicitaire",
  },
  {
    icone: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    titre: "Mis à jour régulièrement",
    sousTitre: "Données fraîches en 2025",
  },
];

interface TrustSignalsProps {
  className?: string;
}

export default function TrustSignals({ className = "" }: TrustSignalsProps) {
  return (
    <section
      className={`bg-gray-50 border-y border-gray-200 py-6 ${className}`}
      aria-label="Nos engagements"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {SIGNAUX.map((signal) => (
            <div
              key={signal.titre}
              className="flex flex-col items-center text-center gap-2 sm:flex-row sm:text-left sm:items-start sm:gap-3"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                {signal.icone}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {signal.titre}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{signal.sousTitre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
