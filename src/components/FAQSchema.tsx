"use client";

// ============================================================
// FAQSchema — Accordéon FAQ + injection JSON-LD schema.org
// Le JSON-LD est injecté côté serveur dans la page parente
// Ce composant gère uniquement l'affichage interactif
// ============================================================

import { useState } from "react";
import type { FAQ } from "@/types/produit";

interface FAQSchemaProps {
  faqs: FAQ[];
  titre?: string;
  className?: string;
}

export default function FAQSchema({
  faqs,
  titre = "Questions fréquentes",
  className = "",
}: FAQSchemaProps) {
  const [ouvert, setOuvert] = useState<number | null>(null);

  return (
    <section className={`my-8 ${className}`} aria-label="FAQ">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{titre}</h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center
                         bg-white hover:bg-gray-50 transition-colors duration-150
                         font-medium text-gray-900"
              onClick={() => setOuvert(ouvert === index ? null : index)}
              aria-expanded={ouvert === index}
              aria-controls={`faq-reponse-${index}`}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                  ouvert === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={`faq-reponse-${index}`}
              role="region"
              hidden={ouvert !== index}
              className="px-5 py-4 bg-gray-50 text-gray-700 text-sm leading-relaxed
                         border-t border-gray-200"
            >
              {faq.reponse}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
