// js/ui/selection.js
import { state, initState } from "../core/state.js";
import { initSprites } from "../core/config.js";

let selectedPlayer = null;
let selectedRival = null;

export function setupSelection() {
  const cards = document.querySelectorAll(".selectable-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const char = card.dataset.character;

      if (
        card.classList.contains("selected-player") ||
        card.classList.contains("selected-rival")
      ) {
        return;
      }

      if (!selectedPlayer) {
        selectedPlayer = char;
        card.classList.add("selected-player");
      } else if (!selectedRival && char !== selectedPlayer) {
        selectedRival = char;
        card.classList.add("selected-rival");

        // Guardar en estado
        state.playerCharacter = selectedPlayer;
        state.rivalCharacter = selectedRival;
        state.currentTurn = selectedPlayer; // ✅ El jugador empieza

        initSprites();
        initState();

        document.getElementById("selectionScreen").style.display = "none";

        const name = selectedPlayer.charAt(0).toUpperCase() + selectedPlayer.slice(1);
        document.getElementById("turnMessage").innerText = `Turno de ${name}`;
        document.getElementById("turnText").innerText = `Turno de ${name}`;
        document.getElementById("turnOverlay").style.display = "flex";
        document.getElementById("kickButton").disabled = true;
      }
    });
  });
}
