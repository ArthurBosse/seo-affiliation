"use client";

// ============================================================
// Header — CAS-17 Design System
// Navigation principale sticky avec hamburger mobile.
// Rédacteurs : modifier NAV_LINKS pour changer le menu.
// ============================================================

import { useState } from "react";

const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

const NAV_LINKS = [
  { href: "/categorie/perte-de-poids", label: "Perte de poids" },
  { href: "/categorie/bien-etre",       label: "Bien-être" },
  { href: "/comparatif",                label: "Comparatifs" },
];

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a
            href="/"
            className="font-extrabold text-xl text-brand-700 hover:text-brand-800 transition-colors tracking-tight"
            aria-label={`${SITE_NOM} — Accueil`}
          >
            {SITE_NOM}
          </a>

          {/* Navigation desktop */}
          <nav
            className="hidden sm:flex items-center gap-1"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600
                           hover:text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {lien.label}
              </a>
            ))}
          </nav>

          {/* Bouton hamburger mobile */}
          <button
            className="sm:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg
                       hover:bg-gray-100 transition-colors gap-1"
            aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOuvert}
            onClick={() => setMenuOuvert((v) => !v)}
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200
                ${menuOuvert ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200
                ${menuOuvert ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200
                ${menuOuvert ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>

        {/* Menu mobile déroulant */}
        {menuOuvert && (
          <nav
            className="sm:hidden border-t border-gray-100 py-3 pb-4 space-y-1"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                           text-gray-700 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                onClick={() => setMenuOuvert(false)}
              >
                {lien.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
