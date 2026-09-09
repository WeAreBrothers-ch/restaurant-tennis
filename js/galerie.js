/* ============================================================================
   LE RUBAN DE PHOTOGRAPHIES

   Le ruban est une bande défilante ordinaire — `overflow-x: auto`, voir
   `.ruban-defile` dans `css/accueil.css`. Il est donc déjà glissable au doigt,
   au trackpad et à la barre d'espace, sans une ligne de script.

   CE FICHIER LUI AJOUTE TROIS CHOSES, ET RIEN D'AUTRE :

     1. IL AVANCE TOUT SEUL. Quelques dixièmes de pixel ajoutés à `scrollLeft` à
        chaque image de rendu. Ce n'est pas une animation : c'est du défilement,
        exactement celui que ferait un doigt, en beaucoup plus lent. C'est ce
        qui permet aux deux gestes de s'additionner au lieu de se disputer — on
        pousse le ruban où l'on veut, il repart de là, et il ne s'arrête jamais.
        Notamment pas au survol : le client l'a demandé en toutes lettres.

     2. LA BOUCLE SE REFERME. La piste porte deux fois la même série ; dès que
        le défilement atteint sa moitié, on retranche cette moitié. On se
        retrouve au même pixel de la première série, et rien ne se voit. Cela
        vaut aussi en marche arrière, quand on tire le ruban vers la droite.

     3. LA SOURIS PEUT L'ATTRAPER. Le doigt et le trackpad font défiler une
        boîte nativement ; la souris, non. Quelques lignes de `pointer` lui
        rendent le geste.

   IL S'ARRÊTE DANS DEUX CAS, ET SEULEMENT DEUX : quand le système demande un
   mouvement réduit, et quand le ruban n'est pas à l'écran — une animation qui
   tourne hors champ ne se voit pas mais se paie, sur la batterie comme sur la
   fluidité du reste de la page.
   ============================================================================ */
(function () {
  "use strict";

  var piste = document.querySelector(".ruban-piste");
  if (!piste) return;

  var defile = piste.querySelector(".ruban-defile");
  if (!defile) return;

  /* Cinquante-cinq pixels par seconde.

     Elle a valu trente, et c'était trop lent : à cette allure une vignette
     mettait seize secondes à parcourir sa propre largeur, et le ruban avait
     l'air arrêté plutôt que calme. À cinquante-cinq elle en met neuf — on voit
     qu'il avance sans jamais avoir à courir après une assiette. */
  var VITESSE = 55;

  var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduit && reduit.matches) return;

  /* --------------------------------------------------------------------------
     LA BOUCLE

     `scrollWidth / 2` tombe juste parce que la feuille de style ajoute un joint
     de fin à la piste : sans lui, la moitié vaudrait cinq vignettes et QUATRE
     JOINTS ET DEMI, et le ruban dériverait d'un demi-joint à chaque tour.
     -------------------------------------------------------------------------- */
  var recadrer = function () {
    var demi = defile.scrollWidth / 2;
    if (demi <= 0) return;
    if (defile.scrollLeft >= demi) defile.scrollLeft -= demi;
    else if (defile.scrollLeft < 0) defile.scrollLeft += demi;
  };

  var precedent = 0;
  var image = 0;
  /* Levé le temps de nos propres écritures, pour que l'écouteur de défilement
     ne les prenne pas pour un geste de l'usager. */
  var nousEcrivons = false;
  /* Vrai tant qu'un doigt ou un trackpad fait glisser la boîte — voir plus bas. */
  var pousseParLUsager = false;

  var avancer = function (temps) {
    if (precedent) {
      /* Le temps écoulé, borné : au retour d'un onglet resté en arrière-plan,
         l'écart peut valoir plusieurs secondes, et le ruban ferait un bond. */
      var ecoule = Math.min((temps - precedent) / 1000, 0.1);
      /* On n'avance ni pendant qu'on est tiré à la souris, ni pendant qu'un
         doigt fait glisser la boîte : dans les deux cas, les deux écritures se
         marcheraient dessus. */
      if (!defile.dataset.saisi && !pousseParLUsager) {
        nousEcrivons = true;
        defile.scrollLeft += VITESSE * ecoule;
        recadrer();
        nousEcrivons = false;
      }
    }
    precedent = temps;
    image = requestAnimationFrame(avancer);
  };

  var lancer = function () {
    if (image) return;
    precedent = 0;
    image = requestAnimationFrame(avancer);
  };

  var arreter = function () {
    if (!image) return;
    cancelAnimationFrame(image);
    image = 0;
  };

  /* --------------------------------------------------------------------------
     ON NE POUSSE PAS PENDANT QU'UN DOIGT POUSSE

     Au doigt, la boîte défile toute seule, avec son inertie : le doigt lance le
     ruban, le lâche, et il continue de glisser en ralentissant. Or écrire
     `scrollLeft` pendant cette glissade l'ANNULE — sur iOS notamment, la moindre
     écriture arrête net l'inertie, et le ruban se fige sous le doigt qui vient
     de le lancer.

     On se tait donc pendant qu'il défile de lui-même, et on reprend un tiers de
     seconde après le dernier événement de défilement. `scrollend` ferait ça
     proprement, mais il n'existe pas partout : le compte à rebours, si.
     -------------------------------------------------------------------------- */
  var reprise = 0;

  defile.addEventListener(
    "scroll",
    function () {
      /* Nos propres écritures déclenchent aussi cet événement : sans ce garde,
         le ruban se tairait à cause de son propre mouvement et ne repartirait
         jamais. */
      if (nousEcrivons) return;
      pousseParLUsager = true;
      clearTimeout(reprise);
      reprise = setTimeout(function () {
        pousseParLUsager = false;
      }, 320);
    },
    { passive: true }
  );

  /* --------------------------------------------------------------------------
     LA SAISIE À LA SOURIS

     Le doigt et le trackpad font défiler une boîte tout seuls ; la souris, non.
     On ne capture le pointeur que pour elle, et seulement après quatre pixels
     de déplacement : en deçà, c'est un clic, et un clic ne doit pas empêcher de
     sélectionner une légende ni d'ouvrir un lien.
     -------------------------------------------------------------------------- */
  var depart = 0;
  var departDefilement = 0;
  var tire = false;

  defile.addEventListener("pointerdown", function (evt) {
    if (evt.pointerType !== "mouse" || evt.button !== 0) return;
    depart = evt.clientX;
    departDefilement = defile.scrollLeft;
    tire = false;
  });

  defile.addEventListener("pointermove", function (evt) {
    if (!depart) return;
    var course = evt.clientX - depart;
    if (!tire && Math.abs(course) < 4) return;
    if (!tire) {
      tire = true;
      defile.dataset.saisi = "true";
      defile.setPointerCapture(evt.pointerId);
    }
    nousEcrivons = true;
    defile.scrollLeft = departDefilement - course;
    recadrer();
    nousEcrivons = false;
  });

  var relacher = function () {
    depart = 0;
    tire = false;
    delete defile.dataset.saisi;
  };

  defile.addEventListener("pointerup", relacher);
  defile.addEventListener("pointercancel", relacher);

  /* --------------------------------------------------------------------------
     HORS DE L'ÉCRAN, ON S'ARRÊTE
     -------------------------------------------------------------------------- */
  if (typeof IntersectionObserver === "function") {
    new IntersectionObserver(
      function (entrees) {
        for (var i = 0; i < entrees.length; i++) {
          if (entrees[i].isIntersecting) lancer();
          else arreter();
        }
      },
      /* Une marge généreuse : le ruban repart avant d'entrer dans l'écran, pour
         qu'on ne le surprenne jamais à l'arrêt. */
      { rootMargin: "200px 0px" }
    ).observe(piste);
  } else {
    lancer();
  }
})();
