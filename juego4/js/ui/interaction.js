// ui/interaction.js
import { state } from "../core/state.js";
import { triggerEffect } from "../engine/effects.js";
import { audio } from "../core/config.js";

let stopZone = null;
let stopTimeout = null;
let attempts = 0;

const clickGoodSound = new Audio("assets/sounds/clickgood.mp3");
const clickFailSound = new Audio("assets/sounds/fail_circle_sg.mp3");

export function setupTimingLogic() {
  createStopZoneElement();
  window.addEventListener("click", handleStopClick);
}

function createStopZoneElement() {
  const zone = document.createElement("div");
  zone.id = "stopZone";
  zone.style.position = "absolute";
  zone.style.width = "100px";
  zone.style.height = "100px";
  zone.style.borderRadius = "50%";
  zone.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
  zone.style.border = "4px solid red";
  zone.style.display = "none";
  zone.style.zIndex = "50";
  zone.style.cursor = "pointer";
  document.body.appendChild(zone);
  stopZone = zone;
}

export function pauseAndShowZone() {
  state.paused = true;
  attempts = 0;

  setTimeout(() => {
    const canvasRect = document
      .getElementById("gameCanvas")
      .getBoundingClientRect();
    const x = Math.random() * (canvasRect.width - 100) + canvasRect.left;
    const y = Math.random() * (canvasRect.height - 100) + canvasRect.top;

    stopZone.style.left = `${x}px`;
    stopZone.style.top = `${y}px`;
    stopZone.style.display = "block";
    stopZone.dataset.active = "true";

    stopTimeout = setTimeout(() => {
      playFailSound();
      endPause(false);
    }, 2000);
  }, 1000);
}

function handleStopClick(e) {
  if (stopZone.dataset.active !== "true") return;

  const zoneRect = stopZone.getBoundingClientRect();
  const clickX = e.clientX;
  const clickY = e.clientY;

  attempts++;

  if (
    clickX >= zoneRect.left &&
    clickX <= zoneRect.right &&
    clickY >= zoneRect.top &&
    clickY <= zoneRect.bottom
  ) {
    clickGoodSound.currentTime = 0;
    clickGoodSound.play().catch((err) => console.warn("Error clickgood:", err));
    endPause(true);
  } else if (attempts >= 3) {
    playFailSound();
    endPause(false);
  }
}

function playFailSound() {
  clickFailSound.currentTime = 0;
  clickFailSound
    .play()
    .catch((err) => console.warn("Error fail_circle_sg:", err));
}

// ✅ Aquí solo lanzamos el efecto sincronizado tras los 2sfunction endPause(success) {
function endPause(success) {
  stopZone.style.display = "none";
  stopZone.dataset.active = "false";
  clearTimeout(stopTimeout);

  const isPlayerTurn = state.currentTurn === state.playerCharacter;
  state.willFail = isPlayerTurn ? !success : success;

  state.paused = false;
  state.kicking = true;

  // 🔊 Reproducir sonido según el personaje actual, JUSTO ANTES del efecto visual
  const character = state.currentTurn;

  switch (character) {
    case "pikachu":
      audio.electric.currentTime = 0;
      audio.electric
        .play()
        .catch((err) => console.warn("⚡ Error electric:", err));
      break;
    case "arceus":
      audio.kame.currentTime = 0;
      audio.kame.play().catch((err) => console.warn("💥 Error kame:", err));
      break;
    case "gyarados":
      audio.wave.currentTime = 0;
      audio.wave.play().catch((err) => console.warn("🌊 Error ola:", err));
      break;
    case "eevee":
      audio.air.currentTime = 0;
      audio.air.play().catch((err) => console.warn("🌬️ Error aire:", err));
      break;
    case "charmander":
      audio.fire.currentTime = 0;
      audio.fire.play().catch((err) => console.warn("🔥 Error fuego:", err));
      break;
    case "mewtwo":
      audio.kame.currentTime = 0;
      audio.kame
        .play()
        .catch((err) =>
          console.warn("☄️ No se pudo reproducir kame (Mewtwo):", err)
        );
      break;
  }

  // 🎬 Lanza el efecto visual tras el sonido
  triggerEffect();
}
