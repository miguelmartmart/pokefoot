// Configuraciones generales y recursos compartidos
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



// Dimensiones internas lógicas para mantener resolución base
canvas.width = 800;
canvas.height = 400;

window.addEventListener("resize", () => {
  // Nada que cambiar: el canvas ya se escala visualmente por CSS
  console.log("Resize observado: canvas mantiene escala 800x400");
});

console.log("Canvas width:", canvas.width);
console.log("Canvas height:", canvas.height);

const pikachuSprite = new Image();
pikachuSprite.src = "assets/sprite_pikachu.png";
pikachuSprite.onload = () => console.log("pikachuSprite cargado correctamente desde", pikachuSprite.src);

const arceusSprite = new Image();
arceusSprite.src = "assets/arceus_sprite.png";
arceusSprite.onload = () => console.log("arceusSprite cargado correctamente desde", arceusSprite.src);


const raySprite = new Image();

raySprite.src = "assets/rayo_sprite.png";
raySprite.onload = () => console.log("raySprite cargado correctamente desde", raySprite.src);

const kameSprite = new Image();
kameSprite.src = "assets/kame_sprite.png"; // 🔥 Arceus

const ballSprite = new Image();
ballSprite.src = "assets/ball.png";
ballSprite.onload = () => console.log("ballSprite cargado correctamente desde", ballSprite.src);

const field = {
  width: canvas.width,
  height: canvas.height
};
console.log("field dimensions:", field);

// 🎵 Audio: música de fondo y efecto
const backgroundMusic = new Audio("assets/sounds/pokemusic.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const kickSound = new Audio("assets/sounds/kick.mp3");
kickSound.volume = 1;

let isMuted = false;

function toggleAudio() {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted;
  kickSound.muted = isMuted;

  const btn = document.getElementById("audioToggle");
  btn.innerText = isMuted ? "🔇 Audio OFF" : "🔊 Audio ON";
}

const audioGoal = new Audio("assets/sounds/gol.mp3");
const audioFail = new Audio("assets/sounds/fail_kick.mp3");

const aimHitSound = new Audio("assets/sounds/aim_hit.mp3"); // crea el archivo si quieres


