// engine/audio.js
import { audio } from "../core/config.js";

let isMuted = false;

export function setupAudioToggle() {
  const btn = document.getElementById("audioToggle");
  btn.onclick = toggleAudio;
}

function toggleAudio() {
  isMuted = !isMuted;
  Object.values(audio).forEach(a => a.muted = isMuted);
  const btn = document.getElementById("audioToggle");
  btn.innerText = isMuted ? "🔇 Audio OFF" : "🔊 Audio ON";
}
