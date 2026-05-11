"use client";

// ============================================================
// BoutonCTA — Bouton d'appel à l'action affiliation
// Redirige vers /go/[slug] (tracking interne obligatoire)
//
// Le prop `position` identifie l'emplacement du CTA dans la page.
// Il est transmis au handler /go/[slug] via ?pos= pour construire
// le paramètre utm_content, et déclenche un event GA4 côté client.
// ============================================================

import { trackEvent } from "@/components/Analytics";

interface BoutonCTAProps {
  slug: string; // Slug de redirection interne /go/[slug]
  texte: string; // Texte du bouton
  partenaire?: string; // Affiché sous le bouton (ex: "Via Amazon")
  prix?: string; // Prix affiché dans le bouton
  position?: "hero" | "tableau" | "verdict" | "faq" | "liens"; // Position dans la page
  variante?: "principal" | "secondaire" | "discret";
  taille?: "sm" | "md" | "lg";
  className?: string;
}

const VARIANTES = {
  principal:
    "bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg hover:shadow-xl",
  secondaire:
    "bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md hover:shadow-lg",
  discret:
    "bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium border border-gray-300",
};

const TAILLES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function BoutonCTA({
  slug,
  texte,
  partenaire,
  prix,
  position,
  variante = "principal",
  taille = "md",
  className = "",
}: BoutonCTAProps) {
  const href = position ? `/go/${slug}?pos=${position}` : `/go/${slug}`;

  function handleClick() {
    trackEvent("affiliation_click", {
      produit: slug,
      position: position ?? "inconnu",
      partenaire: partenaire ?? "",
    });
  }

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <a
        href={href}
        rel="nofollow noopener sponsored"
        target="_blank"
        onClick={handleClick}
        className={`
          inline-flex items-center justify-center gap-2 rounded-lg
          transition-all duration-200 transform hover:-translate-y-0.5
          ${VARIANTES[variante]} ${TAILLES[taille]}
        `}
      >
        {/* Icône flèche */}
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>

        <span>
          {texte}
          {prix && <span className="ml-2 font-normal opacity-90">— {prix}</span>}
        </span>
      </a>

      {partenaire && (
        <p className="text-xs text-gray-400 mt-0.5">
          Disponible via {partenaire} · lien partenaire
        </p>
      )}
    </div>
  );
}
