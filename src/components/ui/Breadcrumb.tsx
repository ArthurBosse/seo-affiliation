// ============================================================
// Breadcrumb — Fil d'Ariane sémantique
// CAS-17 Design System
// ============================================================

export interface BreadcrumbItem {
  nom: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`text-sm text-gray-500 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const estDernier = i === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-gray-300 select-none" aria-hidden="true">
                  ›
                </span>
              )}
              {estDernier ? (
                <span className="text-gray-700 font-medium truncate max-w-[200px]">
                  {item.nom}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-brand-700 hover:underline transition-colors"
                >
                  {item.nom}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
