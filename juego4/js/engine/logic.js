// engine/logic.js
import { state } from "../core/state.js";
import { audio } from "../core/config.js";

export function resetBall() {
  const b = state.ball;

  const isPlayerTurn = state.currentTurn === state.playerCharacter;
  b.x = isPlayerTurn ? 160 : 640;
  b.y = 260;
  b.speedX = 0;

  state.scored = false;
  state.kicking = false;
  state.kickDone = false;
  state.showEffect = false;

  const current = state[state.currentTurn];
  current.frame = 0;
  current.tick = 0;

  console.log("Ball reset for turn:", state.currentTurn);
}

export function updateTurn() {
  state.currentTurn = (state.currentTurn === state.playerCharacter)
    ? state.rivalCharacter
    : state.playerCharacter;

  const name = state.currentTurn.charAt(0).toUpperCase() + state.currentTurn.slice(1);

  document.getElementById("turnMessage").innerText = `Turno de ${name}`;
  document.getElementById("turnText").innerText = `Turno de ${name}`;
  document.getElementById("turnOverlay").style.display = "flex";
  document.getElementById("kickButton").disabled = true;
}
