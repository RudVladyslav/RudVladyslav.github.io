const screens = document.getElementById("screens")
const scoreboard = document.getElementById("scoreboard")
const cards_block = document.querySelector('.cards');
const cards_block_2 = document.querySelector('.cards_2');
const cards_block_3 = document.querySelector('.cards_3');
const starts = document.getElementById('starts')
const resultPlayerOneBlock = document.querySelector('.scorePlayerOne');
const resultPlayerTwoBlock = document.querySelector('.scorePlayerTwo');
const form = document.getElementById('form');

const socket = io();

const masRandom = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let scorePlayerOne = 0
let scorePlayerTwo = 0
let moves = 0

let r1 = null
let r2 = null
let r3 = null

window.scorePlayerOne = scorePlayerOne
window.scorePlayerTwo = scorePlayerTwo

const generateRandomNumber = (arr) => Math.floor(Math.random() * arr.length)

const play = () => {
    let isMove
    moves % 2 === 0 ? isMove = 'Player 1 moved' : isMove = 'Player 2 moved'
    return isMove
}

const checkNumber = (randoms, randoms_2, randoms_3, a, b) => {
    if (randoms === a) {
        cards_block.style.top = b + 'px';
    }
    if (randoms_2 === a) {
        cards_block_2.style.top = b + 'px';
    }
    if (randoms_3 === a) {
        cards_block_3.style.top = b + 'px';
    }
}

const playersMoves = () => {
    if (starts) {
        return moves + 1
    }
}

const auditRandom = (randoms, randoms_2, randoms_3) => {
    checkNumber(randoms, randoms_2, randoms_3, 1, -205)
    checkNumber(randoms, randoms_2, randoms_3, 2, -410)
    checkNumber(randoms, randoms_2, randoms_3, 3, -615)
    checkNumber(randoms, randoms_2, randoms_3, 4, -820)
    checkNumber(randoms, randoms_2, randoms_3, 5, -1025)
    checkNumber(randoms, randoms_2, randoms_3, 6, -1230)
    checkNumber(randoms, randoms_2, randoms_3, 7, -1435)
    checkNumber(randoms, randoms_2, randoms_3, 8, -1640)
    checkNumber(randoms, randoms_2, randoms_3, 0, 0)
}

const auditCombination = (randoms, randoms_2, randoms_3) => {
    let resultPlayerOne = 0
    let resultPlayerTwo = 0
    if (randoms === randoms_2 && randoms === randoms_3) {
        if (moves % 2 === 0) {
            resultPlayerOne = 30
        } else {
            resultPlayerTwo = 30
        }
    } else if (randoms === randoms_2 || randoms === randoms_3 || randoms_2 === randoms_3) {
        if (moves % 2 === 0) {
            resultPlayerOne = 10
        } else {
            resultPlayerTwo = 10
        }
    }
    return [resultPlayerOne, resultPlayerTwo]
}

const gameOver = () => {
    if (scorePlayerTwo >= 50 || scorePlayerOne >= 50) {
        if (scorePlayerTwo > scorePlayerOne) {
            screens.innerHTML = 'Player two win'
            starts.classList.add('gameOver')

        } else if (scorePlayerOne > scorePlayerTwo) {
            screens.innerHTML = 'Player one win'
            starts.classList.add('gameOver')
        }
    }
}

const init = () => {
    const randoms = generateRandomNumber(masRandom);
    const randoms_2 = generateRandomNumber(masRandom);
    const randoms_3 = generateRandomNumber(masRandom);
    r1 = randoms
    r2 = randoms_2
    r3 = randoms_3
    auditCombination(randoms, randoms_2, randoms_3)
    auditRandom(randoms, randoms_2, randoms_3)

}

const startGame = () => {
    play()
    starts.addEventListener('click', () => {
            starts.classList.add('disabled')
            init()
            setTimeout(() => starts.classList.remove('disabled'), 2500)
        }
    )
}

startGame()

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let move = playersMoves()
    let [p1, p2] = auditCombination(r1, r2, r3)
    let tot1 = scorePlayerOne
    let tot2 = scorePlayerTwo

    let isMove = play()


    socket.emit('score', p1, p2, tot1, tot2, move, isMove);
});

socket.on('score', ({p1, p2, tot1, tot2, move, isMove}) => {
    screens.innerHTML = isMove
    scorePlayerOne = tot1 + p1
    scorePlayerTwo = tot2 + p2
    resultPlayerOneBlock.innerHTML = scorePlayerOne
    resultPlayerTwoBlock.innerHTML = scorePlayerTwo
    scoreboard.innerHTML = moves % 2 === 0 ? `+${p1}` : `+${p2}`
    gameOver()
    moves = move
});
