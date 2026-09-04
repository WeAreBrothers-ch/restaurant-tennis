/* ============================================================================
   LES APPARITIONS AU DÉFILEMENT

   Ce fichier est le seul chargé sans `defer`, dans l'en-tête du document : il
   doit poser l'attribut `data-js` sur la page AVANT le premier affichage. Sinon
   les blocs à révéler apparaîtraient une première fois en clair, puis
   sauteraient à leur position de départ — un clignotement à chaque chargement.

   Sans JavaScript, sans IntersectionObserver, ou si le système demande un
   mouvement réduit, `data-js` n'est jamais posé et tout s'affiche normalement.
   Le site n'a jamais besoin de ce fichier pour être lisible.
   ============================================================================ */
(function () {
  "use strict";

  var racine = document.documentElement;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
  } catch (e) {
    return;
  }

  racine.setAttribute("data-js", "on");

  var demarrer = function () {
    try {
      var observateur = new IntersectionObserver(
        function (entrees) {
          for (var i = 0; i < entrees.length; i++) {
            var entree = entrees[i];
            // Un bloc déjà dépassé vers le haut est révélé sans attendre :
            // il ne doit pas rester caché si l'on arrive au milieu de la page.
            if (!entree.isIntersecting && entree.boundingClientRect.top > 0) continue;
            entree.target.setAttribute("data-vu", "1");
            observateur.unobserve(entree.target);
          }
        },
        { threshold: 0, rootMargin: "0px 0px -8% 0px" },
      );

      var brancher = function (noeud) {
        if (noeud.nodeType !== 1) return;
        if (noeud.hasAttribute("data-reveal") && !noeud.hasAttribute("data-vu")) {
          observateur.observe(noeud);
        }
        var enfants = noeud.querySelectorAll("[data-reveal]:not([data-vu])");
        for (var i = 0; i < enfants.length; i++) observateur.observe(enfants[i]);
      };

      brancher(document.body);

      // Les blocs ajoutés après coup sont branchés à leur tour.
      new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var ajoutes = mutations[i].addedNodes;
          for (var j = 0; j < ajoutes.length; j++) brancher(ajoutes[j]);
        }
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) {
      // En cas de pépin, on retire `data-js` : tout redevient visible.
      racine.removeAttribute("data-js");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
