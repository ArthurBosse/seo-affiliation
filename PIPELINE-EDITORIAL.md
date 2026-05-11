# Pipeline éditorial — Guide rédacteur

Ce document explique comment créer et publier une page d'avis produit de A à Z, sans aide technique.

---

## Vue d'ensemble du pipeline

```
Recherche mot-clé → Brief rédacteur → Rédaction → Relecture → Publication → Suivi GSC
     (CMO)             (CMO)         (Rédacteur)    (CMO)      (Technique)   (CMO/CTO)
```

**Délai cible :** 3 jours ouvrés de la validation du mot-clé à l'indexation.

---

## Étape 1 — Recherche et validation du mot-clé (CMO)

Avant de rédiger, valider que le mot-clé cible est pertinent.

**Checklist mot-clé :**
- [ ] Requête principale : `avis [nom-produit]` — vérifier le volume sur Google Search Console ou Ahrefs
- [ ] Requête secondaire : `[nom-produit] avis`, `[nom-produit] test`, `[nom-produit] efficace`
- [ ] Intention de recherche : l'utilisateur cherche-t-il un avis avant d'acheter ? (intention transactionnelle)
- [ ] Concurrence : les 3 premiers résultats sont-ils battables ?
- [ ] Lien affiliation disponible : existe-t-il un programme pour ce produit ?

---

## Étape 2 — Brief rédacteur (CMO)

Créer un brief dans Notion/Google Docs avec :

| Champ | Valeur |
|-------|--------|
| Titre H1 | `Avis [Nom Produit] 2025 — Mon test complet` |
| Méta-description | 120–160 caractères, inclure le mot-clé |
| Mot-clé principal | `avis [nom-produit]` |
| Mots-clés secondaires | `[nom-produit] test`, `[nom-produit] efficace` |
| Note cible | 4.0 à 5.0 (selon test réel) |
| Nombre mots | 1200–1800 mots |
| Lien affiliation | Fournir le slug `/go/[slug]` |
| Délai | Date de livraison |

---

## Étape 3 — Rédaction (Rédacteur)

### Structure obligatoire de chaque avis

```
H1 : Avis [Produit] [Année] — [Accroche]
│
├── Introduction (150–200 mots)
│   ├── Contexte : pourquoi j'ai testé ce produit
│   ├── Résultat clé en 1 phrase (accroche)
│   └── Promesse : ce que le lecteur va apprendre
│
├── Note globale + CTA affiliation
│
├── Tableau pros / cons
│   ├── 4–6 avantages concrets
│   └── 2–4 inconvénients honnêtes
│
├── Verdict rapide (100–150 mots)
│   └── Réponse directe : recommandé ou non ? Pour qui ?
│
├── CTA affiliation (bouton)
│
├── Contenu détaillé (800–1200 mots)
│   ├── H2 : Composition et ingrédients
│   ├── H2 : Mon expérience / Test
│   ├── H2 : Résultats obtenus
│   ├── H2 : Prix et où acheter
│   └── H2 : Comparaison avec alternatives
│
└── FAQ (5–8 questions)
    ├── Questions transactionnelles : "est-il efficace ?"
    ├── Questions pratiques : "comment le prendre ?"
    └── Questions de sécurité : "a-t-il des effets secondaires ?"
```

### Règles d'écriture SEO

1. **H1 unique** — inclure le nom du produit et l'année
2. **Introduction** — répondre à l'intention de recherche dès le premier paragraphe
3. **Balises H2** — utiliser des variantes du mot-clé principal
4. **Liens internes** — pointer vers le comparatif de la même catégorie
5. **Images** — toujours ajouter un attribut `alt` descriptif
6. **Longueur** — 1200 mots minimum pour les pages avis

### Ce qu'il ne faut PAS faire

- ❌ Copier-coller la fiche produit du fabricant
- ❌ Promettre des résultats miracles sans preuve
- ❌ Mentir sur la note ou les résultats
- ❌ Utiliser des liens directs vers les partenaires (toujours `/go/[slug]`)
- ❌ Oublier le disclaimer affiliation en bas de page

---

## Étape 4 — Ajout du contenu dans le code

> **Pour les rédacteurs :** vous n'écrivez pas de code. Livrez le contenu dans le format défini (Google Docs ou Notion) et le CTO s'occupe de la publication.
>
> **Pour le CTO :** suivre les étapes ci-dessous.

### Créer un nouvel avis produit

1. Copier le fichier template :
   ```bash
   cp src/data/avis/keto-actives.ts src/data/avis/[nom-du-produit].ts
   ```

2. Modifier tous les champs dans le fichier copié :
   ```typescript
   const avis: AvisProduit = {
     slug: "nom-du-produit",       // ← slug URL (pas d'accents, tirets)
     titre: "Avis Nom Produit...", // ← H1 exact
     metaDescription: "...",       // ← 120–160 caractères
     // ...
   }
   ```

3. Enregistrer le slug dans `src/lib/content.ts` :
   ```typescript
   const AVIS_REGISTRY = {
     "keto-actives": () => import("@/data/avis/keto-actives"),
     "nom-du-produit": () => import("@/data/avis/nom-du-produit"), // ← Ajouter ici
   }
   ```

4. Ajouter le lien affiliation dans `src/lib/affiliations.ts` :
   ```typescript
   {
     slug: "nom-produit-partenaire",
     url: "https://lien-affiliation-reel.com",
     partenaire: "Site officiel",
     programme: "TradeTracker",
     actif: true,
   }
   ```

5. Rebuilder :
   ```bash
   npm run build
   ```

6. Vérifier la page en local :
   ```
   http://localhost:3000/avis/nom-du-produit
   ```

### Créer un nouveau comparatif

Même processus, mais dans `src/data/comparatifs/` et `src/lib/content.ts`.

---

## Étape 5 — Checklist avant publication

**SEO technique :**
- [ ] H1 contient le mot-clé principal
- [ ] Méta-description entre 120 et 160 caractères
- [ ] Image principale avec `alt` descriptif
- [ ] Schema.org Review généré correctement (vérifier avec [Rich Results Test](https://search.google.com/test/rich-results))
- [ ] FAQ schema validé
- [ ] Canonical correctement défini
- [ ] `indexable: true` dans le fichier de données

**Contenu :**
- [ ] Note honnête et justifiée
- [ ] Pros et cons équilibrés
- [ ] Verdict clair et actionnable
- [ ] FAQ avec 5+ questions
- [ ] Disclaimer affiliation présent

**Affiliation :**
- [ ] Tous les liens passent par `/go/[slug]` (jamais de lien direct)
- [ ] Le slug existe dans `src/lib/affiliations.ts`
- [ ] L'URL partenaire est correcte et fonctionnelle
- [ ] `rel="nofollow noopener sponsored"` sur les liens (géré automatiquement par `BoutonCTA`)

---

## Étape 6 — Suivi SEO (post-publication)

**Semaine 1 :**
- Vérifier que la page est crawlée dans Google Search Console (GSC)
- Soumettre le sitemap si ce n'est pas fait

**Semaine 2–4 :**
- Vérifier les premières impressions dans GSC
- Identifier les requêtes pour lesquelles la page commence à apparaître

**Mois 1–3 :**
- Surveiller la position pour la requête cible
- Mettre à jour la date dans `dateMiseAJour` si le contenu est actualisé
- Ajouter des liens internes depuis d'autres pages si pertinent

---

## Critères de succès globaux

> **Objectif CAS-6 :** 5 pages avis publiées et indexées dans Google Search Console.

| Indicateur | Cible |
|-----------|-------|
| Pages avis publiées | 5 minimum |
| Pages indexées GSC | 5/5 |
| Score Rich Results | Review schema valide sur chaque page |
| Core Web Vitals | LCP < 2,5s sur mobile |
| Taux de clic CTA | > 5% (mesuré via GA4) |

---

## Contacts et escalade

| Problème | Qui contacter |
|----------|---------------|
| Lien affiliation cassé | CTO — modifier `src/lib/affiliations.ts` |
| Page non indexée après 2 semaines | CMO → demander fetch dans GSC |
| Contenu à modifier | CMO → ticket avec les modifications |
| Bug technique | CTO — créer un ticket CAS |

---

*Document maintenu par le CTO. Dernière mise à jour : Mai 2025.*
