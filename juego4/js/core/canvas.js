// core/canvas.js
export let canvas, ctx;

export function initCanvas() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 400;
  console.log("Canvas inicializado:", canvas.width, canvas.height);
}
