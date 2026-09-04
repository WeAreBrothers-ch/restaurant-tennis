#!/usr/bin/env python3
"""
============================================================================
 Réinstalle les quatre fichiers de polices dans `fonts/`.

 Ils sont normalement DÉJÀ LÀ : ce script ne sert qu'à les retrouver s'ils ont
 été perdus, ou à les remettre à jour.

     python3 scripts/telecharger-polices.py

 Les trois polices sont sous licence SIL Open Font : libres d'usage, y compris
 commercial, y compris hébergées avec le site — ce qui est le but. Aucune
 requête ne part vers Google quand quelqu'un ouvre la page.

 Newsreader est prise chez Google Fonts et non chez Fontsource, pour une seule
 raison : c'est la seule source qui livre le fichier avec SES DEUX AXES, la
 graisse ET l'échelle optique. Sans l'axe optique, les titres du site perdent
 le contraste qui fait tout leur intérêt en grand (voir `css/base.css`).
============================================================================
"""

import os
import re
import sys
import urllib.request

NAVIGATEUR = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)

GOOGLE_NEWSREADER = (
    "https://fonts.googleapis.com/css2?family=Newsreader:"
    "ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
)

FONTSOURCE = {
    "instrument-sans.woff2": (
        "https://cdn.jsdelivr.net/fontsource/fonts/instrument-sans:vf@latest/"
        "latin-wght-normal.woff2"
    ),
    "dm-mono.woff2": (
        "https://cdn.jsdelivr.net/fontsource/fonts/dm-mono@latest/latin-400-normal.woff2"
    ),
}

DOSSIER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "fonts")


def recuperer(url: str) -> bytes:
    requete = urllib.request.Request(url, headers={"User-Agent": NAVIGATEUR})
    return urllib.request.urlopen(requete, timeout=30).read()


def bloc_latin(css: str, style: str) -> str:
    """L'adresse du seul sous-ensemble « latin » du style demandé.

    Google en livre trois — vietnamien, latin étendu, latin. Le site est en
    français : on n'embarque que le dernier, et on écarte les deux autres à
    leurs plages de caractères."""
    for bloc in css.split("@font-face"):
        if f"font-style: {style};" in bloc and "U+0000-00FF" in bloc and "U+0102-0103" not in bloc:
            trouve = re.search(r"url\((https://[^)]+\.woff2)\)", bloc)
            if trouve:
                return trouve.group(1)
    raise RuntimeError(f"Google n'a pas livré de sous-ensemble latin pour le style « {style} ».")


def ecrire(nom: str, contenu: bytes) -> None:
    chemin = os.path.join(DOSSIER, nom)
    with open(chemin, "wb") as fichier:
        fichier.write(contenu)
    print(f"  {nom:<28} {len(contenu) // 1024} ko")


def main() -> int:
    os.makedirs(DOSSIER, exist_ok=True)
    print("Téléchargement des polices dans fonts/ …")
    echecs = 0

    try:
        css = recuperer(GOOGLE_NEWSREADER).decode("utf-8")
        ecrire("newsreader.woff2", recuperer(bloc_latin(css, "normal")))
        ecrire("newsreader-italique.woff2", recuperer(bloc_latin(css, "italic")))
    except Exception as erreur:  # réseau coupé, format changé, adresse morte
        print(f"  newsreader                   ÉCHEC — {erreur}")
        echecs += 1

    for nom, url in FONTSOURCE.items():
        try:
            ecrire(nom, recuperer(url))
        except Exception as erreur:
            print(f"  {nom:<28} ÉCHEC — {erreur}")
            echecs += 1

    if echecs:
        print(f"\n{echecs} police(s) manquante(s). Le site s'affiche dans les polices de")
        print("secours en attendant : rien n'est cassé, c'est simplement moins juste.")
        return 1

    print("\nTerminé. Rafraîchissez la page : le site prend les polices tout seul.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
