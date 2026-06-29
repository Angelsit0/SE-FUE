// ============================================
// AudioController.js — Web Audio API
// Genera todos los efectos de sonido del juego
// de forma procedural (sin archivos de audio)
// ============================================

export class AudioController {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this._initialized = false;
        this._ambientOsc = null;
        this._ambientGain = null;
    }

    /**
     * Inicializar el contexto de audio (debe llamarse tras interacción del usuario)
     */
    init() {
        if (this._initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.3;
            this.masterGain.connect(this.ctx.destination);
            this._initialized = true;
        } catch (e) {
            console.warn('Web Audio API no disponible:', e);
        }
    }

    /**
     * Reanudar contexto si está suspendido
     */
    async resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    }

    // ─── EFECTOS DE SONIDO ──────────────────────

    /**
     * Sonido de éxito — acorde ascendente brillante
     */
    playSuccess() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        frequencies.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0, now + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.5);
        });
    }

    /**
     * Sonido de fallo — tono descendente distorsionado
     */
    playFail() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;

        // Tono descendente
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const distortion = this.ctx.createWaveShaper();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);

        // Curva de distorsión
        const curve = new Float32Array(256);
        for (let i = 0; i < 256; i++) {
            const x = (i * 2) / 256 - 1;
            curve[i] = (Math.PI + 100) * x / (Math.PI + 100 * Math.abs(x));
        }
        distortion.curve = curve;

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(distortion);
        distortion.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.5);

        // Burst de ruido (chispazo)
        this._playNoiseBurst(0.15, 0.2);
    }

    /**
     * Chispazo eléctrico — burst de ruido blanco
     */
    playSparkle() {
        if (!this._initialized) return;
        this._playNoiseBurst(0.1, 0.15);
    }

    /**
     * Sonido de click de botón
     */
    playClick() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.value = 800;

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    /**
     * Alarma — señal de tiempo bajo
     */
    playAlarm() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;

        for (let i = 0; i < 3; i++) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.value = i % 2 === 0 ? 880 : 660;

            const start = now + i * 0.15;
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
            gain.gain.linearRampToValueAtTime(0, start + 0.12);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(start);
            osc.stop(start + 0.15);
        }
    }

    /**
     * Tick del reloj — click metálico sutil
     */
    playTick() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = 1000;

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.03);
    }

    /**
     * Sonido de game over — descendente dramático
     */
    playGameOver() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;

        // Tono ominoso descendente largo
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(300, now);
        osc1.frequency.exponentialRampToValueAtTime(30, now + 2);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(150, now);
        osc2.frequency.exponentialRampToValueAtTime(20, now + 2);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.5);
        osc2.stop(now + 2.5);

        // Noise burst adicional
        this._playNoiseBurst(0.3, 0.8);
    }

    /**
     * Sonido de victoria — fanfarria ascendente
     */
    playVictory() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;
        const notes = [
            { freq: 523.25, time: 0 },      // C5
            { freq: 587.33, time: 0.15 },    // D5
            { freq: 659.25, time: 0.30 },    // E5
            { freq: 783.99, time: 0.45 },    // G5
            { freq: 1046.50, time: 0.70 },   // C6
        ];

        notes.forEach(({ freq, time }) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0, now + time);
            gain.gain.linearRampToValueAtTime(0.2, now + time + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.6);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(now + time);
            osc.stop(now + time + 0.6);
        });
    }

    /**
     * Zumbido eléctrico ambiental (loop)
     */
    startAmbientHum() {
        if (!this._initialized || this._ambientOsc) return;

        this._ambientOsc = this.ctx.createOscillator();
        this._ambientGain = this.ctx.createGain();

        this._ambientOsc.type = 'sine';
        this._ambientOsc.frequency.value = 60; // Frecuencia de red eléctrica (60Hz)
        this._ambientGain.gain.value = 0.02;

        // Añadir armónico
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 120;
        const gain2 = this.ctx.createGain();
        gain2.gain.value = 0.01;

        this._ambientOsc.connect(this._ambientGain);
        this._ambientGain.connect(this.masterGain);
        osc2.connect(gain2);
        gain2.connect(this.masterGain);

        this._ambientOsc.start();
        osc2.start();
        this._ambientOsc2 = osc2;
        this._ambientGain2 = gain2;
    }

    /**
     * Detener zumbido ambiental
     */
    stopAmbientHum() {
        if (this._ambientOsc) {
            try { this._ambientOsc.stop(); } catch(e) {}
            this._ambientOsc = null;
        }
        if (this._ambientOsc2) {
            try { this._ambientOsc2.stop(); } catch(e) {}
            this._ambientOsc2 = null;
        }
        this.stopLevelMusic();
    }

    /**
     * Reproduce una música de fondo abstracta / procedural según el nivel
     */
    playLevelMusic(levelIndex) {
        if (!this._initialized) return;
        this.stopLevelMusic(); // Stop previous

        const now = this.ctx.currentTime;
        
        // Base frequencies per level (minor/dissonant for tension)
        const baseFreqs = [
            220, // A3 - L1
            246.94, // B3 - L2
            261.63, // C4 - L3
            293.66, // D4 - L4
            329.63, // E4 - L5
            349.23, // F4 - L6
            392.00, // G4 - L7
            440.00, // A4 - L8
            493.88, // B4 - L9
            523.25  // C5 - L10 (Boss)
        ];

        const base = baseFreqs[Math.min(levelIndex, baseFreqs.length - 1)];

        this._musicOsc = this.ctx.createOscillator();
        this._musicGain = this.ctx.createGain();

        // Waveform changes based on level
        this._musicOsc.type = levelIndex >= 5 ? 'sawtooth' : (levelIndex % 2 === 0 ? 'sine' : 'triangle');
        
        // LFO for a slow pulsing effect
        this._lfo = this.ctx.createOscillator();
        this._lfoGain = this.ctx.createGain();
        this._lfo.type = 'sine';
        this._lfo.frequency.value = 0.5 + (levelIndex * 0.1); // faster pulse on higher levels
        this._lfoGain.gain.value = 10;
        this._lfo.connect(this._musicOsc.frequency);

        this._musicOsc.frequency.value = base;
        this._musicGain.gain.value = 0.03; // low volume background

        this._musicOsc.connect(this._musicGain);
        this._musicGain.connect(this.masterGain);

        this._musicOsc.start();
        this._lfo.start();
    }

    stopLevelMusic() {
        if (this._musicOsc) {
            try { this._musicOsc.stop(); } catch(e) {}
            this._musicOsc = null;
        }
        if (this._lfo) {
            try { this._lfo.stop(); } catch(e) {}
            this._lfo = null;
        }
    }

    /**
     * Sonido de transición (whoosh electrónico)
     */
    playTransition() {
        if (!this._initialized) return;
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now);
        osc.stop(now + 0.4);
        
        this._playNoiseBurst(0.1, 0.4);
    }

    // ─── UTILIDADES PRIVADAS ──────────────────────

    /**
     * Genera un burst de ruido blanco (chispazo)
     */
    _playNoiseBurst(volume = 0.15, duration = 0.15) {
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }

        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        source.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.value = 2000;

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start(now);
    }

    /**
     * Ajustar volumen maestro (0-1)
     */
    setVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
}
