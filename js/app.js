// ============================================
// app.js — Bootstrap / Punto de entrada
// Inicializa el juego "¿SE FUE?"
// ============================================

import { GameController } from './controller/GameController.js';

/**
 * ¿SE FUE? — Planta Eléctrica UJAP
 * Dirigido por Angel Torres & Luis Orellana
 * 
 * Arquitectura: MVC (Modelo-Vista-Controlador)
 * Tech Stack: Vanilla JS + HTML5 + CSS3 + Web Audio API
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log(`
    ╔══════════════════════════════════════╗
    ║         ¿ S E   F U E ?             ║
    ║   Planta Eléctrica — UJAP           ║
    ║                                      ║
    ║   Directores:                        ║
    ║   Angel Torres & Luis Orellana       ║
    ║                                      ║
    ║   Arquitectura: MVC                  ║
    ║   Motor: Vanilla JS + Web Audio      ║
    ╚══════════════════════════════════════╝
    `);

    // Crear e inicializar el controlador principal
    const game = new GameController();
    game.init();

    // Exponer para debugging (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
        window.__SEFUE_DEBUG__ = game;
    }
});
