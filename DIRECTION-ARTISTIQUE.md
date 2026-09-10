# Direction artistique — Restaurant Tennis Club Écublens

> Version 3.1 — 9 septembre 2026 · **le site est crème**
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

> **Une version 3 a existé, et elle a été annulée.** Elle faisait de l'olive du
> logo une surface : la bande d'accès direct, le bandeau, le tableau
> d'affichage et les titres de famille de la carte passaient sur du vert plein,
> et le jaune de la balle devenait l'accent de ces bandes. Le client a regardé
> et a répondu : « remets les couleurs d'avant, c'est très moche actuellement ».
>
> **La palette de la version 2 est donc rétablie à l'octet près.** Ce chapitre
> est celui de la version 2, et il fait foi. La leçon à en tirer n'est pas
> qu'un système à cinq surfaces était mauvais en soi — c'est que ce
> restaurant-ci veut une carte imprimée, pas une identité de club, et que la
> réponse au « terne » était ailleurs : dans le rythme, l'échelle typographique
> et la mise en page de la carte, qui, elles, ont été gardées.

Elles ne viennent pas d'un nuancier : elles viennent du lieu. Le club a **quatre
courts en terre battue**, des sapins au fond, et un club-house rénové.

| Nom | Valeur | Rôle | Part de l'écran |
| --- | --- | --- | --- |
| **La crème** | `#F4F1E9` | Le fond de presque tout | ≈ 75 % |
| **Le sable** | `#ECE8DE` | La bande qui doit se détacher | ≈ 5 % |
| **Le sapin** | `#12291F` | L'encre. Et le pied de page, en aplat | ≈ 18 % |
| **La terre battue** | `#A44E2C` | Les prix, le bouton d'appel, l'état actif | ≈ 2 % |
| **La fougère** | `#4A6A38` | L'état « ouvert », rien d'autre | < 1 % |

### Les trois règles

1. **La crème est peu jaune.** Un beige franc daterait le site de dix ans. Ce
   qu'on cherche est le blanc légèrement chaud du papier, pas la couleur du
   sable.

2. **Sur du clair, on détache en assombrissant.** La bande secondaire est un ton
   plus BAS que le fond, jamais plus haut. C'est l'inverse exact de ce que
   faisait le site noir, et c'est la seule adaptation structurelle qu'a demandée
   le passage au clair.

3. **La terre battue ne décore jamais.** Elle est réservée aux prix, au bouton
   d'appel, à l'état actif et aux dessins de table. Une couleur qui est partout
   ne signale plus rien.

### Les deux encres des dessins

C'est la seule chose que le site dit **par la couleur seule**, sans un mot :

| Encre | Valeur | Ce qu'elle dessine |
| --- | --- | --- |
| La terre battue | `#C0603A` | **La table** — les verres, le couvert |
| Le vert sapin | `#27523D` | **Le club** — le service, la raquette, le joueur, le filet, les chaussures, les balles |

L'encre n'est pas posée par le CSS : elle est **cuite dans les fichiers**, par
`scripts/preparer-dessins.py`. C'est la raison pour laquelle le premier écran
est et restera crème : sur un fond vert, ces dessins tombent à 1,24:1. Un dessin
dont la couleur est cuite doit exister une fois par fond sur lequel il se pose —
la règle vaut toujours, même si le site n'a plus qu'un seul fond clair.

### Les contrastes

Les couples texte/fond du site passent la norme WCAG 2.1 niveau AA. Le
vérificateur est dans le dépôt : `node scripts/verifier-contraste.mjs`, à
relancer après toute retouche de `css/tokens.css`. Sa palette est une COPIE, et
c'est son défaut : une valeur changée d'un côté et pas de l'autre, et il dit
« tout passe » sur une palette qui n'est plus celle du site.

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

Les dessins ne sont pas jetés au hasard. Chacun porte cinq réglages écrits dans la
feuille de style : **la case qu'il occupe, quelle taille il fait, de combien il
penche, de combien il tombe au premier défilement, et de combien il vrille en
tombant.** Le désordre vient des tailles inégales, des inclinaisons et de la place que
chaque dessin prend dans sa case — celui-ci contre le bord haut, celui-là contre le
bord bas. Ce qui a disparu, c'est le hasard, pas la vie.

**Deux photographies touchent le bord de l'écran au doigt**, et ce sont les seules :
le bandeau de respiration de la carte et l'ouverture de la page contact. La règle du
site est l'inverse — aucune image ne va d'un bord à l'autre, sauf le ruban de
l'accueil — et le client l'a fait plier : « je n'aime pas qu'il y ait des bordures
vides, tu les colles au côté ». Il a raison sur ces deux-là, et pour une raison qui
n'est pas de goût : ce sont les seules photographies qui ne partagent pas leur bord
gauche avec un texte. Celles des blocs à deux colonnes s'alignent sur leur
paragraphe, et la marge s'y lit comme une colonne ; celles-ci sont seules sur leur
ligne, et la marge n'y aligne plus rien. Au-delà de 900 px, elles rentrent dans leur
colonne.

Celle de la page contact a perdu son format portrait au doigt, qui lui donnait la
moitié de l'écran pour ouvrir une page dont le sujet est une adresse : elle est
recadrée en paysage, garde le haut de l'image, et passe de 480 à 260 px.

**Aucun n'est coupé, et aucun n'en touche un autre.** Trois étaient coupés par parti
pris, et onze recouvrements ont été relevés à 1 100 px de large. Le client a tranché
trois fois : « il ne doit jamais y avoir de choses coupées », « il ne faut pas que les
dessins se chevauchent », et enfin, sur une grille de neuf cases qui réglait le
problème en resserrant tout : « t'as décalé le titre, la hero ».

Le champ reste donc libre, comme sur le site modèle, et le chevauchement est réglé là
où il naît : dans les positions, les tailles, et la taille de l'enseigne. Trois choses
s'y ajoutent.

**LA COMPOSITION CHANGE AVEC LA FORME DE LA FENÊTRE**, parce que la place libre autour
de l'enseigne change de forme avec elle. Sur un grand écran il reste une COURONNE, et
les huit dessins en font le tour. Sous 900 px de large l'enseigne barre l'écran : il
ne reste que DEUX BANDES, et cinq dessins s'y rangent. Sur une fenêtre plus large que
haute et basse de plafond — un téléphone couché — ce sont deux MARGES LATÉRALES, et
quatre dessins s'y tiennent.

**L'ENSEIGNE SE RÈGLE SUR LA HAUTEUR AUTANT QUE SUR LA LARGEUR.** Son corps ne suivait
que la largeur : sur un portable de 1 280 × 800, elle prenait 412 px de haut sur 704 et
les dessins venaient à un pixel du nom de la maison. Deux crans de hauteur et un cran
de largeur entre 900 et 1 200 px ouvrent la couronne.

**ET RIEN N'EST LAISSÉ AU JUGÉ.** Les positions ont été cherchées par la mesure, et
elles sont vérifiées à chaque retouche : `node scripts/essai-premier-ecran.mjs` ouvre
l'accueil à cent soixante-neuf tailles d'écran, du petit téléphone au 4K, portrait et
paysage, et relève chaque recouvrement et chaque dessin coupé. Il doit rendre zéro.

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

Enfin, la carte **n'a pas de sommaire**, et sa composition est celle du site modèle.

Elle a porté un sommaire — une liste des dix familles, en rail à gauche sur grand
écran, en ligne glissante au doigt. Le client l'a fait retirer en deux temps : d'abord
ses losanges séparateurs (« il y a des genres de bullet point dans la page carte »),
puis le bloc entier (« je ne veux pas du tout de navigation en fait pour la carte »).
L'Étoile n'en a jamais eu : sa page carte enchaîne les familles, et on descend.

Elle a ensuite porté une colonne de 56 rem tenant deux pistes de plats à toutes les
tailles, des titres de famille au corps d'un titre de page, et ni filet ni pointillé.
Verdict : « des trucs hyper chelou, inspire-toi de l'Étoile ». La composition est donc
reprise de là, telle quelle : **une colonne de lecture de 620 px centrée**, **deux
colonnes seulement au-delà de 1 100 px** et par multi-colonnage — les plats coulent de
la première dans la seconde, comme le texte d'un journal —, **un filet sous chaque
plat**, **un filet sous le titre de famille**, et **le rappel pointillé** entre le plat
et son prix.

Ce qui reste de cette maison : le nom de code sous chaque plat, l'étoile des seize
plats signature, et les prix en terre battue.

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
| « Le carrousel, j'en veux pas à part si il bouge tout seul » | Il avance seul, sans fin, à 55 px/s. Il ne s'arrête ni au survol ni au clic, et on peut le pousser à la main quand on veut : ce n'est plus une animation, c'est du DÉFILEMENT. Voir le chapitre 8 |
| « La héro ne doit pas être coupée par le carrousel, jamais » | Le premier écran reprend la hauteur entière de la fenêtre. Ce n'est pas un retour en arrière : c'est le CHAMP DE DESSINS qui est maintenant borné à 820 px et centré dedans, alors qu'avant il suivait la fenêtre et se défaisait. La section est pleine, la composition est dense |
| « Les images avec un petit texte comme ça je ne veux pas » | Le bandeau a perdu sa légende. La photographie prend toute la bande, d'un bord à l'autre de l'écran — seul endroit du site où cela arrive |
| « Je trouve le site très terne » | Voir le chapitre 2, refait en entier |
| « Améliore les dispositions des textes et images » | L'échelle typographique est écartée : le chapô et le corps valaient le même chiffre, ils sont maintenant à 1,37. L'italique prend une couleur. Le chapô cesse d'être plus pâle que le détail qui le suit |
| « Analyse chaque page, la disposition est-elle cohérente » | La carte alignait trois bords gauches ; elle en a deux. Les cinq pages emploient les mêmes surfaces dans le même ordre |
| « Vraiment améliore les couleurs » | **Annulé.** Une palette à cinq surfaces a été essayée puis retirée à la demande du client — voir l'encadré du chapitre 2. Ce qui reste de la réponse au « terne » : le rythme, l'échelle typographique et la carte |
| « La carte, ce que tu as fait à surligner les titres, je ne veux pas ça » | Les titres de famille ont porté un aplat vert pendant une version. Ils reprennent la composition du site modèle : serif en capitales espacées, tenu par un filet, sur la crème. Le repère de position que la bande apportait vient de leur corps : à `--fs-h2`, un titre de famille est deux fois plus grand qu'un nom de plat |
| « Le bouton téléphone, je ne le veux pas en carré comme ça » | Le bloc plein de la barre du haut devient un lien souligné, le même composant que « Voir toute la carte ». Sa cible reste haute de 48 px |
| « Il y a des genres de bullet point dans la page carte, ça va pas du tout » ; « je ne veux pas du tout de navigation en fait pour la carte, tu enlèves ça » | Le sommaire est supprimé, losanges compris, sur la carte comme sur la page Pizza & Pasta. La carte devient une colonne centrée de 56 rem. Les points médians des mentions « minimum 2 personnes · prix par personne » avaient le même défaut de puce orpheline : supprimés aussi, c'est le vide qui sépare |
| « Les balles de tennis sont un peu trop collées à gauche » | Les dessins de section étaient calés au pixel près sur le bord gauche du texte. Un dessin n'a pas de bord franc : il prend un retrait de seize à trente-deux pixels selon l'écran |
| « Le venir chez nous, c'est trop moche, c'est séparé, ça n'a aucun sens » | Le titre flottait au-dessus d'un filet qui n'était pas le sien, à soixante-quatre pixels de son contenu. Le filet devient celui du titre — la composition des titres de famille de la carte — et l'écart tombe à vingt-quatre pixels |
| « Il ne faut pas que les dessins se chevauchent, vraiment fais attention » ; « t'as décalé le titre, la hero » | Le premier écran a été refait deux fois. Une grille de neuf cases rendait le chevauchement impossible, mais réservait à l'enseigne une rangée entière et resserrait tout : retirée. Le champ libre du site modèle est conservé, et le chevauchement est réglé par les positions, les tailles, et la taille de l'enseigne — qui se borne maintenant sur la hauteur de la fenêtre. Trois dispositions selon la forme de l'écran. Vérifié à 169 tailles par `scripts/essai-premier-ecran.mjs` |
| « Cette carte ne va pas : la petite phrase, tu ne l'as pas enlevée ; il y a trop d'espace entre le début et la fin ; et l'image, c'est la pire que tu pouvais choisir, elle n'a aucun sens et elle est coupée » | La page Pizza & Pasta ouvrait sur DEUX titres, deux dessins et deux paragraphes avant la première pizza. Le second bloc entier — dessin, titre « Vingt-deux façons de passer la balle » et phrase sur l'emporter — est supprimé : la page ouvre comme la carte, un dessin, un titre, un lien, puis les pizzas. La bande d'olives marinées, qui n'avait rien à faire sur une page de pâtes et que le format coupait en montrant surtout des verres, est retirée ; la page attend la photographie de pizza. Trois cents pixels de moins avant la carte |
| « Mets des images dans la carte, mais de la même disposition que dans l'Étoile : intégrées dans la carte, pas avant » ; « enlève ces deux phrases en haut des cartes » | La photographie qui ouvrait la page carte est retirée, et trois bandes viennent respirer DANS la carte, entre deux groupes de familles, à la mesure de la colonne de plats — la salade après les assiettes froides, la salle après les classiques, le hamburger après les hamburgers. La page Pizza & Pasta en reçoit une entre les foccacias et les pâtes. Les deux paragraphes d'introduction des deux cartes sont supprimés : le titre, puis la carte |
| « L'image de la burrata, tu la supprimes, elle est trop moche » | Retirée de l'ouverture de Pizza & Pasta et du bloc « Neuf pizzas » de l'accueil, fichiers compris. Les deux blocs présentent leur texte en colonne de lecture jusqu'à ce que la photographie de pizza soit prise |
| « Je n'aime pas qu'il y ait des bordures vides, tu les colles au côté » ; « celle de contact, tu peux la faire plus petite, elle est gigantesque » | Le bandeau de la carte et l'ouverture du contact vont d'un bord à l'autre de l'écran au doigt. Celle du contact passe en outre du portrait au paysage : 260 px de haut au lieu de 480 |
| « La carte, tu as fait des trucs hyper chelou, inspire-toi de l'Étoile » | La carte reprend la composition du site modèle, telle quelle : une colonne de lecture de 620 px centrée, deux colonnes seulement au-delà de 1 100 px et par multi-colonnage, un filet sous chaque plat, un filet sous le titre de famille, et le rappel pointillé entre le plat et son prix. Ce qui reste de nous : le nom de code, l'étoile des plats de la maison, et les prix en terre battue |
| « Il ne doit jamais y avoir de choses coupées ou mal positionnées, chaque espace doit être réfléchi » | Les cinq pages ont été mesurées à onze tailles d'écran, de 320 à 1 920 px. Les dessins du premier écran, dont trois sortaient du cadre, se tiennent maintenant à l'intérieur — voir le chapitre 4. La carte prend ses deux colonnes dès 768 px au lieu de 990. Le haut de la page carte porte une photographie sur grand écran, où il laissait la moitié droite vide. Les boutons « Itinéraire » et « Appeler » de l'accueil sont sur la même ligne. Sur téléphone, les vides avant les desserts, la provenance, l'appel à réserver et le plan perdent un cran chacun, et les quatre liens du pied tiennent sur deux lignes alignées. La barre du bas de la page carte ne renvoie plus vers la page où l'on est |

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
| **Quatre du soir** | Le bar et la salle, le poisson en feuilleté, les desserts, les olives | Fond sombre, lumière chaude, contraste fort. Elles font le trou annoncé |

C'est acceptable en l'état — ce sont les vraies photographies du restaurant, et
mieux vaut le vrai lieu sombre qu'un faux lieu clair. Mais la série reste à
compléter, et le brief ne change pas :

- **de jour**, en lumière naturelle ;
- **claires** — un fond sombre est un trou dans la page ;
- **de plein air** dès que c'est possible : la terrasse, les courts, les arbres ;
- **franches** : une assiette, une table, un geste. Pas de mise en scène.

Deux photographies manquent particulièrement : **la terrasse dressée** et **une
pizza**. La page Pizza & Pasta portait une assiette de rigatoni à la burrata, prise
au passe, faute de mieux ; le client l'a fait retirer — « elle est trop moche » — et
les deux emplacements qu'elle occupait, l'ouverture de la page et le bloc « Neuf
pizzas » de l'accueil, sont **vides en attendant la vraie photographie**. Ils
présentent leur texte en colonne de lecture, ce qui est la composition du site
modèle pour ce cas ; ils ne montrent pas un cadre vide.

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
