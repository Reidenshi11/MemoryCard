// Game state
let currentPlayer = 'X';
let gameBoard = [];
let gameActive = true;
let player1Name = 'Игрок 1';
let player2Name = 'Игрок 2';
let player1Type = 'human';
let player2Type = 'human';
let difficulty = 'easy';
let startingPlayer = 'X';
let boardSize = 3;
let winLength = 3;
let scores = {};

// DOM elements
const statusDisplay = document.getElementById('status');
const boardElement = document.getElementById('board');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const difficultySelect = document.getElementById('difficulty');
const startingPlayerSelect = document.getElementById('starting-player');
const boardSizeSelect = document.getElementById('board-size');
const winLengthSelect = document.getElementById('win-length');
const scoreBody = document.getElementById('score-body');
const player1Card = document.getElementById('player1-card');
const player2Card = document.getElementById('player2-card');

// Initialize game
function initGame() {
    loadScores();
    updateScoreDisplay();
    createBoard();
    startGame();
    
    // Add event listeners
    player1Input.addEventListener('change', updatePlayerNames);
    player2Input.addEventListener('change', updatePlayerNames);
    difficultySelect.addEventListener('change', updateDifficulty);
    startingPlayerSelect.addEventListener('change', updateStartingPlayer);
    boardSizeSelect.addEventListener('change', updateBoardSize);
    winLengthSelect.addEventListener('change', updateWinLength);
    
    // Add event listeners for player type
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.player-card');
            const type = this.getAttribute('data-type');
            
            // Update all type buttons in this card
            card.querySelectorAll('.type-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            // Update player types
            if (card.id === 'player1-card') {
                player1Type = type;
            } else {
                player2Type = type;
            }
            
            // If it's computer's turn, make a move
            if (gameActive && 
                ((currentPlayer === 'X' && player1Type === 'computer') || 
                    (currentPlayer === 'O' && player2Type === 'computer'))) {
                setTimeout(makeComputerMove, 700);
            }
        });
    });
}

// Create board based on selected size
function createBoard() {
    boardSize = parseInt(boardSizeSelect.value);
    winLength = parseInt(winLengthSelect.value);
    
    // Update board class for styling
    boardElement.className = `board board-${boardSize}x${boardSize}`;
    
    // Clear the board
    boardElement.innerHTML = '';
    
    // Initialize game board array
    gameBoard = new Array(boardSize * boardSize).fill('');
    
    // Create cells
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.className = `cell cell-${boardSize}x${boardSize}`;
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

// Start a new game
function startGame() {
    createBoard();
    gameActive = true;
    
    // Determine starting player
    if (startingPlayer === 'random') {
        currentPlayer = Math.random() > 0.5 ? 'X' : 'O';
    } else {
        currentPlayer = startingPlayer;
    }
    
    updateStatus();
    updatePlayerCardHighlight();
    
    // If computer starts, make a move
    if ((currentPlayer === 'X' && player1Type === 'computer') || 
        (currentPlayer === 'O' && player2Type === 'computer')) {
        setTimeout(makeComputerMove, 700);
    }
}

// Handle cell click
function handleCellClick(cellIndex) {
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Check if current player is human
    if ((currentPlayer === 'X' && player1Type === 'human') || 
        (currentPlayer === 'O' && player2Type === 'human')) {
        // Make player move
        makeMove(cellIndex, currentPlayer);
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
            const loserName = currentPlayer === 'X' ? player2Name : player1Name;
            updateScores(winnerName, 'win');
            updateScores(loserName, 'lose');
            return;
        }
        
        if (checkDraw()) {
            endGame(true);
            updateScores(player1Name, 'draw');
            updateScores(player2Name, 'draw');
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
        updatePlayerCardHighlight();
        
        // If next player is computer, make a move
        if ((currentPlayer === 'X' && player1Type === 'computer') || 
            (currentPlayer === 'O' && player2Type === 'computer')) {
            setTimeout(makeComputerMove, 700);
        }
    }
}

// Make a move
function makeMove(cellIndex, player) {
    gameBoard[cellIndex] = player;
    const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
}

// Make computer move based on difficulty
function makeComputerMove() {
    if (!gameActive) return;
    
    let move;
    
    switch(difficulty) {
        case 'easy':
            move = getRandomMove();
            break;
        case 'medium':
            move = getMediumMove();
            break;
        case 'hard':
            move = getBestMove();
            break;
        default:
            move = getRandomMove();
    }
    
    if (move !== -1) {
        makeMove(move, currentPlayer);
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
            const loserName = currentPlayer === 'X' ? player2Name : player1Name;
            updateScores(winnerName, 'win');
            updateScores(loserName, 'lose');
            return;
        }
        
        if (checkDraw()) {
            endGame(true);
            updateScores(player1Name, 'draw');
            updateScores(player2Name, 'draw');
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
        updatePlayerCardHighlight();
    }
}

// Get a random move (easy difficulty)
function getRandomMove() {
    const availableMoves = gameBoard
        .map((cell, index) => cell === '' ? index : null)
        .filter(cell => cell !== null);
    
    if (availableMoves.length === 0) return -1;
    
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

// Get a medium difficulty move
function getMediumMove() {
    // Try to win if possible
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const index = i * boardSize + j;
            
            // Check horizontal
            if (j <= boardSize - winLength) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k;
                    if (gameBoard[checkIndex] === currentPlayer) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
            
            // Check vertical
            if (i <= boardSize - winLength) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k * boardSize;
                    if (gameBoard[checkIndex] === currentPlayer) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
            
            // Check diagonal down-right
            if (i <= boardSize - winLength && j <= boardSize - winLength) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k * boardSize + k;
                    if (gameBoard[checkIndex] === currentPlayer) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
            
            // Check diagonal down-left
            if (i <= boardSize - winLength && j >= winLength - 1) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k * boardSize - k;
                    if (gameBoard[checkIndex] === currentPlayer) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
        }
    }
    
    // Block opponent if possible
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const index = i * boardSize + j;
            
            // Check horizontal
            if (j <= boardSize - winLength) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k;
                    if (gameBoard[checkIndex] === opponent) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
            
            // Check vertical
            if (i <= boardSize - winLength) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k * boardSize;
                    if (gameBoard[checkIndex] === opponent) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
            
            // Check diagonal down-right
            if (i <= boardSize - winLength && j <= boardSize - winLength) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k * boardSize + k;
                    if (gameBoard[checkIndex] === opponent) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
            
            // Check diagonal down-left
            if (i <= boardSize - winLength && j >= winLength - 1) {
                let count = 0;
                let emptyIndex = -1;
                for (let k = 0; k < winLength; k++) {
                    const checkIndex = index + k * boardSize - k;
                    if (gameBoard[checkIndex] === opponent) {
                        count++;
                    } else if (gameBoard[checkIndex] === '') {
                        emptyIndex = checkIndex;
                    } else {
                        break;
                    }
                }
                if (count === winLength - 1 && emptyIndex !== -1) {
                    return emptyIndex;
                }
            }
        }
    }
    
    // If no win or block, make a random move
    return getRandomMove();
}

// Get the best move (hard difficulty)
function getBestMove() {
    // Try to win if possible
    const winMove = getMediumMove(); // Medium already tries to win
    if (winMove !== -1) return winMove;
    
    // Then take center if available
    const centerIndex = Math.floor(boardSize * boardSize / 2);
    if (gameBoard[centerIndex] === '') return centerIndex;
    
    // Then take corners if available
    const corners = [
        0, // top-left
        boardSize - 1, // top-right
        boardSize * (boardSize - 1), // bottom-left
        boardSize * boardSize - 1 // bottom-right
    ];
    
    const availableCorners = corners.filter(index => gameBoard[index] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Otherwise, make a random move
    return getRandomMove();
}

// Check for a win
function checkWin() {
    // Check all possible winning combinations
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const index = i * boardSize + j;
            if (gameBoard[index] === '') continue;
            
            // Check horizontal
            if (j <= boardSize - winLength) {
                let win = true;
                for (let k = 1; k < winLength; k++) {
                    if (gameBoard[index + k] !== gameBoard[index]) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    highlightWinningCells(index, 1);
                    return true;
                }
            }
            
            // Check vertical
            if (i <= boardSize - winLength) {
                let win = true;
                for (let k = 1; k < winLength; k++) {
                    if (gameBoard[index + k * boardSize] !== gameBoard[index]) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    highlightWinningCells(index, boardSize);
                    return true;
                }
            }
            
            // Check diagonal down-right
            if (i <= boardSize - winLength && j <= boardSize - winLength) {
                let win = true;
                for (let k = 1; k < winLength; k++) {
                    if (gameBoard[index + k * boardSize + k] !== gameBoard[index]) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    highlightWinningCells(index, boardSize + 1);
                    return true;
                }
            }
            
            // Check diagonal down-left
            if (i <= boardSize - winLength && j >= winLength - 1) {
                let win = true;
                for (let k = 1; k < winLength; k++) {
                    if (gameBoard[index + k * boardSize - k] !== gameBoard[index]) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    highlightWinningCells(index, boardSize - 1);
                    return true;
                }
            }
        }
    }
    
    return false;
}

// Highlight winning cells
function highlightWinningCells(startIndex, step) {
    for (let k = 0; k < winLength; k++) {
        const winIndex = startIndex + k * step;
        const cell = document.querySelector(`.cell[data-index="${winIndex}"]`);
        cell.classList.add('win');
    }
}

// Check for a draw
function checkDraw() {
    return !gameBoard.includes('');
}

// End the game
function endGame(isDraw) {
    gameActive = false;
    if (isDraw) {
        statusDisplay.innerHTML = '<i class="fas fa-handshake status-icon"></i> Ничья!';
    } else {
        const winner = currentPlayer === 'X' ? player1Name : player2Name;
        statusDisplay.innerHTML = `<i class="fas fa-trophy status-icon"></i> Победитель: ${winner} (${currentPlayer})!`;
    }
    
    saveScores();
    updateScoreDisplay();
}

// Update game status
function updateStatus() {
    const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    statusDisplay.innerHTML = `<i class="fas fa-arrow-circle-right status-icon"></i> Ход: ${currentPlayerName} (${currentPlayer})`;
}

// Update player card highlight
function updatePlayerCardHighlight() {
    if (currentPlayer === 'X') {
        player1Card.classList.add('active');
        player2Card.classList.remove('active');
    } else {
        player2Card.classList.add('active');
        player1Card.classList.remove('active');
    }
}

// Update player names
function updatePlayerNames() {
    player1Name = player1Input.value || 'Игрок 1';
    player2Name = player2Input.value || 'Игрок 2';
    updateStatus();
}

// Update difficulty
function updateDifficulty() {
    difficulty = difficultySelect.value;
}

// Update starting player
function updateStartingPlayer() {
    startingPlayer = startingPlayerSelect.value;
}

// Update board size
function updateBoardSize() {
    createBoard();
    startGame();
}

// Update win length
function updateWinLength() {
    winLength = parseInt(winLengthSelect.value);
}

// Update scores
function updateScores(player, result) {
    if (!scores[player]) {
        scores[player] = { wins: 0, losses: 0, draws: 0 };
    }
    
    if (result === 'win') {
        scores[player].wins++;
    } else if (result === 'lose') {
        scores[player].losses++;
    } else if (result === 'draw') {
        scores[player].draws++;
    }
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

// Load scores from localStorage
function loadScores() {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
    }
}

// Update score display
function updateScoreDisplay() {
    scoreBody.innerHTML = '';
    
    for (const player in scores) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player}</td>
            <td>${scores[player].wins}</td>
            <td>${scores[player].losses}</td>
            <td>${scores[player].draws}</td>
        `;
        scoreBody.appendChild(row);
    }
    
    // Add message if no scores yet
    if (Object.keys(scores).length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center;">Нет записей</td>';
        scoreBody.appendChild(row);
    }
}

// Reset scores
function resetScores() {
    if (confirm('Вы уверены, что хотите сбросить все очки?')) {
        scores = {};
        saveScores();
        updateScoreDisplay();
    }
}

// Show/hide tabs
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`.tab:nth-child(${tabName === 'game' ? 1 : 2})`).classList.add('active');
}

// Initialize the game when the page loads
window.onload = initGame;