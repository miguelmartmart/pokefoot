// js/core/config.js
import { state } from "./state.js";

export const sprites = {
  pikachu: new Image(),
  arceus: new Image(),
  gyarados: new Image(),
  eevee: new Image(),
  charmander: new Image(),
  mewtwo: new Image(),
  ray: new Image(),
  kame: new Image(),
  wave: new Image(),
  aire: new Image(),
  fuego: new Image(),
  ball: new Image()
};

export const audio = {
  background: new Audio("assets/sounds/pokemusic.mp3"),
  kick: new Audio("assets/sounds/kick.mp3"),
  goal: new Audio("assets/sounds/gol.mp3"),
  fail: new Audio("assets/sounds/fail_kick.mp3"),
  wave: new Audio("assets/sounds/ola_sound.mp3"),
  air: new Audio("assets/sounds/aire_sound.mp3"),
  kame: new Audio("assets/sounds/kame_sound.mp3"),
  electric: new Audio("assets/sounds/electric_sound.mp3"),
  fire: new Audio("assets/sounds/fire_sound.mp3")
};

export function initSprites() {
  const { playerCharacter, rivalCharacter } = state;

  sprites[playerCharacter].src = `assets/sprite_${playerCharacter}.png`;
  sprites[rivalCharacter].src = `assets/sprite_${rivalCharacter}.png`;

  sprites.ray.src = "assets/rayo_sprite.png";
  sprites.kame.src = "assets/kame_sprite.png";
  sprites.wave.src = "assets/ola_sprite.png";
  sprites.aire.src = "assets/aire_sprite.png";
  sprites.fuego.src = "assets/fuego_sprite.png";
  sprites.ball.src = "assets/ball.png";
  

  // Configurar volumen y loop
  audio.background.loop = true;
  audio.background.volume = 0.5;
  audio.kick.volume = 1;
  audio.goal.volume = 1;
  audio.fail.volume = 1;
  audio.wave.volume = 0.7;
  audio.air.volume = 0.7;
  audio.kame.volume = 0.7;
  audio.electric.volume = 0.7;
  audio.fire.volume = 0.7;

  console.log("✅ Sprites y sonidos cargados:", playerCharacter, rivalCharacter);
}
