/**
 * MemoryGameView.js
 * Game: ¿SE FUE?
 * Renders and handles the memory card mini-game for Level 6.
 */

export class MemoryGameView {
    constructor() {
        this.container = document.getElementById('memory-grid');
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 0;
        this.isLocked = false;
        this.onComplete = null; // Callback when game is won
        this.onMistake = null;  // Callback for wrong match (optional penalty)

        // Icons for cards (UJAP/Engineering theme)
        this.icons = ['🐶', '💻', '🔋', '📚', '📐', '🍔', '🚌', '🎓', '📝', '⚡', '💡', '⏰'];
    }

    render(problem, onComplete, onMistake) {
        this.totalPairs = problem.pairs || 6;
        this.onComplete = onComplete;
        this.onMistake = onMistake;
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.isLocked = false;

        if (!this.container) return;
        this.container.innerHTML = '';

        // Generate deck
        let deck = [];
        const selectedIcons = this.icons.slice(0, this.totalPairs);
        selectedIcons.forEach((icon, index) => {
            deck.push({ id: index, icon });
            deck.push({ id: index, icon });
        });

        // Shuffle deck
        deck = deck.sort(() => Math.random() - 0.5);

        // Build HTML
        this.cards = deck.map((cardData, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'memory-card';
            cardEl.dataset.id = cardData.id;
            cardEl.dataset.index = index;

            const cardInner = document.createElement('div');
            cardInner.className = 'memory-card-inner';

            const cardFront = document.createElement('div');
            cardFront.className = 'memory-card-front';
            cardFront.textContent = '❓';

            const cardBack = document.createElement('div');
            cardBack.className = 'memory-card-back';
            cardBack.textContent = cardData.icon;

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardEl.appendChild(cardInner);

            cardEl.addEventListener('click', () => this.flipCard(cardEl));

            this.container.appendChild(cardEl);
            return cardEl;
        });

        // Adjust grid columns based on pairs
        const cols = Math.ceil(Math.sqrt(this.totalPairs * 2));
        this.container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    }

    flipCard(cardEl) {
        if (this.isLocked) return;
        if (cardEl.classList.contains('flipped')) return;

        cardEl.classList.add('flipped');
        this.flippedCards.push(cardEl);

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isLocked = true;
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.id === card2.dataset.id) {
            // Match
            this.matchedPairs++;
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.flippedCards = [];
            this.isLocked = false;

            if (this.matchedPairs === this.totalPairs) {
                setTimeout(() => {
                    if (this.onComplete) this.onComplete();
                }, 500);
            }
        } else {
            // No match
            if (this.onMistake) this.onMistake();
            
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isLocked = false;
            }, 800);
        }
    }
}
