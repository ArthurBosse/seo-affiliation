// ============================================================
// Comparatif — Meilleurs compléments perte de poids 2025
// Template à copier pour tout nouveau comparatif
// ============================================================

import type { PageComparatif } from "@/types/produit";

const page: PageComparatif = {
  slug: "meilleurs-complements-perte-de-poids",
  titre: "Meilleurs compléments alimentaires perte de poids 2025 — Comparatif",
  metaDescription:
    "Quel est le meilleur complément pour maigrir en 2025 ? Notre comparatif de 5 produits testés : efficacité, composition et rapport qualité/prix.",
  datePublication: "2025-01-20T08:00:00Z",
  dateMiseAJour: "2025-05-10T08:00:00Z",
  auteur: "Marie Dupont",

  introduction: `
    <p>Nous avons testé et comparé les <strong>5 meilleurs compléments alimentaires pour la perte de poids</strong>
    disponibles en France en 2025. Notre classement est basé sur la composition, l'efficacité prouvée,
    la qualité de fabrication et le rapport qualité/prix.</p>
  `,

  produits: [
    {
      slug: "keto-actives",
      nomProduit: "Keto Actives",
      image: "/images/produits/keto-actives.webp",
      imageAlt: "Keto Actives complément keto",
      note: 4.5,
      prix: "39,90 €/mois",
      lienAffiliation: {
        slug: "keto-actives-officiel",
        ctaTexte: "Voir le prix",
        partenaire: "Site officiel",
        prix: "39,90 €",
      },
      avantages: [
        "8 ingrédients actifs naturels",
        "Favorise la cétose",
        "Garantie 90 jours",
      ],
      inconvenients: ["Disponible uniquement sur le site officiel"],
    },
    {
      slug: "garcinia-cambogia",
      nomProduit: "Garcinia Cambogia Premium",
      image: "/images/produits/garcinia.webp",
      imageAlt: "Garcinia Cambogia Premium",
      note: 4.0,
      prix: "29,90 €/mois",
      lienAffiliation: {
        slug: "garcinia-cambogia-officiel",
        ctaTexte: "Voir le prix",
        partenaire: "Site officiel",
        prix: "29,90 €",
      },
      avantages: [
        "Prix accessible",
        "Supprime l'appétit",
        "Formule simple et efficace",
      ],
      inconvenients: ["Moins de principes actifs que Keto Actives"],
    },
  ],

  colonnes: [
    { cle: "nomProduit", label: "Produit", type: "texte" },
    { cle: "note", label: "Notre note", type: "note" },
    { cle: "prix", label: "Prix mensuel", type: "prix" },
    { cle: "avantages", label: "Points forts", type: "texte" },
  ],

  verdict: `
    <p>Notre meilleur choix est <strong>Keto Actives</strong> pour sa formule complète et son efficacité
    prouvée sur la cétose. Pour un budget plus serré, Garcinia Cambogia Premium offre un bon rapport
    qualité/prix.</p>
  `,

  faq: [
    {
      question: "Quels sont les meilleurs compléments pour maigrir en 2025 ?",
      reponse:
        "D'après nos tests, Keto Actives arrive en tête pour les personnes suivant un régime keto, tandis que Garcinia Cambogia Premium est idéal pour ceux qui cherchent à réduire leur appétit.",
    },
    {
      question: "Ces compléments sont-ils dangereux ?",
      reponse:
        "Les compléments de notre sélection utilisent des ingrédients naturels et sont fabriqués selon les normes européennes. Consultez votre médecin avant toute prise si vous avez des problèmes de santé.",
    },
  ],

  indexable: true,
};

export default page;
