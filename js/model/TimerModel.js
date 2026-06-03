/**
 * TimerModel.js - Precise game timer using requestAnimationFrame
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

export class TimerModel {
  constructor(gameState) {
    this.gameState = gameState;
    this._rafId = null;
    this._lastTime = 0;
    this._running = false;
  }

  start() {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now();
    this._tick();
  }

  _tick() {
    if (!this._running) return;
    const now = performance.now();
    const dt = (now - this._lastTime) / 1000; // delta in seconds
    this._lastTime = now;
    this.gameState.updateTime(dt);
    if (this.gameState.gameStatus === 'playing') {
      this._rafId = requestAnimationFrame(() => this._tick());
    } else {
      this._running = false;
    }
  }

  stop() {
    this._running = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  reset() {
    this.stop();
  }
}
