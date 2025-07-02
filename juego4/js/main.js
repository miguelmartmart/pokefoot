import { initCanvas } from "./core/canvas.js";
import { setupControls } from "./ui/controls.js";
import { setupAudioToggle } from "./engine/audio.js";
import { checkOrientation } from "./ui/orientation.js";
import { gameLoop } from "./engine/loop.js";
import { setupTimingLogic } from "./ui/interaction.js";
import { setupSelection } from "./ui/selection.js";
import { audio } from "./core/config.js"; // ✅ Importa audio

window.onload = () => {
  initCanvas();
  setupControls();
  setupAudioToggle();
  setupTimingLogic();
  setupSelection(); // ahora contiene initState + initSprites cuando hay selección
  checkOrientation();
  gameLoop();

  // ✅ Reproducir música en primer clic del usuario
  document.body.addEventListener("click", () => {
    audio.background.play().catch(err => {
      console.warn("🎵 Autoplay bloqueado:", err);
    });
  }, { once: true });
};
