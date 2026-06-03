/**
 * TitleScreenView.js
 * Renders the title screen with spark particles on canvas.
 * Particles rise from the bottom with a glowing neon effect.
 */
export class TitleScreenView {
  constructor() {
    this.canvas = document.getElementById('sparks-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.sparks = [];
    this._animating = false;
  }

  /**
   * Initialize the canvas, create sparks, and start animating.
   */
  init() {
    if (!this.canvas) return;
    this._resizeCanvas();
    window.addEventListener('resize', () => this._resizeCanvas());
    this._animating = true;
    this._createSparks();
    this._animate();
  }

  _resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _createSparks() {
    for (let i = 0; i < 30; i++) {
      this.sparks.push(this._newSpark());
    }
  }

  _newSpark() {
    return {
      x: Math.random() * (this.canvas?.width || 800),
      y: Math.random() * (this.canvas?.height || 600),
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      size: Math.random() * 3 + 1,
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 100,
      color: Math.random() > 0.5 ? '#00f0ff' : '#ffcc00'
    };
  }

  _animate() {
    if (!this._animating || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.sparks.forEach((s, i) => {
      s.x += s.vx;
      s.y += s.vy;
      s.life++;

      const alpha = 1 - (s.life / s.maxLife);

      if (alpha <= 0 || s.y < 0) {
        this.sparks[i] = this._newSpark();
        this.sparks[i].y = this.canvas.height;
        return;
      }

      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fillStyle = s.color;
      this.ctx.globalAlpha = alpha;
      this.ctx.fill();

      // Glow effect
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = s.color;
      this.ctx.globalAlpha = 1;
      this.ctx.shadowBlur = 0;
    });

    requestAnimationFrame(() => this._animate());
  }

  /**
   * Stop the animation loop.
   */
  stop() {
    this._animating = false;
  }

  /**
   * Update the displayed username on the title screen.
   * @param {string} name - The username to display.
   */
  updateUsername(name) {
    const el = document.getElementById('title-username');
    if (el) el.textContent = name;
  }
}
