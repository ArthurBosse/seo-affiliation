// ============================================================
// VerdictBox — Encadré verdict éditorial
// CAS-17 Design System
// Rendu serveur
// ============================================================

interface VerdictBoxProps {
  html: string; // HTML sécurisé depuis le CMS
}

export default function VerdictBox({ html }: VerdictBoxProps) {
  return (
    <div className="relative my-8 rounded-2xl overflow-hidden border border-yellow-200 bg-amber-50">
      {/* Barre latérale colorée */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400 rounded-l-2xl" />

      <div className="pl-6 pr-5 py-5">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span aria-hidden="true">⚡</span>
          Notre verdict
        </h2>
        <div
          className="prose prose-sm prose-gray max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
