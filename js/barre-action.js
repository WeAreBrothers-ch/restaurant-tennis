/* ============================================================================
   LA BARRE D'APPEL DU TÉLÉPHONE

   Elle monte une fois le premier écran passé. Plus haut, elle ne ferait que
   recouvrir l'enseigne.

   Tant qu'elle est cachée, ses liens sortent de l'ordre de tabulation — une
   barre invisible ne doit pas être atteignable au clavier.

   Son placement, lui, n'est pas de notre ressort : `bottom: 0` suffit, les
   navigateurs recalant d'eux-mêmes leurs éléments fixes quand leur barre
   d'outils se replie ou revient. Une correction de notre part s'ajouterait à la
   leur, et c'est un vide sous la barre qu'on verrait passer.
   ============================================================================ */
(function () {
  "use strict";

  var barre = document.querySelector(".barreaction-barre");
  if (!barre) return;

  /* --------------------------------------------------------------------------
     MONTRER, CACHER
     -------------------------------------------------------------------------- */
  var SEUIL = 480;
  var actions = Array.prototype.slice.call(barre.querySelectorAll("a"));
  var dernierEtat = null;

  var appliquer = function () {
    var visible = window.scrollY > SEUIL;
    if (visible === dernierEtat) return;
    dernierEtat = visible;

    barre.setAttribute("data-visible", String(visible));
    barre.setAttribute("aria-hidden", String(!visible));
    actions.forEach(function (action) {
      action.setAttribute("tabindex", visible ? "0" : "-1");
    });
  };

  appliquer();
  window.addEventListener("scroll", appliquer, { passive: true });

  /* --------------------------------------------------------------------------
     LE CLAVIER

     La seule chose que le navigateur ne fait pas à notre place. Quand le
     clavier s'ouvre — sur le formulaire de contact —, il prend le bas de
     l'écran, et la barre viendrait se percher dessus. Elle s'efface donc le
     temps de la saisie.

     Une barre d'outils qui se replie reprend un dixième de la hauteur ; le
     clavier, près de la moitié. Le quart sépare les deux sans hésitation.
     -------------------------------------------------------------------------- */
  var vue = window.visualViewport;
  if (!vue) return;

  var PART_CLAVIER = 0.25;
  var saisiePosee = null;
  var demande = false;

  var regarder = function () {
    demande = false;

    var hauteurPage = document.documentElement.clientHeight;
    if (!hauteurPage) return;

    var manquant = hauteurPage - (vue.height + vue.offsetTop);
    var saisie = manquant > hauteurPage * PART_CLAVIER;

    if (saisie === saisiePosee) return;
    saisiePosee = saisie;
    barre.setAttribute("data-saisie", String(saisie));
  };

  var demander = function () {
    if (demande) return;
    demande = true;
    window.requestAnimationFrame(regarder);
  };

  vue.addEventListener("resize", demander);
  window.addEventListener("orientationchange", demander);

  regarder();
})();
