// ui/controls.js
import { state } from "../core/state.js";
import { resetBall } from "../engine/logic.js";
import { triggerEffect } from "../engine/effects.js";
import { audio } from "../core/config.js";
import { pauseAndShowZone } from "../ui/interaction.js";

export function setupControls() {
  document.getElementById("kickButton").onclick = kick;
  document.getElementById("resetButton").onclick = resetBall;
  document.getElementById("continueButton").onclick = () => {
    document.getElementById("turnOverlay").style.display = "none";
    document.getElementById("kickButton").disabled = false;
  };
}

function kick() {
  if (state.kicking || state.scored) return;

  const shooter = state.currentTurn;
  const actor = state[shooter];

  state.kicking = true;
  state.kickDone = false;
  state.scored = false;
  state.willFail = Math.random() < 0.4;

  state.ball.y = 260;
  document.getElementById("kickButton").disabled = true;

  if (shooter === state.playerCharacter) {
    state.ball.x = 160;
    state.ball.speedX = 6;
  } else {
    state.ball.x = 640;
    state.ball.speedX = -6;
  }

  actor.tick = 0;
  actor.frame = 0;

  audio.kick.currentTime = 0;
  audio.kick.play().catch(e => console.warn("Error al reproducir audio:", e));
  triggerEffect();
  pauseAndShowZone(); // ✅ círculo de precisión
}
