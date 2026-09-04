/* ============================================================================
   L'EN-TÊTE

   Un seul attribut, `data-compact`, que la feuille de style interprète : dès
   qu'on a commencé à descendre, la barre resserre sa hauteur et l'enseigne
   qu'elle porte rapetisse d'un cran. La barre est crème pleine partout, sur
   toutes les pages : elle n'a rien à faire apparaître au passage.

   Le seuil est bas exprès : dès qu'on a commencé à lire, la barre doit rendre
   à la page la hauteur qu'elle lui prend.
   ============================================================================ */
(function () {
  "use strict";

  var entete = document.querySelector(".header-entete");
  if (!entete) return;

  var SEUIL = 40;
  var dernierEtat = null;

  var appliquer = function () {
    var compact = window.scrollY > SEUIL;
    // On n'écrit dans le DOM que si l'état a vraiment changé : sinon c'est une
    // écriture par image à l'écran, pour rien.
    if (compact === dernierEtat) return;
    dernierEtat = compact;
    entete.setAttribute("data-compact", String(compact));
  };

  appliquer();
  window.addEventListener("scroll", appliquer, { passive: true });
})();
