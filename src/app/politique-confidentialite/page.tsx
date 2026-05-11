// ============================================================
// Politique de confidentialité — /politique-confidentialite
// Conforme RGPD / CNIL
// ⚠️ À compléter avec les vraies coordonnées avant mise en ligne
// ============================================================

import type { Metadata } from "next";

const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${SITE_NOM}`,
  description:
    "Comment nous collectons, utilisons et protégeons vos données personnelles.",
  robots: "noindex,follow",
  alternates: {
    canonical: `${SITE_URL}/politique-confidentialite`,
  },
};

export default function PolitiqueConfidentialite() {
  const dateUpdate = "11 mai 2026";

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-700 underline">
          Accueil
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Politique de confidentialité</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Dernière mise à jour : {dateUpdate}
      </p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            1. Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement des données est l&apos;éditeur du site{" "}
            <strong>{SITE_NOM}</strong>. Pour exercer vos droits, contactez-nous
            à :{" "}
            <span className="text-red-600">[email@contact.fr]</span>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            2. Données collectées
          </h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <strong>Données de navigation</strong> : pages visitées, durée de
              visite, appareil utilisé — collectées via Google Analytics (données
              anonymisées).
            </li>
            <li>
              <strong>Clics sur liens d&apos;affiliation</strong> : slug du lien
              cliqué, horodatage — sans identifiant personnel.
            </li>
            <li>
              <strong>Enregistrements de session</strong> (si consentement) : via
              Microsoft Clarity pour améliorer l&apos;expérience utilisateur.
              Données pseudonymisées.
            </li>
          </ul>
          <p className="mt-3">
            Nous ne collectons <strong>aucune donnée directement
            identifiante</strong> (nom, prénom, email) sauf si vous nous
            contactez directement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            3. Finalités du traitement
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Analyse du trafic et amélioration du site (intérêt légitime)</li>
            <li>Mesure des performances des liens d&apos;affiliation</li>
            <li>Optimisation de l&apos;expérience utilisateur</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            4. Cookies et traceurs
          </h2>
          <p>
            Consultez notre{" "}
            <a
              href="/politique-cookies"
              className="text-green-700 underline hover:text-green-800"
            >
              Politique de cookies
            </a>{" "}
            pour le détail de tous les traceurs utilisés.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            5. Vos droits (RGPD)
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition au traitement</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, contactez-nous par email :{" "}
            <span className="text-red-600">[email@contact.fr]</span>. Vous pouvez
            également adresser une réclamation à la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline"
            >
              CNIL
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            6. Conservation des données
          </h2>
          <p>
            Les données de navigation sont conservées 26 mois (durée légale
            Google Analytics). Les données de clics d&apos;affiliation sont
            conservées 13 mois à des fins comptables.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            7. Sous-traitants
          </h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Google Analytics</strong> — Analyse du trafic (USA, clauses
              contractuelles types)
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — Heatmaps / session recordings
            </li>
            <li>
              <strong>Cloudflare</strong> — CDN et protection DDoS
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
