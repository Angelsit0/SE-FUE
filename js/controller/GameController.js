// ============================================
// GameController.js — Controlador Principal
// Loop de juego, gestión de niveles, validación
// ============================================

import { gameState } from '../model/GameState.js';
import { LEVELS, validateLogicAnswer, validateVennAnswer } from '../model/LevelData.js';
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

        // Mostrar pantalla de registro
        this.screenManager.showScreen('screen-register', 'fade');

        console.log('⚡ Sistema listo. Esperando operario...');
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
            this.screenManager.showScreen('screen-title', 'fade');
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
            onVerdadero: () => this._handleLogicAnswer(true),
            onFalso: () => this._handleLogicAnswer(false),
            onConfirmVenn: () => this._handleVennConfirm(),
            onResetVenn: () => {
                this.audio.playClick();
                this.vennView.resetSelection();
            },
            onIniciar: () => this._startGame(),
            onManual: () => {
                this.audio.playClick();
                this.manualView.reset();
                this.screenManager.showScreen('screen-manual', 'fade');
            },
            onLeaderboard: () => {
                this.audio.playClick();
                this._showLeaderboard();
            },
            onLogout: () => this._handleLogout(),
            onRetry: () => this._startGame(),
            onMenuFromGameover: () => this._goToTitle(),
            onMenuFromVictory: () => this._goToTitle()
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

        // Actualizar vista
        this.gameView.updateLevel(levelIndex);
        this.gameView.showLevel(level);

        // Renderizar diagrama de Venn si es necesario
        if (level.type === 'venn') {
            if (level.sets.length === 2) {
                this.vennView.render2Sets();
            } else {
                this.vennView.render3Sets();
            }
        }
    }

    // ═══════════════════════════════════════════════
    // VALIDACIÓN DE RESPUESTAS
    // ═══════════════════════════════════════════════

    _handleLogicAnswer(answer) {
        if (gameState.gameStatus !== 'playing') return;

        const currentLevel = LEVELS[gameState.currentLevel];
        if (!currentLevel || currentLevel.type !== 'logic') return;

        this.audio.playClick();
        const isCorrect = validateLogicAnswer(gameState.currentLevel, answer);
        this._processAnswer(isCorrect);
    }

    _handleVennConfirm() {
        if (gameState.gameStatus !== 'playing') return;

        const currentLevel = LEVELS[gameState.currentLevel];
        if (!currentLevel || currentLevel.type !== 'venn') return;

        this.audio.playClick();
        const selectedRegions = this.vennView.getSelectedRegions();
        const isCorrect = validateVennAnswer(gameState.currentLevel, selectedRegions);
        this._processAnswer(isCorrect);
    }

    _processAnswer(isCorrect) {
        // Deshabilitar botones temporalmente
        this.inputController.disableGameButtons(isCorrect ? 1500 : 1000);

        if (isCorrect) {
            // ¡Correcto!
            this.audio.playSuccess();
            gameState.addScore(500);
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

            case 'timeAdded':
                this.gameView.updateTimer(gameState.getFormattedTime(), gameState.getTimePercent());
                break;

            case 'timeRemoved':
                this.gameView.updateTimer(gameState.getFormattedTime(), gameState.getTimePercent());
                break;

            case 'levelChanged':
                this._loadLevel(data.level);
                break;

            case 'gameOver':
                this._handleGameOver(data);
                break;

            case 'victory':
                this._handleVictory(data);
                break;
        }
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
        this.audio.playVictory();

        // Registrar puntuación
        const userName = gameState.currentUser ? gameState.currentUser.name : 'Anónimo';
        this.leaderboard.addEntry(userName, data.score, 4);

        // Mostrar victoria
        setTimeout(() => {
            this.victoryView.show(data.score, gameState.getFormattedTime());
            this.screenManager.showScreen('screen-victory', 'fade');
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
