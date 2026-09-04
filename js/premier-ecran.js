/* ============================================================================
   LE MOUVEMENT DU PREMIER ÉCRAN

   Ce fichier ne déplace rien. Il écrit UN SEUL CHIFFRE — `--p`, l'avancée du
   premier défilement, de 0 à 1 — et la feuille de style en tire la chute et la
   vrille de chacun des neuf dessins. Une écriture par image de rendu, pas neuf :
   c'est ce qui permet au navigateur de tout composer sur la carte graphique.

   Passé le premier écran, le chiffre reste à 1 et plus rien n'est écrit : on ne
   fait pas travailler la page pendant les huit mille pixels qui suivent.

   Si le système demande un mouvement réduit, ce fichier ne fait rien du tout :
   les dessins restent où ils sont posés.
   ============================================================================ */
(function () {
  "use strict";

  var premier = document.querySelector(".premier");
  if (!premier) return;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch (e) {
    return;
  }

  var course = 1;
  var dernier = -1;
  var enAttente = false;

  // La course est la hauteur de l'écran : le mouvement est terminé quand le
  // premier écran est entièrement passé. Elle est relevée à chaque changement
  // de taille — sur téléphone, la barre d'adresse qui se replie en change.
  var mesurer = function () {
    course = Math.max(1, premier.offsetHeight);
  };

  var ecrire = function () {
    enAttente = false;
    var p = window.scrollY / course;
    if (p < 0) p = 0;
    if (p > 1) p = 1;

    // Deux décimales suffisent : au-delà, on réécrit une valeur que personne ne
    // voit. Et si elle n'a pas changé, on ne touche pas au style — c'est ce qui
    // évite de relancer le calcul de la page pour rien.
    var arrondi = Math.round(p * 100) / 100;
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
