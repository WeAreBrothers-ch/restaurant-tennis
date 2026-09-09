/* ============================================================================
   LE MENU DU TÉLÉPHONE

   Il s'appuie sur <dialog> : le piégeage du focus, la touche Échap et le rôle
   de dialogue sont assurés par le navigateur, pas par nous. C'est moins de code
   et un comportement plus juste que n'importe quelle imitation.

   ────────────────────────────────────────────────────────────────────────────
   QUATRE DÉFAUTS ONT ÉTÉ CORRIGÉS ICI, ET ILS SE RESSEMBLENT TOUS : chacun
   supposait qu'une chose allait arriver, et le menu restait cassé quand elle
   n'arrivait pas. La règle qu'on s'est donnée depuis : NE JAMAIS FAIRE DÉPENDRE
   L'ÉTAT DE LA PAGE D'UN ÉVÉNEMENT QU'ON N'A PAS DÉCLENCHÉ SOI-MÊME.

     1. LE NETTOYAGE ATTENDAIT L'ÉVÉNEMENT `close`. La page est figée pendant
        que le menu est ouvert — `overflow: hidden` — et c'est l'événement qui
        la libérait. Mesuré : il n'est pas émis partout. Là où il manque, on
        ferme le menu et LA PAGE NE DÉFILE PLUS, sans que rien ne l'explique.
        Le nettoyage est maintenant appelé directement, et l'événement n'est
        qu'un filet de sécurité pour les fermetures qu'on n'a pas demandées.

     2. `showModal` N'EXISTE PAS PARTOUT — iOS l'a eu tard. On attrapait
        l'erreur et on ne faisait RIEN : le bouton du menu était mort. On ouvre
        maintenant le panneau à la main, sans couche supérieure.

     3. LE PASSAGE SUR GRAND ÉCRAN. Au-delà de 1024 px la feuille de style cache
        le panneau. En tournant le téléphone menu ouvert, il disparaissait mais
        `overflow: hidden` restait : page bloquée.

     4. ÉCHAP, DANS LE REPLI. Le navigateur ne la gère que pour un dialogue
        modal.

   Le défaut le plus visible, lui, n'était pas ici mais dans la feuille de
   style : voir `.menumobile-panneau` dans `css/composants.css`.
   ============================================================================ */
(function () {
  "use strict";

  var panneau = document.getElementById("menu-mobile");
  var bouton = document.querySelector('[aria-controls="menu-mobile"]');
  if (!panneau || !bouton) return;

  /* Le seuil au-delà duquel la feuille de style cache le panneau. Les deux
     valeurs doivent rester la même : voir `.menumobile-panneau`. */
  var GRAND_ECRAN = window.matchMedia ? window.matchMedia("(min-width: 1024px)") : null;

  /* Vrai quand le panneau est ouvert SANS la couche supérieure, faute de
     `showModal`. */
  var replie = false;

  /* --------------------------------------------------------------------------
     LE NETTOYAGE

     Il ne suppose rien de l'état d'où il part, et il peut être appelé dix fois
     de suite sans dommage : c'est ce qui permet de l'appeler à la fois nous-
     mêmes et depuis l'événement, sans se demander lequel arrivera.
     -------------------------------------------------------------------------- */
  function nettoyer() {
    replie = false;
    panneau.removeAttribute("data-repli");
    bouton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  var ouvrir = function () {
    if (panneau.open) return;

    if (typeof panneau.showModal === "function") {
      try {
        panneau.showModal();
      } catch (e) {
        replier();
      }
    } else {
      replier();
    }

    if (!panneau.open) return; // ni l'un ni l'autre n'a marché : on ne fige rien

    bouton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    /* Dans la couche supérieure, le navigateur place le focus lui-même ; dans
       le repli, non. */
    if (replie) {
      var fermeture = panneau.querySelector(".menumobile-fermer");
      if (fermeture) fermeture.focus();
    }
  };

  /* L'ouverture sans couche supérieure : l'attribut `open` suffit à afficher un
     <dialog>, et la feuille de style lui donne son voile. */
  function replier() {
    replie = true;
    panneau.setAttribute("data-repli", "true");
    panneau.setAttribute("open", "");
  }

  var fermer = function () {
    var etaitOuvert = panneau.open;

    if (etaitOuvert) {
      if (replie) {
        panneau.removeAttribute("open");
      } else {
        try {
          panneau.close();
        } catch (e) {
          panneau.removeAttribute("open");
        }
      }
    }

    /* Sans attendre quoi que ce soit. */
    nettoyer();

    /* On rend le focus au bouton : sans cela il retombe sur le corps de la
       page, et la tabulation repart du début. */
    if (etaitOuvert) bouton.focus();
  };

  bouton.addEventListener("click", ouvrir);

  /* Le bouton de fermeture, et tout lien du menu : on part, donc on ferme. */
  var aFermer = panneau.querySelectorAll(".menumobile-fermer, .menumobile-lien");
  Array.prototype.forEach.call(aFermer, function (element) {
    element.addEventListener("click", fermer);
  });

  /* Échap : le navigateur la gère pour un dialogue modal, mais pas dans le
     repli — et, quand il la gère, il n'émet pas toujours `close`. On nettoie
     donc dans tous les cas. `fermer` regarde d'abord si le panneau est ouvert :
     l'appeler pour rien ne coûte rien. */
  document.addEventListener("keydown", function (evt) {
    if (evt.key !== "Escape" && evt.key !== "Esc") return;
    if (panneau.open || document.body.style.overflow === "hidden") fermer();
  });

  /* LE FILET DE SÉCURITÉ. Quoi qu'il arrive au panneau — l'événement `close`,
     le bouton « précédent », un formulaire `method="dialog"`, une extension —
     si l'attribut `open` s'en va, la page doit défiler de nouveau. C'est la
     seule garantie qui ne dépende d'aucun événement particulier. */
  panneau.addEventListener("close", nettoyer);

  if (typeof MutationObserver === "function") {
    new MutationObserver(function () {
      if (!panneau.open) nettoyer();
    }).observe(panneau, { attributes: true, attributeFilter: ["open"] });
  }

  /* Le passage sur grand écran ferme le menu — voir le point 3 du préambule. */
  if (GRAND_ECRAN) {
    var surSeuil = function (evt) {
      if (evt.matches) fermer();
    };
    if (GRAND_ECRAN.addEventListener) GRAND_ECRAN.addEventListener("change", surSeuil);
    else if (GRAND_ECRAN.addListener) GRAND_ECRAN.addListener(surSeuil);
  }
})();
