const area = document.querySelector('.area'),
    boxes = document.querySelectorAll('.box'),
    winnerBox = document.querySelector('.winner'),
    isPlayer = document.querySelector('.isPlayer'),
    error = document.querySelector('.error'),
    onPcMoves = document.querySelector('.onPcMoves'),
    newGame = document.querySelector('.newGame')

let boxesArr = [...boxes]

const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let move = 0,
    result = '',
    pc = '',
    player = ''

// HELPER
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// RENDER
const winnerRender = (winner) => {
    winnerBox.innerHTML = `${winner}`
}

const errorRender = (textError) => {
    error.innerHTML = `${textError}`
    setTimeout(() => {
        error.innerHTML = ''
    }, 1000)
}

const onPcMovesRender = (text) => {
    onPcMoves.innerHTML = text
}

// GAME LOGIC
const choosePlayer = () => {
    let randomNumber = getRandomIntInclusive(0, 1);
    if (randomNumber === 0) {
        pc = 'X'
        player = 'O'
    } else if (randomNumber === 1) {
        pc = 'O'
        player = 'X'
    }
    isPlayer.innerHTML = "You play for " + player
}

const checkMethodPlayer = (a) => {
    if (boxes[a].innerHTML) {
        return true
    }
}

const checkDraw = () => {
    if (checkMethodPlayer(0) && checkMethodPlayer(1) && checkMethodPlayer(2) &&
        checkMethodPlayer(3) && checkMethodPlayer(4) && checkMethodPlayer(5) &&
        checkMethodPlayer(6) && checkMethodPlayer(7) && checkMethodPlayer(8)) {
        result = 'DRAW!'
        winnerRender(result)
    }
}

const check = () => {
    for (let i = 0; i < winCombination.length; i++) {
        if (boxes[winCombination[i][0]].innerHTML === pc &&
            boxes[winCombination[i][1]].innerHTML === pc &&
            boxes[winCombination[i][2]].innerHTML === pc) {
            result = 'YOU LOSE!'
            winnerRender(result)
        } else if (boxes[winCombination[i][0]].innerHTML === player
            && boxes[winCombination[i][1]].innerHTML === player
            && boxes[winCombination[i][2]].innerHTML === player) {
            result = 'YOU WON!'
            winnerRender(result)
        }
    }
    checkDraw();
}

const pcMoves = () => {
    let asd = boxesArr.filter((p) => {
        if (!p.innerHTML) {
            return true
        }
    })
    let randomNumber = getRandomIntInclusive(0, asd.length - 1);
    for (let i = 0; i < asd.length; i++) {
        if (randomNumber === i) {
            asd[i].innerHTML = pc;
            move++
            onPcMovesRender('')
        }
    }
}

const playerMoves = (e) => {
    if (!e.target.innerHTML) {
        e.target.innerHTML = player
        move++;
        onPcMovesRender('Сlick to make pc move')
    } else if (e.target.innerHTML) {
        let textError = 'This cell is busy, please choose another'
        errorRender(textError)
    }
}

const init = (e) => {
    if (e.target.className === 'box') {
        if (result === '') {
            if (pc === 'X') {
                move % 2 === 0 ? pcMoves() : playerMoves(e)
            } else if (pc === 'O') {
                move % 2 === 0 ? playerMoves(e) : pcMoves()
            }
            check()
        }
    }
}

const start = () => {
    choosePlayer()
    area.addEventListener('click', (e) => {
        init(e)
    })
    newGame.addEventListener('click', () => {
        location.reload()
    })
}

start();