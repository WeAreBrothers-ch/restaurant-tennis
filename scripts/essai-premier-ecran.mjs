/* ============================================================================
   Vérification du premier écran — les huit dessins autour de l'enseigne.

   À lancer après toute retouche des positions, des tailles ou des seuils du
   premier écran, dans `css/accueil.css` :

       node scripts/essai-premier-ecran.mjs

   Il existe parce que la composition a été refaite trois fois sur la même
   plainte : « il ne faut pas que les dessins se chevauchent ». Le défaut ne se
   voit pas en ouvrant la page à une seule taille — il apparaît à une largeur
   précise, entre deux seuils, là où l'enseigne est proportionnellement la plus
   grande. Il faut donc mesurer, et mesurer partout.

   Le programme ouvre l'accueil à cinquante tailles d'écran, du petit téléphone
   au 4K, portrait et paysage, et vérifie trois choses :

     1. AUCUN DESSIN N'EN RECOUVRE UN AUTRE, ni ne recouvre l'enseigne. La
        comparaison porte sur les boîtes, marge de six pixels comprise.
     2. AUCUN DESSIN N'EST COUPÉ par un bord de la section, au repos.
     3. LA PAGE NE DÉBORDE PAS horizontalement.

   Il demande un navigateur : `PLAYWRIGHT` doit être installé, et un serveur
   local doit servir le site — par exemple `python3 -m http.server 8765`.
   ============================================================================ */

const ADRESSE = process.env.ADRESSE || "http://127.0.0.1:8765/index.html";
const MARGE = 6; // ce qu'on exige entre deux boîtes, en pixels

const TAILLES = [];
for (const l of [320, 360, 375, 390, 414, 430, 480, 540, 600, 700, 768, 820, 900, 1024, 1100, 1180, 1280, 1366, 1440, 1600, 1800, 1920, 2560]) {
  for (const h of [568, 640, 740, 844, 932, 1024, 1180]) TAILLES.push([l, h]);
}
// et les fenêtres couchées, où la place libre change de côté
for (const [l, h] of [[667, 375], [740, 360], [844, 390], [896, 414], [1024, 600], [1280, 620], [1440, 690], [1920, 640]]) TAILLES.push([l, h]);

const RELEVE = (MARGE) => {
  const nom = (e) => e.className.replace("premier-piece premier-piece--", "");
  const section = document.querySelector(".premier").getBoundingClientRect();
  const pieces = [...document.querySelectorAll(".premier-piece")]
    .filter((e) => getComputedStyle(e).display !== "none")
    .map((e) => ({ n: nom(e), r: e.getBoundingClientRect() }));
  const boites = [...pieces, { n: "l’enseigne", r: document.querySelector(".premier-titre").getBoundingClientRect() }];

  const recouvrements = [];
  for (let i = 0; i < boites.length; i++) {
    for (let j = i + 1; j < boites.length; j++) {
      const a = boites[i].r;
      const b = boites[j].r;
      const x = Math.min(a.right, b.right) - Math.max(a.left, b.left) + 2 * MARGE;
      const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) + 2 * MARGE;
      if (x > 0 && y > 0) recouvrements.push(`${boites[i].n} × ${boites[j].n}`);
    }
  }

  const coupes = pieces
    .filter(({ r }) =>
      r.top < section.top - 0.6 ||
      r.bottom > section.bottom + 0.6 ||
      r.left < section.left - 0.6 ||
      r.right > section.right + 0.6)
    .map(({ n }) => n);

  return {
    recouvrements,
    coupes,
    debordement: document.documentElement.scrollWidth - window.innerWidth,
    dessins: pieces.length,
  };
};

/* Playwright peut être installé dans le projet ou à côté de Node : on essaie les
   deux plutôt que d'imposer un `npm install` pour un seul essai. */
const chargerPlaywright = async () => {
  for (const chemin of ["playwright", "playwright-core", "/opt/node22/lib/node_modules/playwright/index.mjs"]) {
    try {
      return await import(chemin);
    } catch (e) {
      /* on passe au suivant */
    }
  }
  console.error(
    "Playwright est introuvable. Installez-le une fois :\n\n    npm install -D playwright && npx playwright install chromium\n",
  );
  process.exit(2);
};

const { chromium } = await chargerPlaywright();
const navigateur = await chromium.launch();
let fautes = 0;

console.log("\n taille        dessins  état");
console.log("──────────────────────────────────────────────────────────────");

for (const [largeur, hauteur] of TAILLES) {
  const contexte = await navigateur.newContext({ viewport: { width: largeur, height: hauteur } });
  const page = await contexte.newPage();
  await page.goto(ADRESSE, { waitUntil: "networkidle" });
  // L'arrivée est une animation : on la neutralise pour mesurer la position de repos.
  await page.addStyleTag({ content: ".premier-piece { animation: none !important; }" });
  await page.waitForTimeout(60);

  const r = await page.evaluate(RELEVE, MARGE);
  const ennuis = [];
  if (r.recouvrements.length) ennuis.push("SE CHEVAUCHENT : " + r.recouvrements.join(", "));
  if (r.coupes.length) ennuis.push("COUPÉS : " + r.coupes.join(", "));
  if (r.debordement > 0) ennuis.push(`LA PAGE DÉBORDE DE ${r.debordement} px`);
  if (ennuis.length) fautes++;

  console.log(
    ` ${String(largeur).padStart(4)} × ${String(hauteur).padEnd(5)}   ${String(r.dessins).padStart(2)}     ` +
    (ennuis.length ? ennuis.join(" | ") : "OK"),
  );
  await contexte.close();
}

console.log("──────────────────────────────────────────────────────────────");
console.log(
  fautes === 0
    ? `Les ${TAILLES.length} tailles d'écran sont bonnes : rien ne se chevauche, rien n'est coupé.`
    : `${fautes} taille(s) d'écran en faute sur ${TAILLES.length}.`,
);

await navigateur.close();
process.exit(fautes === 0 ? 0 : 1);
