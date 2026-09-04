/* ============================================================================
   LE PLAN D'ACCÈS

   Le fond est une simple photographie. Rien n'est demandé à OpenStreetMap tant
   que le visiteur n'a pas cliqué : c'est meilleur pour la vitesse d'affichage
   comme pour sa vie privée — aucune requête ne part vers un tiers sans son
   accord.
   ============================================================================ */
(function () {
  "use strict";

  var bouton = document.querySelector(".plan-ouvrir");
  var cadre = document.querySelector(".plan-plan");
  if (!bouton || !cadre) return;

  bouton.addEventListener("click", function () {
    var adresse = cadre.getAttribute("data-carte");
    var titre = cadre.getAttribute("data-titre") || "Plan d’accès";
    if (!adresse) return;

    var iframe = document.createElement("iframe");
    iframe.className = "plan-cadre";
    iframe.src = adresse;
    iframe.title = titre;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";

    cadre.textContent = "";
    cadre.appendChild(iframe);
  });
})();
