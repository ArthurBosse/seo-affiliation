// ============================================================
// BadgeCategorie — Étiquette de catégorie
// CAS-17 Design System
// ============================================================

interface BadgeCategorieProps {
  categorie: string;
  variante?: "brand" | "muted";
  className?: string;
}

export default function BadgeCategorie({
  categorie,
  variante = "brand",
  className = "",
}: BadgeCategorieProps) {
  const styles = {
    brand: "bg-brand-100 text-brand-800",
    muted: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${styles[variante]} ${className}`}
    >
      {categorie}
    </span>
  );
}
