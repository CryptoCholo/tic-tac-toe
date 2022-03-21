const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board")
const xClass = "x";
const oClass = "o";
const restartBtn = document.querySelector("#restart")
const winningText = document.querySelector(".winning-message-text");
const winningMessage = document.querySelector(".winning-message");
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;

startGame();

restartBtn.addEventListener("click", startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHoverClass();
    winningMessage.classList.remove("show");
}


function handleClick(e) {
    console.log("clicked");
    const cell = e.target;
    const currentClass = circleTurn ? oClass : xClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
       endGame(false);
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}


function endGame(draw) {
    if(draw){
        winningText.innerText = "Draw!"
    } else {
        winningText.innerText = `${circleTurn ? "O WINS!" : "X WINS!"}`
    }
    winningMessage.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(oClass) ||
        cell.classList.contains(xClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if (circleTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombo.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}