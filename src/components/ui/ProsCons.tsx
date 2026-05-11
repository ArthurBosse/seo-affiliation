// ============================================================
// ProsCons — Tableau avantages / inconvénients
// CAS-17 Design System
// Rendu serveur
// ============================================================

interface ProsConsProps {
  avantages: string[];
  inconvenients: string[];
}

export default function ProsCons({ avantages, inconvenients }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {/* Avantages */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5">
        <h2 className="text-base font-bold text-brand-800 mb-3 flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">✅</span>
          Avantages
        </h2>
        <ul className="space-y-2">
          {avantages.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-brand-900 text-sm">
              <span className="text-brand-600 mt-0.5 flex-shrink-0 font-bold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Inconvénients */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <h2 className="text-base font-bold text-red-800 mb-3 flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">❌</span>
          Inconvénients
        </h2>
        <ul className="space-y-2">
          {inconvenients.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-red-900 text-sm">
              <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
