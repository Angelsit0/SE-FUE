import { gameState } from '../model/GameState.js';
import { UserModel } from '../model/UserModel.js';

/**
 * StoreController.js - "El Kiosko de Firulais" (Tienda, Ruleta y Cosméticos)
 * Game: ¿SE FUE?
 * Layer: Controller (MVC)
 */
export class StoreController {
    constructor() {
        this.userModel = new UserModel();
        this.isSpinning = false;
        
        // Items de la tienda y sus efectos
        this.items = {
            tequeno: { 
                cost: 150, 
                apply: () => { 
                    gameState.addTime(30); 
                } 
            },
            apuntes: { 
                cost: 300, 
                apply: () => { 
                    gameState.addScore(250); 
                    gameState.nextLevel(); 
                    this.closeStore(); 
                } 
            },
            doble: { 
                cost: 200, 
                apply: () => { 
                    // Necesitará soporte en GameController para consumir esto
                    gameState.doublePoints = true; 
                } 
            },
            freeze: { 
                cost: 250, 
                apply: () => { 
                    // Necesitará soporte en GameController
                    gameState.freezeTime = 15; 
                } 
            },
            hint: { 
                cost: 175, 
                apply: () => { 
                    // Necesitará soporte en GameController
                    gameState.hintAvailable = true; 
                } 
            }
        };

        // Secciones de la Ruleta
        this.wheelSections = [
            { label: '🐶 x3', color: '#FFD700', multiplier: 3 }, // Dorado
            { label: '⚡ x2', color: '#00f0ff', multiplier: 2 }, // Cyan
            { label: '💀 NADA', color: '#ff3333', multiplier: 0 }, // Rojo
            { label: '🎓 x1.5', color: '#00ff66', multiplier: 1.5 }, // Verde
            { label: '💀 NADA', color: '#ff3333', multiplier: 0 }, // Rojo
            { label: '⚡ x2', color: '#00f0ff', multiplier: 2 }, // Cyan
            { label: '💀 NADA', color: '#ff3333', multiplier: 0 }, // Rojo
            { label: '😏 x2', color: '#ff69b4', multiplier: 2 }  // Rosa (5to piso)
        ];

        this.currentAngle = 0; // Ángulo actual de la ruleta

        this.dialogues = [
            '"¡Guau guau! (¿Qué vas a llevar, estudiante? Todo está caro hoy)"',
            '"¡Guau! (Si no compras nada, al menos acaríciame)"',
            '"¡Grrr! (No fío, estudiante. ¡Solo pago al contado!)"',
            '"¡Arf! (Ese tequeño me estaba viendo feo, deberías comprarlo)"',
            '"*Mueve la cola* (Dicen que la ruleta está arreglada... ¡MINTIRAS!)"'
        ];

        this.init();
    }

    init() {
        // Elementos DOM
        this.screenStore = document.getElementById('screen-store');
        this.coinsDisplay = document.getElementById('store-coins-display');
        this.dialogueDisplay = document.getElementById('store-dialogue');
        this.messageDisplay = document.getElementById('store-message');
        this.canvas = document.getElementById('roulette-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.btnSpin = document.getElementById('btn-spin-roulette');
        this.inputBet = document.getElementById('bet-amount');
        this.resultDisplay = document.getElementById('roulette-result');

        // Botones de abrir/cerrar
        const btnGameStore = document.getElementById('btn-game-store');
        const btnTitleStore = document.getElementById('btn-title-store');
        const btnClose = document.getElementById('btn-store-close');

        if (btnGameStore) btnGameStore.addEventListener('click', () => this.openStore());
        if (btnTitleStore) btnTitleStore.addEventListener('click', () => this.openStore());
        if (btnClose) btnClose.addEventListener('click', () => this.closeStore());

        // Sistema de Tabs
        const tabs = document.querySelectorAll('.store-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.storeTab));
        });

        // Botones de Compra de Tienda
        const buyBtns = document.querySelectorAll('#store-tab-shop .btn-buy[data-item]');
        buyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.dataset.item;
                const cost = parseInt(e.target.dataset.cost || 0);
                this.buyItem(item, cost);
            });
        });

        // Botón girar ruleta
        if (this.btnSpin) {
            this.btnSpin.addEventListener('click', () => this.spinRoulette());
        }

        // Cosméticos (futuro)
        const cosmeticsBtns = document.querySelectorAll('#store-tab-cosmetics .btn-buy');
        cosmeticsBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showMessage('Los cosméticos llegarán en la próxima actualización.', 'error');
            });
        });

        // Observar cambios en monedas del GameState
        gameState.subscribe((event, data) => {
            if (event === 'coinsChanged') {
                this.updateCoinsDisplay();
                // Persistir en UserModel
                if (gameState.currentUser) {
                    this.userModel.updateCoins(gameState.currentUser.id, data.coins);
                }
            }
        });

        // Dibujar estado inicial de ruleta
        if (this.canvas) {
            this.drawRouletteWheel();
        }
    }

    switchTab(tabId) {
        document.querySelectorAll('.store-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.store-tab-content').forEach(c => c.classList.remove('active'));
        
        const activeTab = document.querySelector(`.store-tab[data-store-tab="${tabId}"]`);
        const activeContent = document.getElementById(`store-tab-${tabId}`);
        
        if (activeTab) activeTab.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    openStore() {
        if (gameState.gameStatus === 'playing') {
            gameState.pauseGame();
        }
        this.updateCoinsDisplay();
        this.randomizeDialogue();
        
        if (this.screenStore) {
            this.screenStore.classList.add('active');
        }
        
        // Redibujar ruleta para asegurar que se vea bien
        if (this.canvas && !this.isSpinning) {
            this.drawRouletteWheel();
        }
    }

    closeStore() {
        if (this.screenStore) {
            this.screenStore.classList.remove('active');
        }
        if (gameState.gameStatus === 'paused') {
            gameState.resumeGame();
        }
    }

    updateCoinsDisplay() {
        if (this.coinsDisplay) {
            this.coinsDisplay.textContent = gameState.coins;
        }
    }

    randomizeDialogue() {
        if (this.dialogueDisplay) {
            const index = Math.floor(Math.random() * this.dialogues.length);
            this.dialogueDisplay.textContent = this.dialogues[index];
        }
    }

    showMessage(text, type = 'success') {
        if (!this.messageDisplay) return;
        this.messageDisplay.textContent = text;
        this.messageDisplay.className = `store-message show ${type}`;
        setTimeout(() => {
            this.messageDisplay.classList.remove('show');
        }, 3000);
    }

    buyItem(itemId, cost) {
        // Los items con impacto en partida solo se pueden comprar si hay partida pausada
        if (gameState.gameStatus !== 'paused' && gameState.gameStatus !== 'playing') {
            this.showMessage('Los consumibles solo se pueden comprar durante una partida.', 'error');
            this.playBeep(200, 'sawtooth', 0.2);
            return;
        }

        if (gameState.coins >= cost) {
            const item = this.items[itemId];
            if (item) {
                gameState.removeCoins(cost); // RemoveCoins notifica a los observadores
                item.apply();
                this.showMessage('¡Compra exitosa! Firulais está feliz.', 'success');
                this.playBeep(600, 'sine', 0.1);
            }
        } else {
            this.showMessage('No tienes suficientes coins. ¡Consigue más!', 'error');
            this.playBeep(200, 'sawtooth', 0.2);
        }
    }

    // ============================================
    // CANVAS ROULETTE LOGIC
    // ============================================

    drawRouletteWheel() {
        if (!this.ctx) return;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = centerX - 10;
        const numSections = this.wheelSections.length;
        const arc = (Math.PI * 2) / numSections;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < numSections; i++) {
            const angle = this.currentAngle + i * arc;
            const section = this.wheelSections[i];

            // Dibujar rebanada
            this.ctx.beginPath();
            this.ctx.fillStyle = section.color;
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
            this.ctx.lineTo(centerX, centerY);
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#000';
            this.ctx.stroke();

            // Dibujar texto
            this.ctx.save();
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 14px "Press Start 2P", monospace';
            
            // Mover contexto al centro del texto en la rebanada
            this.ctx.translate(
                centerX + Math.cos(angle + arc / 2) * (radius - 50),
                centerY + Math.sin(angle + arc / 2) * (radius - 50)
            );
            // Rotar el texto para que apunte hacia afuera
            this.ctx.rotate(angle + arc / 2 + Math.PI / 2);
            
            this.ctx.fillText(section.label, -this.ctx.measureText(section.label).width / 2, 0);
            this.ctx.restore();
        }

        // Círculo central
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        this.ctx.fillStyle = '#111';
        this.ctx.fill();
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#ffcc00';
        this.ctx.stroke();
    }

    spinRoulette() {
        if (this.isSpinning) return;

        const betStr = this.inputBet.value;
        const bet = parseInt(betStr);

        if (isNaN(bet) || bet < 10) {
            this.showMessage('La apuesta mínima es de 10 coins.', 'error');
            return;
        }

        if (gameState.coins < bet) {
            this.showMessage('No tienes suficientes coins para esta apuesta.', 'error');
            return;
        }

        // Descontar la apuesta inmediatamente
        gameState.removeCoins(bet);
        
        this.isSpinning = true;
        this.resultDisplay.textContent = 'GIRANDO...';
        this.resultDisplay.style.color = '#fff';
        this.btnSpin.disabled = true;

        // Física básica
        let velocity = 0.3 + Math.random() * 0.1; // velocidad inicial aleatoria
        const friction = 0.985; // fricción para desacelerar suavemente

        const animate = () => {
            this.currentAngle += velocity;
            this.currentAngle %= Math.PI * 2;
            this.drawRouletteWheel();

            velocity *= friction;

            if (velocity > 0.002) {
                // Generar sonido tic tic tic rápido basado en velocidad
                if (Math.random() < velocity) {
                    this.playBeep(400, 'square', 0.02);
                }
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                this.btnSpin.disabled = false;
                this.determineWinner(bet);
            }
        };

        requestAnimationFrame(animate);
    }

    determineWinner(bet) {
        const numSections = this.wheelSections.length;
        const arc = Math.PI * 2 / numSections;
        
        // Normalizar ángulo entre 0 y 2PI
        let normalizedAngle = this.currentAngle % (Math.PI * 2);
        if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;
        
        // El puntero está fijo en la parte superior del canvas, que equivale a 270 grados (Math.PI * 1.5)
        let relativePointerAngle = Math.PI * 1.5 - normalizedAngle;
        if (relativePointerAngle < 0) relativePointerAngle += Math.PI * 2;
        
        // Calcular en qué sección cayó el puntero
        const winningIndex = Math.floor(relativePointerAngle / arc);
        const section = this.wheelSections[winningIndex];

        if (section.multiplier > 0) {
            const winnings = Math.floor(bet * section.multiplier);
            gameState.addCoins(winnings);
            
            this.resultDisplay.textContent = `¡GANASTE! x${section.multiplier} (+${winnings} Coins)`;
            this.resultDisplay.style.color = '#00ff66';
            this.showMessage(`¡Gran jugada! Firulais te sonríe.`, 'success');
            
            this.playBeep(800, 'square', 0.2);
            setTimeout(() => this.playBeep(1000, 'square', 0.2), 150);
        } else {
            this.resultDisplay.textContent = `PERDISTE... ¡NADA!`;
            this.resultDisplay.style.color = '#ff3333';
            this.showMessage(`Perdiste el pasaje. ¡Guau!`, 'error');
            
            this.playBeep(200, 'sawtooth', 0.3);
            setTimeout(() => this.playBeep(150, 'sawtooth', 0.4), 300);
        }
    }

    // Audio procedimental usando Web Audio API
    playBeep(freq = 440, type = 'sine', vol = 0.1) {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = type;
            oscillator.frequency.value = freq;
            gainNode.gain.value = vol;
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            // Desvanecimiento suave
            gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);
            oscillator.stop(audioCtx.currentTime + 0.3);
        } catch (e) {
            // Ignorar errores si el navegador bloquea AudioContext por falta de interacción
        }
    }
}
