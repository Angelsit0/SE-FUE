/**
 * GameState.js - Singleton global game state with Observer pattern
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

export class GameState {
  constructor() {
    this.currentLevel = 0; // 0-3 for levels 1-4
    this.score = 0;
    this.timeRemaining = 300; // 5 minutes in seconds
    this.gameStatus = 'idle'; // idle, playing, paused, gameover, victory
    this.currentUser = null;
    this._observers = [];
  }

  subscribe(callback) {
    this._observers.push(callback);
  }

  _notify(event, data) {
    this._observers.forEach(cb => cb(event, data));
  }

  startGame() {
    this.score = 0;
    this.currentLevel = 0;
    this.timeRemaining = 300;
    this.gameStatus = 'playing';
    this._notify('gameStarted', {});
  }

  addScore(points = 500) {
    this.score += points;
    this._notify('scoreChanged', { score: this.score });
  }

  addTime(seconds = 15) {
    this.timeRemaining += seconds;
    this._notify('timeAdded', { time: this.timeRemaining, added: seconds });
  }

  removeTime(seconds = 20) {
    this.timeRemaining = Math.max(0, this.timeRemaining - seconds);
    this._notify('timeRemoved', { time: this.timeRemaining, removed: seconds });
    if (this.timeRemaining <= 0) this.triggerGameOver();
  }

  updateTime(dt) {
    if (this.gameStatus !== 'playing') return;
    this.timeRemaining = Math.max(0, this.timeRemaining - dt);
    this._notify('timeTick', { time: this.timeRemaining });
    if (this.timeRemaining <= 0) this.triggerGameOver();
  }

  nextLevel() {
    this.currentLevel++;
    if (this.currentLevel >= 4) {
      this.triggerVictory();
    } else {
      this._notify('levelChanged', { level: this.currentLevel });
    }
  }

  triggerGameOver() {
    this.gameStatus = 'gameover';
    this._notify('gameOver', { score: this.score, level: this.currentLevel });
  }

  triggerVictory() {
    this.gameStatus = 'victory';
    this._notify('victory', { score: this.score, time: this.timeRemaining });
  }

  setUser(user) {
    this.currentUser = user;
    this._notify('userChanged', { user });
  }

  reset() {
    this.currentLevel = 0;
    this.score = 0;
    this.timeRemaining = 300;
    this.gameStatus = 'idle';
  }

  getFormattedTime() {
    const m = Math.floor(this.timeRemaining / 60);
    const s = Math.floor(this.timeRemaining % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  getTimePercent() {
    return (this.timeRemaining / 300) * 100;
  }
}

export const gameState = new GameState();
