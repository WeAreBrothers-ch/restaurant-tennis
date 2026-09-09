/* ============================================================================
   L'ESSAI DU RUBAN

       node scripts/essai-ruban.mjs

   Il fait tourner `js/galerie.js` — le vrai fichier, pas une copie — sur un
   faux navigateur, et vérifie les neuf comportements qu'on demande au ruban.

   POURQUOI CE FICHIER EXISTE. Le ruban s'est cassé deux fois, et la seconde
   fois sans que rien ne le signale : il avançait de trois pixels par seconde au
   lieu de cinquante-cinq, ce qui, à l'œil, ressemble à un ruban arrêté. La
   cause était un détail d'ordonnancement — un garde qui croyait que l'événement
   `scroll` était émis pendant l'écriture de `scrollLeft`, alors qu'il l'est
   plus tard, à la mise à jour de l'affichage.

   Ce genre de défaut ne se voit pas en lisant le code, et pas non plus en
   ouvrant la page : il faut compter les pixels. D'où cet essai.

   LE FAUX NAVIGATEUR EST VOLONTAIREMENT LE PIRE POSSIBLE :

     — il ARRONDIT `scrollLeft` à l'entier, ce que font certains navigateurs.
       Un ruban qui accumulerait ses neuf dixièmes de pixel directement dans
       `scrollLeft` n'avancerait jamais chez eux ;
     — il émet `scroll` de façon ASYNCHRONE, à l'image suivante, comme un vrai.
       C'est ce qui met en défaut tout garde posé autour d'une écriture.
   ============================================================================ */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const RACINE = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");

const LARGEUR_PISTE = 5292; // deux séries, joint de fin compris
const DEMI = LARGEUR_PISTE / 2;
const IMAGE = 1000 / 60;

/* ── LE FAUX NAVIGATEUR ───────────────────────────────────────────────────── */

let horloge = 0;
let prochaine = null;
const minuteries = [];

const boite = {
  dataset: {},
  scrollWidth: LARGEUR_PISTE,
  clientWidth: 1440,
  ecouteurs: {},
  scrollEnAttente: false,
  _brut: 0,
  get scrollLeft() {
    return this._brut;
  },
  set scrollLeft(v) {
    const avant = this._brut;
    this._brut = Math.round(v);
    if (this._brut !== avant) this.scrollEnAttente = true;
  },
  /** Ce que fait un doigt, une molette ou une inertie : écrire sans passer par nous. */
  pousserDeLExterieur(v) {
    this._brut = Math.round(v);
    this.scrollEnAttente = true;
  },
  addEventListener(nom, fn) {
    (this.ecouteurs[nom] ||= []).push(fn);
  },
  setPointerCapture() {},
};

const piste = {
  querySelector: (s) => (s === ".ruban-defile" ? boite : null),
  addEventListener() {},
};

const contexte = {
  document: { querySelector: (s) => (s === ".ruban-piste" ? piste : null) },
  window: { matchMedia: () => ({ matches: false }) },
  requestAnimationFrame: (fn) => ((prochaine = fn), 1),
  cancelAnimationFrame: () => (prochaine = null),
  setTimeout: (fn, ms) => minuteries.push({ quand: horloge + ms, fn }),
  clearTimeout: (id) => {
    if (minuteries[id - 1]) minuteries[id - 1].annulee = true;
  },
  IntersectionObserver: function (rappel) {
    this.observe = () => rappel([{ isIntersecting: true }]);
  },
  Math,
};
contexte.globalThis = contexte;

vm.createContext(contexte);
vm.runInContext(fs.readFileSync(path.join(RACINE, "js/galerie.js"), "utf8"), contexte);

/** Avance de `n` images de rendu. */
function images(n) {
  for (let i = 0; i < n; i++) {
    horloge += IMAGE;
    // `scroll` est émis À LA MISE À JOUR DE L'AFFICHAGE, donc APRÈS l'écriture
    // qui l'a provoqué — jamais pendant. C'est toute la différence.
    if (boite.scrollEnAttente) {
      boite.scrollEnAttente = false;
      for (const fn of boite.ecouteurs.scroll || []) fn({});
    }
    for (const m of minuteries) {
      if (!m.annulee && !m.faite && horloge >= m.quand) {
        m.faite = true;
        m.fn();
      }
    }
    const fn = prochaine;
    prochaine = null;
    if (fn) fn(horloge);
  }
}

/* ── LES ESSAIS ───────────────────────────────────────────────────────────── */

const essais = [];
const verifier = (nom, obtenu, attendu, marge = 0) =>
  essais.push({
    nom,
    obtenu,
    attendu,
    ok:
      typeof attendu === "number"
        ? Math.abs(obtenu - attendu) <= marge
        : obtenu === attendu,
  });

// 1. Il avance, et à la bonne vitesse.
images(1); // la première image ne fait qu'amorcer l'horloge
let repere = boite.scrollLeft;
images(60);
verifier("il avance de 55 px en une seconde", boite.scrollLeft - repere, 55, 2);

// 2. Il ne se tait pas tout seul — le défaut de septembre.
repere = boite.scrollLeft;
images(300);
verifier("il avance encore après cinq secondes", boite.scrollLeft - repere, 275, 6);

// 3. La boucle se referme, et au bon endroit.
boite.pousserDeLExterieur(DEMI - 20);
images(32); // il constate le geste, puis attend la fin du retrait
repere = boite.scrollLeft;
images(60);
verifier("il repasse au début après la moitié", boite.scrollLeft < repere, true);
verifier("et il y atterrit au bon pixel", boite.scrollLeft, 35, 4);

// 4. Il rend la main quand on pousse, et la reprend.
boite.pousserDeLExterieur(1000);
images(2);
verifier("il ne bouge pas juste après un geste", boite.scrollLeft, 1000, 0);
images(10);
verifier("il se tait encore à 200 ms", boite.scrollLeft, 1000, 0);
images(45);
repere = boite.scrollLeft;
images(60);
verifier("il repart après le retrait", boite.scrollLeft - repere, 55, 3);

// 5. Il se tait tant qu'on le tient à la souris.
boite.dataset.saisi = "true";
repere = boite.scrollLeft;
images(120);
verifier("il ne bouge pas pendant qu'on le tient", boite.scrollLeft, repere, 0);
delete boite.dataset.saisi;
images(60);
verifier("il repart quand on lâche", boite.scrollLeft - repere, 55, 3);

/* ── LE RAPPORT ───────────────────────────────────────────────────────────── */

let echecs = 0;
console.log("état   comportement                                    obtenu   attendu");
console.log("──────────────────────────────────────────────────────────────────────");
for (const e of essais) {
  if (!e.ok) echecs++;
  console.log(
    `${e.ok ? "OK   " : "ÉCHEC"}  ${e.nom.padEnd(44)} ${String(e.obtenu).padStart(7)}   ${e.attendu}`
  );
}
console.log("──────────────────────────────────────────────────────────────────────");
console.log(
  echecs === 0
    ? `Les ${essais.length} comportements sont bons.`
    : `${echecs} comportement(s) cassé(s).`
);
process.exit(echecs ? 1 : 0);
