// ============================================
// GameController.js — Controlador Principal
// Loop de juego, gestión de niveles, validación
// ============================================

import { gameState } from '../model/GameState.js';
import { LEVELS, getRandomProblem, validateLogicAnswer, validateVennAnswer, validateWireCut } from '../model/LevelData.js';
import { TimerModel } from '../model/TimerModel.js';
import { LeaderboardModel } from '../model/LeaderboardModel.js';
import { UserModel } from '../model/UserModel.js';

import { ScreenManager } from '../view/ScreenManager.js';
import { TitleScreenView } from '../view/TitleScreenView.js';
import { GameView } from '../view/GameView.js';
import { VennDiagramView } from '../view/VennDiagramView.js';
import { ManualView } from '../view/ManualView.js';
import { LeaderboardView } from '../view/LeaderboardView.js';
import { GameOverView } from '../view/GameOverView.js';
import { VictoryView } from '../view/VictoryView.js';
import { RegisterView } from '../view/RegisterView.js';
import { AdminView } from '../view/AdminView.js';

import { MemoryGameView } from '../view/MemoryGameView.js';
import { SequenceView } from '../view/SequenceView.js';
import { QuickMathView } from '../view/QuickMathView.js';
import { CircuitMazeView } from '../view/CircuitMazeView.js';

import { InputController } from './InputController.js';
import { AudioController } from './AudioController.js';

export class GameController {
    constructor() {
        // ─── Modelos ───
        this.timer = new TimerModel(gameState);
        this.leaderboard = new LeaderboardModel();
        this.userModel = new UserModel();

        // ─── Vistas ───
        this.screenManager = new ScreenManager();
        this.titleView = new TitleScreenView();
        this.gameView = new GameView();
        this.vennView = new VennDiagramView();
        this.manualView = new ManualView();
        this.leaderboardView = new LeaderboardView();
        this.gameOverView = new GameOverView();
        this.victoryView = new VictoryView();
        this.registerView = new RegisterView();
        this.adminView = new AdminView();
        
        // Mini-game views
        this.memoryView = new MemoryGameView();
        this.sequenceView = new SequenceView();
        this.quickmathView = new QuickMathView();
        this.circuitmazeView = new CircuitMazeView();

        // ─── Controladores ───
        this.inputController = new InputController();
        this.audio = new AudioController();

        // ─── Estado interno ───
        this._alarmPlayed = false;
        this._tickCounter = 0;
    }

    /**
     * Inicializar todo el sistema
     */
    init() {
        console.log('🎮 ¿SE FUE? — Inicializando sistema...');

        // Suscribirse a cambios del estado
        gameState.subscribe((event, data) => this._handleStateChange(event, data));

        // Inicializar vistas
        this._initViews();

        // Inicializar input
        this._initInput();

        // Mostrar pantalla de espera inicial
        this.screenManager.showScreen('screen-wait', 'fade');

        console.log('⚡ Sistema listo. Esperando inicio de sesión...');
    }

    // ═══════════════════════════════════════════════
    // INICIALIZACIÓN
    // ═══════════════════════════════════════════════

    _initViews() {
        // Register View
        this.registerView.init(
            (username, password) => this._handleLogin(username, password),
            (name, username, password) => this._handleRegister(name, username, password),
            () => this._showAdminScreen()
        );

        // Manual View
        this.manualView.init(() => {
            this.audio.playClick();
            if (this._previousScreen === 'screen-game') {
                gameState.resumeGame();
                this.timer.start();
                this.screenManager.showScreen('screen-game', 'fade');
            } else {
                this.screenManager.showScreen('screen-title', 'fade');
            }
        });

        // Leaderboard View
        this.leaderboardView.init(() => {
            this.audio.playClick();
            this.screenManager.showScreen('screen-title', 'fade');
        });

        // Game Over View
        this.gameOverView.init(
            () => this._startGame(),    // Retry
            () => this._goToTitle()     // Menu
        );

        // Victory View
        this.victoryView.init(
            () => this._goToTitle()     // Menu
        );

        // Admin View
        this.adminView.init(
            (password) => this._handleAdminLogin(password),
            () => this._goToRegister(),
            (userId) => this._handleDeleteUser(userId),
            (scoreId) => this._handleDeleteScore(scoreId),
            () => this._handleClearScores()
        );

        // Title screen sparks
        this.titleView.init();
    }

    _initInput() {
        this.inputController.init({
            onWaitStart: () => {
                this.audio.playClick();
                this.screenManager.showScreen('screen-register', 'fade');
            },
            onVerdadero: () => this._handleLogicAnswer(true),
            onFalso: () => this._handleLogicAnswer(false),
            onConfirmVenn: () => this._handleVennConfirm(),
            onResetVenn: () => {
                this.audio.playClick();
                this.vennView.resetSelection();
            },
            onIniciar: () => this._startIntro(),
            onManual: () => {
                this.audio.playClick();
                this.manualView.reset();
                this._previousScreen = 'screen-title';
                this.screenManager.showScreen('screen-manual', 'fade');
            },
            onGameManual: () => {
                this.audio.playClick();
                this.manualView.reset();
                gameState.pauseGame();
                this.timer.stop();
                this._previousScreen = 'screen-game';
                this.screenManager.showScreen('screen-manual', 'fade');
            },
            onLeaderboard: () => {
                this.audio.playClick();
                this._showLeaderboard();
            },
            onLogout: () => this._handleLogout(),
            onRetry: () => this._startGame(),
            onMenuFromGameover: () => this._goToTitle(),
            onMenuFromVictory: () => this._goToTitle(),
            onSkipIntro: () => this._startGame()
        });
    }

    // ═══════════════════════════════════════════════
    // AUTENTICACIÓN
    // ═══════════════════════════════════════════════

    _handleLogin(username, password) {
        this.audio.init();
        this.audio.playClick();

        const result = this.userModel.login(username, password);
        if (result.success) {
            gameState.setUser(result.user);
            gameState.coins = result.user.coins || 0; // Cargar monedas
            this.titleView.updateUsername(result.user.name);
            this.screenManager.showScreen('screen-title', 'fade');
        } else {
            this.registerView.showLoginError(result.error);
        }
    }

    _handleRegister(name, username, password) {
        this.audio.init();
        this.audio.playClick();

        const result = this.userModel.register(name, username, password);
        if (result.success) {
            this.registerView.showRegisterSuccess();
        } else {
            this.registerView.showRegisterError(result.error);
        }
    }

    _handleLogout() {
        this.audio.playClick();
        this.userModel.logout();
        gameState.setUser(null);
        this.registerView.clearForms();
        this.screenManager.showScreen('screen-register', 'fade');
    }

    // ═══════════════════════════════════════════════
    // ADMINISTRACIÓN
    // ═══════════════════════════════════════════════

    _showAdminScreen() {
        this.audio.init();
        this.audio.playClick();
        this.adminView.showLogin();
        this.screenManager.showScreen('screen-admin', 'fade');
    }

    _handleAdminLogin(password) {
        this.audio.playClick();
        if (this.userModel.isAdminPassword(password)) {
            this.adminView.showPanel();
            this._refreshAdminData();
        } else {
            this.adminView.showLoginError('Contraseña incorrecta');
        }
    }

    _refreshAdminData() {
        this.adminView.renderUsers(this.userModel.getAllUsers());
        this.adminView.renderScores(this.leaderboard.getAll());
    }

    _handleDeleteUser(userId) {
        this.userModel.removeUser(userId);
        this._refreshAdminData();
    }

    _handleDeleteScore(scoreId) {
        this.leaderboard.removeEntry(scoreId);
        this._refreshAdminData();
    }

    _handleClearScores() {
        this.leaderboard.clearAll();
        this._refreshAdminData();
    }

    // ═══════════════════════════════════════════════
    // GAME LOOP
    // ═══════════════════════════════════════════════

    _startIntro() {
        this.audio.init();
        this.audio.playClick();
        this.screenManager.showScreen('screen-intro', 'fade');
    }

    _startGame() {
        this.audio.init();
        this.audio.resume();
        this.audio.playClick();

        // Resetear estado
        gameState.reset();
        gameState.startGame();
        this._alarmPlayed = false;
        this._tickCounter = 0;

        // Incrementar partidas jugadas
        if (gameState.currentUser) {
            this.userModel.incrementGamesPlayed(gameState.currentUser.id);
        }

        // Cargar primer nivel
        this._loadLevel(0);

        // Iniciar timer
        this.timer.start();

        // Sonido ambiental
        this.audio.startAmbientHum();

        // Mostrar pantalla de juego
        this.screenManager.showScreen('screen-game', 'glitch');
    }

    _loadLevel(levelIndex) {
        const level = LEVELS[levelIndex];
        if (!level) return;

        // Play level specific music
        this.audio.playLevelMusic(levelIndex);

        // Fetch random problem for this level
        const problem = getRandomProblem(levelIndex);
        gameState.currentProblem = problem;

        // Actualizar vista
        this.gameView.updateLevel(levelIndex);
        this.gameView.showLevel(level, problem);

        // Renderizar controles especiales
        if (problem.type === 'venn') {
            if (problem.sets.length === 2) {
                this.vennView.render2Sets();
            } else {
                this.vennView.render3Sets();
            }
        } else if (problem.type === 'wires-connect') {
            this._renderWiresConnect(problem);
        } else if (problem.type === 'wires-cut') {
            this._renderWiresCut(problem);
        } else if (problem.type === 'memory') {
            this.memoryView.render(problem, 
                () => this._processAnswer(true), 
                () => { this.audio.playFail(); gameState.removeTime(5); } // Solo quita 5s por error en memoria
            );
        } else if (problem.type === 'sequence') {
            this.sequenceView.render(problem, (isCorrect) => this._processAnswer(isCorrect));
        } else if (problem.type === 'quickmath') {
            this.quickmathView.render(problem, 
                () => this._processAnswer(true), 
                () => this._processAnswer(false)
            );
        } else if (problem.type === 'circuitmaze') {
            this.circuitmazeView.render(problem, 
                () => this._processAnswer(true), 
                () => this._processAnswer(false)
            );
        } else if (problem.type === 'boss') {
            // Boss mechanic will be mixed
            this._startBossSequence(problem);
        }
    }

    _startBossSequence(problem) {
        // Implementación del boss: seleccionamos 3 problemas al azar de los niveles 1-9
        // Esto puede ir en otra función o fase
        this.gameView.showFeedback(true);
        setTimeout(() => gameState.nextLevel(), 1000); // Placeholder por ahora
    }

    _renderWiresConnect(problem) {
        const leftCol = document.getElementById('wires-left');
        const rightCol = document.getElementById('wires-right');
        const canvas = document.getElementById('wires-canvas');
        if (!leftCol || !rightCol || !canvas) return;

        leftCol.innerHTML = '';
        rightCol.innerHTML = '';
        const ctx = canvas.getContext('2d');
        
        // Wait for next paint to get dimensions
        setTimeout(() => {
            canvas.width = canvas.offsetWidth || 400;
            canvas.height = canvas.offsetHeight || 250;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 50);

        const leftColorsArray = problem.colorsLeft || problem.colors;
        const rightColorsArray = problem.colorsRight || problem.colors;
        
        const shuffledLeft = [...leftColorsArray].sort(() => Math.random() - 0.5);
        const shuffledRight = [...rightColorsArray].sort(() => Math.random() - 0.5);

        this._wireConnections = [];
        let selectedLeftNode = null;
        this._wireNodesLeft = [];
        this._wireNodesRight = [];

        shuffledLeft.forEach((color) => {
            const node = document.createElement('div');
            node.className = 'wire-node';
            node.style.backgroundColor = color;
            node.style.borderColor = color;
            node.style.color = color;
            node.dataset.color = color;
            node.dataset.side = 'left';
            node.addEventListener('click', () => {
                if (gameState.gameStatus !== 'playing') return;
                if (this._wireConnections.find(conn => conn.left === color)) return;
                this.audio.playClick();
                if (selectedLeftNode) selectedLeftNode.classList.remove('selected');
                selectedLeftNode = node;
                node.classList.add('selected');
            });
            this._wireNodesLeft.push(node);
            leftCol.appendChild(node);
        });

        shuffledRight.forEach((color) => {
            const node = document.createElement('div');
            node.className = 'wire-node';
            node.style.backgroundColor = color;
            node.style.borderColor = color;
            node.style.color = color;
            node.dataset.color = color;
            node.dataset.side = 'right';
            node.addEventListener('click', () => {
                if (gameState.gameStatus !== 'playing') return;
                if (this._wireConnections.find(conn => conn.right === color)) return;
                if (!selectedLeftNode) return;
                this.audio.playClick();
                
                const leftColor = selectedLeftNode.dataset.color;
                const expectedRightColor = problem.solutionMap ? problem.solutionMap[leftColor] : leftColor;
                
                if (expectedRightColor === color) {
                    this._wireConnections.push({ left: leftColor, right: color });
                    selectedLeftNode.classList.remove('selected');
                    selectedLeftNode = null;
                    this._drawWireConnections();
                    
                    const totalConnectionsNeeded = problem.colorsLeft ? problem.colorsLeft.length : problem.colors.length;
                    if (this._wireConnections.length === totalConnectionsNeeded) {
                        this._processAnswer(true);
                    }
                } else {
                    selectedLeftNode.classList.remove('selected');
                    selectedLeftNode = null;
                    this._processAnswer(false);
                }
            });
            this._wireNodesRight.push(node);
            rightCol.appendChild(node);
        });
    }

    _drawWireConnections() {
        const canvas = document.getElementById('wires-canvas');
        const board = document.getElementById('wires-board');
        if (!canvas || !board) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';

        this._wireConnections.forEach(conn => {
            const leftColor = conn.left;
            const rightColor = conn.right;
            
            const leftNode = this._wireNodesLeft.find(n => n.dataset.color === leftColor);
            const rightNode = this._wireNodesRight.find(n => n.dataset.color === rightColor);
            
            if (leftNode && rightNode) {
                const lRect = leftNode.getBoundingClientRect();
                const rRect = rightNode.getBoundingClientRect();
                const bRect = board.getBoundingClientRect();

                const x1 = (lRect.left - bRect.left) + lRect.width / 2;
                const y1 = (lRect.top - bRect.top) + lRect.height / 2;
                const x2 = (rRect.left - bRect.left) + rRect.width / 2;
                const y2 = (rRect.top - bRect.top) + rRect.height / 2;

                ctx.strokeStyle = leftColor;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.bezierCurveTo(x1 + 100, y1, x2 - 100, y2, x2, y2);
                ctx.stroke();
            }
        });
    }

    _renderWiresCut(problem) {
        const container = document.getElementById('wire-cut-container');
        if (!container) return;
        container.innerHTML = '';

        problem.wires.forEach((color, index) => {
            const wire = document.createElement('div');
            wire.className = 'cut-wire';
            wire.style.color = color;
            wire.dataset.index = index;
            wire.dataset.color = color;
            
            wire.addEventListener('click', () => {
                if (gameState.gameStatus !== 'playing') return;
                this.audio.playClick();
                wire.classList.add('cut');
                const isCorrect = validateWireCut(problem, color, index);
                this._processAnswer(isCorrect);
            }, { once: true });

            container.appendChild(wire);
        });
    }

    // ═══════════════════════════════════════════════
    // VALIDACIÓN DE RESPUESTAS
    // ═══════════════════════════════════════════════

    _handleLogicAnswer(answer) {
        if (gameState.gameStatus !== 'playing') return;

        const problem = gameState.currentProblem;
        if (!problem || problem.type !== 'logic') return;

        this.audio.playClick();
        const isCorrect = validateLogicAnswer(problem, answer);
        this._processAnswer(isCorrect);
    }

    _handleVennConfirm() {
        if (gameState.gameStatus !== 'playing') return;

        const problem = gameState.currentProblem;
        if (!problem || problem.type !== 'venn') return;

        this.audio.playClick();
        const selectedRegions = this.vennView.getSelectedRegions();
        const isCorrect = validateVennAnswer(problem, selectedRegions);
        this._processAnswer(isCorrect);
    }

    _processAnswer(isCorrect) {
        // Deshabilitar botones temporalmente
        this.inputController.disableGameButtons(isCorrect ? 1500 : 1000);

        if (isCorrect) {
            // ¡Correcto!
            this.audio.playSuccess();
            gameState.addScore(500);
            gameState.addCoins(10); // Recompensa de monedas
            gameState.addTime(15);
            this.gameView.showFeedback(true);

            // Avanzar al siguiente nivel después del feedback
            setTimeout(() => {
                gameState.nextLevel();
            }, 1500);
        } else {
            // Incorrecto
            this.audio.playFail();
            gameState.removeTime(20);
            this.gameView.showFeedback(false);

            // Efecto de shake en la pantalla
            const gameScreen = document.getElementById('screen-game');
            if (gameScreen) {
                gameScreen.style.animation = 'feedbackShake 0.4s ease';
                setTimeout(() => gameScreen.style.animation = '', 400);
            }
        }
    }

    // ═══════════════════════════════════════════════
    // STATE CHANGE HANDLER
    // ═══════════════════════════════════════════════

    _handleStateChange(event, data) {
        switch (event) {
            case 'timeTick': {
                const formatted = gameState.getFormattedTime();
                const percent = gameState.getTimePercent();
                this.gameView.updateTimer(formatted, percent);

                // Tick sonoro cada segundo
                this._tickCounter += 1;
                if (this._tickCounter >= 60) { // Aproximadamente cada segundo
                    this._tickCounter = 0;
                    if (percent < 20 && !this._alarmPlayed) {
                        // Alarma cuando queda menos del 20% del tiempo
                        this.audio.playAlarm();
                        this._alarmPlayed = true;
                        setTimeout(() => { this._alarmPlayed = false; }, 3000);
                    }
                }
                break;
            }

            case 'scoreChanged':
                this.gameView.updateScore(data.score);
                break;

            case 'coinsChanged':
                this.gameView.updateCoins(data.coins);
                if (gameState.currentUser) {
                    this.userModel.updateCoins(gameState.currentUser.id, data.coins);
                }
                break;

            case 'timeAdded':
                this.gameView.updateTimer(gameState.getFormattedTime(), gameState.getTimePercent());
                break;

            case 'timeRemoved':
                this.gameView.updateTimer(gameState.getFormattedTime(), gameState.getTimePercent());
                break;

            case 'levelChanged':
                this._showLevelTransition(data.level);
                break;

            case 'gameOver':
                this._handleGameOver(data);
                break;

            case 'victory':
                this._handleVictory(data);
                break;
        }
    }

    _showLevelTransition(levelIndex) {
        // Sonido de transición
        this.audio.playTransition();

        // Crear/mostrar overlay de transición con cameo
        let overlay = document.getElementById('transition-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'transition-overlay';
            overlay.className = 'transition-overlay';
            document.body.appendChild(overlay);
        }

        // Variaciones de Firulais
        const cameos = ['🐶', '🐕', '🐩', '🐾'];
        const cameo = cameos[Math.floor(Math.random() * cameos.length)];

        overlay.innerHTML = `
            <div class="transition-content">
                <div class="cameo-icon" style="font-size: 80px; animation: bounce 1s infinite;">${cameo}</div>
                <h2 style="color: var(--neon-cyan); font-family: var(--font-heading); font-size: 20px; text-shadow: 0 0 10px var(--neon-cyan);">CARGANDO SECTOR ${levelIndex + 1}...</h2>
                <p style="color: var(--text-primary); font-family: var(--font-body); font-size: 16px;">Firulais te guía a través de la oscuridad...</p>
            </div>
        `;
        
        overlay.classList.add('active');

        // Después de 1.5s, cargar el nivel real y quitar el overlay
        setTimeout(() => {
            this._loadLevel(levelIndex);
            overlay.classList.remove('active');
        }, 1500);
    }

    // ═══════════════════════════════════════════════
    // FIN DE PARTIDA
    // ═══════════════════════════════════════════════

    _handleGameOver(data) {
        this.timer.stop();
        this.audio.stopAmbientHum();
        this.audio.playGameOver();

        // Registrar puntuación
        const userName = gameState.currentUser ? gameState.currentUser.name : 'Anónimo';
        this.leaderboard.addEntry(userName, data.score, data.level + 1);

        // Mostrar pantalla de game over con delay dramático
        setTimeout(() => {
            this.gameOverView.show(data.score);
            this.screenManager.showScreen('screen-gameover', 'glitch');
        }, 500);
    }

    _handleVictory(data) {
        this.timer.stop();
        this.audio.stopAmbientHum();

        // Calcular Rango
        const finalScore = data.score;
        const coins = gameState.coins;
        const totalValue = finalScore + (coins * 50); // 1 coin = 50 puntos
        let rank = "Pobre webón";
        
        if (totalValue > 6000) rank = "Licenciado con billete";
        else if (totalValue > 4000) rank = "Ingeniero Sobreviviente";
        else if (totalValue > 2000) rank = "Foráneo Agotado";

        // Registrar puntuación
        const userName = gameState.currentUser ? gameState.currentUser.name : 'Anónimo';
        this.leaderboard.addEntry(userName, data.score, 4);

        if (gameState.currentUser) {
            this.userModel.incrementGamesWon(gameState.currentUser.id);
        }

        // Mostrar pantalla de victoria con animación de generador
        setTimeout(() => {
            this.screenManager.showScreen('screen-victory', 'fade');
            
            const fillBar = document.getElementById('generator-fill-bar');
            const statusText = document.getElementById('generator-status-text');
            const flash = document.getElementById('victory-flash');
            const animContainer = document.getElementById('generator-anim-container');
            const victoryContent = document.getElementById('victory-content');
            
            // Resetear animación por si juega de nuevo
            if (fillBar && flash && animContainer && victoryContent) {
                fillBar.style.transition = 'none';
                fillBar.style.width = '0%';
                fillBar.style.backgroundColor = 'var(--danger-red)';
                fillBar.style.boxShadow = '0 0 15px rgba(255,51,51,0.8)';
                flash.style.animation = 'none';
                animContainer.style.display = 'flex';
                victoryContent.style.display = 'none';
                statusText.textContent = 'Iniciando secuencia de arranque...';
                
                // Forzar reflow para reiniciar CSS
                void fillBar.offsetWidth;
                
                // Iniciar llenado (3 segundos)
                fillBar.style.transition = 'width 3s linear, background-color 0.5s ease, box-shadow 0.5s ease';
                fillBar.style.width = '100%';
                
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += 10;
                    if(progress > 30 && progress <= 70) {
                        fillBar.style.backgroundColor = 'var(--neon-yellow)';
                        fillBar.style.boxShadow = '0 0 15px rgba(255,204,0,0.8)';
                        statusText.textContent = 'Acoplando turbinas...';
                    } else if(progress > 70) {
                        fillBar.style.backgroundColor = 'var(--success-green)';
                        fillBar.style.boxShadow = '0 0 20px var(--success-green)';
                        statusText.textContent = '¡Energía estabilizada!';
                    }
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                        
                        // Disparar flash y sonido de victoria
                        this.audio.playVictory();
                        flash.style.animation = 'flashFade 2s forwards';
                        
                        // Revelar pantalla real de victoria a los 200ms (pico de luz)
                        setTimeout(() => {
                            animContainer.style.display = 'none';
                            victoryContent.style.display = 'flex';
                            this.victoryView.show(data.score, gameState.getFormattedTime(), rank, coins);
                        }, 200);
                    }
                }, 300);
            }
        }, 500);
    }

    // ═══════════════════════════════════════════════
    // NAVEGACIÓN
    // ═══════════════════════════════════════════════

    _showLeaderboard() {
        const top3 = this.leaderboard.getTop3();
        this.leaderboardView.render(top3);
        this.screenManager.showScreen('screen-leaderboard', 'fade');
    }

    _goToTitle() {
        this.timer.stop();
        this.audio.stopAmbientHum();
        this.audio.playClick();
        gameState.reset();
        this.screenManager.showScreen('screen-title', 'fade');
    }

    _goToRegister() {
        this.audio.playClick();
        this.adminView.showLogin();
        this.screenManager.showScreen('screen-register', 'fade');
    }
}
