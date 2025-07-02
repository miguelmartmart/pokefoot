// engine/renderer.js
import { ctx } from "../core/canvas.js";
import { sprites } from "../core/config.js";
import { state } from "../core/state.js";

function shouldFreeze(character) {
  return state.scored && state.willFail && state.currentTurn !== character;
}

export function drawBackground() {
  ctx.clearRect(0, 0, 800, 400);
}

function drawCharacter(character) {
  const p = state[character];
  if (!p) return;

  const fw = p.frameWidth;
  const fh = p.frameHeight;
  const scale = p.scale || 2;
  const img = sprites[character];

  const isPlayer = character === state.playerCharacter;

  // ✅ Nueva lógica: invertir imagen si personaje jugador está a la izquierda
const shouldFlip =
  (["gyarados", "arceus", "eevee", "charmander", "mewtwo"].includes(character) && character === state.playerCharacter);



  ctx.save();

  if (shouldFlip) {
    ctx.translate(p.x + fw * scale, p.y);
    ctx.scale(-1, 1); // Invertir horizontalmente
  } else {
    ctx.translate(p.x, p.y);
  }

  // ❄️ Congelar en frame 2 si el personaje ha parado
  if (shouldFreeze(character)) {
    p.frame = 2;
  }

  ctx.drawImage(
    img,
    p.frame * fw,
    p.frameY * fh,
    fw, fh,
    0, 0,
    fw * scale, fh * scale
  );

  ctx.restore();

  // 🎞️ Animación de golpeo o idle
  if (state.kicking && state.currentTurn === character && !state.kickDone) {
    p.tick++;
    if (p.tick % 10 === 0) {
      p.frame++;
      if (p.frame >= 4) {
        state.kickDone = true;
        state.kicking = false;
        p.frame = 0;
      }
    }
  } else if (!shouldFreeze(character)) {
    p.tick++;
    if (p.tick % 10 === 0) {
      p.frame = (p.frame + 1) % 4;
    }
  }
}

export function drawBall() {
  const b = state.ball;
  ctx.drawImage(sprites.ball, b.x - b.radius, b.y - b.radius, b.radius * 2, b.radius * 2);
}

export function drawCharacters() {
  drawCharacter(state.playerCharacter);
  drawCharacter(state.rivalCharacter);
}
