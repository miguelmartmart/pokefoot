// core/state.js

export const POKEMON_PROFILES = {
  pikachu: {
    left: {
      x: 60,
      y: 190,
      frameWidth: 46,
      frameHeight: 55,
      frameY: 1,
      scale: 2,
    },
    right: {
      x: 600,
      y: 190,
      frameWidth: 46,
      frameHeight: 55,
      frameY: 1,
      scale: 2,
    },
  },
  arceus: {
    left: {
      x: 60,
      y: 120,
      frameWidth: 74,
      frameHeight: 80,
      frameY: 0,
      scale: 2,
    },
    right: {
      x: 590,
      y: 120,
      frameWidth: 74,
      frameHeight: 80,
      frameY: 0,
      scale: 2,
    },
  },
  gyarados: {
    left: {
      x: 65,
      y: 100,
      frameWidth: 112.3,
      frameHeight: 105,
      frameY: 0,
      scale: 1.8,
    },
    right: {
      x: 530,
      y: 100,
      frameWidth: 112.3,
      frameHeight: 105,
      frameY: 0,
      scale: 1.8,
    },
  },
  eevee: {
    left: {
      x: 90,
      y: 180,
      frameWidth: 50.7,
      frameHeight: 49.5,
      frameY: 2,
      scale: 2,
    },
    right: {
      x: 600,
      y: 180,
      frameWidth: 50.7,
      frameHeight: 49.5,
      frameY: 2,
      scale: 2,
    },
  },
  charmander: {
    left: {
      x: 70,
      y: 180,
      frameWidth: 55,
      frameHeight: 50,
      frameY: 2,
      scale: 2,
    },
    right: {
      x: 610,
      y: 180,
      frameWidth: 55,
      frameHeight: 50,
      frameY: 2,
      scale: 2,
    },
  },
  mewtwo: {
    left: {
      x: 65,
      y: 130,
      frameWidth: 83,
      frameHeight: 72,
      frameY: 0,
      scale: 2,
    },
    right: {
      x: 565,
      y: 140,
      frameWidth: 83,
      frameHeight: 72,
      frameY: 0,
      scale: 2,
    },
  },
};

export const state = {
  currentTurn: "pikachu",
  scored: false,
  scoreLeft: 0,
  scoreRight: 0,
  kicking: false,
  kickDone: false,
  willFail: false,
  showEffect: false,
  paused: false,
  ball: {},
  playerCharacter: "pikachu",
  rivalCharacter: "arceus",
};

export function initState() {
  const player = state.playerCharacter;
  const rival = state.rivalCharacter;

  // Borra personajes previos si existen
  delete state.pikachu;
  delete state.arceus;
  delete state.gyarados;
  delete state.eevee;
  delete state.charmander;
    delete state.mewtwo;

  const playerProfile = POKEMON_PROFILES[player].left;
  const rivalProfile = POKEMON_PROFILES[rival].right;

  state[player] = {
    x: playerProfile.x,
    y: playerProfile.y,
    frame: 0,
    frameWidth: playerProfile.frameWidth,
    frameHeight: playerProfile.frameHeight,
    frameY: playerProfile.frameY,
    scale: playerProfile.scale,
    tick: 0,
  };

  state[rival] = {
    x: rivalProfile.x,
    y: rivalProfile.y,
    frame: 0,
    frameWidth: rivalProfile.frameWidth,
    frameHeight: rivalProfile.frameHeight,
    frameY: rivalProfile.frameY,
    scale: rivalProfile.scale,
    tick: 0,
  };

  state.ball = {
    x: 160,
    y: 260,
    radius: 10,
    speedX: 0,
  };

  console.log("Estado inicializado con perfiles por lado:", player, rival);
}
