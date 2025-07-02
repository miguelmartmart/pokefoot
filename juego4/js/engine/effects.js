// engine/effects.js
import { ctx } from "../core/canvas.js";
import { sprites } from "../core/config.js";
import { state } from "../core/state.js";
import { audio } from "../core/config.js"; // ✅ esta línea faltaba

// ============================
// Control de animación
// ============================
let effectFrame = 0;
let effectTimer = 0;
const frameDelay = 5; // Tiempo entre frames de animación

// ============================
// Iniciar efecto visual + sonido
// ============================// engine/effects.js
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

  const character =
    state.currentTurn === state.playerCharacter
      ? state.playerCharacter
      : state.rivalCharacter;

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
      const fw = 350,
        fh = 100;

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
      const fw = 73; // Frame width
      const fh = 100; // Frame height
      const scale = 2; // 🔧 Cambia este valor para escalar ola

      const displayW = fw * scale;
      const displayH = fh * scale;
      const dx = ball.x - displayW / 2;
      const dy = ball.y - displayH + 40;

      const flip = state.playerCharacter !== "gyarados";

      if (flip) {
        ctx.save(); // 🔹 Guardar el contexto actual del canvas
        ctx.scale(-1, 1); // 🔹 Invertir horizontalmente el contexto
        ctx.drawImage(
          // 🔹 Dibujar imagen invertida
          sprites.wave, // Imagen fuente
          effectFrame * fw,
          0, // Coordenadas X,Y de corte (frame actual)
          fw,
          fh, // Tamaño del frame a recortar
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
          fw,
          fh,
          dx,
          dy,
          displayW,
          displayH
        );
      }

      if (advanceEffectFrame(8)) endEffect();
      break;
    }

    case "eevee": {
      const fw = 222; // Ancho de cada frame
      const fh = 111; // Alto de cada frame
      const scale = 1.5; // Escala visual del sprite

      const displayW = fw * scale;
      const displayH = fh * scale;

      const dx = ball.x - displayW / 2;
      const dy = ball.y - displayH + 40;

      const row = 0; // ✅ Tercera fila (índice 2)
      const sy = row * fh; // Coordenada Y del sprite
      const totalFrames = 6; // Eevee tiene 7 frames en esta fila

      // 🧠 Determinar si hay que hacer flip
      const isPlayerTurn = state.currentTurn === state.playerCharacter;
      const isPlayerEevee = state.playerCharacter === "eevee";
      const flip =
        (isPlayerTurn && isPlayerEevee) ||
        (!isPlayerTurn && state.rivalCharacter === "eevee");

      if (flip) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(
          sprites.aire,
          effectFrame * fw,
          sy,
          fw,
          fh,
          -dx - displayW,
          dy,
          displayW,
          displayH
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          sprites.aire,
          effectFrame * fw,
          sy,
          fw,
          fh,
          dx,
          dy,
          displayW,
          displayH
        );
      }

      if (advanceEffectFrame(totalFrames)) endEffect();
      break;
    }

    case "charmander": {
      const fw = 80; // ancho de frame en fuego_sprite.png
      const fh = 80; // alto
      const scale = 1.7;

      const displayW = fw * scale;
      const displayH = fh * scale;
      const dx = ball.x - displayW / 2;
      const dy = ball.y - displayH + 40;

      const isPlayerTurn = state.currentTurn === state.playerCharacter;
      const flip =
        (isPlayerTurn && state.playerCharacter === "charmander") ||
        (!isPlayerTurn && state.rivalCharacter === "charmander");

      if (flip) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(
          sprites.fuego,
          effectFrame * fw,
          0,
          fw,
          fh,
          -dx - displayW,
          dy,
          displayW,
          displayH
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          sprites.fuego,
          effectFrame * fw,
          0,
          fw,
          fh,
          dx,
          dy,
          displayW,
          displayH
        );
      }

      if (advanceEffectFrame(8)) endEffect(); // 8 frames
      break;
    }

case "mewtwo": {
  const fw = 260;
  const fh = 128;
  const dx = ball.x - fw / 2 + 10;
  const dy = ball.y - fh + 20;

  const isPlayerTurn = state.currentTurn === state.playerCharacter;
  const flip = (isPlayerTurn && state.playerCharacter === "mewtwo") ||
               (!isPlayerTurn && state.rivalCharacter === "mewtwo");

  if (flip) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(
      sprites.kame,
      0, effectFrame * fh,
      fw, fh,
      -dx - fw, dy,
      fw, fh
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      sprites.kame,
      0, effectFrame * fh,
      fw, fh,
      dx, dy,
      fw, fh
    );
  }

  if (advanceEffectFrame(30)) endEffect();
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
