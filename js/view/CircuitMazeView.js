/**
 * CircuitMazeView.js
 * Game: ¿SE FUE?
 * Renders and handles the circuit maze mini-game for Level 9.
 */

export class CircuitMazeView {
    constructor() {
        this.container = document.getElementById('circuitmaze-grid');
        this.onComplete = null;
        this.onMistake = null;
        
        this.grid = [];
        this.path = [];
        this.width = 4;
        this.height = 4;
        this.isLocked = false;
        
        // Define a simple hardcoded valid path for a 4x4 grid (0,0 to 3,3)
        // Let's say valid path nodes are marked with isPath
        this.validPathNodes = [
            '0,0', '1,0', '1,1', '2,1', '2,2', '3,2', '3,3'
        ];
    }

    render(problem, onComplete, onMistake) {
        this.width = problem.width || 4;
        this.height = problem.height || 4;
        this.onComplete = onComplete;
        this.onMistake = onMistake;
        this.path = [];
        this.isLocked = false;

        if (!this.container) return;
        this.container.innerHTML = '';
        this.container.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const nodeEl = document.createElement('div');
                nodeEl.className = 'circuit-node';
                nodeEl.dataset.x = x;
                nodeEl.dataset.y = y;
                nodeEl.dataset.id = `${x},${y}`;

                if (x === 0 && y === 0) {
                    nodeEl.classList.add('start-node');
                    nodeEl.textContent = 'IN';
                } else if (x === this.width - 1 && y === this.height - 1) {
                    nodeEl.classList.add('end-node');
                    nodeEl.textContent = 'OUT';
                } else {
                    nodeEl.textContent = '⚡';
                }

                nodeEl.addEventListener('click', () => this.handleNodeClick(nodeEl, x, y));
                this.container.appendChild(nodeEl);
            }
        }
    }

    handleNodeClick(nodeEl, x, y) {
        if (this.isLocked) return;

        const nodeId = `${x},${y}`;
        
        // Cannot click already selected
        if (this.path.includes(nodeId)) return;

        // Must start at 0,0
        if (this.path.length === 0) {
            if (x !== 0 || y !== 0) {
                if (this.onMistake) this.onMistake();
                return;
            }
        } else {
            // Must be adjacent to the last selected node
            const lastNodeStr = this.path[this.path.length - 1];
            const [lx, ly] = lastNodeStr.split(',').map(Number);
            
            const isAdjacent = Math.abs(x - lx) + Math.abs(y - ly) === 1;
            if (!isAdjacent) return;
        }

        // Check if it's on the valid path
        if (!this.validPathNodes.includes(nodeId)) {
            nodeEl.classList.add('error-node');
            if (this.onMistake) this.onMistake();
            
            // Reset after a short delay
            this.isLocked = true;
            setTimeout(() => {
                this.resetPath();
            }, 500);
            return;
        }

        // Valid step
        this.path.push(nodeId);
        nodeEl.classList.add('active-node');

        // Check if reached end
        if (x === this.width - 1 && y === this.height - 1) {
            this.isLocked = true;
            setTimeout(() => {
                if (this.onComplete) this.onComplete();
            }, 500);
        }
    }

    resetPath() {
        this.path = [];
        this.isLocked = false;
        const nodes = this.container.querySelectorAll('.circuit-node');
        nodes.forEach(n => {
            n.classList.remove('active-node', 'error-node');
        });
    }
}
