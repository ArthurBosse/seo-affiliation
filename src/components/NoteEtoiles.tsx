"use client";

// ============================================================
// NoteEtoiles — Affichage de la note en étoiles
// Props : note (0–5), taille, afficherChiffre
// ============================================================

interface NoteEtoilesProps {
  note: number; // 0–5, décimaux acceptés (ex: 4.5)
  taille?: "sm" | "md" | "lg";
  afficherChiffre?: boolean;
  nombreAvis?: number;
  className?: string;
}

const TAILLES = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl",
};

export default function NoteEtoiles({
  note,
  taille = "md",
  afficherChiffre = true,
  nombreAvis,
  className = "",
}: NoteEtoilesProps) {
  const noteArrondie = Math.round(note * 2) / 2; // arrondi au 0.5
  const etoilesPlein = Math.floor(noteArrondie);
  const demiEtoile = noteArrondie % 1 !== 0;
  const etoilesVide = 5 - etoilesPlein - (demiEtoile ? 1 : 0);

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      aria-label={`Note : ${note} sur 5${nombreAvis ? ` (${nombreAvis} avis)` : ""}`}
    >
      {/* Étoiles pleines */}
      {Array.from({ length: etoilesPlein }).map((_, i) => (
        <span
          key={`plein-${i}`}
          className={`${TAILLES[taille]} text-yellow-400`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}

      {/* Demi-étoile */}
      {demiEtoile && (
        <span
          className={`${TAILLES[taille]} relative inline-block text-gray-200`}
          aria-hidden="true"
        >
          ★
          <span
            className="absolute inset-0 overflow-hidden w-1/2 text-yellow-400"
            style={{ width: "50%" }}
          >
            ★
          </span>
        </span>
      )}

      {/* Étoiles vides */}
      {Array.from({ length: etoilesVide }).map((_, i) => (
        <span
          key={`vide-${i}`}
          className={`${TAILLES[taille]} text-gray-200`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}

      {/* Chiffre + nombre d'avis */}
      {afficherChiffre && (
        <span className="ml-2 font-semibold text-gray-800">
          {note.toFixed(1)}
          {nombreAvis && (
            <span className="font-normal text-gray-500 text-sm ml-1">
              ({nombreAvis.toLocaleString("fr-FR")} avis)
            </span>
          )}
        </span>
      )}
    </div>
  );
}
