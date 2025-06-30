// engine/physics.js
import { state } from "../core/state.js";
import { updateTurn, resetBall } from "./logic.js";
import { audio } from "../core/config.js";

export function updateBall() {
  if (state.scored || state.paused) return;

  const b = state.ball;
  b.x += b.speedX;

  const goalLeft = 60;
  const goalRight = 740;

  const shooter = state.currentTurn;
  const isPlayer = shooter === state.playerCharacter;

  if (isPlayer && b.x >= goalRight - b.radius) {
    handleShot(shooter, goalRight, "scoreLeft");
  } else if (!isPlayer && b.x <= goalLeft + b.radius) {
    handleShot(shooter, goalLeft, "scoreRight");
  }
}

function handleShot(shooter, goalX, scoreKey) {
  const b = state.ball;
  b.speedX = 0;
  state.scored = true;

  const name = shooter.charAt(0).toUpperCase() + shooter.slice(1);

  if (state.willFail) {
    // Rechace
    if (shooter === state.playerCharacter) {
      b.x = goalX - 100;
      b.y -= 10;
    } else {
      b.x = goalX + 80;
      b.y -= 10;
    }

const defender = shooter === state.playerCharacter
    ? state.rivalCharacter
    : state.playerCharacter;

  const defenderName = defender.charAt(0).toUpperCase() + defender.slice(1);

  document.getElementById("goalMessage").innerText = `🧤 ¡${defenderName} paró!`;
  audio.fail.play();
  } else {
    b.x = shooter === state.playerCharacter ? 796 : 4;
    state[scoreKey]++;
    document.getElementById(scoreKey).innerText = state[scoreKey];
    document.getElementById("goalMessage").innerText = `⚽ ¡GOOOL de ${name}!`;
    audio.goal.play();
  }

  document.getElementById("goalMessage").style.display = "block";

  setTimeout(() => {
    document.getElementById("goalMessage").style.display = "none";
    updateTurn();
    resetBall();
  }, 3000);
}
