/* ============================================================================
   LE FORMULAIRE DE CONTACT

   Il fonctionne sans ce fichier : `action` et `method` sont posés sur la
   balise, donc un envoi ordinaire part quand même — le visiteur atterrit
   simplement sur la page du service de réception au lieu de rester ici.

   Ce fichier ne fait que retenir l'envoi pour afficher la réponse sur place, et
   vérifier trois choses avant de partir. En cas d'échec, il redonne le numéro
   de téléphone : c'est la seule voie qui ne peut pas tomber en panne.
   ============================================================================ */
(function () {
  "use strict";

  var form = document.querySelector(".formulairecontact-formulaire");
  if (!form || !form.getAttribute("action")) return;

  var bouton = form.querySelector(".formulairecontact-envoi");
  var zoneReponse = form.querySelector("[data-reponse]");
  var TELEPHONE = form.getAttribute("data-telephone") || "";

  var champ = function (nom) {
    return form.elements.namedItem(nom);
  };

  var effacerErreurs = function () {
    Array.prototype.forEach.call(form.querySelectorAll(".formulairecontact-champ"), function (bloc) {
      bloc.removeAttribute("data-erreur");
    });
    Array.prototype.forEach.call(
      form.querySelectorAll(".formulairecontact-erreur"),
      function (message) {
        message.remove();
      },
    );
    Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (element) {
      element.removeAttribute("aria-invalid");
      element.removeAttribute("aria-describedby");
    });
  };

  var signaler = function (nom, texte) {
    var element = champ(nom);
    if (!element) return;

    var bloc = element.closest(".formulairecontact-champ");
    if (bloc) bloc.setAttribute("data-erreur", "true");
    element.setAttribute("aria-invalid", "true");

    var message = document.createElement("span");
    message.className = "formulairecontact-erreur";
    message.id = "erreur-" + nom;
    message.textContent = texte;
    element.setAttribute("aria-describedby", message.id);
    if (bloc) bloc.appendChild(message);

    // Le curseur se place dans le champ à corriger : sans cela, la personne
    // doit retrouver elle-même où le problème se situe.
    element.focus();
  };

  var repondre = function (texte, statut) {
    if (!zoneReponse) return;
    zoneReponse.textContent = "";
    if (!texte) return;

    var p = document.createElement("p");
    p.className = "formulairecontact-reponse";
    p.setAttribute("data-statut", statut);
    p.textContent = texte;
    zoneReponse.appendChild(p);
  };

  var emailPlausible = function (valeur) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valeur);
  };

  form.addEventListener("submit", function (evenement) {
    evenement.preventDefault();
    effacerErreurs();
    repondre("", "");

    var donnees = new FormData(form);
    var lire = function (nom) {
      var valeur = donnees.get(nom);
      return typeof valeur === "string" ? valeur.trim() : "";
    };

    // Piège à robots : un champ que seul un automate remplit. On fait comme si
    // tout s'était bien passé plutôt que de lui apprendre ce qui l'a trahi.
    if (lire("site")) {
      repondre("Message envoyé. Nous vous répondons au plus vite.", "succes");
      return;
    }

    if (lire("nom").length < 2) return signaler("nom", "Merci d’indiquer votre nom.");
    if (!emailPlausible(lire("email"))) {
      return signaler("email", "Cette adresse e-mail semble incomplète.");
    }
    if (lire("message").length < 10) {
      return signaler("message", "Votre message est un peu court.");
    }

    if (bouton) {
      bouton.disabled = true;
      bouton.textContent = "Envoi en cours…";
    }

    var rendreLeBouton = function () {
      if (!bouton) return;
      bouton.disabled = false;
      bouton.textContent = "Envoyer le message";
    };

    fetch(form.getAttribute("action"), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: donnees,
    })
      .then(function (reponse) {
        if (!reponse.ok) throw new Error(String(reponse.status));
        form.reset();
        repondre("Message envoyé. Nous vous répondons au plus vite.", "succes");
        rendreLeBouton();
      })
      .catch(function () {
        repondre(
          "L’envoi n’a pas abouti. Appelez-nous au " + TELEPHONE + ", c’est le plus sûr.",
          "echec",
        );
        rendreLeBouton();
      });
  });
})();
