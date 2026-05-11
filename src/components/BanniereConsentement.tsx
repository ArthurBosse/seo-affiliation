"use client";

// ============================================================
// BanniereConsentement.tsx — Bannière cookies RGPD / CNIL
//
// Comportement :
//   - Affichée au 1er visit si aucun choix stocké
//   - Consentement stocké dans localStorage ('cookie_consent')
//   - Valeurs : 'accepted' | 'declined'
//   - En cas de refus : les scripts analytics ne sont pas chargés
//
// Note : La désactivation complète des scripts tiers avant consentement
//   est gérée via la condition NODE_ENV dans Analytics.tsx pour le dev.
//   En prod, GTM doit être configuré pour respecter le consentement.
// ============================================================

import { useState, useEffect } from "react";

const STORAGE_KEY = "cookie_consent";

export default function BanniereConsentement() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choix = localStorage.getItem(STORAGE_KEY);
    if (!choix) setVisible(true);
  }, []);

  function accepter() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    // Informer GTM que le consentement a été donné
    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      if (w.dataLayer) {
        w.dataLayer.push({
          event: "cookie_consent_granted",
          consentType: "all",
        });
      }
    }
  }

  function refuser() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-4 shadow-2xl
                 sm:px-6 sm:py-5"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">
          Nous utilisons des cookies pour analyser notre trafic (Google
          Analytics, Microsoft Clarity) et améliorer votre expérience. Vos
          données restent anonymisées.{" "}
          <a
            href="/politique-cookies"
            className="underline hover:text-white text-gray-400"
          >
            En savoir plus
          </a>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={refuser}
            className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600
                       rounded-lg hover:bg-gray-800 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accepter}
            className="px-4 py-2 text-sm font-bold bg-green-600 hover:bg-green-700
                       text-white rounded-lg transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
