const area = document.querySelector('.area'),
    boxes = document.querySelectorAll('.box'),
    winnerBox = document.querySelector('.winner'),
    isPlayer = document.querySelector('.isPlayer'),
    error = document.querySelector('.error'),
    onPcMoves = document.querySelector('.onPcMoves')

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


// common
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// render
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

// game logic
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

const check = () => {
    for (let i = 0; i < winCombination.length; i++) {
        if (boxes[winCombination[i][0]].innerHTML === pc && boxes[winCombination[i][1]].innerHTML === pc && boxes[winCombination[i][2]].innerHTML === pc) {
            result = 'YOU LOSE!'
            winnerRender(result)
        } else if (boxes[winCombination[i][0]].innerHTML === player && boxes[winCombination[i][1]].innerHTML === player && boxes[winCombination[i][2]].innerHTML === player) {
            result = 'YOU WON!'
            winnerRender(result)
        }
        // for (let p = 0; p < boxes.length; p++) {
        //     if (boxes[p].innerHTML !== '') {
        //         result = 'DRAW'
        //         winnerRender(result)
        //     }
        // }
    }

}

const pcMoves = () => {
    let randomNumber = getRandomIntInclusive(0, 8);
    if (boxes[randomNumber].innerHTML === pc || boxes[randomNumber].innerHTML === player) {
        move = move + 2
        return move
    }
    for (let i = 0; i < boxes.length; i++) {
        if (randomNumber === i) {
            boxes[i].innerHTML = pc;
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

const start = (e) => {
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


choosePlayer()
area.addEventListener('click', (e) => {
    start(e)
})