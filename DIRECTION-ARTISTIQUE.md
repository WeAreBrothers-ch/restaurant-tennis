# Direction artistique — Restaurant Tennis Club Écublens

> Version 3.0 — 9 septembre 2026 · **le site a cinq surfaces**
> Périmètre : le site du restaurant du club-house du Tennis Club d'Écublens.
> Ce document dit ce qui a été décidé et pourquoi. Il ne décrit pas ce qu'il faudrait
> faire un jour : il décrit ce qui est dans le code.

---

## 0. D'où vient ce site

C'est la reprise, pour le même client, du site du Restaurant L'Étoile à Lausanne.
**Les mécaniques et les rythmes sont ceux de l'Étoile** — la barre du haut, les
apparitions au défilement, la dérive des photographies, les trois intervalles, le
ruban qui sort par la droite. C'est une demande, et c'est un choix sain : cette
architecture a été éprouvée, elle est claire, et elle tient sur un téléphone.

**Ce qui a changé, en revanche, va plus loin que la couleur.** L'ossature commune
n'est plus une mise en page commune. Quatre partis séparent aujourd'hui les deux
sites, et trois d'entre eux viennent du restaurant lui-même, pas d'un goût :

1. **La carte a une gouttière.** Chaque plat de la maison porte un nom de code de
   tennis — ACE, TIE-BREAK, LE VESTIAIRE. Il occupe une colonne à part, à gauche,
   séparée du plat par un filet vertical qui descend toute la page. L'Étoile
   alignait un nom, un rappel pointillé, un prix ; ici la page se lit comme une
   feuille de match. Voir le chapitre 5 bis.
2. **La carte tient sur une colonne**, là où l'Étoile en mettait deux au-delà de
   1100 px : la gouttière des noms de code occupe déjà la moitié de la mesure.
3. **L'accueil n'a plus de grille de quatre assiettes.** Elle est remplacée par un
   tableau d'affichage — dix lignes, sans une photographie. Voir le chapitre 5 ter.
4. **L'accueil n'a plus qu'une paire d'images sur deux.** La seconde a laissé la
   place à un bandeau : une seule photographie large, tenue par une légende posée
   dans sa marge.

Restent les couleurs, les dessins et la typographie, qui changent aussi. C'est
plus qu'il n'y paraît. L'Étoile était **noir** — un noir plein, sur lequel des
photographies prises à la bougie brillaient comme sur une nappe sombre. Le
Restaurant Tennis Club est **crème**. Ce n'est pas la même couleur inversée : c'est
un autre parti, qui demande d'autres photographies, d'autres dessins, et une autre
typographie.

---

## 1. Concept

# « PAPIER & TERRE BATTUE »
### Diurne · Net · De plein air
### Principe fonctionnel : **la carte d'abord.**

Un club-house n'est pas un restaurant de ville. On y vient en tenue de sport, on y
revient le dimanche en famille, on s'y assied dehors dès qu'il fait douze degrés. Le
site doit sentir **le jour, le plein air et le papier**, pas la salle éclairée à la
bougie.

D'où le parti : **le site est une carte imprimée, posée sur une table de club.** Un
papier crème très peu jaune, une encre vert sapin, et une seule couleur vive — l'ocre
de la terre battue, qui ne décore jamais et ne fait que signaler.

Le luxe, ici, n'est pas dans l'ornement. Il est dans la précision : un filet à 1 px,
un prix parfaitement aligné, une hiérarchie typographique qui ne tremble pas. C'est ce
qui permet d'être soigné **sans être intimidant** — on lit la carte d'un club de
quartier, très bien mise en page.

---

## 2. Les couleurs

> **Version 3 — ce chapitre a été refait.** Le client a vu le site en ligne et a
> répondu : « je trouve le site très terne […] vraiment améliore les couleurs ».
> Le relevé lui a donné raison, et pas sur une question de goût.

### Ce qui n'allait pas, en chiffres

La palette décrite dans la version 2 de ce document n'avait jamais été peinte :

| Ce qui était déclaré | Ce qui était employé |
| --- | --- |
| `--fougere-400 / -500 / -600` | **zéro règle** |
| `--terre-500`, l'ocre exact du court | **zéro règle** |
| `--terre-600` | huit règles — les prix, les boutons, l'état actif |
| `.surface-sable` | **une page sur cinq, une fois** |
| `--texte-2` et `--texte-3` | deux jetons distants de 1,12:1, c'est-à-dire un seul |

Sur les 6 700 px de l'accueil, **un seul changement de fond se produisait**, et
c'était le pied de page. Le site n'était pas terne par parti pris : il l'était
par défaut d'emploi.

### La correction ne touche presque pas aux teintes

On ne ravive pas un ocre en le décalant d'un cran — cela ne se voit sur aucun
écran, et cela invalide le vérificateur, ce document et les huit dessins dont
l'encre est cuite dans le fichier. **On le ravive en s'en servant.**

Ce qui change, c'est l'AIRE : environ 2 700 px de l'accueil sur 6 700 cessent
d'être de la crème. Quarante pour cent, contre un pour mille.

### Les quatre matières viennent du logo

Le logo fourni par le client montre quatre couleurs, et le site n'en employait
que deux et demie.

| Nom | Valeur | Rôle | Part de l'écran |
| --- | --- | --- | --- |
| **La crème** | `#F4F1E9` | Le fond des pages de lecture | ≈ 45 % |
| **L'olive** | `#4A5D3A` | **Le vert du logo, à l'octet près.** Une surface : la bande d'accès direct, le bandeau, le tableau d'affichage, les titres de famille de la carte | ≈ 25 % |
| **L'olive foncé** | `#2F3E23` | La fermeture : pied de page, menu du téléphone, barre d'appel | ≈ 12 % |
| **La terre battue claire** | `#EBD3BB` | La bande pratique : « Venir chez nous », la provenance, les horaires | ≈ 10 % |
| **La terre battue** | `#A44E2C` | L'accent sur la crème. Inchangée : les prix, les liens, le bouton d'appel | ≈ 2 % |
| **La balle** | `#D8E04A` | L'étincelle. Le bouton et l'accent, **sur l'olive uniquement** | < 1 % |

### Les quatre règles

1. **L'olive du logo ne porte que DEUX encres.** La crème y donne 6,37:1 et la
   balle 5,03:1 ; un troisième palier tomberait sous le seuil. Là où il en faut
   trois — le pied de page, le menu — c'est `--olive-800` qui sert. **On ne
   retouche jamais la couleur de la marque pour arranger une feuille de style :
   on change de jeton.**

2. **La balle ne se pose jamais sur du clair.** `#D8E04A` sur la crème vaut
   1,27:1. Sur les surfaces claires elle n'est rien — ni texte, ni prix, ni
   filet, ni bordure. Cette règle est vérifiée par la machine : voir les
   « interdits » de `scripts/verifier-contraste.mjs`, qui échouent exprès.

3. **Le grain assombrit toujours, sur les quatre surfaces.** Le pied de page
   l'avait en `screen`, ce qui l'éclaircissait : sur un fond sombre, `screen`
   dégrade tous les rapports calculés pour du texte clair. Avec quatre surfaces
   et des couples à 4,72:1, cela ferait passer des contrastes sous le seuil sans
   que rien ne le signale.

4. **Une bande colorée vide est pire qu'une bande crème vide.** Le vert rend le
   vide plus visible, pas moins. Aucune des surfaces posées n'est décorative :
   la bande d'accès direct porte quatre liens, le bandeau une photographie et sa
   légende, le tableau dix plats et dix prix.

### Les deux encres des dessins

C'est la seule chose que le site dit **par la couleur seule**, sans un mot :

| Encre | Valeur | Ce qu'elle dessine |
| --- | --- | --- |
| La terre battue | `#C0603A` | **La table** — les verres, le couvert |
| Le vert sapin | `#27523D` | **Le club** — le service, la raquette, le joueur, le filet, les chaussures, les balles |

L'encre n'est pas posée par le CSS : elle est **cuite dans les fichiers**, par
`scripts/preparer-dessins.py`. C'est la raison pour laquelle **le premier écran
reste crème et le restera** : sur olive, ces dessins tombent à 1,24:1. Un dessin
dont la couleur est cuite doit exister une fois par fond sur lequel il se pose —
c'est pourquoi le tube de balles existe en deux exemplaires, vert et crème.

### Les contrastes

Trente-deux couples texte/fond passent WCAG 2.1 AA, et **trois interdits sont
vérifiés comme devant échouer**. Le vérificateur est dans le dépôt :
`node scripts/verifier-contraste.mjs`, à relancer après toute retouche de
`css/tokens.css` — sa palette est une COPIE, et c'est son défaut : une valeur
changée d'un côté et pas de l'autre, et il dit « tout passe » sur une palette
qui n'est plus celle du site. C'est exactement ce qui s'était produit.

---

## 3. La typographie

Trois voix, et pas une de plus. Chacune a un travail, et ne fait que celui-là.

| Police | Ce qu'elle porte | Pourquoi elle |
| --- | --- | --- |
| **Newsreader** | Les titres, les noms de plats, le numéro de téléphone | Un serif éditorial dessiné pour l'écran. Son axe optique (`opsz` 6 → 72) change son dessin avec la taille : déliés fins et contraste fort en grand, panses ouvertes et déliés épais en petit. C'est ce qui lui donne son air de bulletin imprimé plutôt que d'interface |
| **Instrument Sans** | La navigation, les descriptions, les horaires | Une grotesque contemporaine, un rien plus large que la moyenne. Elle ne discute pas |
| **DM Mono** | Les intertitres en capitales, les boutons, les légendes, les prix | La machine à écrire. Dans une maison de tennis, elle a une seconde raison d'être : c'est la typographie des tableaux d'affichage et des feuilles de match |

**L'italique est le seul ornement.** Un mot par titre passe en italique — le vrai
italique de Newsreader, pas une inclinaison calculée par le navigateur. C'est tout.
Pas de swash, pas de script, pas de deuxième display.

Les trois polices sont hébergées avec le site, dans `fonts/`. **Aucune requête ne part
vers Google quand quelqu'un ouvre la page.** Les deux polices de secours (Georgia et
Arial) sont ajustées par `size-adjust` pour occuper exactement la même place : rien ne
saute au moment où les vraies arrivent.

---

## 4. L'enseigne

**Le nom de la maison n'est pas une image.** C'est du texte, composé dans les
polices du site, en trois lignes et trois voix :

```
RESTAURANT      la machine à écrire, en terre battue — le générique
Tennis Club     le serif, en grand — le nom
ÉCUBLENS        la machine à écrire, en petit — le lieu
```

### Le logo est remonté, pas collé

Le client a fourni un logo : ces trois lignes, encadrées de deux filets à losange,
avec deux raquettes croisées en dessous, en crème sur un vert sombre.

Il n'est pas posé sur le site en fichier. Il est **refait avec les moyens du
site** : les filets et les losanges sont dessinés par la feuille de style
(`.enseigne-regle`, deux pseudo-éléments et pas une image) ; les deux raquettes
sont un dessin au trait, `images/marque-raquettes.svg`.

Trois raisons, et elles suffisent : un logo en fichier doit être fourni en clair ET
en sombre, redessiné à chaque taille, et il pèse ; remonté, il est net sur tous les
écrans, prend la couleur de la surface sur laquelle il est posé, est lu par Google
et par les lecteurs d'écran, et ne coûte presque rien.

**Les raquettes sont posées en masque, jamais en `<img>`.** Un SVG chargé par
`<img>` est un document isolé : `currentColor` n'y vaut plus rien et retombe au
noir. En masque, c'est la couleur de fond de l'élément qui passe au travers du
dessin — donc l'encre de sa surface. Un seul fichier pour les deux fonds, sapin sur
la page et crème sur le pied de page.

### Où l'enseigne est ornée, et où elle ne l'est pas

| Emplacement | Ce qu'on en voit |
| --- | --- |
| Le premier écran | Le logo entier : filets, losanges, raquettes |
| Le pied de page | Le logo entier, calé à gauche, raquettes agrandies |
| La barre du haut | Le nom seul, sur deux lignes |
| Le menu du téléphone | Le nom seul, sur deux lignes |

Les deux derniers composent l'enseigne à trente pixels. À cette taille, les filets
se confondent avec le texte et le cordage des raquettes devient une tache grise :
la règle est de ne pas les y mettre, pas de les rétrécir.

Une seule taille en `em` règle chaque emplacement — **sauf les raquettes du pied de
page**, qui ont leur propre échelle. Le pied compose le nom à cinquante pixels
contre cent cinquante sur le premier écran ; à la même proportion, le cordage
tomberait sous les vingt pixels.

### La marque du navigateur

Elle, en revanche, **n'est pas les raquettes** : c'est une **balle de tennis en
terre battue, coutures crème**. Contrainte de taille, pas choix de goût — à seize
pixels dans un onglet, la balle ne fait plus que douze pixels de large, et un
cordage y devient un aplat. Elle est en SVG (`images/logo-mono.svg`), en `.ico` et
en PNG pour l'écran d'accueil des iPhone ; les trois portent le même dessin.

---

## 5. Le premier écran

Un écran entier de crème. L'enseigne au milieu. **Huit dessins au trait** tout
autour — deux en terre battue, six en vert sapin. Rien d'autre : pas de
photographie, pas d'accroche, pas de bouton.

C'est un parti pris, et il se défend : un grand visuel en ouverture oblige à poser du
texte par-dessus, donc à assombrir la photo, donc à choisir entre lire et voir. Ici on
ne choisit pas.

Les dessins ne sont pas jetés au hasard. Ils laissent libre la bande centrale où vit
l'enseigne, trois d'entre eux sont coupés par le bord de l'écran — c'est ce qui
empêche la composition d'avoir l'air rangée — et chacun porte cinq réglages écrits
dans la feuille de style : **où il est, quelle taille il fait, de combien il penche, de
combien il tombe au premier défilement, et de combien il vrille en tombant.**

Tout le mouvement tient dans un seul chiffre, `--p`, l'avancée du premier défilement.
Le script ne fait qu'écrire ce chiffre ; c'est le CSS qui en tire la chute de chacun.
Une écriture par image de rendu, pas neuf.

**Les huit dessins sont ceux du client, sans exception.** Ceux du site modèle ont
tous été retirés en septembre. Ils sont arrivés en captures d'écran, chacun dans un
style et une palette différents — un lavis bleu, un feutre vert, un trait noir. Le
script `scripts/preparer-dessins.py` les a détourés et repassés à l'encre de la
maison : c'est cette encre unique qui les fait tenir ensemble.

> **⚠ Les cinq dessins de table viennent encore du site modèle**, simplement repassés
> en terre battue. Si le client en fournit d'autres, la consigne est la même : des
> **dessins au trait, sur fond clair uni**, que le script se charge de détourer. Une
> chose à savoir : sur de la crème, **un trait fin disparaît**. Les dessins qui
> tiennent sont ceux qui ont de la matière — hachures, aplats, traits appuyés.

---

## 5 bis. La carte, et sa gouttière

C'est le chapitre le plus important de cette version, et le seul qui ne doit rien
au site modèle.

La carte imprimée du restaurant a une particularité : **chaque plat y porte deux
noms.** Celui du plat — « Capricciosa » — et un nom de code emprunté au tennis —
« ACE ». Le second est composé en petites capitales dans une colonne à part, à
gauche, séparée du plat par un filet vertical.

C'est ce filet qui fait toute la carte. Sans lui on lit une liste ; avec lui on lit
une feuille de match. Le site le reprend tel quel :

```
ACE   │  CAPRICCIOSA ................................. 21.—
      │  Olives noires, salami piquant & œuf
```

Trois conséquences, et elles sont toutes voulues :

1. **La carte tient sur une colonne.** Le site modèle en mettait deux au-delà de
   1100 px. La gouttière des noms de code occupe déjà douze rem ; à deux colonnes
   il ne resterait au plat que trois cents pixels, et la description se casserait
   en escalier.
2. **Le filet vertical est porté par la ligne, pas par le nom de code.** Posé en
   bordure de celui-ci, il s'arrêtait au texte : cinquante-neuf segments de deux
   centimètres séparés par des trous, là où le papier a un trait continu. Il est
   donc posé en couche absolue, sur toute la hauteur de la ligne, et déborde d'un
   pixel pour croiser le filet horizontal suivant — comme sur du papier.
3. **Au doigt, la gouttière disparaît.** En dessous de 700 px il n'y a pas la place
   d'une colonne : le nom de code passe au-dessus du plat, en terre battue, comme
   une étiquette. C'est le seul endroit où il prend la couleur d'accent ; dans la
   gouttière, il est en encre pâle et c'est le filet qui le tient.

**L'étoile des plats signature n'est pas un caractère.** Seize plats la portent sur
la carte imprimée. Dans le HTML, le plat porte `data-signature="true"` et rien
d'autre ; c'est le CSS qui dessine l'étoile. Un « ★ » écrit au milieu d'un nom est
épelé par les lecteurs d'écran, et ce n'est pas un mot : c'est une marque.

Enfin, la carte a **un sommaire**, ce que le site modèle n'avait pas. Il a une
carte courte ; celle-ci compte cinquante-neuf plats sur deux pages. Sans index, il
faut faire défiler quatre écrans pour savoir s'il y a des pizzas. C'est une liste
de liens, pas une barre d'onglets : elle ne suit pas le défilement, elle ne
surligne pas la famille courante. Un sommaire de livre.

---

## 5 ter. Le tableau d'affichage

Il remplace, sur l'accueil, la grille de quatre assiettes du site modèle.

Ce n'est pas un caprice de mise en page, c'est une conséquence de la carte. Les
plats que la maison signe d'une étoile sont **seize**, pas quatre. Une grille de
quatre photographies en aurait montré quatre — donc en aurait caché douze — et
aurait demandé quatre photographies de studio qu'on n'a pas.

Alors on ne montre pas : **on affiche.** Dix lignes tirées des seize, choisies pour
couvrir toute la carte, de la saucisse de veau à vingt francs au tomahawk à cent
vingt. Le nom de code à gauche, le plat, le prix, dans la machine à écrire, sur des
filets d'un pixel. C'est le tableau d'un club de tennis — celui où l'on lit les
tirages et les résultats — et c'est le seul bloc de ce site qui ne pourrait se
trouver sur aucun autre.

Deux colonnes sur grand écran, une seule au doigt. Chaque ligne mène à sa famille
dans la carte.

---

## 5 quater. Le bandeau

Il prend la place de la **deuxième** des deux paires d'images du site modèle.

Deux paires successives, c'était deux fois le même geste dans une page qui en a
peu. Et surtout : ce restaurant n'a qu'une photographie qui dise le lieu — la vue
sur les quatre courts en terre battue, prise depuis une table de la salle,
derrière les baies. Une photographie qui porte tout le propos ne se met pas à côté
d'une autre. Elle se met seule, et on écrit à côté d'elle ce qu'elle montre.

La règle de la maison tient quand même : elle ne touche aucun bord de l'écran, et
son format — 16/9 — n'est celui d'aucune autre photographie de la page.

---

## 5 quinquies. Ce que la version 3 a corrigé

Le client a regardé le site en ligne et a répondu sept phrases. Les voici, et ce
qu'elles ont donné.

| Ce qu'il a dit | Ce qui a changé |
| --- | --- |
| « Je ne veux pas de gros espace comme ça » | Le rapport des intervalles passe de 1 · 2 · 3 à 1 · 1,5 · 2, et le demi-joint de 6,25 à 3,75 rem. Le premier écran est plafonné. La respiration, 596 px pour un dessin, est supprimée : **le silence est fait par un changement de fond, pas par du vide.** L'accueil perd 1 162 px |
| « La carte j'aime pas le positionnement » | Voir le chapitre 5 bis, refait en entier |
| « Le carrousel, j'en veux pas à part si il bouge tout seul » | Il avance seul, sans fin, à 30 px/s. Il ne s'arrête ni au survol ni au clic, et on peut le pousser à la main quand on veut : ce n'est plus une animation, c'est du DÉFILEMENT. Voir le chapitre 8 |
| « La héro ne doit pas être coupée par le carrousel, jamais » | Le premier écran reprend la hauteur entière de la fenêtre. Ce n'est pas un retour en arrière : c'est le CHAMP DE DESSINS qui est maintenant borné à 820 px et centré dedans, alors qu'avant il suivait la fenêtre et se défaisait. La section est pleine, la composition est dense |
| « Les images avec un petit texte comme ça je ne veux pas » | Le bandeau a perdu sa légende. La photographie prend toute la bande, d'un bord à l'autre de l'écran — seul endroit du site où cela arrive |
| « Je trouve le site très terne » | Voir le chapitre 2, refait en entier |
| « Améliore les dispositions des textes et images » | L'échelle typographique est écartée : le chapô et le corps valaient le même chiffre, ils sont maintenant à 1,37. L'italique prend une couleur. Le chapô cesse d'être plus pâle que le détail qui le suit |
| « Analyse chaque page, la disposition est-elle cohérente » | La carte alignait trois bords gauches ; elle en a deux. Les cinq pages emploient les mêmes surfaces dans le même ordre |
| « Vraiment améliore les couleurs » | Voir le chapitre 2 |

**Une chose n'a PAS changé, et c'est délibéré : les teintes.** `--terre-600`
vaut toujours `#A44E2C`, `--creme` toujours `#F4F1E9`. Décaler un ocre d'un cran
pour « raviver » ne se voit sur aucun écran et casse tout ce qui en dépend. Ce
qui manquait n'était pas la saturation, c'était l'emploi.

---

## 6. Le rythme de la page

Trois intervalles seulement, et ils dérivent tous d'un seul chiffre — le **demi-joint**,
qui va de 3 rem au doigt à 6,25 rem sur grand écran :

| Intervalle | Valeur | Quand |
| --- | --- | --- |
| serré | 1 demi-joint | deux blocs qui n'en font qu'un |
| courant | 2 demi-joints | deux propos qui se suivent |
| souffle | 3 demi-joints | de part et d'autre d'un silence |

C'est le réglage le plus important de la page — plus que les couleurs. C'est lui qui
distingue une adresse qu'on choisit d'une page qui liste des prestations.

**Le vide est un élément.** Entre deux blocs, il y a parfois un écran entier de crème
avec un seul dessin au trait posé au milieu. C'est là que la page respire.

Deux autres règles de composition, reprises du site modèle et toujours valables :
**aucune photographie ne touche le bord de l'écran** (sauf le ruban, qui sort par la
droite pour dire qu'il continue), et **deux photographies ne sont jamais d'accord** —
ni la même largeur, ni le même format, ni la même hauteur de départ. Une grille
régulière se lit comme un tableau ; un décalage se lit comme une page composée.

---

## 7. Les photographies

C'est le point où le passage du noir au crème coûte le plus cher.

Le site modèle était noir : ses photographies, prises à la bougie, sur fond sombre,
s'y fondaient. **Posées sur de la crème, les mêmes photographies font des trous.**

**Neuf photographies du restaurant sont aujourd'hui en ligne**, et elles se
divisent nettement en deux :

| | Ce qu'elles montrent | Sur la crème |
| --- | --- | --- |
| **Quatre de jour** | La vue sur les courts depuis la salle, l'entrecôte, la salade, le burger | Elles tiennent. Ce sont elles qui portent la page |
| **Cinq du soir** | Le bar et la salle, les rigatoni, le poisson en feuilleté, les desserts, les olives | Fond sombre, lumière chaude, contraste fort. Elles font le trou annoncé |

C'est acceptable en l'état — ce sont les vraies photographies du restaurant, et
mieux vaut le vrai lieu sombre qu'un faux lieu clair. Mais la série reste à
compléter, et le brief ne change pas :

- **de jour**, en lumière naturelle ;
- **claires** — un fond sombre est un trou dans la page ;
- **de plein air** dès que c'est possible : la terrasse, les courts, les arbres ;
- **franches** : une assiette, une table, un geste. Pas de mise en scène.

Deux photographies manquent particulièrement : **la terrasse dressée** et **une
pizza**. La page Pizza & Pasta porte aujourd'hui une assiette de rigatoni prise au
passe, faute de mieux.

Une conséquence technique, écrite dans la feuille de style : quatre de ces neuf
photographies ont été prises **debout**, et le sujet n'y est pas au centre du
fichier — l'assiette est en bas, les courts sont en haut. Un cadre en paysage les
viderait de leur sujet. Deux classes le disent, `photo-bas` et `photo-haut`, et
elles ne servent qu'à ça.

Le brief complet, emplacement par emplacement, avec les noms de fichiers et les
dimensions attendus, est dans **`PHOTOS-A-FOURNIR.md`**. C'est le document à
remettre au photographe.

---

## 8. Le mouvement

Deux mouvements, et ils sont lents tous les deux.

**Les apparitions au défilement.** Un bloc monte de trente pixels en apparaissant, une
seule fois, sur deux secondes et demie, avec une courbe exponentielle : l'essentiel du
déplacement se fait dans les six premiers dixièmes, puis le bloc se pose sur une
trajectoire de plus en plus douce. C'est ce très long atterrissage qui donne
l'impression de calme. Une apparition rapide, on la remarque.

**La dérive.** Les dessins descendent lentement pendant qu'on les dépasse, et se
redressent en chemin — deux centimètres et huit degrés sur toute la traversée de
l'écran. Elle est tenue par le défilement lui-même (`animation-timeline: view()`), pas
par du JavaScript : rien ne tourne sur le fil principal.

**Tout s'arrête** si l'appareil est réglé sur « réduire les animations ». Il ne reste
alors que les changements de couleur.

---

## 9. Ce qui n'est pas encore décidé

| Quoi | Qui décide |
| --- | --- |
| La page des desserts | Le client. Elle existe sur la carte imprimée mais n'a pas été photographiée : la famille est en ligne, vide, et **rien n'a été inventé** |
| La page des boissons | Le client. Aucune n'a été fournie ; le site n'en parle pas |
| La provenance du poulet | Le client. La ligne était coupée sur la photographie du bas de carte |
| Les horaires réels | Le client. Ceux qui sont en ligne ne sont pas confirmés |
| Les cinq dessins de table | Le client. Quatre des neuf sont déjà les siens |
| Les photographies de jour | Le photographe, sur la base de `PHOTOS-A-FOURNIR.md` |
| Le nom de domaine, l'e-mail, le téléphone | À confirmer — voir `CONTENU-SITE.md` |

**La carte, elle, est décidée** : cinquante-neuf plats et cinquante-neuf prix,
relevés sur la carte imprimée en septembre 2026. Le logo aussi : il est fourni, et
il est en ligne.
