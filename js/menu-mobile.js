/* ============================================================================
   LE MENU DU TÉLÉPHONE

   Il s'appuie sur <dialog> : le piégeage du focus, la touche Échap et le rôle
   de dialogue sont assurés par le navigateur, pas par nous. C'est moins de code
   et un comportement plus juste que n'importe quelle imitation.
   ============================================================================ */
(function () {
  "use strict";

  var panneau = document.getElementById("menu-mobile");
  var bouton = document.querySelector('[aria-controls="menu-mobile"]');
  if (!panneau || !bouton) return;

  var ouvrir = function () {
    try {
      panneau.showModal();
    } catch (e) {
      // Navigateur sans showModal : la navigation reste dans le pied de page.
      return;
    }
    bouton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  var fermer = function () {
    if (panneau.open) panneau.close();
  };

  bouton.addEventListener("click", ouvrir);

  // Le bouton de fermeture, et tout lien du menu : on part, donc on ferme.
  var aFermer = panneau.querySelectorAll(".menumobile-fermer, .menumobile-lien");
  Array.prototype.forEach.call(aFermer, function (element) {
    element.addEventListener("click", fermer);
  });

  // `close` couvre aussi la touche Échap, que le navigateur gère seul.
  panneau.addEventListener("close", function () {
    bouton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
})();
