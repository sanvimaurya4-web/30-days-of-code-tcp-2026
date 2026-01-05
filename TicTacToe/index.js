const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const overlay = document.getElementById('overlay');
const resultText = document.getElementById('resultText');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const xIcon = `<svg viewBox="0 0 24 24" stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
const oIcon = `<svg viewBox="0 0 24 24" stroke="#f472b6" stroke-width="3" fill="none" stroke-linecap="round"><circle cx="12" cy="12" r="9"/></svg>`;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.innerHTML = currentPlayer === 'X' ? xIcon : oIcon;
    
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let condition of winConditions) {
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
        showEndScreen(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        showEndScreen("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `Player <span class="${currentPlayer.toLowerCase()}-text">${currentPlayer}</span>'s Turn`;
}

function showEndScreen(msg) {
    resultText.innerText = msg;
    overlay.classList.add('active');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', () => location.reload());
