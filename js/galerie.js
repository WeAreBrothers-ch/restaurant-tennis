/* ============================================================================
   LE RUBAN DE PHOTOGRAPHIES

   Tout le ruban est en CSS : la boucle, la vitesse, l'arrêt au survol et au
   focus, et le repli quand le système demande un mouvement réduit. Voir
   `.ruban-defile` dans `css/accueil.css`.

   Il reste UNE chose que le CSS ne sait pas faire, et c'est tout ce que fait ce
   fichier : ARRÊTER LE RUBAN QUAND IL N'EST PAS À L'ÉCRAN.

   Une animation qui tourne hors champ ne se voit pas, mais elle se paie — le
   navigateur continue de composer une couche à chaque image, et sur un
   téléphone cela se lit sur la batterie et sur la fluidité du reste de la page.
   Le ruban est en haut de l'accueil ; dès qu'on a descendu deux écrans, il
   tourne pour personne.

   Si l'IntersectionObserver n'existe pas, on ne fait rien : le ruban tourne
   tout le temps, comme avant, et personne ne s'en aperçoit.
   ============================================================================ */
(function () {
  "use strict";

  var piste = document.querySelector(".ruban-piste");
  if (!piste || typeof IntersectionObserver !== "function") return;

  var defile = piste.querySelector(".ruban-defile");
  if (!defile) return;

  new IntersectionObserver(
    function (entrees) {
      for (var i = 0; i < entrees.length; i++) {
        /* Le style en ligne l'emporte sur la feuille, y compris sur l'arrêt au
           survol — mais cela ne gêne personne : quand on pose « paused », le
           ruban est hors de l'écran et ne peut pas être survolé. Et quand il
           revient, on ne pose pas « running » : ON EFFACE la règle en ligne,
           et le CSS reprend la main, arrêt au survol compris. C'est la seule
           écriture qui laisse les deux mécaniques cohabiter. */
        defile.style.animationPlayState = entrees[i].isIntersecting ? "" : "paused";
      }
    },
    /* Une marge généreuse : le ruban repart avant d'entrer dans l'écran, pour
       qu'on ne le surprenne jamais à l'arrêt. */
    { rootMargin: "200px 0px" }
  ).observe(piste);
})();
