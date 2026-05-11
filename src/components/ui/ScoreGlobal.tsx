// ============================================================
// ScoreGlobal — Encadré note globale + CTA hero
// CAS-17 Design System
// Rendu serveur (BoutonCTA est client mais importé ici)
// ============================================================

import NoteEtoiles from "@/components/NoteEtoiles";
import BoutonCTA from "@/components/BoutonCTA";
import type { LienAffiliation } from "@/types/produit";

interface ScoreGlobalProps {
  note: number;
  nombreAvis?: number;
  lienPrincipal?: LienAffiliation;
}

export default function ScoreGlobal({
  note,
  nombreAvis,
  lienPrincipal,
}: ScoreGlobalProps) {
  return (
    <div
      className="bg-brand-50 border border-brand-200 rounded-2xl p-5 mb-6
                 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <p className="text-xs font-semibold text-brand-700 uppercase tracking-widest mb-2">
          Notre note globale
        </p>
        <NoteEtoiles
          note={note}
          taille="lg"
          afficherChiffre
          nombreAvis={nombreAvis}
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
  );
}
