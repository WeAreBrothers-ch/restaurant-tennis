# Direction artistique — Restaurant du Tennis, Écublens

> Version 1.0 — 4 septembre 2026 · **le site est crème**
> Périmètre : le site du restaurant du club-house du Tennis Club d'Écublens.
> Ce document dit ce qui a été décidé et pourquoi. Il ne décrit pas ce qu'il faudrait
> faire un jour : il décrit ce qui est dans le code.

---

## 0. D'où vient ce site

C'est la reprise, pour le même client, du site du Restaurant L'Étoile à Lausanne.
**La structure, la mise en page, les rythmes et les mécaniques sont identiques** —
c'est une demande, et c'est un choix sain : cette architecture a été éprouvée, elle
est claire, et elle tient sur un téléphone.

Trois choses seulement changent : **les couleurs, les dessins, la typographie.**
Autrement dit : tout ce qui fait qu'on ne reconnaît pas l'autre site.

C'est plus qu'il n'y paraît. L'Étoile était **noir** — un noir plein, sur lequel des
photographies prises à la bougie brillaient comme sur une nappe sombre. Le Restaurant
du Tennis est **crème**. Ce n'est pas la même couleur inversée : c'est un autre parti,
qui demande d'autres photographies, d'autres dessins, et une autre typographie.

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

1. **La crème est peu jaune.** Un beige franc daterait le site de dix ans. Ce qu'on
   cherche est le blanc légèrement chaud du papier, pas la couleur du sable.

2. **Sur du clair, on détache en assombrissant.** La bande secondaire est un ton plus
   BAS que le fond, jamais plus haut. C'est l'inverse exact de ce que faisait le site
   noir, et c'est la seule adaptation structurelle qu'a demandée le passage au clair.

3. **La terre battue ne décore jamais.** Elle est réservée aux prix, au bouton
   d'appel, à l'état actif et aux dessins de table. Une couleur qui est partout ne
   signale plus rien. Elle ne s'étale en aplat qu'à un seul endroit : le bouton de
   réservation.

### Les deux encres des dessins

C'est la seule chose que le site dit **par la couleur seule**, sans un mot :

| Encre | Valeur | Ce qu'elle dessine |
| --- | --- | --- |
| La terre battue | `#A44E2C` | **La table** — le serveur, les couverts, le convive, les verres, le plateau |
| Le vert sapin | `#27523D` | **Le club** — la raquette, le joueur au service, le filet, les chaussures |

Sur le premier écran, les neuf dessins alternent : jamais deux de la même encre
côte à côte. On lit les deux familles d'un coup d'œil, et on a compris qu'on est
au restaurant d'un tennis avant d'avoir lu une ligne.

L'encre n'est pas posée par le CSS : elle est **cuite dans les fichiers**, par
`scripts/preparer-dessins.py`. C'est ce script qui détoure un dessin arrivé en
capture d'écran, le repasse à l'encre de la maison et le ramène à ses marges.

Il n'y a **pas un gris neutre** dans tout le site : toutes les encres tirent vers le
vert. C'est la moitié de sa chaleur, et ça ne se voit pas — ça se sent.

### Les contrastes

Les vingt-neuf couples texte/fond du site passent la norme WCAG 2.1 niveau AA. Le
vérificateur est dans le dépôt : `node scripts/verifier-contraste.mjs`, à relancer
après toute retouche de `css/tokens.css`.

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

**Le nom de la maison n'est pas une image.** C'est du texte, composé dans les polices
du site, en trois lignes et trois voix :

```
RESTAURANT DU        la machine à écrire, en terre battue — le générique
Tennis               le serif, en grand — le nom
ÉCUBLENS             la machine à écrire, en petit — le lieu
```

Trois raisons, et elles suffisent : un logo en fichier doit être fourni en clair ET en
sombre, redessiné à chaque taille, et il pèse ; écrite, l'enseigne est nette sur tous
les écrans, prend la couleur de la surface sur laquelle elle est posée, est lue par
Google et par les lecteurs d'écran, et ne coûte pas un octet.

Elle occupe quatre emplacements — la barre du haut, le menu du téléphone, le pied de
page, et le premier écran — tous réglés par une seule taille en `em`.

**Si le client fournit un logo dessiné, il remplace le composant `.enseigne` partout,
sans rien changer d'autre.** Les emplacements sont déjà dimensionnés.

La marque du navigateur, elle, est dessinée : **une balle de tennis en terre battue,
coutures crème**. Elle est en SVG (`images/logo-mono.svg`), en `.ico` et en PNG pour
l'écran d'accueil des iPhone.

---

## 5. Le premier écran

Un écran entier de crème. L'enseigne au milieu. **Neuf dessins au trait** tout
autour — cinq en terre battue, quatre en vert sapin. Rien d'autre : pas de
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

**Quatre des neuf dessins sont ceux du client** : la raquette, le joueur au service,
le filet et les chaussures. Ils sont arrivés en capture d'écran, chacun dans un style
et une palette différents — un lavis bleu, un fusain noir, un feutre vert. Le script
`scripts/preparer-dessins.py` les a détourés et repassés au vert sapin : c'est
l'encre unique qui les fait tenir ensemble, et avec les cinq autres.

> **⚠ Les cinq dessins de table viennent encore du site modèle**, simplement repassés
> en terre battue. Si le client en fournit d'autres, la consigne est la même : des
> **dessins au trait, sur fond clair uni**, que le script se charge de détourer. Une
> chose à savoir : sur de la crème, **un trait fin disparaît**. Les dessins qui
> tiennent sont ceux qui ont de la matière — hachures, aplats, traits appuyés.

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

Les photographies du Restaurant du Tennis doivent donc être :

- **de jour**, en lumière naturelle ;
- **claires** — un fond sombre est un trou dans la page ;
- **de plein air** dès que c'est possible : la terrasse, les courts, les arbres ;
- **franches** : une assiette, une table, un geste. Pas de mise en scène.

Le brief complet, emplacement par emplacement, avec les noms de fichiers et les
dimensions attendus, est dans **`PHOTOS-A-FOURNIR.md`**. C'est le document à remettre
au photographe.

> **⚠ Toutes les photographies du site sont aujourd'hui celles du site modèle.** Elles
> sont sombres, et elles montrent un restaurant italien. Aucune n'est utilisable.

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
| La carte réelle — plats, prix, familles | Le client. Ce qui est en ligne est provisoire et marqué comme tel dans le code |
| Les horaires réels | Le client. Ceux qui sont en ligne ne sont pas confirmés |
| Les neuf dessins du premier écran | Le client les fournit |
| Les photographies | Le photographe, sur la base de `PHOTOS-A-FOURNIR.md` |
| Un logo dessiné | Facultatif. L'enseigne composée tient très bien toute seule |
| Le nom de domaine, l'e-mail, le téléphone | À confirmer — voir `CONTENU-SITE.md` |
