// Lógica del juego principal con depuración detallada
let scored = false;

let scoreLeft = 0;
let scoreRight = 0;
let currentTurn = "pikachu"; // alterna entre 'pikachu' y 'arceus'

let willFail = false; // ← si fallará o no este chute

function updateTurn() {
  currentTurn = currentTurn === "pikachu" ? "arceus" : "pikachu";
  const name = currentTurn === "pikachu" ? "Pikachu" : "Arceus";
  document.getElementById("turnMessage").innerText = `Turno de ${name}`;
  document.getElementById("turnText").innerText = `Turno de ${name}`;
  document.getElementById("turnOverlay").style.display = "flex";
  document.getElementById("kickButton").disabled = true;
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log("drawBackground(): canvas limpio");
}

function updateBall() {
  if (scored) return;

  ball.x += ball.speedX;

  const goalLineLeft = 60;
  const goalLineRight = canvas.width - 60;

  // Pikachu chuta (hacia la derecha)
  if (currentTurn === "pikachu" && ball.x >= goalLineRight - ball.radius) {
    ball.speedX = 0;
    scored = true;

    if (willFail) {
      // Fallo: Arceus detiene el chute
      ball.x = goalLineRight - 60;
      ball.y += 20;
      document.getElementById("goalMessage").innerText = "🧤 ¡Arceus paró!";
      audioFail.play(); // ❌ sonido de fallo
    } else {
      // Gol de Pikachu
      ball.x = canvas.width - ball.radius - 4; // ¡hasta la red!
      scoreLeft++;
      document.getElementById("scoreLeft").innerText = scoreLeft;
      document.getElementById("goalMessage").innerText =
        "⚽ ¡GOOOL de Pikachu!";
      audioGoal.play(); // ✅ sonido de gol
    }

    document.getElementById("goalMessage").style.display = "block";

    setTimeout(() => {
      document.getElementById("goalMessage").style.display = "none";
      updateTurn();
      resetBall();
    }, 3000);
  }

  // Arceus chuta (hacia la izquierda)
  else if (currentTurn === "arceus" && ball.x <= goalLineLeft + ball.radius) {
    ball.speedX = 0;
    scored = true;

    if (willFail) {
      // Fallo: Pikachu detiene el chute
      ball.x = goalLineLeft + 60;
      ball.y += 20;
      document.getElementById("goalMessage").innerText = "🧤 ¡Pikachu paró!";
      audioFail.play(); // ❌ fallo
    } else {
      // Gol de Arceus
      ball.x = ball.radius + 4; // ¡hasta la red!
      scoreRight++;
      document.getElementById("scoreRight").innerText = scoreRight;
      document.getElementById("goalMessage").innerText = "⚽ ¡GOOOL de Arceus!";
      audioGoal.play(); // ✅ gol
    }

    document.getElementById("goalMessage").style.display = "block";

    setTimeout(() => {
      document.getElementById("goalMessage").style.display = "none";
      updateTurn();
      resetBall();
    }, 3000);
  }
}

function kick() {
  if (kicking || scored) return; // Previene doble click

  kicking = true;
  kickDone = false;
  scored = false;
  showEffect = true;
  willFail = Math.random() < 0.4; // ← Determina si fallará

  ball.y = 260; // Altura común para ambos

  // Desactiva botón hasta que termine la jugada
  document.getElementById("kickButton").disabled = true;

  if (currentTurn === "pikachu") {
    // Configuración de animación de Pikachu
    pikachu.tick = 0;
    pikachu.frame = 0;
    pikachu.frameY = 5;
    pikachu.frameWidth = 48.6;
    pikachu.frameHeight = 41;

    // Posición y velocidad del balón
    ball.x = 160; // izquierda
    ball.speedX = 3.5; // Velocidad hacia la derecha

    console.log("kick(): Pikachu chuta ➡️");

    pauseGame();
    setTimeout(() => {
      showAimCircle();
    }, 1000); // espera 1 segundo antes de mostrar el círculo
  } else {
    // Configuración de animación de Arceus
    arceus.tick = 0;
    arceus.frame = 0;
    arceus.frameY = 0;
    arceus.frameWidth = 51.5;
    arceus.frameHeight = 64;

    // Posición y velocidad del balón
    ball.x = canvas.width - 160; // derecha
    ball.speedX = -6; // hacia la izquierda

    console.log("kick(): Arceus chuta ⬅️");
  }

  kickSound.currentTime = 0;
  kickSound.play().catch((e) => console.warn("No se pudo reproducir kick:", e));

  audioKick.play();

  triggerEffect(); // Activa efecto de rayo (si lo usas)
}

function resetBall() {
  if (currentTurn === "pikachu") {
    ball.x = 160;
  } else {
    ball.x = canvas.width - 160;
  }

  ball.y = 260;
  ball.speedX = 0;

  scored = false;
  showEffect = false;
  kicking = false;
  kickDone = false;

  // Reset Pikachu idle por defecto
  pikachu.frame = 0;
  pikachu.frameY = 1;
  pikachu.frameWidth = 46;
  pikachu.frameHeight = 55;

  console.log("resetBall(): Reinicio para turno:", currentTurn);
}

function gameLoop() {
  if (paused) return; // 🛑 detiene la animación
  drawBackground();
  drawPikachu();
  drawArceus();
  drawBall();
  drawEffect();
  updateBall();
  loopId = requestAnimationFrame(gameLoop);
}


function showGoalMessage() {
  document.getElementById("goalMessage").style.display = "block";
}

let aiming = false;
let aimTimeout;
let aimConfirmed = false;

function showAimCircle() {
  const circle = document.getElementById("aimCircle");
  const x = Math.floor(Math.random() * 120) + canvas.width - 200;
  const y = Math.floor(Math.random() * 100) + 120;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.display = "block";

  aiming = true;
  aimConfirmed = false;

  aimTimeout = setTimeout(() => {
    circle.style.display = "none";
    aiming = false;
    willFail = true;
    resumeGame();
  }, 2000);
}


document.getElementById("aimCircle").addEventListener("click", () => {
  aimConfirmed = true;
  willFail = false;
  aiming = false;
  document.getElementById("aimCircle").style.display = "none";
  clearTimeout(aimTimeout);
  resumeGame();
});

let loopId = null;
let paused = false;

function pauseGame() {
  paused = true;
}

function resumeGame() {
  if (!paused) return;
  paused = false;
  gameLoop();
}


window.onload = () => {
  document.getElementById("kickButton").onclick = kick;
  document.getElementById("resetButton").onclick = resetBall;
  document.getElementById("audioToggle").onclick = toggleAudio;

  document.getElementById("continueButton").onclick = () => {
    document.getElementById("turnOverlay").style.display = "none";
    document.getElementById("kickButton").disabled = false;
  };

  // ⏯️ Inicia música solo si se permite interacción
  // 🎵 inicia música con primer clic del usuario (autoplay workaround)
  document.body.addEventListener(
    "click",
    () => {
      backgroundMusic
        .play()
        .catch((err) => console.warn("Autoplay bloqueado:", err));
    },
    { once: true }
  );

  // Solo mostrar el turno inicial una vez:
  document.getElementById("turnText").innerText = "Turno de Pikachu";
  document.getElementById("turnOverlay").style.display = "flex";

  gameLoop();

  // 🎯 Clic en el círculo para acertar
  document.getElementById("aimCircle").addEventListener("click", () => {
    aimConfirmed = true;
    willFail = false;
    aiming = false;
    document.getElementById("aimCircle").style.display = "none";
    clearTimeout(aimTimeout);

    // Sonido opcional al acertar
    if (typeof aimHitSound !== "undefined") aimHitSound.play();

    resumeGame();
  });
  
};
