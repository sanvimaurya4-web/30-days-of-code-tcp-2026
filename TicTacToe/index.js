const boardElement = document.getElementById('board');
const statusDisplay = document.querySelector('.turn-indicator');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('result-message');
const cells = document.querySelectorAll('.cell');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// SVG Icons
const xIcon = `<svg viewBox="0 0 24 24" stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
const oIcon = `<svg viewBox="0 0 24 24" stroke="#f472b6" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle></svg>`;

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== "" || !gameActive) return;

    gameState[clickedIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer === "X" ? xIcon : oIcon;
    
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let condition of winningConditions) {
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showEndScreen(`Player ${currentPlayer} Wins! 🎉`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        showEndScreen("It's a Draw! 🤝");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = currentPlayer;
    statusDisplay.style.color = currentPlayer === "X" ? "var(--neon-blue)" : "var(--neon-pink)";
}

function showEndScreen(msg) {
    resultMessage.innerText = msg;
    overlay.classList.add('active');
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = "X";
    overlay.classList.remove('active');
    cells.forEach(cell => cell.innerHTML = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset-btn').addEventListener('click', resetGame);
