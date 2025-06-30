// engine/loop.js
import { drawBackground, drawCharacters, drawBall } from "./renderer.js";
import { drawEffect } from "./effects.js";
import { updateBall } from "./physics.js";
import { state } from "../core/state.js";

export function gameLoop() {
  if (!state.paused) {
    drawBackground();
    drawCharacters(); // ✅ reemplaza drawPlayer + drawRival
    drawBall();
    drawEffect();
    updateBall();
  }

  requestAnimationFrame(gameLoop);
}
