/* ============================================================================
   LE RUBAN DE PHOTOGRAPHIES

   Le ruban glisse déjà tout seul : au doigt, au glissement horizontal du
   trackpad et au clavier — la feuille de style en fait une zone défilante, et
   le balisage lui donne un `tabindex`.

   Ce fichier ajoute deux choses. D'abord les flèches, pour ceux qui sont à la
   souris et à qui rien n'indiquerait sinon que le ruban continue ; elles
   s'éteignent quand on est arrivé au bout, un bouton qui ne fait rien mais qui
   reste allumé étant un bouton cassé. Ensuite, et surtout, la garde qui empêche
   le ruban de confisquer le défilement de la page.
   ============================================================================ */
(function () {
  "use strict";

  var ruban = document.querySelector(".ruban-defile");
  if (!ruban) return;

  /* --------------------------------------------------------------------------
     LE DÉFILEMENT VERTICAL RESTE À LA PAGE

     Un bloc qui ne défile qu'en largeur, les navigateurs de bureau le font
     glisser de côté dès qu'on pousse la molette vers le bas. Résultat : en
     descendant la page, dès que le pointeur passe sur le ruban, la page se fige
     et les photographies partent latéralement sans qu'on l'ait demandé.

     On rend donc tout geste vertical à la page, et on ne laisse au ruban que ce
     qui est franchement horizontal — le glissement à deux doigts continue de le
     faire avancer.
     -------------------------------------------------------------------------- */

  /** Le déplacement demandé, en pixels, quelle que soit l'unité de l'événement. */
  var enPixels = function (evt) {
    if (evt.deltaMode === 1) return evt.deltaY * 16; // exprimé en lignes
    if (evt.deltaMode === 2) return evt.deltaY * window.innerHeight; // en pages
    return evt.deltaY;
  };

  ruban.addEventListener(
    "wheel",
    function (evt) {
      // Le zoom du navigateur (Ctrl + molette) ne nous regarde pas.
      if (evt.ctrlKey) return;
      // Geste franchement horizontal : c'est bien le ruban qu'on vise.
      if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) return;

      evt.preventDefault();
      var hauteur = enPixels(evt);
      try {
        window.scrollBy({ top: hauteur, left: 0, behavior: "instant" });
      } catch (e) {
        // Là où « instant » n'est pas connu, on déplace sans passer par la
        // forme qui animerait chaque cran de molette.
        window.scrollTo(window.pageXOffset, window.pageYOffset + hauteur);
      }
    },
    { passive: false },
  );

  /* --------------------------------------------------------------------------
     LES DEUX FLÈCHES
     -------------------------------------------------------------------------- */
  var precedent = document.querySelector("[data-ruban-precedent]");
  var suivant = document.querySelector("[data-ruban-suivant]");
  if (!precedent || !suivant) return;

  /** De combien on avance : la largeur d'une vignette, gouttière comprise. */
  var pas = function () {
    var vignettes = ruban.querySelectorAll(".ruban-vignette");
    if (vignettes.length > 1) {
      var ecart = vignettes[1].offsetLeft - vignettes[0].offsetLeft;
      if (ecart > 0) return ecart;
    }
    if (vignettes.length === 1) return vignettes[0].offsetWidth;
    return Math.round(ruban.clientWidth * 0.8);
  };

  /* La marge d'un pixel absorbe les arrondis de calcul du navigateur : sans
     elle, une flèche peut rester allumée alors qu'on est déjà au bout. */
  var MARGE = 1;

  var rafraichir = function () {
    var debut = ruban.scrollLeft <= MARGE;
    var fin = ruban.scrollLeft >= ruban.scrollWidth - ruban.clientWidth - MARGE;
    precedent.disabled = debut;
    suivant.disabled = fin;
  };

  var glisser = function (sens) {
    ruban.scrollBy({ left: sens * pas(), behavior: "smooth" });
  };

  precedent.addEventListener("click", function () {
    glisser(-1);
  });

  suivant.addEventListener("click", function () {
    glisser(1);
  });

  ruban.addEventListener("scroll", rafraichir, { passive: true });
  window.addEventListener("resize", rafraichir, { passive: true });

  rafraichir();
})();
