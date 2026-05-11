// ============================================================
// Politique de cookies — /politique-cookies
// Conformité CNIL : détail des cookies utilisés + gestion consentement
// ============================================================

import type { Metadata } from "next";

const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: `Politique de cookies — ${SITE_NOM}`,
  description: "Liste des cookies utilisés sur ce site et comment gérer vos préférences.",
  robots: "noindex,follow",
  alternates: {
    canonical: `${SITE_URL}/politique-cookies`,
  },
};

export default function PolitiqueCookies() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-700 underline">
          Accueil
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Politique de cookies</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Politique de cookies
      </h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Qu&apos;est-ce qu&apos;un cookie ?
          </h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre navigateur
            lorsque vous visitez un site web. Il permet de mémoriser des
            informations sur votre visite pour améliorer votre expérience ou
            mesurer l&apos;audience du site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Cookies utilisés sur ce site
          </h2>

          {/* Tableau des cookies */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 border border-gray-200 font-semibold">
                    Cookie
                  </th>
                  <th className="text-left p-3 border border-gray-200 font-semibold">
                    Fournisseur
                  </th>
                  <th className="text-left p-3 border border-gray-200 font-semibold">
                    Finalité
                  </th>
                  <th className="text-left p-3 border border-gray-200 font-semibold">
                    Durée
                  </th>
                  <th className="text-left p-3 border border-gray-200 font-semibold">
                    Catégorie
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="p-3 border border-gray-200 font-mono text-xs">
                    cookie_consent
                  </td>
                  <td className="p-3 border border-gray-200">{SITE_NOM}</td>
                  <td className="p-3 border border-gray-200">
                    Mémorise votre choix de consentement aux cookies
                  </td>
                  <td className="p-3 border border-gray-200">1 an</td>
                  <td className="p-3 border border-gray-200">
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                      Nécessaire
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 font-mono text-xs">
                    _ga, _ga_*
                  </td>
                  <td className="p-3 border border-gray-200">Google Analytics</td>
                  <td className="p-3 border border-gray-200">
                    Mesure d&apos;audience anonymisée (pages vues, durée de visite)
                  </td>
                  <td className="p-3 border border-gray-200">2 ans</td>
                  <td className="p-3 border border-gray-200">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      Analytique
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 font-mono text-xs">
                    _clck, _clsk
                  </td>
                  <td className="p-3 border border-gray-200">Microsoft Clarity</td>
                  <td className="p-3 border border-gray-200">
                    Heatmaps et enregistrements de session (pseudonymisé)
                  </td>
                  <td className="p-3 border border-gray-200">1 an</td>
                  <td className="p-3 border border-gray-200">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      Analytique
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Gestion de vos préférences
          </h2>
          <p>
            Lors de votre première visite, une bannière vous invite à accepter ou
            refuser les cookies analytiques. Votre choix est mémorisé via le
            cookie <code className="bg-gray-100 px-1 rounded">cookie_consent</code>.
          </p>
          <p className="mt-3">
            Pour modifier votre choix à tout moment, vous pouvez supprimer ce
            cookie depuis les paramètres de votre navigateur :
          </p>
          <ul className="mt-3 space-y-1 list-disc pl-5">
            <li>
              Chrome :{" "}
              <em>Paramètres → Confidentialité → Cookies → Voir tous les cookies</em>
            </li>
            <li>
              Firefox :{" "}
              <em>Paramètres → Vie privée → Cookies et données de sites</em>
            </li>
            <li>
              Safari :{" "}
              <em>Préférences → Confidentialité → Gérer les données de sites web</em>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Cookies et liens d&apos;affiliation
          </h2>
          <p>
            Lorsque vous cliquez sur un lien d&apos;affiliation (/go/...), vous
            êtes redirigé vers le site partenaire. Ce site partenaire peut
            déposer ses propres cookies de tracking. Ces cookies ne sont pas
            sous notre contrôle — consultez la politique de cookies du site
            partenaire.
          </p>
        </section>
      </div>
    </main>
  );
}
