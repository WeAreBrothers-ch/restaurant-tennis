#!/usr/bin/env python3
"""
============================================================================
 Fabrique le fond de plan `images/plan.jpg`.

     python3 scripts/fabriquer-plan.py

 Le plan d'accès de la page Contact ne charge RIEN tant que le visiteur n'a pas
 cliqué : ce qu'on voit d'abord est une simple image. Ce script la fabrique, en
 assemblant les tuiles d'OpenStreetMap autour du restaurant.

 Attribution : les données sont © les contributeurs OpenStreetMap, et le crédit
 est écrit sous le plan dans `contact.html`. Ne le retirez pas.

 Si l'adresse change, corrigez LATITUDE et LONGITUDE ci-dessous — ce sont les
 mêmes chiffres que dans la fiche `Restaurant` de `index.html` et dans le
 `data-carte` de `contact.html`.
============================================================================
"""

import io
import math
import os
import sys
import urllib.request

LATITUDE = 46.533237
LONGITUDE = 6.568724
ZOOM = 16              # ≈ 1,6 m par pixel : le quartier, pas la rue
LARGEUR, HAUTEUR = 1440, 800
TUILE = 256

NAVIGATEUR = "RestaurantDuTennis-site/1.0 (fabrication du fond de plan, usage unique)"
SORTIE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images", "plan.jpg")


def en_tuiles(lat: float, lon: float, zoom: float) -> tuple[float, float]:
    """Coordonnées en « tuiles », partie décimale comprise."""
    n = 2.0**zoom
    x = (lon + 180.0) / 360.0 * n
    rad = math.radians(lat)
    y = (1.0 - math.asinh(math.tan(rad)) / math.pi) / 2.0 * n
    return x, y


def main() -> int:
    try:
        from PIL import Image
    except ImportError:
        print("Pillow est nécessaire :  python3 -m pip install Pillow")
        return 1

    cx, cy = en_tuiles(LATITUDE, LONGITUDE, ZOOM)
    # Le coin haut-gauche de l'image, en pixels absolus de la carte du monde.
    px0 = cx * TUILE - LARGEUR / 2
    py0 = cy * TUILE - HAUTEUR / 2
    tx0, ty0 = int(px0 // TUILE), int(py0 // TUILE)
    tx1 = int((px0 + LARGEUR) // TUILE)
    ty1 = int((py0 + HAUTEUR) // TUILE)

    plan = Image.new("RGB", (LARGEUR, HAUTEUR), (238, 235, 227))
    manquantes = 0
    for tx in range(tx0, tx1 + 1):
        for ty in range(ty0, ty1 + 1):
            url = f"https://tile.openstreetmap.org/{ZOOM}/{tx}/{ty}.png"
            try:
                requete = urllib.request.Request(url, headers={"User-Agent": NAVIGATEUR})
                brut = urllib.request.urlopen(requete, timeout=30).read()
                tuile = Image.open(io.BytesIO(brut)).convert("RGB")
            except Exception:
                manquantes += 1
                continue
            plan.paste(tuile, (int(tx * TUILE - px0), int(ty * TUILE - py0)))

    if manquantes:
        print(f"{manquantes} tuile(s) manquante(s) — relancez le script.")

    plan.save(SORTIE, quality=86, optimize=True, progressive=True)
    print(f"images/plan.jpg écrit — {LARGEUR}×{HAUTEUR}, zoom {ZOOM}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
