#!/usr/bin/env python3
"""
============================================================================
 Prépare les dessins du premier écran.

     python3 scripts/preparer-dessins.py

 Les dessins d'origine sont dans `dessins-source/`, tels qu'ils sont arrivés :
 fond blanc ou crème, couleurs diverses, marges quelconques. Ce dossier n'est pas
 publié — il ne sert qu'à pouvoir refaire le travail. Le site, lui, ne veut qu'une chose de chacun
 d'eux : SA MATIÈRE. On la lui donne en trois gestes.

   1. LE FOND DISPARAÎT. Chaque pixel est jugé sur sa clarté : plus il est
      clair, plus il devient transparent. Un dessin au trait sur papier blanc
      se détoure ainsi tout seul, sans découpe et sans halo — et les demi-tons
      du crayon gardent leur demi-transparence.

   2. LE DESSIN PASSE À L'ENCRE DE LA MAISON. Une seule couleur, la même pour
      tous : c'est ce qui fait tenir ensemble neuf dessins qui n'ont ni le même
      auteur ni le même outil. Les dessins de tennis prennent le VERT SAPIN,
      ceux de la table gardent la TERRE BATTUE.

   3. LES MARGES TOMBENT. L'image est ramenée à son dessin, au pixel près :
      c'est la seule façon de pouvoir la positionner à un pourcentage d'écran
      et d'obtenir ce qu'on a demandé.

 Le seuil de clarté (`SEUIL`) est le seul réglage. Plus haut, le fond part
 mieux mais les traits pâles s'effacent ; plus bas, tout tient mais le papier
 laisse un voile.
============================================================================
"""

import os
import sys

SAPIN = (0x27, 0x52, 0x3D)   # le vert du club, pour les dessins de tennis
TERRE = (0xC0, 0x60, 0x3A)   # la terre battue, pour les dessins de table
CREME_SOURCE = (249, 234, 225)   # le papier des dessins d'origine, mesuré
SEUIL = 0.90                 # au-dessus de cette clarté, c'est du papier
GAMMA = 0.72                 # densifie les demi-tons : sans lui, un dessin peint
                             # aux couleurs claires arrive délavé sur la crème
DOSSIER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images")

# Chaque source, sa couleur, le rognage à faire AVANT tout le reste (gauche,
# haut, droite, bas — pour les incrustations d'écran), et sa LARGEUR FINALE.
#
# Cette dernière est le double de la largeur d'affichage réglée dans
# `css/accueil.css` : de quoi être net sur un écran Retina, et rien de plus. Un
# dessin livré en 1000 px pour être affiché en 225 pèse quatre fois trop lourd,
# et il est chargé AVANT le premier affichage — c'est-à-dire au pire moment.
SOURCES = [
    ("trait-filet-2026-09a.png",    "filet.png",    SAPIN, (0, 0, 0, 0), 440, []),
    # LES QUATRE DESSINS ARRIVÉS EN SEPTEMBRE. Ils remplacent ceux du site
    # modèle, qui ont été retirés : plus une seule image de la table ne vient
    # d'ailleurs que d'ici.
    #
    # Les deux premiers sont des dessins au trait continu, sur fond blanc franc :
    # ils se détourent tout seuls et n'ont besoin d'aucune retouche. Le canister
    # de balles arrive DÉJÀ en vert sombre, ce qui ne change rien — le script ne
    # lit que la clarté de chaque pixel, jamais sa teinte, et repeint tout à
    # l'encre demandée.
    ("trait-balles-2026-09b.png",   "balles.png",   SAPIN, (0, 0, 0, 0), 300, []),
    ("trait-service-2026-09b.png",  "service.png",  SAPIN, (0, 0, 0, 0), 420, []),
    ("trait-joueur-2026-09b.png",   "joueur-trait.png", SAPIN, (0, 0, 0, 0), 470, []),
    ("trait-verres-2026-09b.png",   "verres.png",   TERRE, (0, 0, 0, 0), 620, []),
    ("trait-couvert-2026-09b.png",  "couvert.png",  TERRE, (0, 0, 0, 0), 520, []),
    ("trait-baskets-2026-09a.png",  "baskets.png",  SAPIN, (0, 0, 26, 0), 400, []),
    ("trait-raquette-2026-09a.png", "raquette.png", SAPIN, (0, 0, 0, 0), 240, []),
    # ⚠ CE JOUEUR-CI N'EST PLUS PUBLIÉ : il a été remplacé en septembre par un
    # dessin au trait continu, `joueur-trait.png`, accordé aux verres et au
    # couvert. La recette reste ici parce qu'elle est longue à retrouver et que
    # rien ne dit qu'on n'y reviendra pas.
    #
    # LE JOUEUR PORTE DEUX INCRUSTATIONS DE PINTEREST, et elles sont posées SUR
    # ses pieds. On ne peut donc pas les couper : il faut les effacer.
    #
    #   « voile »  la pastille claire du bas à gauche est semi-transparente : le
    #              dessin est dessous, simplement éclairci. On lui rend sa
    #              densité — les deux nombres sont la droite qui ramène le fond
    #              voilé au fond réel, et le trait voilé au trait réel.
    #   « gomme »  on peint le papier par-dessus le texte.
    #   « encre »  même chose, mais seulement sur ce qui est VRAIMENT noir : à
    #              cette hauteur, le dessin passe derrière les lettres, et lui
    #              n'est jamais aussi sombre qu'elles.
    #   « copie »  la ligne de sol, effacée avec le texte, est reprise à droite
    #              où elle est intacte, et recollée en miroir. Le raccord tombe
    #              pile à la limite des deux zones.
    ("trait-joueur-2026-09a.png",   "joueur.png",   SAPIN, (0, 0, 0, 0), 460, [
        ("voile", 0, 1167, 280, 1246, 1.710, -0.708),
        ("gomme", 20, 1203, 262, 1246),
        ("encre", 20, 1186, 262, 1203, 125),
        ("gomme", 872, 1142, 1010, 1246),
        ("copie", 300, 1198, 560, 1240, 40),
    ]),
]

# Les dessins d'origine, tels qu'ils sont arrivés : ils restent dans le projet
# pour qu'on puisse toujours refaire le travail. Ce dossier N'EST PAS PUBLIÉ.
SOURCES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "dessins-source")


def retoucher(im, retouches):
    """Efface ce qui n'appartient pas au dessin, et rend au reste sa densité."""
    from PIL import Image

    px = im.load()
    for r in retouches:
        genre = r[0]

        if genre == "voile":
            _, x0, y0, x1, y1, a, b = r
            for y in range(y0, min(y1, im.height)):
                for x in range(x0, min(x1, im.width)):
                    # La pastille a des coins arrondis : le rectangle qu'on
                    # traite déborde donc sur du papier ordinaire, qu'il ne
                    # faut surtout pas assombrir. Tout ce qui est plus clair
                    # que le papier voilé EST du papier : on le remet à plat.
                    if px[x, y][0] >= 247 and px[x, y][2] >= 231:
                        px[x, y] = CREME_SOURCE
                        continue
                    canaux = []
                    for v in px[x, y]:
                        c = a * (v / 255.0) + b
                        canaux.append(max(0, min(255, round(c * 255))))
                    px[x, y] = tuple(canaux)

        elif genre == "gomme":
            _, x0, y0, x1, y1 = r
            for y in range(y0, min(y1, im.height)):
                for x in range(x0, min(x1, im.width)):
                    px[x, y] = CREME_SOURCE

        elif genre == "encre":
            _, x0, y0, x1, y1, seuil = r
            for y in range(y0, min(y1, im.height)):
                for x in range(x0, min(x1, im.width)):
                    if px[x, y][0] < seuil:
                        px[x, y] = CREME_SOURCE

        elif genre == "copie":
            _, x0, y0, x1, y1, vers = r
            bande = im.crop((x0, y0, x1, y1)).transpose(Image.FLIP_LEFT_RIGHT)
            im.paste(bande, (vers, y0))
            px = im.load()

    return im


def main() -> int:
    try:
        from PIL import Image
    except ImportError:
        print("Pillow est nécessaire :  python3 -m pip install Pillow")
        return 1

    for sortie, source, encre, rognage, largeur_finale, retouches in SOURCES:
        chemin = os.path.join(SOURCES_DIR, source)
        if not os.path.exists(chemin):
            print(f"  {sortie:32} source absente, ignoré")
            continue

        im = Image.open(chemin).convert("RGB")

        # 0 : les retouches, sur l'image d'origine et dans ses coordonnées.
        if retouches:
            im = retoucher(im, retouches)

        g, h, d, b = rognage
        im = im.crop((g, h, im.width - d, im.height - b))

        # 1 et 2 : le papier devient transparent, le trait devient l'encre.
        largeur, hauteur = im.size
        pixels = im.load()
        sortie_im = Image.new("RGBA", (largeur, hauteur), (0, 0, 0, 0))
        cible = sortie_im.load()
        for y in range(hauteur):
            for x in range(largeur):
                r, v, bl = pixels[x, y]
                clarte = (0.2126 * r + 0.7152 * v + 0.0722 * bl) / 255.0
                if clarte >= SEUIL:
                    continue
                # De SEUIL (rien) à 0 (plein) : la matière du trait, redressée
                # par la gamma pour que les demi-tons tiennent sur la crème.
                matiere = min(1.0, (SEUIL - clarte) / SEUIL) ** GAMMA
                alpha = int(round(255 * matiere))
                cible[x, y] = (encre[0], encre[1], encre[2], alpha)

        # 3 : au dessin, au pixel près.
        boite = sortie_im.getbbox()
        if boite:
            sortie_im = sortie_im.crop(boite)

        # 4 : à sa taille d'affichage, jamais plus.
        if sortie_im.width > largeur_finale:
            hauteur_finale = round(sortie_im.height * largeur_finale / sortie_im.width)
            sortie_im = sortie_im.resize((largeur_finale, hauteur_finale), Image.LANCZOS)

        # 5 : en huit bits au lieu de trente-deux.
        #
        # Un dessin monochrome n'a qu'UNE couleur et deux cent cinquante-six
        # transparences. Enregistré en couleurs vraies, chaque pixel pèse quatre
        # octets pour ne rien dire de plus. On le range donc dans une palette où
        # les 256 entrées portent la même encre, et où c'est la TRANSPARENCE de
        # chaque entrée qui change. Même image à l'œil, quatre fois plus légère.
        indices = sortie_im.getchannel("A").convert("P")
        indices.putpalette(list(encre) * 256)
        chemin_sortie = os.path.join(DOSSIER, sortie)
        indices.save(chemin_sortie, optimize=True, transparency=bytes(range(256)))
        poids = os.path.getsize(chemin_sortie) // 1024
        print(f"  {sortie:32} {sortie_im.width}×{sortie_im.height}   {poids} ko")

    return 0


if __name__ == "__main__":
    sys.exit(main())
