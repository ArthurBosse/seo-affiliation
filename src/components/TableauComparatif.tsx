// ============================================================
// TableauComparatif — Tableau de comparaison multi-produits
// Utilisé dans les pages /comparatif/[slug]
// Rendu côté serveur (pas de "use client" nécessaire)
// ============================================================

import Image from "next/image";
import NoteEtoiles from "./NoteEtoiles";
import BoutonCTA from "./BoutonCTA";
import type { ProduitComparatif, ColonneComparatif } from "@/types/produit";

interface TableauComparatifProps {
  produits: ProduitComparatif[];
  colonnes?: ColonneComparatif[];
  className?: string;
}

const COLONNES_DEFAUT: ColonneComparatif[] = [
  { cle: "nomProduit", label: "Produit", type: "texte" },
  { cle: "note", label: "Note", type: "note" },
  { cle: "prix", label: "Prix", type: "prix" },
  { cle: "avantages", label: "Avantages", type: "texte" },
];

function CelluleValeur({
  colonne,
  produit,
}: {
  colonne: ColonneComparatif;
  produit: ProduitComparatif;
}) {
  const cle = colonne.cle as keyof ProduitComparatif;

  switch (colonne.type) {
    case "note":
      return <NoteEtoiles note={produit.note} taille="sm" afficherChiffre />;

    case "boolean":
      return (
        <span>
          {produit.extra?.[colonne.cle] ? (
            <span className="text-green-600 font-bold text-lg">✓</span>
          ) : (
            <span className="text-red-400 text-lg">✗</span>
          )}
        </span>
      );

    case "prix":
      return (
        <span className="font-semibold text-gray-900">{produit[cle] as string}</span>
      );

    default:
      if (cle === "avantages") {
        return (
          <ul className="text-sm text-gray-600 space-y-1">
            {produit.avantages.slice(0, 3).map((a, i) => (
              <li key={i} className="flex items-start gap-1">
                <span className="text-green-500 mt-0.5">✓</span> {a}
              </li>
            ))}
          </ul>
        );
      }
      return <span className="text-gray-700">{String(produit[cle] ?? "")}</span>;
  }
}

export default function TableauComparatif({
  produits,
  colonnes = COLONNES_DEFAUT,
  className = "",
}: TableauComparatifProps) {
  return (
    <div className={`w-full overflow-x-auto my-8 ${className}`}>
      {/* Vue tableau (desktop) */}
      <table className="hidden md:table w-full border-collapse text-sm">
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="px-4 py-3 text-left font-semibold">Produit</th>
            {colonnes.slice(1).map((col) => (
              <th key={col.cle} className="px-4 py-3 text-left font-semibold">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-center font-semibold">Commander</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit, index) => (
            <tr
              key={produit.slug}
              className={`border-b border-gray-200 ${
                index === 0
                  ? "bg-green-50 ring-2 ring-green-500 ring-inset"
                  : index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              }`}
            >
              {/* Colonne produit avec image */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={produit.image}
                    alt={produit.imageAlt}
                    width={56}
                    height={56}
                    className="rounded-md object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{produit.nomProduit}</p>
                    {index === 0 && (
                      <span className="inline-block bg-green-600 text-white text-xs px-2 py-0.5 rounded-full mt-1">
                        #1 Recommandé
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Colonnes dynamiques */}
              {colonnes.slice(1).map((col) => (
                <td key={col.cle} className="px-4 py-4">
                  <CelluleValeur colonne={col} produit={produit} />
                </td>
              ))}

              {/* CTA */}
              <td className="px-4 py-4 text-center">
                <BoutonCTA
                  slug={produit.lienAffiliation.slug}
                  texte={produit.lienAffiliation.ctaTexte}
                  prix={produit.lienAffiliation.prix}
                  variante={index === 0 ? "principal" : "secondaire"}
                  taille="sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Vue cartes (mobile) */}
      <div className="md:hidden space-y-4">
        {produits.map((produit, index) => (
          <div
            key={produit.slug}
            className={`rounded-xl border p-4 ${
              index === 0
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={produit.image}
                alt={produit.imageAlt}
                width={48}
                height={48}
                className="rounded-md object-contain"
              />
              <div>
                <p className="font-bold text-gray-900">{produit.nomProduit}</p>
                {index === 0 && (
                  <span className="text-xs text-green-700 font-medium">
                    #1 Recommandé
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <NoteEtoiles note={produit.note} taille="sm" afficherChiffre />
              <span className="font-bold text-gray-900">{produit.prix}</span>
            </div>

            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              {produit.avantages.slice(0, 3).map((a, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-green-500">✓</span> {a}
                </li>
              ))}
            </ul>

            <BoutonCTA
              slug={produit.lienAffiliation.slug}
              texte={produit.lienAffiliation.ctaTexte}
              prix={produit.lienAffiliation.prix}
              variante={index === 0 ? "principal" : "secondaire"}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
