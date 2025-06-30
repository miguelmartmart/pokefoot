// ui/orientation.js
export function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  const rotateNotice = document.getElementById("rotateNotice");
  const mainUI = [
    "canvas-container", "controls", "goalMessage",
    "turnMessage", "scoreboard", "turnOverlay"
  ];

  if (isPortrait) {
    rotateNotice.style.display = "flex";
    mainUI.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.visibility = "hidden";
    });
  } else {
    rotateNotice.style.display = "none";
    mainUI.forEach(id => {
      const el = document.getElementById(id);
      if (el && id !== "goalMessage" && id !== "turnOverlay") {
        el.style.visibility = "visible";
      }
    });
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
