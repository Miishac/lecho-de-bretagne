// ========================
// Script commun du site
// ========================

document.addEventListener("DOMContentLoaded", function () {
  // Initialiser la date RP
  initDateRP();
});

/**
 * Initialise la date RP (jour du mois + mois actuel + année 1474)
 */
function initDateRP() {
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  const aujourdHui = new Date();
  const jour = aujourdHui.getDate();
  const moisActuel = mois[aujourdHui.getMonth()];
  const anneeRP = 1474;

  const dateTexte = `${jour} ${moisActuel} ${anneeRP}`;

  document.querySelectorAll(".date-rp").forEach(function (element) {
    element.textContent = dateTexte;
  });
}

/**
 * Active le plein écran sur une iframe (carte)
 */
function pleinEcran(iframeId = "carteRR") {
  const carte = document.getElementById(iframeId);

  if (!carte) return;

  if (carte.requestFullscreen) {
    carte.requestFullscreen();
  } else if (carte.webkitRequestFullscreen) {
    carte.webkitRequestFullscreen();
  }
}
