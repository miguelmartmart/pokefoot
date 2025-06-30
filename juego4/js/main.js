// main.js
import { initCanvas } from "./core/canvas.js";
import { setupControls } from "./ui/controls.js";
import { setupAudioToggle } from "./engine/audio.js";
import { checkOrientation } from "./ui/orientation.js";
import { gameLoop } from "./engine/loop.js";
import { setupTimingLogic } from "./ui/interaction.js";
import { setupSelection } from "./ui/selection.js";

window.onload = () => {
  initCanvas();
  setupControls();
  setupAudioToggle();
  setupTimingLogic();
  setupSelection(); // ahora contiene initState + initSprites cuando hay selección
  checkOrientation();
  gameLoop();
};
