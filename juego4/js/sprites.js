let kicking = false;
let kickDone = false;
const totalKickFrames = 8; // ← cantidad de sprites del chute


// Datos y funciones para Pikachu y balón con logs de depuración
const pikachu = {
  x: 60,
  y: 190,
  frame: 0,
  frameWidth: 46,
  frameHeight: 55,
  frameY: 1,
  tick: 0
};

const ball = {
  x: 160,
  y: 260,
  radius: 10,
  speedX: 0
};

/*
function drawPikachu() {
  console.log("drawPikachu(): x =", pikachu.x, "y =", pikachu.y, "frame =", pikachu.frame, "frameY =", pikachu.frameY);
  ctx.drawImage(
    pikachuSprite,
    pikachu.frame * pikachu.frameWidth,
    pikachu.frameY * pikachu.frameHeight,
    pikachu.frameWidth,
    pikachu.frameHeight,
    pikachu.x,
    pikachu.y,
    pikachu.frameWidth * 2,
    pikachu.frameHeight * 2
  );

  pikachu.tick++;
  if (pikachu.tick % 10 === 0) {
    pikachu.frame = (pikachu.frame + 1) % 4;
    console.log("drawPikachu(): cambio de frame a", pikachu.frame);
  }
}
*/

function drawPikachu() {
    console.log("drawPikachu(): x =", pikachu.x, "y =", pikachu.y, "frame =", pikachu.frame, "frameY =", pikachu.frameY);
  const fw = pikachu.frameWidth;
  const fh = pikachu.frameHeight;

  ctx.drawImage(
    pikachuSprite,
    pikachu.frame * fw,
    pikachu.frameY * fh,
    fw, fh,
    pikachu.x, pikachu.y,
    fw * 2,
    fh * 2
  );

  // Animación de chute
  if (kicking && !kickDone) {
    pikachu.tick++;
    if (pikachu.tick % 10 === 0) {
      pikachu.frame++;
      console.log("Animando chute: frame", pikachu.frame);
      /*
      if (pikachu.frame >= totalKickFrames) {
        kickDone = true;
        pikachu.frame = totalKickFrames - 1;
        console.log("Chute finalizado");
      }
        */
      if (pikachu.frame >= totalKickFrames) {
        kickDone = true;
        kicking = false;
        pikachu.frame = 0;         // volver a animación idle desde el principio
        pikachu.frameY = 1;        // ← Fila de caminar
        pikachu.frameWidth = 46;   // ← Tamaño del idle
        pikachu.frameHeight = 55;
        console.log("Chute finalizado → vuelve a idle");
        }

    }
  }

  // Animación de espera o caminar
  if (!kicking) {
    pikachu.tick++;
    if (pikachu.tick % 10 === 0) {
      pikachu.frame = (pikachu.frame + 1) % 4; // 4 frames por defecto
      console.log("Animación idle: frame", pikachu.frame);
    }
  }
}

// Arceus en portería derecha
const arceus = {
  x: canvas.width - 160, // o ajusta con precisión al borde derecho
  y: 150,
  frame: 0,
  frameWidth: 51.5,
  frameHeight: 64,
  frameY: 0
};



function drawArceus() {
  const fw = arceus.frameWidth;
  const fh = arceus.frameHeight;

  ctx.drawImage(
    arceusSprite,
    arceus.frame * fw,
    arceus.frameY * fh,
    fw, fh,
    arceus.x,
    arceus.y,
    fw * 2,
    fh * 2
  );

  // Animación de chute
  if (currentTurn === "arceus" && kicking && !kickDone) {
    arceus.tick++;
    if (arceus.tick % 10 === 0) {
      arceus.frame++;
      if (arceus.frame >= 4) {
        kickDone = true;
        kicking = false;
        arceus.frame = 0;
        console.log("Chute de Arceus finalizado");
      }
    }
  }

  // Idle si no chuta
  if (!kicking || currentTurn !== "arceus") {
    arceus.tick = (arceus.tick || 0) + 1;
    if (arceus.tick % 10 === 0) {
      arceus.frame = (arceus.frame + 1) % 4;
    }
  }
}







function drawBall() {
  console.log("drawBall(): x =", ball.x, "y =", ball.y, "speedX =", ball.speedX);
  ctx.drawImage(ballSprite, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}
