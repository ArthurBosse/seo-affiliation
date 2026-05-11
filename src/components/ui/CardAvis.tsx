// ============================================================
// CardAvis — Carte produit pour les listings
// CAS-17 Design System
// Rendu serveur — pas de "use client"
// ============================================================

import NoteEtoiles from "@/components/NoteEtoiles";
import BadgeCategorie from "./BadgeCategorie";

interface CardAvisProps {
  slug: string;
  titre: string;
  categorie: string;
  noteCertifiee: number;
  nombreAvis?: number;
  metaDescription: string;
  meilleurChoix?: boolean;
}

export default function CardAvis({
  slug,
  titre,
  categorie,
  noteCertifiee,
  nombreAvis,
  metaDescription,
  meilleurChoix = false,
}: CardAvisProps) {
  return (
    <a
      href={`/avis/${slug}`}
      className="group relative block rounded-2xl border bg-surface-card p-5
                 hover:border-brand-500 transition-all duration-200 card-hover"
    >
      {/* Badge #1 */}
      {meilleurChoix && (
        <span className="absolute -top-2.5 left-4 bg-brand-600 text-white text-xs
                         font-bold px-3 py-0.5 rounded-full shadow-sm">
          #1 Recommandé
        </span>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-gray-900 group-hover:text-brand-700 leading-snug">
          {titre}
        </h3>
        <BadgeCategorie categorie={categorie} className="flex-shrink-0" />
      </div>

      <NoteEtoiles
        note={noteCertifiee}
        taille="sm"
        afficherChiffre
        nombreAvis={nombreAvis}
        className="mb-3"
      />

      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {metaDescription}
      </p>

      <p className="text-sm text-brand-700 font-semibold mt-3 group-hover:underline">
        Lire l&apos;avis complet →
      </p>
    </a>
  );
}
