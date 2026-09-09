/* ============================================================================
   LE RUBAN DE PHOTOGRAPHIES

   Le ruban est une bande défilante ordinaire — `overflow-x: auto`, voir
   `.ruban-defile` dans `css/accueil.css`. Il est donc déjà glissable au doigt,
   au trackpad et à la barre d'espace, sans une ligne de script.

   CE FICHIER LUI AJOUTE TROIS CHOSES, ET RIEN D'AUTRE :

     1. IL AVANCE TOUT SEUL, en écrivant son `scrollLeft` à chaque image de
        rendu. Ce n'est pas une animation : c'est du défilement, exactement
        celui que ferait un doigt, en beaucoup plus lent. Il ne s'arrête jamais
        — ni au survol, ni au clic.

     2. LA BOUCLE SE REFERME. La piste porte deux fois la même série ; dès que
        la position atteint la moitié de la piste, on retranche cette moitié. On
        se retrouve au même pixel de la première série, et rien ne se voit. Cela
        vaut aussi en marche arrière, quand on tire le ruban vers la droite.

     3. LA SOURIS PEUT L'ATTRAPER. Le doigt et le trackpad font défiler une
        boîte nativement ; la souris, non. Quelques lignes de `pointer` lui
        rendent le geste.

   ────────────────────────────────────────────────────────────────────────────
   DEUX PIÈGES, ET C'EST TOUT CE QUI REND CE FICHIER MOINS COURT QU'IL N'Y PARAÎT

   ⚠ PREMIER PIÈGE : NE JAMAIS SE FIER À L'ÉVÉNEMENT `scroll` POUR SAVOIR QUI A
   POUSSÉ. Une version précédente levait un drapeau juste avant d'écrire
   `scrollLeft` et le rabaissait juste après, en croyant que l'écouteur le
   verrait levé. Il ne le voit jamais : `scroll` n'est PAS émis pendant
   l'écriture, il est émis plus tard, quand le navigateur met à jour l'affichage
   — le drapeau est déjà retombé. Le ruban prenait donc son propre mouvement
   pour celui d'un doigt, se taisait trois cents millisecondes, avançait d'une
   image, se taisait encore. À l'œil, il tressautait sur place. C'était le bug.

   On ne se fie donc à AUCUN événement. À chaque image, on compare la position
   réelle de la boîte à celle qu'on y a laissée la fois d'avant. Si elle a bougé
   sans nous, c'est quelqu'un d'autre — un doigt, une molette, une inertie en
   cours — et on se retire un instant. C'est une comparaison synchrone : elle ne
   peut pas se tromper d'ordre.

   ⚠ SECOND PIÈGE : NE PAS ACCUMULER DANS `scrollLeft`. À cinquante-cinq pixels
   par seconde, une image ne vaut que neuf dixièmes de pixel. Un navigateur qui
   arrondit `scrollLeft` à l'entier rendrait donc zéro à chaque lecture, et un
   `+=` n'avancerait jamais d'un pouce. La position est tenue à part, en nombre
   à virgule ; `scrollLeft` n'en est que le reflet.
   ============================================================================ */
(function () {
  "use strict";

  var piste = document.querySelector(".ruban-piste");
  if (!piste) return;

  var defile = piste.querySelector(".ruban-defile");
  if (!defile) return;

  /* Cinquante-cinq pixels par seconde. Elle a valu trente, et c'était trop
     lent : à cette allure une vignette mettait seize secondes à parcourir sa
     propre largeur, et le ruban avait l'air arrêté plutôt que calme. */
  var VITESSE = 55;

  /* De combien la position doit s'écarter de ce qu'on attendait pour qu'on
     conclue que quelqu'un d'autre a poussé. Notre pas vaut neuf dixièmes de
     pixel : deux pixels laissent passer les arrondis du navigateur sans laisser
     passer un geste — le plus lent des gestes déplace déjà la boîte de
     plusieurs pixels par image. */
  var SEUIL = 2;

  /* Le temps qu'on se retire après un geste. Une glissade au doigt ralentit
     pendant près d'une seconde : reprendre trop tôt, c'est l'interrompre. */
  var RETRAIT = 500;

  var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduit && reduit.matches) return;

  /* La position que NOUS tenons, en nombre à virgule. Voir le second piège. */
  var position = 0;
  /* La dernière position lue dans la boîte : notre point de comparaison. */
  var dernierVu = 0;
  /* Tant que l'horloge n'a pas dépassé cette date, on laisse la main. */
  var silenceJusqu = 0;

  var precedent = 0;
  var image = 0;

  /* La moitié de la piste, c'est-à-dire UNE série complète — et donc le pas de
     la boucle. Elle tombe juste parce que la feuille de style ajoute un joint
     de fin : sans lui, la moitié vaudrait cinq vignettes et QUATRE JOINTS ET
     DEMI, et le ruban dériverait d'un demi-joint à chaque tour. */
  var pas = function () {
    return defile.scrollWidth / 2;
  };

  var boucler = function (x) {
    var demi = pas();
    if (demi <= 0) return x;
    while (x >= demi) x -= demi;
    while (x < 0) x += demi;
    return x;
  };

  var avancer = function (temps) {
    var reel = defile.scrollLeft;

    /* Quelqu'un d'autre a-t-il écrit depuis notre dernière image ? */
    if (Math.abs(reel - dernierVu) > SEUIL) {
      position = reel;
      silenceJusqu = temps + RETRAIT;
    }

    if (precedent && temps >= silenceJusqu && !defile.dataset.saisi) {
      /* Le temps écoulé, borné : au retour d'un onglet resté en arrière-plan,
         l'écart peut valoir plusieurs secondes, et le ruban ferait un bond. */
      var ecoule = Math.min((temps - precedent) / 1000, 0.1);
      position = boucler(position + VITESSE * ecoule);
      defile.scrollLeft = position;
    }

    /* Relu, et non recopié : le navigateur a pu arrondir ou borner ce qu'on
       vient d'écrire, et c'est SA valeur qui doit servir de comparaison. */
    dernierVu = defile.scrollLeft;
    precedent = temps;
    image = requestAnimationFrame(avancer);
  };

  var lancer = function () {
    if (image) return;
    /* On se resynchronise : la boîte a pu bouger pendant qu'on ne regardait
       pas, et une reprise décalée passerait pour un geste. */
    position = defile.scrollLeft;
    dernierVu = position;
    precedent = 0;
    image = requestAnimationFrame(avancer);
  };

  var arreter = function () {
    if (!image) return;
    cancelAnimationFrame(image);
    image = 0;
  };

  /* --------------------------------------------------------------------------
     LA SAISIE À LA SOURIS

     Le doigt et le trackpad font défiler une boîte tout seuls ; la souris, non.
     On ne capture le pointeur que pour elle, et seulement après quatre pixels
     de déplacement : en deçà, c'est un clic, et un clic ne doit pas empêcher de
     sélectionner un texte ni d'ouvrir un lien.

     Ces écritures-là n'ont aucun garde à poser : la comparaison de l'image
     suivante les verra, conclura qu'on a été poussé, et se retirera — ce qui
     est exactement ce qu'on veut.
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
    /* On boucle aussi à la main : sans cela, tirer vers la droite butterait sur
       zéro et le ruban paraîtrait avoir un début. Le point de départ suit le
       recadrage, pour que la photographie reste collée au curseur. */
    var vise = departDefilement - course;
    var recadre = boucler(vise);
    departDefilement += recadre - vise;
    defile.scrollLeft = recadre;
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

     Une animation qui tourne hors champ ne se voit pas, mais elle se paie — sur
     la batterie comme sur la fluidité du reste de la page.
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
