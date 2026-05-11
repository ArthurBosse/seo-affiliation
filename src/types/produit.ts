// ============================================================
// Types TypeScript — Modèle de données pour les pages avis
// ============================================================

export interface FAQ {
  question: string;
  reponse: string;
}

export interface ProCon {
  avantages: string[];
  inconvenients: string[];
}

export interface LienAffiliation {
  /** Slug de redirection interne (ex: "keto-actives-amazon") */
  slug: string;
  /** Texte du bouton CTA */
  ctaTexte: string;
  /** Nom du partenaire affiché (ex: "Amazon", "Site officiel") */
  partenaire: string;
  /** Prix affiché (ex: "39,90 €") */
  prix?: string;
}

export interface AvisProduit {
  // --- Méta SEO ---
  slug: string;
  titre: string; // Ex: "Avis Keto Actives 2025 — Mon test complet"
  metaDescription: string; // 120–160 caractères
  datePublication: string; // ISO 8601
  dateMiseAJour: string; // ISO 8601
  auteur: string;

  // --- Produit ---
  nomProduit: string;
  imagePrincipale: string; // URL image principale
  imageAlt: string;
  categorie: string; // Ex: "Perte de poids", "Bien-être"

  // --- Note ---
  noteCertifiee: number; // 0–5 (peut être décimal ex: 4.5)
  nombreAvis: number; // Pour affichage crédibilité

  // --- Contenu ---
  introduction: string; // Paragraphe d'accroche (HTML ou markdown)
  prosCons: ProCon;
  verdict: string; // Résumé verdict rédacteur (HTML ou markdown)
  contenuDetaille?: string; // Corps complet de l'article (HTML)

  // --- Affiliation ---
  liens: LienAffiliation[];

  // --- FAQ ---
  faq: FAQ[];

  // --- Interne ---
  indexable: boolean; // false = noindex (brouillon)
  canonical?: string; // URL canonique si syndication
}

export interface ColonneComparatif {
  cle: keyof ProduitComparatif | string;
  label: string;
  type: "texte" | "note" | "boolean" | "prix";
}

export interface ProduitComparatif {
  slug: string;
  nomProduit: string;
  image: string;
  imageAlt: string;
  note: number;
  prix: string;
  lienAffiliation: LienAffiliation;
  avantages: string[];
  inconvenients: string[];
  /** Données libres pour colonnes spécialisées */
  extra?: Record<string, string | number | boolean>;
}

export interface PageComparatif {
  slug: string;
  titre: string;
  metaDescription: string;
  datePublication: string;
  dateMiseAJour: string;
  auteur: string;
  introduction: string;
  produits: ProduitComparatif[];
  colonnes?: ColonneComparatif[];
  verdict: string;
  faq: FAQ[];
  indexable: boolean;
  canonical?: string;
}
