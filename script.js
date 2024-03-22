const SIZE = 3;

let gameBoard
let gameOver = false;

let player1 = 'X';
let player2 = 'O';
let currentPlayer = player1;

window.onload = function () {
    createGameBoard();
}

function createGameBoard() {
    gameBoard = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ' '));
    for (let l = 0; l < SIZE; ++l) {
        for (let c = 0; c < SIZE; ++c) {
            let cell = document.createElement('div');
            cell.id = l.toString() + '-' + c.toString();
            cell.classList.add('cell');
            cell.addEventListener('click', makeMove);
            document.getElementById('game-board').append(cell);
        }
    }
}

function makeMove() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");
    let l = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (gameBoard[l][c] === ' ') {
        gameBoard[l][c] = currentPlayer;
        let symbolSpan = document.createElement('span');
        symbolSpan.classList.add('symbol');
        symbolSpan.textContent = currentPlayer;
        this.appendChild(symbolSpan);

        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
    checkLines();
    checkColumns();
    checkMainDiagonal();
    checkSecondaryDiagonal();
    if (gameOver === false) {
        checkTie();
    }
}

function checkLines() {
    for (let l = 0; l < SIZE; ++l) {
        let c = 0;
        if (gameBoard[l][c] != ' ') {
            if (gameBoard[l][c] === gameBoard[l][c + 1]
                && gameBoard[l][c + 1] === gameBoard[l][c + 2]) {
                setWinner(gameBoard[l][c]);
                return;
            }
        }
    }
}

function checkColumns() {
    for (let c = 0; c < SIZE; ++c) {
        let l = 0;
        if (gameBoard[l][c] != ' ') {
            if (gameBoard[l][c] === gameBoard[l + 1][c]
                && gameBoard[l + 1][c] === gameBoard[l + 2][c]) {
                setWinner(gameBoard[l][c]);
                return;
            }
        }
    }
}

function checkMainDiagonal() {
    let l = 0;
    let c = 0;
    if (gameBoard[l][c] != ' ') {
        if (gameBoard[l][c] === gameBoard[l + 1][c + 1]
            && gameBoard[l + 1][c + 1] === gameBoard[l + 2][c + 2]) {
            setWinner(gameBoard[l][c]);
            return;
        }
    }
}

function checkSecondaryDiagonal() {
    let l = SIZE - 1;
    let c = 0;
    if (gameBoard[l][c] != ' ') {
        if (gameBoard[l][c] === gameBoard[l - 1][c + 1]
            && gameBoard[l - 1][c + 1] === gameBoard[l - 2][c + 2]) {
            setWinner(gameBoard[l][c]);
            return;
        }
    }
}

function checkTie() {
    let cellCount = 0;
    for (let l = 0; l < SIZE; ++l) {
        for (let c = 0; c < SIZE; ++c) {
            if (gameBoard[l][c] != ' ') {
                ++cellCount;
            }
        }
    }
    if (cellCount === SIZE * SIZE) {
        endGameAsTie();
        return;
    }
}

function setWinner(player) {
    let winner = document.getElementById('winner');
    winner.textContent = player + ' wins!🎉';
    document.getElementById("game-over").style.display = "block";
    gameOver = true;
}

function endGameAsTie() {
    let winner = document.getElementById('winner');
    winner.textContent = 'It\'' + 's a tie!🤝';
    document.getElementById("game-over").style.display = "block";
    gameOver = true;
}

function refresh() {
    window.location.reload();
}