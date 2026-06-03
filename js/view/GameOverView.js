/**
 * GameOverView.js
 * Game over screen with dramatic blackout effect.
 * Displays the final score and offers retry/menu options.
 */
export class GameOverView {
  constructor() {
    this.scoreEl = document.getElementById('gameover-score');
    this.retryBtn = document.getElementById('btn-gameover-retry');
    this.menuBtn = document.getElementById('btn-gameover-menu');
  }

  /**
   * Initialize button handlers.
   * @param {function} onRetry - Callback for the retry button.
   * @param {function} onMenu - Callback for the main menu button.
   */
  init(onRetry, onMenu) {
    if (this.retryBtn && onRetry) this.retryBtn.addEventListener('click', onRetry);
    if (this.menuBtn && onMenu) this.menuBtn.addEventListener('click', onMenu);
  }

  /**
   * Display the game over screen with the final score.
   * @param {number} score - The player's final score.
   */
  show(score) {
    if (this.scoreEl) this.scoreEl.textContent = score;
  }
}
