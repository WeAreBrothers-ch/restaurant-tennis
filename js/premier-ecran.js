/* ============================================================================
   LE MOUVEMENT DU PREMIER ÉCRAN

   La feuille de style tire la chute et la vrille des huit dessins d'un seul
   chiffre, l'avancée du premier défilement, de 0 à 1. Ce fichier ne fait que
   lui donner cette avancée, de l'une de deux façons.

   1. LÀ OÙ LE NAVIGATEUR SAIT LIER UNE ANIMATION AU DÉFILEMENT (Chrome, Edge,
      Safari 26) : il mesure la course — la hauteur du premier écran —, l'écrit
      dans `--course`, pose `data-defilement="css"`, et s'arrête là. Pas un
      écouteur de défilement : le mouvement est joué par le compositeur, dans la
      même image que le défilement, même quand la page est occupée ailleurs.
      C'est ce qui le rend parfaitement fluide.

   2. AILLEURS : il écrit `--p` à chaque image de rendu où l'on a défilé. Sans
      arrondi — l'arrondi au centième faisait avancer les dessins par sauts de
      deux à trois pixels, et c'était cela, la saccade.

   Si le système demande un mouvement réduit, ce fichier ne fait rien du tout :
   les dessins restent où ils sont posés.
   ============================================================================ */
(function () {
  "use strict";

  var premier = document.querySelector(".premier");
  if (!premier) return;

  var parCss = false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    parCss = !!(window.CSS && CSS.supports("animation-timeline: scroll()"));
  } catch (e) {
    return;
  }

  var course = 1;
  var courseEcrite = 0;

  // La course est la hauteur de l'écran : le mouvement est terminé quand le
  // premier écran est entièrement passé. Elle est relevée à chaque changement
  // de taille — sur téléphone, la barre d'adresse qui se replie en change.
  var mesurer = function () {
    course = Math.max(1, premier.offsetHeight);
    if (course === courseEcrite) return;
    courseEcrite = course;
    premier.style.setProperty("--course", course + "px");
  };

  if (parCss) {
    try {
      mesurer();
      premier.setAttribute("data-defilement", "css");
      window.addEventListener("resize", mesurer);
      return;
    } catch (e) {
      premier.removeAttribute("data-defilement");
    }
  }

  var dernier = -1;
  var enAttente = false;

  var ecrire = function () {
    enAttente = false;
    var p = window.scrollY / course;
    if (p < 0) p = 0;
    if (p > 1) p = 1;

    // Quatre décimales : un dix-millième de chute, c'est moins d'un dixième de
    // pixel. Et si la valeur n'a pas changé — passé le premier écran, elle
    // reste à 1 —, on ne touche pas au style.
    var arrondi = Math.round(p * 10000) / 10000;
    if (arrondi === dernier) return;
    dernier = arrondi;
    premier.style.setProperty("--p", String(arrondi));
  };

  var auDefilement = function () {
    if (enAttente) return;
    enAttente = true;
    window.requestAnimationFrame(ecrire);
  };

  try {
    mesurer();
    ecrire();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", function () {
      mesurer();
      dernier = -1;
      auDefilement();
    });
  } catch (e) {
    // En cas de pépin, on efface le chiffre : tout revient à sa position de
    // repos, et le premier écran reste parfaitement lisible.
    premier.style.removeProperty("--p");
  }
})();
