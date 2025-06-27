// Configuraciones generales y recursos compartidos
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
console.log("Canvas width:", canvas.width);
console.log("Canvas height:", canvas.height);

const pikachuSprite = new Image();
pikachuSprite.src = "assets/sprite_pikachu.png";
pikachuSprite.onload = () => console.log("pikachuSprite cargado correctamente desde", pikachuSprite.src);

const arceusSprite = new Image();
arceusSprite.src = "assets/arceus_sprite.png";
arceusSprite.onload = () => console.log("arceusSprite cargado correctamente desde", arceusSprite.src);


const raySprite = new Image();
raySprite.src = "assets/sprite_pikachu_rayo.png";
raySprite.onload = () => console.log("raySprite cargado correctamente desde", raySprite.src);

const ballSprite = new Image();
ballSprite.src = "assets/ball.png";
ballSprite.onload = () => console.log("ballSprite cargado correctamente desde", ballSprite.src);

const field = {
  width: canvas.width,
  height: canvas.height
};
console.log("field dimensions:", field);
