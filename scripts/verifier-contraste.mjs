/* ============================================================================
   Vérification des contrastes du site — palette crème, sapin et terre battue.

   À lancer après toute retouche des couleurs dans `css/tokens.css` :

       node scripts/verifier-contraste.mjs

   Il compare chaque couple texte / fond réellement employé sur le site au
   seuil de la norme WCAG 2.1 niveau AA : 4,5 pour du texte courant, 3 pour un
   élément d'interface (bordure de champ, icône), 1,25 pour un simple filet.
   ============================================================================ */

const canal = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
};

const ratio = (a, b) => {
  const [clair, sombre] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (clair + 0.05) / (sombre + 0.05);
};

/* Les couleurs, recopiées de `css/tokens.css`.

   ⚠ C'EST UNE COPIE, ET C'EST LE DÉFAUT DE CE FICHIER : si une valeur change
   dans la feuille de style sans changer ici, le vérificateur dit « tout passe »
   sur une palette qui n'est plus celle du site. C'est exactement ce qui s'est
   produit en septembre. Toute retouche de `tokens.css` se répercute ici, dans
   le même geste. */
const P = {
  creme: "#f4f1e9",
  sable: "#ece8de",
  champ: "#fffdf8",

  /* L'olive du logo, et sa déclinaison. */
  olive200: "#dde2ce",
  olive300: "#ccd5b8",
  olive400: "#a3af8c",
  olive600: "#4a5d3a",
  olive700: "#3c4c2e",
  olive800: "#2f3e23",

  /* La balle. Elle ne se pose que sur l'olive : les couples qui la mettent sur
     du clair sont écrits plus bas EXPRÈS, pour qu'on voie qu'ils échouent. */
  balle500: "#d8e04a",
  balle600: "#c3ce3f",

  terre050: "#ebd3bb",
  terre300: "#e2a184",
  terre400: "#d98a66",
  terre600: "#a44e2c",
  terre700: "#8a3f22",

  texte1: "#1e2a16",
  texte2: "#33463a",
  texte3: "#526156",
  texte1Sombre: "#f4f1e9",

  filetTenu: "#d8d1bf",
  filetTenuTerre: "#d9b99b",
  filetTenuOlive: "#3c4c2e",
  filetTenuSombre: "#3f5030",
  filetChamp: "#767e68",
  filetChampSombre: "#748a7e",

  etatFermeClair: "#8a5910",
  etatOuvertSombre: "#7fb069",
  etatFermeSombre: "#dda94e",
};

const couples = [
  /* --- LA CRÈME, la surface de lecture ---------------------------------- */
  ["texte principal / crème", P.texte1, P.creme, 4.5],
  ["texte secondaire / crème", P.texte2, P.creme, 4.5],
  ["texte tertiaire / crème", P.texte3, P.creme, 4.5],
  ["texte saisi / champ", P.texte1, P.champ, 4.5],
  ["accent terre / crème", P.terre600, P.creme, 4.5],
  ["état ouvert (olive) / crème", P.olive600, P.creme, 4.5],
  ["état fermé / crème", P.etatFermeClair, P.creme, 4.5],
  ["texte du bouton / terre 600", P.creme, P.terre600, 4.5],
  ["texte du bouton / terre 700", P.creme, P.terre700, 4.5],
  ["bordure de champ / crème (interface)", P.filetChamp, P.creme, 3.0],
  ["filet / crème (décor)", P.filetTenu, P.creme, 1.25],

  /* --- L'OLIVE DU LOGO, qui ne porte que deux encres --------------------- */
  ["texte principal / olive", P.texte1Sombre, P.olive600, 4.5],
  ["texte secondaire / olive", P.olive200, P.olive600, 4.5],
  ["texte tertiaire / olive", P.olive300, P.olive600, 4.5],
  ["accent balle / olive", P.balle500, P.olive600, 4.5],
  ["texte du bouton balle / balle 500", P.texte1, P.balle500, 4.5],
  ["texte du bouton balle / balle 600", P.texte1, P.balle600, 4.5],
  ["bordure de champ / olive (interface)", P.olive400, P.olive600, 3.0],
  ["filet / olive (décor)", P.filetTenuOlive, P.olive600, 1.25],

  /* --- LA TERRE BATTUE CLAIRE, la bande pratique ------------------------- */
  ["texte principal / terre claire", P.texte1, P.terre050, 4.5],
  ["texte secondaire / terre claire", P.texte2, P.terre050, 4.5],
  ["texte tertiaire / terre claire", P.texte3, P.terre050, 4.5],
  /* `--terre-600` n'y donne que 3,93 : c'est `--terre-700` qui sert d'accent,
     et c'est la seule surface où l'accent n'est pas le même que sur la crème. */
  ["accent terre 700 / terre claire", P.terre700, P.terre050, 4.5],
  ["filet / terre claire (décor)", P.filetTenuTerre, P.terre050, 1.25],

  /* --- L'OLIVE FONCÉ, la fermeture --------------------------------------- */
  ["texte principal / sapin", P.texte1Sombre, P.olive800, 4.5],
  ["texte secondaire / sapin", P.olive300, P.olive800, 4.5],
  ["texte tertiaire / sapin", P.olive400, P.olive800, 4.5],
  ["accent terre 300 / sapin", P.terre300, P.olive800, 4.5],
  ["texte du bouton balle / balle (pied)", P.texte1, P.balle500, 4.5],
  ["état ouvert / sapin", P.etatOuvertSombre, P.olive800, 4.5],
  ["état fermé / sapin", P.etatFermeSombre, P.olive800, 4.5],
  ["bordure de champ / sapin (interface)", P.filetChampSombre, P.olive800, 3.0],
  ["filet / sapin (décor)", P.filetTenuSombre, P.olive800, 1.25],

  /* --- LE FOND D'ATTENTE DES PHOTOGRAPHIES ------------------------------- */
  /* `--sable` n'est plus une surface : il ne lui reste que ce rôle-là, et
     aucun texte ne s'y pose. On vérifie seulement qu'il se distingue de la
     crème sans la trouer. */
  ["fond d'attente / crème (décor)", P.sable, P.creme, 1.02],
];

/* LES INTERDITS. Ces couples DOIVENT échouer : ils sont ici pour que la règle
   « la balle ne se pose jamais sur du clair » soit vérifiée par la machine et
   pas seulement écrite dans un commentaire. Si l'un d'eux se met à passer,
   c'est qu'une valeur a dérivé et que la règle ne veut plus rien dire. */
const interdits = [
  ["la balle sur la crème", P.balle500, P.creme],
  ["la balle sur la terre claire", P.balle500, P.terre050],
  ["la terre battue sur l'olive", P.terre600, P.olive600],
];

let echecs = 0;
console.log("contraste  seuil  état   couple");
console.log("──────────────────────────────────────────────────────────────");
for (const [nom, avant, fond, seuil] of couples) {
  const r = ratio(avant, fond);
  const ok = r >= seuil;
  if (!ok) echecs++;
  console.log(
    `${r.toFixed(2).padStart(8)}  ${seuil.toFixed(1).padStart(5)}  ${ok ? "OK  " : "ÉCHEC"}  ${nom}`
  );
}
console.log("──────────────────────────────────────────────────────────────");

/* LES INTERDITS. On vérifie qu'ils échouent TOUJOURS. Un interdit qui se met à
   passer n'est pas une bonne nouvelle : c'est qu'une valeur a dérivé au point
   que la règle écrite dans `tokens.css` ne veut plus rien dire, et que
   quelqu'un finira par poser du jaune sur de la crème en toute confiance. */
let derives = 0;
for (const [nom, avant, fond] of interdits) {
  const r = ratio(avant, fond);
  if (r >= 4.5) {
    derives++;
    console.log(`  ⚠ « ${nom} » passe à ${r.toFixed(2)} — la règle a dérivé, relire tokens.css`);
  }
}
if (derives === 0) {
  console.log(`${interdits.length} interdits vérifiés : aucun ne passe, la règle tient.`);
}

console.log(echecs === 0 ? "Tous les contrastes passent." : `${echecs} contraste(s) à corriger.`);
process.exit(echecs === 0 && derives === 0 ? 0 : 1);
