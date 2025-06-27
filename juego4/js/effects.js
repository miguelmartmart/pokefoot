// Efecto de rayo al chutar con log detallado
let showEffect = false;
let effectTimer = 0;

function drawEffect() {
  if (showEffect) {
    const sx = 624;
    const sy = 0;
    const sw = 48;
    const sh = 96;
    const dx = ball.x - 10;
    const dy = ball.y - 80;
    ctx.drawImage(raySprite, sx, sy, sw, sh, dx, dy, sw, sh);
    console.log(`drawEffect(): sx=${sx}, sy=${sy}, sw=${sw}, sh=${sh}, dx=${dx}, dy=${dy}`);
    effectTimer--;
    if (effectTimer <= 0) {
      showEffect = false;
      console.log("drawEffect(): efecto finalizado");
    }
  }
}

function triggerEffect() {
  showEffect = true;
  effectTimer = 20;
  console.log("triggerEffect(): efecto activado, duración =", effectTimer);
}
