// ============================================================
// Footer — CAS-17 Design System
// Rendu serveur (pas de "use client").
// ============================================================

const SITE_NOM = process.env.NEXT_PUBLIC_SITE_NOM ?? "MonSiteAvis";

const LIENS_CATEGORIES = [
  { href: "/categorie/perte-de-poids", label: "Perte de poids" },
  { href: "/categorie/bien-etre",       label: "Bien-être" },
  { href: "/comparatif",                label: "Comparatifs" },
];

const LIENS_LEGAUX = [
  { href: "/mentions-legales",            label: "Mentions légales" },
  { href: "/politique-confidentialite",   label: "Politique de confidentialité" },
  { href: "/politique-cookies",           label: "Cookies" },
];

export default function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-gray-400 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Colonne marque */}
          <div>
            <p className="font-extrabold text-white text-lg mb-3 tracking-tight">
              {SITE_NOM}
            </p>
            <p className="text-sm leading-relaxed">
              Avis indépendants sur les compléments alimentaires pour votre
              santé et bien-être. Tests réels, sans publicité masquée.
            </p>
          </div>

          {/* Colonne catégories */}
          <div>
            <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Catégories
            </p>
            <ul className="space-y-2 text-sm">
              {LIENS_CATEGORIES.map((lien) => (
                <li key={lien.href}>
                  <a href={lien.href} className="hover:text-white transition-colors">
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne légal */}
          <div>
            <p className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Légal
            </p>
            <ul className="space-y-2 text-sm">
              {LIENS_LEGAUX.map((lien) => (
                <li key={lien.href}>
                  <a href={lien.href} className="hover:text-white transition-colors">
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barre de bas */}
        <div className="border-t border-gray-800 pt-6 text-xs text-center leading-relaxed">
          <p>
            © {annee} {SITE_NOM}. Les liens de ce site peuvent être des liens
            d&apos;affiliation. Nous percevons une commission sur les achats
            effectués via nos liens, sans surcoût pour vous.
          </p>
        </div>
      </div>
    </footer>
  );
}
