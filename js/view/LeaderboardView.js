/**
 * LeaderboardView.js
 * Retro terminal leaderboard display with staggered fade-in animations.
 */
export class LeaderboardView {
  constructor() {
    this.container = document.getElementById('leaderboard-entries');
    this.backBtn = document.getElementById('btn-leaderboard-back');
  }

  /**
   * Initialize the back button handler.
   * @param {function} onBack - Callback when "VOLVER AL MENÚ" is pressed.
   */
  init(onBack) {
    if (this.backBtn && onBack) this.backBtn.addEventListener('click', onBack);
  }

  /**
   * Render leaderboard entries or an empty state.
   * @param {Array<{position: number, name: string, score: number, rank: string}>} entries
   */
  render(entries) {
    if (!this.container) return;

    if (entries.length === 0) {
      this.container.innerHTML = `
        <div class="leaderboard-empty">
          <p>> Sin registros en el sistema...</p>
          <p>> Esperando primer operario...</p>
          <p class="blink">_</p>
        </div>`;
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];

    this.container.innerHTML = entries.map((e, i) => `
      <div class="leaderboard-entry" style="animation: fadeIn 0.5s ease ${i * 0.3}s both">
        <span class="leaderboard-rank">${medals[i] || ''} #${e.position}</span>
        <span class="leaderboard-name">${e.name}</span>
        <span class="leaderboard-score">${e.score} pts</span>
        <span class="leaderboard-title-text">Rango: ${e.rank}</span>
      </div>
    `).join('');
  }
}
