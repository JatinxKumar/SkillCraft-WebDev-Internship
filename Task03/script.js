class PremiumGame {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.totalRounds = 0;
        this.totalDraws = 0;
        
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.totalRoundsDisplay = document.getElementById('total-rounds');
        this.totalDrawsDisplay = document.getElementById('total-draws');
        this.winnerModal = document.getElementById('winner-modal');
        this.winnerTitle = document.getElementById('winner-title');
        this.winnerMessage = document.getElementById('winner-message');
        
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        document.getElementById('reset-btn').addEventListener('click', () => this.resetRound());
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('continue-btn').addEventListener('click', () => this.continueGame());
        document.getElementById('play-again-btn').addEventListener('click', () => this.newGame());
        
        this.updateDisplay();
    }
    
    bindEvents() {
        // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') {
                const index = parseInt(e.key) - 1;
                if (this.gameActive && !this.board[index]) {
                    this.handleCellClick(index);
                }
            }
        });
    }
    
    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '') return;
        
        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        
        if (this.checkWinner()) {
            this.endGame(`Player ${this.currentPlayer} wins!`);
            this.scores[this.currentPlayer]++;
            this.totalRounds++;
        } else if (this.checkDraw()) {
            this.endGame("It's a draw!");
            this.totalDraws++;
            this.totalRounds++;
        } else {
            this.switchPlayer();
        }
        
        this.updateDisplay();
    }
    
    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.board[index];
        cell.classList.add(this.board[index].toLowerCase());
        cell.classList.add('disabled');
        
        // Add animation
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 100);
    }
    
    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    endGame(message) {
        this.gameActive = false;
        this.showWinnerModal(message);
    }
    
    showWinnerModal(message) {
        this.winnerMessage.textContent = message;
        this.winnerModal.classList.add('show');
        
        // Add celebration effect
        this.createConfetti();
    }
    
    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1001';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(100vh) rotate(360deg)`, opacity: 0 }
            ], {
                duration: 3000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    continueGame() {
        this.winnerModal.classList.remove('show');
        this.resetRound();
    }
    
    resetRound() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'disabled');
        });
        
        this.updateDisplay();
    }
    
    newGame() {
        this.winnerModal.classList.remove('show');
        this.resetRound();
        this.scores = { X: 0, O: 0 };
        this.totalRounds = 0;
        this.totalDraws = 0;
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentPlayerDisplay.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
        this.totalRoundsDisplay.textContent = this.totalRounds;
        this.totalDrawsDisplay.textContent = this.totalDraws;
    }
}

// Add smooth scrolling and enhanced interactions
document.addEventListener('DOMContentLoaded', () => {
    const game = new PremiumGame();
    
    // Add hover effects for cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        cell.addEventListener('mouseleave', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
