/**
 * QuickMathView.js
 * Game: ¿SE FUE?
 * Renders and handles the quick math mini-game for Level 8.
 */

export class QuickMathView {
    constructor() {
        this.display = document.getElementById('quickmath-display');
        this.input = document.getElementById('quickmath-input');
        this.btnSubmit = document.getElementById('btn-quickmath-submit');
        this.progress = document.getElementById('quickmath-progress');
        
        this.onComplete = null;
        this.onMistake = null;
        
        this.totalQuestions = 3;
        this.currentQuestionIndex = 0;
        this.currentAnswer = 0;
        
        if (this.btnSubmit) {
            this.btnSubmit.addEventListener('click', () => this.checkAnswer());
        }
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.checkAnswer();
            });
        }
    }

    render(problem, onComplete, onMistake) {
        this.totalQuestions = problem.count || 3;
        this.onComplete = onComplete;
        this.onMistake = onMistake;
        this.currentQuestionIndex = 0;
        
        if (this.input) {
            this.input.value = '';
            this.input.disabled = false;
            // focus the input nicely after a tiny delay
            setTimeout(() => this.input.focus(), 100);
        }

        this.generateQuestion();
    }

    generateQuestion() {
        this.updateProgress();
        
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b;
        
        if (op === '+') {
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            this.currentAnswer = a + b;
        } else if (op === '-') {
            a = Math.floor(Math.random() * 50) + 20;
            b = Math.floor(Math.random() * 20) + 1;
            this.currentAnswer = a - b;
        } else if (op === '*') {
            a = Math.floor(Math.random() * 12) + 2;
            b = Math.floor(Math.random() * 12) + 2;
            this.currentAnswer = a * b;
        }
        
        if (this.display) {
            this.display.textContent = `${a} ${op} ${b} = ?`;
            this.display.classList.remove('shake');
            // Trigger reflow to allow re-animation if needed
            void this.display.offsetWidth;
        }
        if (this.input) {
            this.input.value = '';
            this.input.focus();
        }
    }

    checkAnswer() {
        if (!this.input) return;
        const val = parseInt(this.input.value);
        
        if (isNaN(val)) return;
        
        if (val === this.currentAnswer) {
            // Correct
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex >= this.totalQuestions) {
                this.updateProgress();
                if (this.onComplete) this.onComplete();
            } else {
                this.generateQuestion();
            }
        } else {
            // Wrong
            if (this.display) {
                this.display.classList.add('shake');
            }
            if (this.onMistake) this.onMistake();
            this.input.value = '';
            this.input.focus();
        }
    }

    updateProgress() {
        if (this.progress) {
            this.progress.textContent = `${this.currentQuestionIndex}/${this.totalQuestions}`;
        }
    }
}
