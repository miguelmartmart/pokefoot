let showEffect = false;
let effectTimer = 0;
let effectFrame = 0;
const frameDelay = 3;

let currentEffect = ""; // 'pikachu' o 'arceus'

function drawEffect() {
  if (!showEffect) return;

  if (currentEffect === "pikachu") {
    const frameWidth = 92;
    const frameHeight = 200;
    const sx = effectFrame * frameWidth;
    const sy = 0;
    const sw = frameWidth;
    const sh = frameHeight;
    const dx = ball.x - frameWidth / 2 + 10;
    const dy = ball.y - frameHeight + 20;

    ctx.drawImage(raySprite, sx, sy, sw, sh, dx, dy, sw, sh);

    effectTimer++;
    if (effectTimer % frameDelay === 0) {
      effectFrame++;
      if (effectFrame >= 6) { // total frames de Pikachu
        endEffect();
      }
    }

  } else if (currentEffect === "arceus") {
    const frameWidth = 260;
    const frameHeight = 128;
    const sx = 0;
    const sy = effectFrame * frameHeight;
    const sw = frameWidth;
    const sh = frameHeight;
    const dx = ball.x - 20;
    const dy = ball.y - 60;

    ctx.drawImage(kameSprite, sx, sy, sw, sh, dx, dy, sw, sh);

    effectTimer++;
    if (effectTimer % frameDelay === 0) {
      effectFrame++;
      if (effectFrame >= 30) { // total frames del Kamehameha
        endEffect();
      }
    }
  }
}

function triggerEffect() {
  showEffect = true;
  effectTimer = 0;
  effectFrame = 0;
  currentEffect = currentTurn; // ← Se decide si es "pikachu" o "arceus"
  console.log(`🎬 Efecto activado para: ${currentEffect}`);
}

function endEffect() {
  showEffect = false;
  effectFrame = 0;
  effectTimer = 0;
  currentEffect = "";
  console.log("🎬 Efecto finalizado");
}
