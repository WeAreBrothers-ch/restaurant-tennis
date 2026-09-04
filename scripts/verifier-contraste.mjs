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

/* Les couleurs, recopiées de `css/tokens.css`. */
const P = {
  creme: "#f4f1e9",
  sable: "#ece8de",
  sapin: "#12291f",
  champ: "#fffdf8",

  texte1: "#12291f",
  texte2: "#55655a",
  texte3: "#5e6b60",
  texte1Sombre: "#f4f1e9",
  texte2Sombre: "#bdc7bd",
  texte3Sombre: "#9aa79c",

  filetTenu: "#ddd7c8",
  filetTenuSable: "#d3cbb7",
  filetTenuSombre: "#2c473a",
  filetChamp: "#83877a",
  filetChampSombre: "#6e8378",

  terre300: "#e2a184",
  terre400: "#d98a66",
  terre500: "#c0603a",
  terre600: "#a44e2c",
  terre700: "#8a3f22",

  fougere400: "#7ea05c",
  fougere600: "#4a6a38",

  blanc: "#ffffff",
  etatOuvertClair: "#4a6a38",
  etatFermeClair: "#8a5910",
  etatOuvertSombre: "#7fb069",
  etatFermeSombre: "#dda94e",
};

const couples = [
  ["texte principal / crème", P.texte1, P.creme, 4.5],
  ["texte secondaire / crème", P.texte2, P.creme, 4.5],
  ["texte tertiaire / crème", P.texte3, P.creme, 4.5],
  ["texte principal / sable", P.texte1, P.sable, 4.5],
  ["texte secondaire / sable", P.texte2, P.sable, 4.5],
  ["texte tertiaire / sable", P.texte3, P.sable, 4.5],
  ["texte principal / sapin", P.texte1Sombre, P.sapin, 4.5],
  ["texte secondaire / sapin", P.texte2Sombre, P.sapin, 4.5],
  ["texte tertiaire / sapin", P.texte3Sombre, P.sapin, 4.5],
  ["texte saisi / champ", P.texte1, P.champ, 4.5],

  ["accent terre / crème", P.terre600, P.creme, 4.5],
  ["accent terre / sable", P.terre600, P.sable, 4.5],
  ["accent terre / sapin", P.terre400, P.sapin, 4.5],
  ["survol terre / sapin", P.terre300, P.sapin, 4.5],

  ["texte du bouton / terre 600", P.blanc, P.terre600, 4.5],
  ["texte du bouton / terre 700", P.blanc, P.terre700, 4.5],
  ["texte du bouton sapin / terre 400", P.sapin, P.terre400, 4.5],
  ["texte du bouton sapin / terre 300", P.sapin, P.terre300, 4.5],

  ["fougère / crème", P.fougere600, P.creme, 4.5],
  ["fougère / sapin", P.fougere400, P.sapin, 4.5],

  ["état ouvert / crème", P.etatOuvertClair, P.creme, 4.5],
  ["état fermé / crème", P.etatFermeClair, P.creme, 4.5],
  ["état ouvert / sapin", P.etatOuvertSombre, P.sapin, 4.5],
  ["état fermé / sapin", P.etatFermeSombre, P.sapin, 4.5],

  ["bordure de champ / crème (interface)", P.filetChamp, P.creme, 3.0],
  ["bordure de champ / sapin (interface)", P.filetChampSombre, P.sapin, 3.0],

  ["filet / crème (décor)", P.filetTenu, P.creme, 1.25],
  ["filet / sable (décor)", P.filetTenuSable, P.sable, 1.25],
  ["filet / sapin (décor)", P.filetTenuSombre, P.sapin, 1.25],
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
console.log(echecs === 0 ? "Tous les contrastes passent." : `${echecs} contraste(s) à corriger.`);
process.exit(echecs === 0 ? 0 : 1);
