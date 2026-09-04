# Site du Restaurant du Tennis

Le site du **Restaurant du Tennis**, le club-house du Tennis Club d’Écublens —
chemin des Esserts 6, 1024 Écublens. Quatre pages : l’accueil, la carte, les
spécialités et le contact. Plus une cinquième, `404.html`, que le visiteur ne voit
que s’il se trompe d’adresse.

C’est un site en **HTML, CSS et JavaScript ordinaires**. Rien à installer, rien à
compiler, aucun outil. Vous ouvrez un fichier, vous le modifiez, vous l’envoyez.

**Le site est crème.** Un blanc cassé très peu jaune, comme une carte imprimée ou
un maillot de club lavé cent fois. L’encre est un vert sapin si sombre qu’on le
prend d’abord pour du noir. Une seule couleur vive, l’ocre de la terre battue :
elle ne décore jamais, elle signale — les prix, le bouton d’appel, la page où
l’on se trouve.

Le principe : **la carte d’abord**. Un visiteur doit pouvoir lire tous les plats
et tous les prix en un clic, puis appeler. La réservation se fait au téléphone,
donc le bouton d’appel est présent partout, y compris dans une barre fixe en bas
de l’écran sur téléphone.

Toutes les informations du restaurant — nom, adresse, coordonnées, ce qui manque —
sont réunies **une seule fois** dans **`CONTENU-SITE.md`**. C’est ce document qui
fait foi. En cas de désaccord entre lui et le site, c’est le site qui a tort.

---

## À lire avant tout : la carte affichée est provisoire

**Aucun des plats ni des prix écrits aujourd’hui dans le site ne vient du
restaurant.** Ils ont été rédigés pour que le site soit montrable et pour fixer la
mise en page : 46 lignes sur `carte.html`, 18 sur `specialites.html`. Les prix sont
plausibles, ils ne sont pas les vôtres.

C’est écrit en toutes lettres dans les deux fichiers, juste avant la première
catégorie, dans un encadré `⚠ CARTE PROVISOIRE ⚠` que le visiteur ne voit pas.
Ouvrez `carte.html` ou `specialites.html` dans un éditeur de texte, cherchez
`CARTE PROVISOIRE` : vous tomberez dessus.

**Rien ne doit être mis en ligne avant que la vraie carte ait remplacé celle-là.**

La cuisine, elle, est arrêtée — sous réserve de votre validation : une brasserie de
club-house (grillades, poissons du lac, croûtes au fromage, rösti, salades repas,
plat du jour à midi) et des spécialités marocaines (six tajines, cinq couscous,
harira, briouates, thé à la menthe). Les huit familles de `carte.html` et les
quatre de `specialites.html` sont bâties là-dessus : remplacer les plats ne demande
pas de toucher à la structure.

### Ce qui manque encore

| Ce qui n’est pas encore le vôtre | Ce qu’il faut |
| --- | --- |
| **La carte** | Les 46 + 18 lignes sont provisoires. À remplacer entièrement |
| **Les photographies** | Les 21 images sont celles du site qui a servi de modèle : prises de nuit, à la bougie, sur fond noir. Sur une page crème, elles font un trou. Le brief du photographe est dans `PHOTOS-A-FOURNIR.md` |
| **Cinq des neuf dessins** | Le premier écran fait tomber neuf dessins au trait. **Quatre sont les vôtres** — la raquette, le joueur au service, le filet, les chaussures — repassés au vert sapin. Les cinq autres, ceux de la table, viennent encore du modèle et sont en terre battue |
| **Les horaires** | Ceux qui s’affichent ne sont pas confirmés (voir plus bas) |
| **Le service de formulaire** | `contact.html` pointe vers `formspree.io/f/VOTRE-IDENTIFIANT` (voir plus bas) |

Trois informations sont **à confirmer** avant toute mise en ligne. Elles viennent
de sources publiques et n’ont pas été validées :

- le téléphone **021 555 41 14** ;
- l’e-mail **contact@restaurant-du-tennis.ch** ;
- le nom de domaine **restaurant-du-tennis.ch**, qui n’est pas réservé à ce jour.

---

## Voir le site sur votre ordinateur

Double-cliquez sur **`index.html`**. Il s’ouvre dans votre navigateur. C’est tout.

Tout fonctionne ainsi, à une exception près : le plan d’accès et le formulaire de
contact demandent une vraie adresse `http://`. Pour les essayer, faites glisser le
dossier dans un petit serveur local, ou regardez-les directement en ligne.

---

## Ce qu’il y a dans le dossier

| Fichier ou dossier | Contenu |
| --- | --- |
| `index.html` | L’accueil |
| `carte.html` | La carte complète — huit familles, 46 lignes |
| `specialites.html` | Les tajines et les couscous — 18 lignes |
| `contact.html` | Contact, horaires, plan et formulaire |
| `404.html` | La page affichée quand une adresse n’existe pas |
| `css/` | Cinq feuilles de style, une par sujet (voir plus bas) |
| `js/` | Neuf petits fichiers, un par comportement (voir plus bas) |
| `scripts/` | Quatre outils d’entretien. Ne servent qu’à vous, jamais au visiteur |
| `images/` | Les 21 photographies, les neuf dessins au trait, le plan et la marque |
| `dessins-source/` | Les dessins du premier écran tels qu’ils sont arrivés, avant détourage. **Ne sont pas publiés** |
| `fonts/` | Les quatre fichiers de polices, hébergés ici plutôt que chez Google |
| `favicon.ico`, `apple-touch-icon.png` | L’icône du site dans l’onglet et sur l’écran d’accueil des téléphones |
| `robots.txt`, `sitemap.xml` | Ce que Google lit pour référencer le site |
| `.nojekyll` | Indispensable à GitHub Pages. **Ne pas supprimer** (voir plus bas) |

Les deux documents de travail — **`CONTENU-SITE.md`** (la fiche de référence) et
**`PHOTOS-A-FOURNIR.md`** (le brief du photographe) — sont conservés à la racine.
Ils ne sont pas publiés.

---

## Modifier un prix ou un plat

Ouvrez le fichier de la page concernée dans un éditeur de texte, cherchez le nom du
plat, et modifiez ce qui l’entoure. Une ligne de carte ressemble à ceci :

```html
<li class="lignedeplat-plat">
  <p class="lignedeplat-ligne">
    <span class="lignedeplat-nom">Filets de perche meunière</span>
    <span class="lignedeplat-rappel" aria-hidden="true"></span>
    <span class="lignedeplat-prix">32.—</span>
  </p>
  <p class="lignedeplat-description">Pommes vapeur, citron, beurre persillé</p>
</li>
```

- **Changer un prix** → modifiez le contenu de `lignedeplat-prix`. On écrit `32.—`
  pour 32 francs et `8.50` pour huit francs cinquante.
- **Ajouter un plat** → recopiez un bloc `<li>…</li>` entier au bon endroit et
  modifiez-le.
- **Retirer un plat** → supprimez son bloc `<li>…</li>` en entier, de la balise
  ouvrante à la fermante.

Le petit trait pointillé entre le nom et le prix — `lignedeplat-rappel` — se dessine
tout seul, quelle que soit la longueur du nom. Laissez-le vide, ne le supprimez pas.

### Attention : certaines informations existent à plusieurs endroits

C’est la contrepartie d’un site en HTML écrit à la main. Si vous changez l’une de
ces informations, **cherchez-la dans les cinq pages** et corrigez-la partout :

| Information | Où elle apparaît |
| --- | --- |
| Le téléphone | En-tête, pied de page, barre du bas sur mobile, page Contact |
| Les horaires | Pied de page, page Contact, bande d’accès direct de l’accueil, et `js/horaires.js` |
| L’adresse | En-tête, pied de page, page Contact, menu du téléphone |
| Les noms de la navigation | En-tête, menu du téléphone et pied de page des cinq pages |

Un moteur de recherche compare ces informations à votre fiche Google, à local.ch
et à search.ch : la moindre différence affaiblit votre position dans les
recherches locales.

---

## Les horaires servent quatre fois

Les horaires écrits aujourd’hui dans le site sont ceux-ci. **Ils ne sont pas
confirmés** : ils viennent de sources publiques et attendent votre validation.

| Jour | Service |
| --- | --- |
| Lundi | Fermé |
| Mardi – vendredi | 11h30 – 14h00 · 18h30 – 22h00 |
| Samedi – dimanche | 11h30 – 14h30 · 18h30 – 22h00 |

Ils sont écrits à **quatre endroits**, et les quatre doivent dire exactement la
même chose :

1. le pied de page des cinq pages ;
2. la page `contact.html` ;
3. la bande d’accès direct de l’accueil ;
4. le bloc `HORAIRES` de **`js/horaires.js`**.

Le quatrième est le plus facile à oublier. Le bandeau « Ouvert / Fermé » en haut de
page est calculé en direct, à l’heure de Lausanne, quel que soit le pays depuis
lequel on consulte le site — et ce calcul lit ses propres horaires, dans
`js/horaires.js`. Si vous changez une heure d’ouverture sans la changer là,
le bandeau annoncera « Ouvert » quand la porte est fermée.

Les horaires s’écrivent `11h30 – 14h00`, avec un tiret demi-cadratin entouré
d’espaces.

---

## Remplacer une photo

Déposez votre fichier dans `images/` **avec exactement le même nom** que celui que
vous remplacez, et **aux mêmes dimensions**. Rien d’autre à faire.

Les noms disent ce que l’image doit montrer et portent un **millésime** :
`paire-terrasse-2026-09a.jpg`. Gardez-le : les navigateurs retiennent les images
d’après leur adresse, et une photo remplacée sous le même nom continuerait de
s’afficher en ancienne version chez les visiteurs déjà venus. Pour forcer le
changement, donnez un nouveau millésime au fichier **et** corrigez son nom dans les
pages qui l’utilisent.

La liste complète des emplacements, avec le sujet, le format et la taille attendus,
est dans **`PHOTOS-A-FOURNIR.md`** — c’est aussi le document à remettre au
photographe.

---

## Le plan de la page Contact

Il est **déjà fait**, et juste : `images/plan.jpg` montre le quartier d’En Crochy
à Écublens, avec le restaurant en son centre.

Le plan ne contacte aucun service extérieur tant que le visiteur n’a pas cliqué
dessus : ce qu’on voit d’abord est cette simple image. Elle a été fabriquée par une
commande, à lancer depuis le dossier du site :

```
python3 scripts/fabriquer-plan.py
```

**Il n’y a aucune raison de la relancer, sauf si l’adresse change.** Dans ce cas,
corrigez `LATITUDE` et `LONGITUDE` en haut du fichier, puis relancez.

L’attribution — « © les contributeurs OpenStreetMap » — est écrite sous le plan
dans `contact.html`. **Elle ne doit pas être retirée** : c’est la condition
d’utilisation de ces données.

---

## Changer un dessin du premier écran

Les neuf dessins qui tombent en haut de l’accueil sont dans `images/`, sous le nom
`trait-…`. Pour en remplacer un, il ne suffit pas de déposer votre image : il faut
d’abord la **détourer** et la **repasser à l’encre de la maison**, sinon elle
arrivera avec son fond blanc et ses couleurs d’origine au milieu d’une page crème.

Un outil le fait pour vous. Déposez votre dessin dans **`dessins-source/`**,
ouvrez `scripts/preparer-dessins.py` dans un éditeur de texte, ajoutez une ligne
au tableau `SOURCES` — le nom du fichier de sortie, le nom de votre fichier,
l’encre, le rognage éventuel, la largeur finale — puis lancez :

```
python3 scripts/preparer-dessins.py
```

Il rend un PNG transparent, monochrome, ramené à ses marges, prêt à être posé dans
la page.

**Deux règles pour que ça marche.** Le dessin doit être **sur un fond clair uni**
(blanc, crème, papier) : c’est à sa clarté que l’outil reconnaît le fond. Et il
doit avoir **de la matière** — des hachures, des aplats, des traits appuyés. Sur
de la crème, un trait d’un seul cheveu disparaît.

**Si le dessin arrive avec un bandeau par-dessus** — le « Visiter le site » de
Pinterest, un bouton, un filigrane — ne le coupez pas : vous couperiez le dessin
avec. Le tennisman du premier écran en portait deux, posés en travers de ses
pieds. L’outil sait les retirer : chaque dessin peut recevoir une liste de
retouches, écrite en clair à la fin de sa ligne. `gomme` peint le papier sur une
zone, `encre` ne l’efface que là où c’est vraiment noir (un bandeau est plus
sombre qu’un trait de crayon vu à travers un voile), `voile` rend sa densité à ce
qui était sous un bandeau translucide, et `copie` reprend un morceau intact
ailleurs dans l’image pour le recoller à la place de ce qui manquait. Les quatre
sont commentées dans le fichier, avec l’exemple du tennisman.

Les dessins du **tennis** sont en vert sapin, ceux de la **table** en terre
battue. C’est ce qui fait qu’on comprend l’endroit avant d’avoir lu une ligne :
ne mélangez pas.

---

## Mettre le site en ligne

Il n’y a rien à construire. Les fichiers du dossier **sont** le site.

### Sur un hébergement classique (FTP)

Envoyez tout le contenu du dossier à la racine du site (souvent `web/` ou
`public_html/`), à l’exception des fichiers `.md`, qui ne servent qu’à vous.

### Sur GitHub Pages

Settings → Pages → Source → **Deploy from a branch** → branche `main`, dossier
`/ (root)`.

Rien d’autre. Le fichier `.nojekyll` à la racine est ce qui empêche GitHub de
tenter d’interpréter le site avec Jekyll — **ne le supprimez pas**, sans lui la
mise en page disparaît.

---

## Le formulaire de contact

Le site n’a pas de serveur : il ne peut donc pas recevoir un message lui-même. Le
formulaire s’adresse à un **service de réception** — Formspree, Basin, Formcarry,
ou un script sur votre hébergement.

Dans **`contact.html`**, cherchez `formspree.io/f/VOTRE-IDENTIFIANT` et remplacez
cette adresse par la vôtre. Tant que ce n’est pas fait, l’envoi échoue proprement :
le visiteur voit un message et le numéro de téléphone du restaurant.

C’est volontairement **un formulaire de contact, pas de réservation** : une demande
de table qui n’aboutirait pas serait pire qu’un numéro bien visible.

---

## Les feuilles de style

Cinq fichiers, du plus général au plus particulier. Chaque page les appelle tous
les cinq, dans cet ordre :

| Fichier | Ce qu’il contient |
| --- | --- |
| `css/tokens.css` | **Les réglages du site** : les trois polices, toutes les couleurs, les tailles de texte, les espacements. C’est le seul fichier à ouvrir pour changer l’allure du site |
| `css/base.css` | La remise à zéro du navigateur, les titres, les colonnes |
| `css/composants.css` | Les boutons, l’en-tête, l’enseigne, le menu du téléphone, le pied de page |
| `css/accueil.css` | Uniquement la page d’accueil |
| `css/pages.css` | La carte, les spécialités, le contact, la page d’erreur |

**Pour changer une couleur, ouvrez `css/tokens.css` et rien d’autre.** Toutes les
couleurs y sont nommées une seule fois ; le reste du site s’y réfère.

Les couleurs du site viennent du lieu, pas d’un nuancier :

| Réglage | Où | Couleur |
| --- | --- | --- |
| `--creme` | Le fond de presque tout | `#f4f1e9` |
| `--creme-voile` | La même crème, translucide : la barre du haut, qui laisse deviner la page derrière elle | `#f4f1e9` à 92 % |
| `--sable` | Les bandes qui se détachent | `#ece8de` |
| `--sapin-900` | L’encre, et le fond du pied de page | `#12291f` |
| `--fougere-500` | Le vert clair : les états, les filets vivants | `#5f8248` |
| `--terre-600` | La terre battue : les prix, le bouton d’appel, l’état actif | `#a44e2c` |

Si vous changez `--creme`, changez `--creme-voile` de la même façon : ce sont deux
écritures d’une seule couleur, et elles doivent rester identiques.

Ces matières sont posées dans les pages par trois classes — **`.surface-creme`**,
**`.surface-sable`** et **`.surface-sapin`**. Une section change de fond en
changeant de classe ; le texte, les liens et les bordures suivent tout seuls.

Après toute retouche des couleurs, lancez :

```
node scripts/verifier-contraste.mjs
```

Il compare chaque couple texte / fond réellement employé sur le site à la norme
d’accessibilité et vous dit lesquels sont devenus trop pâles pour être lus.
Aujourd’hui, tout passe.

---

## Les trois polices

| Police | Ce qu’elle porte |
| --- | --- |
| **Newsreader** | Ce qui se lit lentement : les titres, les noms de plats, le numéro de téléphone. Un caractère éditorial, au vrai italique, dont le dessin s’affine quand il grandit |
| **Instrument Sans** | Ce qui se lit vite : la navigation, les descriptions, les boutons |
| **DM Mono** | La machine à écrire. Les intertitres, les libellés, les chiffres et les prix. Dans une maison de tennis, c’est la typographie des tableaux d’affichage et des feuilles de match |

Les trois sont **hébergées avec le site** — quatre fichiers dans `fonts/`, le
Newsreader ayant un fichier pour le romain et un pour l’italique. Elles ne sont
jamais demandées à Google : aucune requête ne part vers un tiers quand quelqu’un
ouvre une page.

Elles sont **déjà là**. Si les fichiers venaient à disparaître, une seule commande
les remet :

```
python3 scripts/telecharger-polices.py
```

Tant qu’ils manquent, le navigateur descend tout seul dans la pile de secours.
Rien n’est cassé, c’est simplement moins juste.

---

## L’enseigne et la marque du navigateur

Le nom de la maison **n’est pas une image**. C’est du texte composé, sur trois
lignes — « Restaurant du » / « Tennis » / « Écublens » — par le composant
`.enseigne` de `css/composants.css`. Il est donc net à toutes les tailles,
sélectionnable, et lu correctement par Google.

Si un logo dessiné arrive un jour, il remplace ce composant sans rien changer
d’autre dans le site.

La marque du navigateur — la petite icône de l’onglet et de l’écran d’accueil des
iPhone — est une **balle de tennis en terre battue**. Elle vit dans trois
fichiers : `images/logo-mono.svg`, `favicon.ico` et `apple-touch-icon.png`.

---

## Le mouvement

Le premier écran fait tomber **neuf dessins au trait** — cinq en terre battue,
qui disent la table, quatre en vert sapin, qui disent le club — pendant qu’on
commence à descendre. Tout est piloté par un seul chiffre écrit par `js/premier-ecran.js` ;
la feuille de style en tire la chute et la vrille de chaque dessin. Passé le
premier écran, plus rien n’est calculé.

Ensuite, les blocs montent de trente pixels en apparaissant, sur près de deux
secondes et demie. C’est volontairement très lent : c’est cette lenteur qui donne
l’impression de calme. Une apparition rapide, on la remarque.

Les trois réglages sont dans `css/tokens.css` :

| Réglage | Effet | Valeur |
| --- | --- | --- |
| `--dur-apparition` | Durée de la montée | `2.4s` |
| `--retard-apparition` | Temps mort avant qu’elle commence | `0.2s` |
| `--montee-apparition` | Hauteur de la montée | `30px` |

Tout s’arrête si l’ordinateur ou le téléphone est réglé sur « réduire les
animations ».

---

## Ce que font les fichiers de `js/`

Un fichier par comportement, indépendants les uns des autres :

| Fichier | Ce qu’il fait |
| --- | --- |
| `js/apparitions.js` | Fait apparaître les blocs en douceur au défilement |
| `js/premier-ecran.js` | Fait tomber les neuf dessins du premier écran |
| `js/entete.js` | Rend l’en-tête opaque dès qu’on a commencé à lire |
| `js/barre-action.js` | Fait monter la barre d’appel en bas de l’écran, sur téléphone |
| `js/menu-mobile.js` | Ouvre et ferme le menu du téléphone |
| `js/horaires.js` | Calcule « Ouvert / Fermé » à l’heure de Lausanne |
| `js/galerie.js` | Les deux flèches du ruban de photographies de l’accueil |
| `js/plan.js` | Ne contacte OpenStreetMap qu’au clic du visiteur |
| `js/formulaire.js` | Vérifie le formulaire de contact et affiche la réponse sur place |

Le site reste **entièrement lisible sans ces fichiers** : les liens sont de vrais
liens, la carte est écrite en entier dans les pages, le ruban de photographies se
fait glisser au doigt, et le formulaire s’envoie tout seul. Ils n’ajoutent que du
confort.

`js/apparitions.js` est le seul appelé dans l’en-tête du document plutôt qu’en bas
de page : il doit s’exécuter avant le premier affichage, sinon les blocs se
verraient puis disparaîtraient avant de réapparaître.

---

## Bon à savoir

- Le site respecte le réglage « réduire les animations » du système.
- Le plan d’accès ne contacte aucun service extérieur tant que le visiteur n’a pas
  cliqué dessus.
- Les polices sont hébergées avec le site, elles ne sont pas demandées à Google.
- L’apostrophe s’écrit toujours `’` (courbe), jamais `'`. Faites un copier-coller
  depuis une ligne existante en cas de doute. On écrit « Écublens », avec le É
  majuscule accentué.
