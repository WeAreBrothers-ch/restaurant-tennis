# Restaurant Tennis Club Écublens — la fiche de référence

Toutes les informations du site sont ici, et **une seule fois**. Si une ligne de ce
document change, elle change aussi dans les cinq pages du site. La liste des
endroits à corriger est dans le `README.md`, au chapitre « Attention : certaines
informations existent à plusieurs endroits ».

> **Ce qui est marqué « À CONFIRMER » n'a pas été validé par le client.** Ces
> informations viennent de sources publiques (local.ch, Google, le site du club) et
> doivent être vérifiées avant la mise en ligne. Rien n'a été inventé : ce qui
> manquait est marqué « À FOURNIR », pas rempli au hasard.

---

## Le nom

| | |
| --- | --- |
| Nom d'usage | **Restaurant Tennis Club** |
| Nom complet (référencement) | Restaurant Tennis Club Écublens |
| Le lieu | Le club-house du Tennis Club d'Écublens |
| Enseigne | Trois lignes composées : « Restaurant » / « Tennis Club » / « Écublens », d'après le logo fourni par le client. Ce n'est pas une image, c'est du texte (voir `.enseigne` dans `css/composants.css`) |
| Logo | Les deux filets à losange sont dessinés en CSS ; les deux raquettes croisées sont `images/marque-raquettes.svg`, posé en masque pour prendre l'encre de sa surface |

## Où

| | |
| --- | --- |
| Adresse | Chemin des Esserts 6, 1024 Écublens (VD) |
| Lieu-dit | En Crochy |
| District | Ouest lausannois, canton de Vaud |
| Coordonnées | 46.533237, 6.568724 — *relevées sur OpenStreetMap* |
| Accès | Parking gratuit sur place · terrasse · accès de plain-pied |

## Comment on joint

| | | |
| --- | --- | --- |
| Téléphone | +41 21 555 41 14 — affiché « 021 555 41 14 » | **À CONFIRMER** |
| E-mail | contact@restaurant-tennis-club.ch | **À CONFIRMER** |
| Site | https://www.restaurant-tennis-club.ch/ | **À CONFIRMER** — le nom de domaine n'est pas réservé |
| Réservation | Par téléphone uniquement | **À CONFIRMER** |

## Les horaires

**À CONFIRMER — entièrement.** Ceux qui sont écrits dans le site n'ont pas été
validés : ils ont été posés pour que le bandeau « Ouvert / Fermé » fonctionne et
pour fixer la mise en page. Ils sont plausibles pour un club-house, et c'est tout
ce qu'on peut en dire.

| Jour | Service |
| --- | --- |
| Lundi | Fermé |
| Mardi – vendredi | 11h30 – 14h00 · 18h30 – 22h00 |
| Samedi – dimanche | 11h30 – 14h30 · 18h30 – 22h00 |

Ils apparaissent à **quatre** endroits, et les quatre doivent dire la même chose :

1. le pied de page des cinq pages ;
2. la page `contact.html`, dans le tableau de la semaine ;
3. la bande d'accès direct de l'accueil ;
4. le bloc `HORAIRES` de **`js/horaires.js`** — c'est lui qui calcule le
   « Ouvert / Fermé » affiché en direct dans l'en-tête.

Ils sont aussi dans la fiche `Restaurant` que Google lit, en haut de `index.html`
(bloc `openingHoursSpecification`). Cinq endroits, donc, en comptant celui-là.

Un moteur de recherche compare ces horaires à la fiche Google, à local.ch et à
search.ch : la moindre différence affaiblit la position dans les recherches locales.

## La cuisine

**Relevée sur la carte imprimée**, photographiée en septembre 2026. Ce n'est plus
une hypothèse : c'est la carte du restaurant, mot à mot.

- **brasserie de club-house** : saucisse de veau du boucher, rösti, malakoff,
  entrecôte de cheval au Café de Paris, roastbeef sauce tartare ;
- **italien** : neuf pizzas, trois foccacias, huit pâtes, deux risottos ;
- **viandes et poissons** : entrecôte, tagliata, piccata, dorade, gambas ;
- **grandes pièces à partager** : plateau d'entrecôte au Café de Paris sur réchaud,
  fondue bourguignonne au filet, tomahawk ou côte de bœuf — les deux dernières sur
  commande, minimum deux personnes ;
- hamburgers, wraps, salades repas, menu enfant jusqu'à douze ans ;
- terrasse, parking gratuit.

Le découpage des deux pages de carte suit cette division : `carte.html` porte le
club-house et la brasserie, `pizzeria.html` porte l'italien.

### Les noms de code

Chaque plat de la carte imprimée porte un second nom, emprunté au tennis — ACE,
TIE-BREAK, LE VESTIAIRE, PREMIER SERVICE, SOUS LES PROJECTEURS. **C'est la
particularité de cette maison, et c'est elle qui commande la mise en page du
site** : le nom de code occupe une colonne à part, à gauche, séparée du plat par
un filet vertical qui descend toute la page — la construction exacte de la carte
imprimée.

Seize plats y portent une étoile. Elle est reprise sur le site, et dix de ces
seize sont affichés sur l'accueil.

### Les provenances

Écrites au bas de la carte imprimée, et reprises en bas de `carte.html` :

| | |
| --- | --- |
| Bœuf | Suisse · Allemagne |
| Perche | Estonie |
| Dorade | Grèce |
| Pain | Renens (1020 VD) |
| Viandes | Boucherie Léman |

> **La ligne du poulet était coupée** sur la photographie du bas de carte. Elle n'a
> pas été devinée : elle manque.

## Le club

Le Tennis Club d'Écublens compte **quatre courts en terre battue** et un court
synthétique. C'est de là que vient la couleur d'accent du site : l'ocre de la terre
battue. Le club-house a été rénové ; le restaurant y a rouvert.

---

## Ce qu'il manque encore

| Quoi | Pour quoi faire |
| --- | --- |
| **La page des desserts** | La carte imprimée en a une ; elle n'a pas été photographiée. `carte.html` porte une famille « Les desserts » sans plat ni prix, avec une phrase d'attente. **Rien n'a été inventé.** Envoyez la photographie et elle se remplit |
| **La page des boissons** | Idem — aucune n'a été fournie, et le site n'en parle pas |
| **La provenance du poulet** | Coupée sur la photographie du bas de carte |
| **Les horaires** | Voir plus haut. Aucun n'est confirmé |
| **Les photographies de jour** | Neuf photographies du restaurant sont en ligne. Quatre sont de jour et tiennent très bien ; **cinq sont prises le soir, en salle, sur fond sombre** — sur une page crème, elles font un trou. Le brief est dans `PHOTOS-A-FOURNIR.md` |
| **L'unité de style des dessins** | Les huit dessins du premier écran sont ceux du client — plus aucun ne vient du site modèle. Cinq sont au **trait continu** (le service, le joueur, les balles, les verres, le couvert), trois au **crayon** (la raquette, le filet, les chaussures). Le mélange se voit. Si les trois derniers sont refaits au trait continu, la série sera d'un seul tenant |
| **Le service de formulaire** | `contact.html` pointe vers `formspree.io/f/VOTRE-IDENTIFIANT`. Tant que ce n'est pas remplacé, l'envoi échoue proprement et affiche le téléphone |
| **Le téléphone, l'e-mail, le domaine** | Toujours à confirmer — voir plus haut |

Le plan d'accès, lui, **est bon** : `images/plan.jpg` a été refabriqué sur Écublens.
Il se refait avec `python3 scripts/fabriquer-plan.py` si l'adresse change.

## Les cinq pages

| Fichier | Ce qu'elle porte |
| --- | --- |
| `index.html` | L'accueil |
| `carte.html` | La carte du club-house : apéro à partager, entrées, assiettes froides, club-house rapide, classiques du coin, viandes & poissons, hamburgers, plats à partager, menu enfant, desserts (en attente) — 37 plats |
| `pizzeria.html` | Pizza & Pasta : pizzas, foccacias, pâtes, risottos — 22 plats. C'est la page qui portait les tajines, et qui portait les pizzas sur le site modèle |
| `contact.html` | Contact, horaires, plan et formulaire |
| `404.html` | La page affichée quand une adresse n'existe pas |

---

## La règle d'écriture

- L'apostrophe s'écrit toujours `’` (courbe), jamais `'`.
- On écrit « Écublens », avec le É majuscule accentué.
- Les prix s'écrivent `23.—` pour vingt-trois francs, `8.50` pour huit cinquante.
- Les horaires s'écrivent `11h30 – 14h00`, avec un tiret demi-cadratin entouré
  d'espaces.
