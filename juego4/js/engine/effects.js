// engine/effects.js
import { ctx } from "../core/canvas.js";
import { sprites } from "../core/config.js";
import { state } from "../core/state.js";

// ============================
// Control de animación
// ============================
let effectFrame = 0;
let effectTimer = 0;
const frameDelay = 3; // Tiempo entre frames de animación

// ============================
// Iniciar efecto visual
// ============================
export function triggerEffect() {
  state.showEffect = true;
  effectTimer = 0;
  effectFrame = 0;
  console.log("🎬 Efecto visual activado para:", state.currentTurn);
}

// ============================
// Dibujar efecto en el canvas
// ============================
export function drawEffect() {
  if (!state.showEffect) return;

  const character = state.currentTurn;
  const ball = state.ball;

  switch (character) {
    // Pikachu → rayo
    case "pikachu": {
      const fw = 92,
        fh = 200;

      ctx.drawImage(
        sprites.ray,
        effectFrame * fw,
        0,
        fw,
        fh,
        ball.x - fw / 2 + 10,
        ball.y - fh + 20,
        fw,
        fh
      );

      if (advanceEffectFrame(6)) endEffect();
      break;
    }

    // Arceus → kamehameha
    case "arceus": {
      const fw = 260,
        fh = 128;

      ctx.drawImage(
        sprites.kame,
        0,
        effectFrame * fh,
        fw,
        fh,
        ball.x - 20,
        ball.y - 60,
        fw,
        fh
      );

      if (advanceEffectFrame(30)) endEffect();
      break;
    }

    // Gyarados → ola
    case "gyarados": {
      const fw = 64; // Frame width
      const fh = 222; // Frame height
      const scale = 1.5; // 🔧 Cambia este valor para escalar ola

      const displayW = fw * scale;
      const displayH = fh * scale;
      const dx = ball.x - displayW / 2;
      const dy = ball.y - displayH + 40;

      const flip = state.playerCharacter === "gyarados";

      if (flip) {
        ctx.save(); // 🔹 Guardar el contexto actual del canvas
        ctx.scale(-1, 1); // 🔹 Invertir horizontalmente el contexto
        ctx.drawImage(
          // 🔹 Dibujar imagen invertida
          sprites.wave, // Imagen fuente
          effectFrame * fw,
          0, // Coordenadas X,Y de corte (frame actual)
          60,
          100, // Tamaño del frame a recortar
          -dx - displayW,
          dy, // Coordenadas invertidas para dibujar (¡atención al -dx!)
          displayW,
          displayH // Tamaño a mostrar en pantalla
        );
        ctx.restore(); // 🔹 Restaurar orientación original del canvas
      } else {
        ctx.drawImage(
          // 🔹 Dibujar imagen normal si es el rival
          sprites.wave,
          effectFrame * fw,
          0,
          60,
          100,
          dx,
          dy,
          displayW,
          displayH
        );
      }

      if (advanceEffectFrame(8)) endEffect();
      break;
    }

    default:
      endEffect(); // Seguridad
  }
}

// ============================
// Avanzar frame de animación
// ============================
function advanceEffectFrame(totalFrames) {
  effectTimer++;
  if (effectTimer % frameDelay === 0) {
    effectFrame++;
    return effectFrame >= totalFrames;
  }
  return false;
}

// ============================
// Finalizar efecto visual
// ============================
function endEffect() {
  state.showEffect = false;
  effectFrame = 0;
  effectTimer = 0;
}
