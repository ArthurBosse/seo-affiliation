"use client";

// ============================================================
// CTABanniereSticky — Barre CTA fixée en bas sur mobile
// Apparaît après 300px de scroll, disparaît au-delà du footer
// Utilisée sur les pages avis pour maximiser la conversion mobile
// ============================================================

import { useEffect, useState } from "react";
import { trackEvent } from "@/components/Analytics";

interface CTABanniereStickyProps {
  slug: string;
  texte: string;
  nomProduit: string;
  partenaire?: string;
  prix?: string;
}

export default function CTABanniereSticky({
  slug,
  texte,
  nomProduit,
  partenaire,
  prix,
}: CTABanniereStickyProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    trackEvent("affiliation_click", {
      produit: slug,
      position: "sticky_mobile",
      partenaire: partenaire ?? "",
    });
  }

  const href = `/go/${slug}?pos=sticky`;

  return (
    <div
      className={`
        sm:hidden fixed bottom-0 left-0 right-0 z-40
        bg-gray-900 border-t border-gray-700
        px-4 py-3 flex items-center justify-between gap-3
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
      aria-label={`Acheter ${nomProduit}`}
    >
      {/* Info produit */}
      <div className="min-w-0">
        <p className="text-xs text-gray-400 leading-none mb-0.5">
          {nomProduit}
        </p>
        {prix && (
          <p className="text-sm font-bold text-white leading-none">{prix}</p>
        )}
      </div>

      {/* CTA button */}
      <a
        href={href}
        rel="nofollow noopener sponsored"
        target="_blank"
        onClick={handleClick}
        className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5
                   bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                   text-white text-sm font-bold rounded-lg
                   transition-colors shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        {texte}
      </a>
    </div>
  );
}
