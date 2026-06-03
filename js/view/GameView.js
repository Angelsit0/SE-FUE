/**
 * GameView.js
 * Renders the game HUD, problem panel, and controls.
 * Handles both logic (true/false) and Venn diagram level types.
 */
export class GameView {
  constructor() {
    // HUD elements
    this.hudTimer = document.getElementById('hud-timer');
    this.hudScore = document.getElementById('hud-score');
    this.hudLevel = document.getElementById('hud-level');
    this.timerBarFill = document.getElementById('timer-bar-fill');

    // Problem elements
    this.problemTitle = document.getElementById('problem-title');
    this.problemDesc = document.getElementById('problem-description');
    this.problemExpr = document.getElementById('problem-expression');
    this.locationText = document.getElementById('game-location-text');

    // Controls
    this.logicControls = document.getElementById('logic-controls');
    this.vennControls = document.getElementById('venn-controls');
    this.wiresConnectControls = document.getElementById('wires-connect-controls');
    this.wiresCutControls = document.getElementById('wires-cut-controls');
    this.logicVariables = document.getElementById('logic-variables');

    // Background
    this.gameBgImg = document.getElementById('game-bg-img');

    // Feedback
    this.feedbackOverlay = document.getElementById('feedback-overlay');
    this.feedbackText = document.getElementById('feedback-text');
  }

  /**
   * Update the timer display and progress bar.
   * @param {string} formattedTime - e.g. "04:30"
   * @param {number} percent - 0–100 remaining time percentage.
   */
  updateTimer(formattedTime, percent) {
    if (this.hudTimer) {
      this.hudTimer.textContent = formattedTime;
      // Add danger class when low
      if (percent < 20) {
        this.hudTimer.classList.add('danger');
      } else {
        this.hudTimer.classList.remove('danger');
      }
    }
    if (this.timerBarFill) {
      this.timerBarFill.style.width = Math.max(0, percent) + '%';
    }
  }

  /**
   * Update the score display with a brief scale animation.
   * @param {number} score
   */
  updateScore(score) {
    if (this.hudScore) {
      this.hudScore.textContent = score;
      // Brief animation
      this.hudScore.style.transform = 'scale(1.3)';
      setTimeout(() => this.hudScore.style.transform = 'scale(1)', 200);
    }
  }

  /**
   * Update the level indicator (1-indexed display).
   * @param {number} levelIndex - 0-based level index.
   */
  updateLevel(levelIndex) {
    if (this.hudLevel) this.hudLevel.textContent = `${levelIndex + 1}/5`;
  }

  /**
   * Display a level's data: location, problem, background, and controls.
   * @param {object} levelData - Level configuration object.
   * @param {object} problemData - Specific problem to display.
   */
  showLevel(levelData, problemData) {
    // Set location
    if (this.locationText) this.locationText.textContent = `${levelData.locationIcon} ${levelData.location}`;

    // Set problem
    if (this.problemTitle) this.problemTitle.textContent = levelData.title;
    if (this.problemDesc) this.problemDesc.textContent = problemData.description;

    // Set background
    if (this.gameBgImg) {
      this.gameBgImg.src = levelData.backgroundImage;
      this.gameBgImg.alt = levelData.location;
    }

    // Hide all controls first
    [this.logicControls, this.vennControls, this.wiresConnectControls, this.wiresCutControls].forEach(c => {
      if (c) c.classList.remove('active');
    });

    // Show correct controls
    if (problemData.type === 'logic') {
      this._showLogicControls(problemData);
    } else if (problemData.type === 'venn') {
      this._showVennControls(problemData);
    } else if (problemData.type === 'wires-connect') {
      if (this.wiresConnectControls) this.wiresConnectControls.classList.add('active');
      if (this.problemExpr) this.problemExpr.textContent = '';
    } else if (problemData.type === 'wires-cut') {
      if (this.wiresCutControls) this.wiresCutControls.classList.add('active');
      if (this.problemExpr) this.problemExpr.textContent = '';
    }
  }

  /**
   * @private Show logic controls (true/false buttons + variables).
   */
  _showLogicControls(problemData) {
    if (this.logicControls) this.logicControls.classList.add('active');

    if (this.problemExpr) {
      this.problemExpr.textContent = `${problemData.expressionDetail}  →  ${problemData.expression}`;
    }

    // Show variables
    if (this.logicVariables) {
      this.logicVariables.innerHTML = '';
      Object.entries(problemData.variables).forEach(([name, value]) => {
        const div = document.createElement('div');
        div.className = 'logic-var';
        div.innerHTML = `<span class="var-name">${name}</span> = <span class="var-value ${value ? 'var-true' : 'var-false'}">${value ? 'VERDADERO' : 'FALSO'}</span>`;
        this.logicVariables.appendChild(div);
      });
    }
  }

  /**
   * @private Show Venn diagram controls.
   */
  _showVennControls(problemData) {
    if (this.vennControls) this.vennControls.classList.add('active');

    if (this.problemExpr) {
      this.problemExpr.textContent = `${problemData.operation}  →  ${problemData.operationDetail}`;
    }
  }

  /**
   * Show correct/incorrect feedback overlay.
   * @param {boolean} isCorrect
   */
  showFeedback(isCorrect) {
    if (!this.feedbackOverlay || !this.feedbackText) return;

    this.feedbackOverlay.className = 'feedback-overlay show ' + (isCorrect ? 'correct' : 'incorrect');
    this.feedbackText.className = 'feedback-text ' + (isCorrect ? 'correct' : 'incorrect');
    this.feedbackText.textContent = isCorrect
      ? '⚡ ¡ESTABILIZADO! +500 pts +15s'
      : '💥 ¡CORTOCIRCUITO! -20s';

    setTimeout(() => {
      this.feedbackOverlay.className = 'feedback-overlay';
    }, isCorrect ? 1500 : 1000);
  }
}
