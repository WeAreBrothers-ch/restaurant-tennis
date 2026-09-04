# Restaurant du Tennis — la fiche de référence

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
| Nom d'usage | **Restaurant du Tennis** |
| Nom complet (référencement) | Restaurant du Tennis — Écublens |
| Le lieu | Le club-house du Tennis Club d'Écublens |
| Enseigne | Trois lignes composées : « Restaurant du » / « Tennis » / « Écublens ». Ce n'est pas une image, c'est du texte (voir `.enseigne` dans `css/composants.css`) |

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
| E-mail | contact@restaurant-du-tennis.ch | **À CONFIRMER** |
| Site | https://www.restaurant-du-tennis.ch/ | **À CONFIRMER** — le nom de domaine n'est pas réservé |
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

D'après les sources publiques, **à faire valider** :

- brasserie de club-house : grillades, poissons du lac, croûtes au fromage, rösti,
  salades repas, plat du jour à midi ;
- **spécialités marocaines** : tajines, couscous, harira, briouates, thé à la menthe ;
- terrasse, environ 60 couverts, parking gratuit.

C'est cette lecture qui a servi à écrire la carte provisoire et à découper les pages.
Si elle est fausse, c'est toute l'architecture des deux pages de carte qui bouge —
dites-le avant le reste.

## Le club

Le Tennis Club d'Écublens compte **quatre courts en terre battue** et un court
synthétique. C'est de là que vient la couleur d'accent du site : l'ocre de la terre
battue. Le club-house a été rénové ; le restaurant y a rouvert.

---

## Ce qu'il manque encore

| Quoi | Pour quoi faire |
| --- | --- |
| **La carte** | `carte.html` (46 plats, 8 familles) et `specialites.html` (18 plats, 4 familles) portent une **carte provisoire**. Aucun de ces plats ni de ces prix ne vient du restaurant : ils ont été écrits pour que le site soit montrable et pour fixer la mise en page. C'est signalé en gros dans le code, par un commentaire « ⚠ CARTE PROVISOIRE ⚠ » |
| **Les horaires** | Voir plus haut. Aucun n'est confirmé |
| **Les photographies** | Toutes les images sont celles du site modèle, prises à la bougie, sur fond noir. Sur une page crème, **elles font des trous**. Aucune n'est utilisable. Le brief est dans `PHOTOS-A-FOURNIR.md` |
| **Les dessins de table** | Quatre des neuf dessins du premier écran sont ceux du client (la raquette, le joueur, le filet, les chaussures), repassés au vert sapin. Les **cinq autres** — le serveur, les couverts, le convive, les verres, le plateau — viennent encore du site modèle, repassés en terre battue |
| **Un logo dessiné** | Facultatif. L'enseigne composée tient très bien toute seule ; si un logo arrive, il remplace `.enseigne` sans rien changer d'autre |
| **Le service de formulaire** | `contact.html` pointe vers `formspree.io/f/VOTRE-IDENTIFIANT`. Tant que ce n'est pas remplacé, l'envoi échoue proprement et affiche le téléphone |

Le plan d'accès, lui, **est bon** : `images/plan.jpg` a été refabriqué sur Écublens.
Il se refait avec `python3 scripts/fabriquer-plan.py` si l'adresse change.

## Les cinq pages

| Fichier | Ce qu'elle porte |
| --- | --- |
| `index.html` | L'accueil |
| `carte.html` | La carte : entrées, salades repas, plat du jour, grillades, poissons, classiques, menu enfant, desserts |
| `specialites.html` | Les tajines et les couscous. C'est la page qui, sur le site modèle, portait les pizzas |
| `contact.html` | Contact, horaires, plan et formulaire |
| `404.html` | La page affichée quand une adresse n'existe pas |

---

## La règle d'écriture

- L'apostrophe s'écrit toujours `’` (courbe), jamais `'`.
- On écrit « Écublens », avec le É majuscule accentué.
- Les prix s'écrivent `23.—` pour vingt-trois francs, `8.50` pour huit cinquante.
- Les horaires s'écrivent `11h30 – 14h00`, avec un tiret demi-cadratin entouré
  d'espaces.
