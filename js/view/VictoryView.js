/**
 * VictoryView.js
 * Victory screen with energy restoration effects.
 * Shows the final score and remaining time.
 */
export class VictoryView {
  constructor() {
    this.scoreEl = document.getElementById('victory-score');
    this.timeEl = document.getElementById('victory-time');
    this.menuBtn = document.getElementById('btn-victory-menu');
  }

  /**
   * Initialize the menu button handler.
   * @param {function} onMenu - Callback for the main menu button.
   */
  init(onMenu) {
    if (this.menuBtn && onMenu) this.menuBtn.addEventListener('click', onMenu);
  }

  /**
   * Display the victory screen with score and time.
   * @param {number} score - The player's final score.
   * @param {string} formattedTime - Remaining time as "MM:SS".
   */
  show(score, formattedTime) {
    if (this.scoreEl) this.scoreEl.textContent = score;
    if (this.timeEl) this.timeEl.textContent = `Tiempo restante: ${formattedTime}`;
  }
}
