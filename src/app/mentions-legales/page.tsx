// ============================================================
// Mentions légales — /mentions-legales
// ⚠️  À mettre à jour avec les vraies coordonnées de l'éditeur
//     avant la mise en ligne (obligation légale française)
// ============================================================

import type { Metadata } from "next";

const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE_NOM}`,
  description: "Mentions légales du site, informations sur l'éditeur et l'hébergeur.",
  robots: "noindex,follow", // Pas d'intérêt SEO, mais accessible
  alternates: {
    canonical: `${SITE_URL}/mentions-legales`,
  },
};

export default function MentionsLegales() {
  const annee = new Date().getFullYear();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Fil d'Ariane" className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-green-700 underline">
          Accueil
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-700">Mentions légales</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Mentions légales
      </h1>

      <div className="prose prose-gray max-w-none space-y-8">
        {/* Éditeur */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Éditeur du site
          </h2>
          <p className="text-gray-700">
            Le site <strong>{SITE_NOM}</strong> ({SITE_URL}) est édité par :
          </p>
          <ul className="mt-3 space-y-1 text-gray-700">
            <li>
              <strong>Raison sociale :</strong>{" "}
              <span className="text-red-600">[À compléter]</span>
            </li>
            <li>
              <strong>Statut :</strong>{" "}
              <span className="text-red-600">[Auto-entrepreneur / SARL / SAS]</span>
            </li>
            <li>
              <strong>SIRET :</strong>{" "}
              <span className="text-red-600">[À compléter]</span>
            </li>
            <li>
              <strong>Adresse :</strong>{" "}
              <span className="text-red-600">[À compléter]</span>
            </li>
            <li>
              <strong>Contact :</strong>{" "}
              <span className="text-red-600">[email@contact.fr]</span>
            </li>
          </ul>
        </section>

        {/* Hébergeur */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Hébergement
          </h2>
          <p className="text-gray-700">
            Ce site est hébergé par :
          </p>
          <ul className="mt-3 space-y-1 text-gray-700">
            <li>
              <strong>Hébergeur :</strong> Cloudways (DigitalOcean)
            </li>
            <li>
              <strong>Adresse :</strong> 163 Chestnut Street, Atlanta, GA
              30316, USA
            </li>
          </ul>
        </section>

        {/* Affiliation */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Liens d&apos;affiliation
          </h2>
          <p className="text-gray-700">
            Ce site participe à des programmes d&apos;affiliation. Certains
            liens présents sur ce site sont des liens d&apos;affiliation, ce qui
            signifie que nous percevons une commission si vous effectuez un achat
            via ces liens, <strong>sans aucun surcoût pour vous</strong>.
          </p>
          <p className="text-gray-700 mt-2">
            Cette commission nous permet de financer le site et de maintenir nos
            tests indépendants. Nos avis restent objectifs et ne sont pas
            influencés par les commissions perçues.
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Propriété intellectuelle
          </h2>
          <p className="text-gray-700">
            L&apos;ensemble des contenus de ce site (textes, images, graphiques)
            sont protégés par le droit d&apos;auteur. Toute reproduction est
            interdite sans autorisation écrite préalable.
          </p>
        </section>

        {/* Données personnelles */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Données personnelles
          </h2>
          <p className="text-gray-700">
            Consultez notre{" "}
            <a
              href="/politique-confidentialite"
              className="text-green-700 underline hover:text-green-800"
            >
              Politique de confidentialité
            </a>{" "}
            pour en savoir plus sur la collecte et le traitement de vos données.
          </p>
        </section>

        <p className="text-xs text-gray-400 border-t border-gray-200 pt-4">
          © {annee} {SITE_NOM}. Tous droits réservés.
        </p>
      </div>
    </main>
  );
}
