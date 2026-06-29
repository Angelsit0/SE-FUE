// ============================================
// InputController.js — Gestión de entrada
// Captura clicks, botones y eventos del jugador
// ============================================

export class InputController {
    constructor() {
        this._listeners = {};
        this._debounceTimers = {};
    }

    /**
     * Inicializar todos los event listeners del juego
     */
    init(callbacks) {
        const {
            onWaitStart,
            onVerdadero,
            onFalso,
            onConfirmVenn,
            onResetVenn,
            onIniciar,
            onManual,
            onLeaderboard,
            onLogout,
            onRetry,
            onMenuFromGameover,
            onMenuFromVictory,
            onGameManual,
            onSkipIntro
        } = callbacks;

        // ─── Botones de Lógica ───
        this._bind('btn-verdadero', 'click', () => {
            this._debounce('logic', () => {
                if (onVerdadero) onVerdadero();
            }, 500);
        });

        this._bind('btn-falso', 'click', () => {
            this._debounce('logic', () => {
                if (onFalso) onFalso();
            }, 500);
        });

        // ─── Botones de Venn ───
        this._bind('btn-confirmar', 'click', () => {
            this._debounce('venn', () => {
                if (onConfirmVenn) onConfirmVenn();
            }, 500);
        });

        this._bind('btn-reset-venn', 'click', () => {
            if (onResetVenn) onResetVenn();
        });

        // ─── Pantalla Espera ───
        this._bind('btn-start-game', 'click', () => {
            if (onWaitStart) onWaitStart();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const waitScreen = document.getElementById('screen-wait');
                if (waitScreen && waitScreen.classList.contains('active')) {
                    if (onWaitStart) onWaitStart();
                }
            }
        });

        // ─── Menú Principal ───
        this._bind('btn-iniciar', 'click', () => {
            this._debounce('iniciar', () => {
                if (onIniciar) onIniciar();
            }, 1000);
        });

        this._bind('btn-skip-intro', 'click', () => {
            if (onSkipIntro) onSkipIntro();
        });

        this._bind('btn-manual', 'click', () => {
            if (onManual) onManual();
        });

        this._bind('btn-game-manual', 'click', () => {
            if (onGameManual) onGameManual();
        });

        this._bind('btn-leaderboard', 'click', () => {
            if (onLeaderboard) onLeaderboard();
        });

        this._bind('btn-logout', 'click', () => {
            if (onLogout) onLogout();
        });

        // ─── Game Over ───
        this._bind('btn-gameover-retry', 'click', () => {
            this._debounce('retry', () => {
                if (onRetry) onRetry();
            }, 1000);
        });

        this._bind('btn-gameover-menu', 'click', () => {
            if (onMenuFromGameover) onMenuFromGameover();
        });

        // ─── Victoria ───
        this._bind('btn-victory-menu', 'click', () => {
            if (onMenuFromVictory) onMenuFromVictory();
        });

        // ─── Teclado ───
        document.addEventListener('keydown', (e) => {
            // Solo responder si estamos en pantalla de juego
            if (e.key === 'v' || e.key === 'V') {
                // V para VERDADERO (en niveles de lógica)
                const btn = document.getElementById('btn-verdadero');
                if (btn && btn.closest('.game-controls.active')) {
                    btn.click();
                }
            } else if (e.key === 'f' || e.key === 'F') {
                // F para FALSO (en niveles de lógica)
                const btn = document.getElementById('btn-falso');
                if (btn && btn.closest('.game-controls.active')) {
                    btn.click();
                }
            } else if (e.key === 'Enter') {
                // Enter para confirmar Venn
                const btn = document.getElementById('btn-confirmar');
                if (btn && btn.closest('.game-controls.active')) {
                    btn.click();
                }
            } else if (e.key === 'Escape') {
                // Escape para cerrar manual
                const manualScreen = document.getElementById('screen-manual');
                if (manualScreen && manualScreen.classList.contains('active')) {
                    const closeBtn = document.getElementById('btn-manual-close');
                    if (closeBtn) closeBtn.click();
                }
            }
        });
    }

    /**
     * Bind genérico por ID de elemento
     */
    _bind(elementId, event, handler) {
        const el = document.getElementById(elementId);
        if (el) {
            el.addEventListener(event, handler);
            if (!this._listeners[elementId]) this._listeners[elementId] = [];
            this._listeners[elementId].push({ event, handler });
        }
    }

    /**
     * Debounce para prevenir double-clicks
     */
    _debounce(key, callback, delay = 300) {
        if (this._debounceTimers[key]) return;
        callback();
        this._debounceTimers[key] = setTimeout(() => {
            delete this._debounceTimers[key];
        }, delay);
    }

    /**
     * Desactivar botones temporalmente (durante feedback)
     */
    disableGameButtons(duration = 1500) {
        const buttons = ['btn-verdadero', 'btn-falso', 'btn-confirmar'];
        buttons.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.disabled = true;
                el.style.opacity = '0.5';
                el.style.pointerEvents = 'none';
            }
        });
        setTimeout(() => {
            buttons.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.disabled = false;
                    el.style.opacity = '';
                    el.style.pointerEvents = '';
                }
            });
        }, duration);
    }

    /**
     * Limpiar todos los listeners
     */
    destroy() {
        Object.entries(this._listeners).forEach(([id, handlers]) => {
            const el = document.getElementById(id);
            if (el) {
                handlers.forEach(({ event, handler }) => {
                    el.removeEventListener(event, handler);
                });
            }
        });
        this._listeners = {};
    }
}
