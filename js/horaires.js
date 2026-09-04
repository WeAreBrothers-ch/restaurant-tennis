/* ============================================================================
   OUVERT / FERMÉ, EN DIRECT

   Le calcul a lieu chez le visiteur, à l'heure de Lausanne quel que soit le
   pays depuis lequel il consulte. Fait à la fabrication du site, il serait figé
   au jour de la mise en ligne.

   ⚠ Les horaires ci-dessous doivent rester IDENTIQUES à ceux écrits dans les
   pages, dans le pied de page et sur la fiche Google. Une heure qui diffère
   d'un endroit à l'autre se voit.

   ⚠⚠ CEUX-CI NE SONT PAS CONFIRMÉS PAR LE RESTAURANT. Ils ont été posés pour
   que le bandeau « Ouvert / Fermé » fonctionne et pour fixer la mise en page.
   Voir `CONTENU-SITE.md`, chapitre « Les horaires ».
   ============================================================================ */
(function () {
  "use strict";

  var cible = document.querySelector(".etatouverturelive-etat");
  if (!cible) return;

  var FUSEAU = "Europe/Zurich";
  var JOURS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  var HORAIRES = [
    { indice: 1, nom: "Lundi", midi: null, soir: null },
    { indice: 2, nom: "Mardi", midi: ["11:30", "14:00"], soir: ["18:30", "22:00"] },
    { indice: 3, nom: "Mercredi", midi: ["11:30", "14:00"], soir: ["18:30", "22:00"] },
    { indice: 4, nom: "Jeudi", midi: ["11:30", "14:00"], soir: ["18:30", "22:00"] },
    { indice: 5, nom: "Vendredi", midi: ["11:30", "14:00"], soir: ["18:30", "22:00"] },
    { indice: 6, nom: "Samedi", midi: ["11:30", "14:30"], soir: ["18:30", "22:00"] },
    { indice: 0, nom: "Dimanche", midi: ["11:30", "14:30"], soir: ["18:30", "22:00"] },
  ];

  var enMinutes = function (heure) {
    var morceaux = heure.split(":");
    return Number(morceaux[0]) * 60 + Number(morceaux[1]);
  };

  var enFrancais = function (heure) {
    return heure.replace(":", "h");
  };

  /** Jour et heure à Lausanne, quel que soit le fuseau de l'appareil. */
  var instantLausannois = function (date) {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: FUSEAU,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(date);

      var lire = function (type) {
        for (var i = 0; i < parts.length; i++) {
          if (parts[i].type === type) return parts[i].value;
        }
        return "";
      };

      var jour = JOURS[lire("weekday")];
      var heures = Number(lire("hour"));
      var minutes = Number(lire("minute"));
      if (jour === undefined || isNaN(heures) || isNaN(minutes)) throw new Error("illisible");
      return { jour: jour, minutes: (heures % 24) * 60 + minutes };
    } catch (e) {
      // Repli sur l'heure de l'appareil : moins juste, mais jamais de plantage.
      return { jour: date.getDay(), minutes: date.getHours() * 60 + date.getMinutes() };
    }
  };

  var dansLaPlage = function (minutes, plage) {
    return !!plage && minutes >= enMinutes(plage[0]) && minutes < enMinutes(plage[1]);
  };

  var calculer = function () {
    var instant = instantLausannois(new Date());
    var jour = HORAIRES[0];
    for (var i = 0; i < HORAIRES.length; i++) {
      if (HORAIRES[i].indice === instant.jour) jour = HORAIRES[i];
    }

    if (!jour.midi && !jour.soir) {
      return { ouvert: false, detail: "Fermé le " + jour.nom.toLowerCase() };
    }
    if (dansLaPlage(instant.minutes, jour.midi)) {
      return { ouvert: true, detail: enFrancais(jour.midi[0]) + " – " + enFrancais(jour.midi[1]) };
    }
    if (dansLaPlage(instant.minutes, jour.soir)) {
      return { ouvert: true, detail: enFrancais(jour.soir[0]) + " – " + enFrancais(jour.soir[1]) };
    }

    var plages = [jour.midi, jour.soir];
    for (var j = 0; j < plages.length; j++) {
      if (plages[j] && instant.minutes < enMinutes(plages[j][0])) {
        return { ouvert: false, detail: "Ouvre à " + enFrancais(plages[j][0]) };
      }
    }
    return { ouvert: false, detail: "Fermé pour aujourd’hui" };
  };

  /* Construit par le DOM plutôt qu'en collant du HTML : rien de ce qui est
     affiché ici ne peut être interprété comme du balisage. */
  var afficher = function () {
    var etat = calculer();
    cible.setAttribute("data-ouvert", String(etat.ouvert));
    cible.textContent = "";

    var pastille = document.createElement("span");
    pastille.className = "etatouverturelive-pastille";

    var libelle = document.createElement("span");
    libelle.className = "etatouverturelive-libelle";
    libelle.textContent = etat.ouvert ? "Ouvert" : "Fermé";

    var detail = document.createElement("span");
    detail.className = "etatouverturelive-detail";
    detail.textContent = "· " + etat.detail;

    cible.appendChild(pastille);
    cible.appendChild(libelle);
    cible.appendChild(detail);
  };

  afficher();
  // Une minute suffit : les changements d'état sont à la minute près.
  window.setInterval(afficher, 60000);
})();
