function checkOrientation() {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const rotateNotice = document.getElementById("rotateNotice");
  const elementsToToggle = [
    "canvas-container",
    "controls",
    "scoreboard",
    "goalMessage",
    "turnMessage",
    "turnOverlay"
  ];

  if (isPortrait) {
    rotateNotice.style.display = "flex";
    elementsToToggle.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  } else {
    rotateNotice.style.display = "none";
    elementsToToggle.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        // Si es overlay, no lo muestres hasta que sea necesario
        if (id === "turnOverlay") {
          el.style.display = "none";
        } else {
          el.style.display = "";
        }
      }
    });
  }
}

window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);
