/**
 * ScreenManager.js
 * Manages screen transitions with fade/glitch effects.
 * All screens use the '.screen' class; the active one has '.active'.
 */
export class ScreenManager {
  constructor() {
    this.screens = document.querySelectorAll('.screen');
    this.currentScreen = null;
  }

  /**
   * Show a screen by ID with a transition effect.
   * @param {string} screenId - The DOM id of the target screen.
   * @param {'fade'|'glitch'|'none'} transition - Transition type.
   */
  showScreen(screenId, transition = 'fade') {
    const target = document.getElementById(screenId);
    if (!target) return;

    // Hide all screens
    this.screens.forEach(s => {
      s.classList.remove('active');
      s.style.opacity = '0';
    });

    // Show target with transition
    target.classList.add('active');

    if (transition === 'fade') {
      target.style.opacity = '0';
      requestAnimationFrame(() => {
        target.style.transition = 'opacity 0.5s ease';
        target.style.opacity = '1';
      });
    } else if (transition === 'glitch') {
      target.style.opacity = '1';
      target.style.animation = 'glitch 0.3s ease';
      setTimeout(() => target.style.animation = '', 300);
    } else {
      target.style.opacity = '1';
    }

    this.currentScreen = screenId;
  }
}
