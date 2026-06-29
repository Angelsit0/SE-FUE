/**
 * SequenceView.js
 * Game: ¿SE FUE?
 * Renders and handles the sequence ordering mini-game for Level 7.
 */

export class SequenceView {
    constructor() {
        this.container = document.getElementById('sequence-container');
        this.btnConfirm = document.getElementById('btn-sequence-confirm');
        this.items = [];
        this.expectedSequence = [];
        
        this.onConfirm = null;
        
        if (this.btnConfirm) {
            this.btnConfirm.addEventListener('click', () => this.handleConfirm());
        }
    }

    render(problem, onConfirm) {
        this.onConfirm = onConfirm;
        this.expectedSequence = [...problem.sequence];
        
        // Shuffle sequence for initial display
        let shuffled = [...problem.sequence].sort(() => Math.random() - 0.5);
        
        // Ensure it's not already sorted correctly
        if (JSON.stringify(shuffled) === JSON.stringify(this.expectedSequence)) {
            shuffled.reverse();
        }

        if (!this.container) return;
        this.container.innerHTML = '';
        this.items = [];

        shuffled.forEach((text, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'sequence-item';
            itemEl.draggable = true;
            itemEl.textContent = text;
            itemEl.dataset.text = text;
            
            // Drag and drop events
            itemEl.addEventListener('dragstart', (e) => this.handleDragStart(e, itemEl));
            itemEl.addEventListener('dragover', (e) => this.handleDragOver(e));
            itemEl.addEventListener('drop', (e) => this.handleDrop(e, itemEl));
            itemEl.addEventListener('dragend', () => this.handleDragEnd(itemEl));

            this.container.appendChild(itemEl);
            this.items.push(itemEl);
        });
    }

    handleDragStart(e, item) {
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.dataset.text);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const draggingItem = document.querySelector('.sequence-item.dragging');
        if (!draggingItem) return;

        const siblings = [...this.container.querySelectorAll('.sequence-item:not(.dragging)')];
        let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
        });

        if (nextSibling) {
            this.container.insertBefore(draggingItem, nextSibling);
        } else {
            this.container.appendChild(draggingItem);
        }
    }

    handleDrop(e, item) {
        e.preventDefault();
    }

    handleDragEnd(item) {
        item.classList.remove('dragging');
    }

    handleConfirm() {
        if (!this.onConfirm) return;
        
        const currentElements = [...this.container.querySelectorAll('.sequence-item')];
        const currentSequence = currentElements.map(el => el.dataset.text);
        
        const isCorrect = JSON.stringify(currentSequence) === JSON.stringify(this.expectedSequence);
        this.onConfirm(isCorrect);
    }
}
