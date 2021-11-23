const state = {
    //DOM ELEMENTS
    area: document.querySelector('.area'),
    boxes: document.querySelectorAll('.box'),
    winnerBox: document.querySelector('.winner'),
    isPlayer: document.querySelector('.isPlayer'),
    error: document.querySelector('.error'),
    onPcMoves: document.querySelector('.onPcMoves'),
    newGame: document.querySelector('.newGame'),
    //MAIN STATE
    boxesArr: [...document.querySelectorAll('.box')],
    winCombination: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    move: 0,
    result: '',
    pc: '',
    player: ''
}



const tikTacToe = {
    //HELPER
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    //RENDER
    winnerRender(winner) {
        state.winnerBox.innerHTML = `${winner}`
    },
    errorRender(textError) {
        state.error.innerHTML = `${textError}`
        setTimeout(() => {
            state.error.innerHTML = ''
        }, 1000)
    },
    onPcMovesRender(text) {
        state.onPcMoves.innerHTML = text
    },
    //GAME LOGIC
    choosePlayer() {
        let randomNumber = this.getRandomIntInclusive(0, 1)
        if (randomNumber === 0) {
            state.pc = 'X'
            state.player = 'O'
        } else if (randomNumber === 1) {
            state.pc = 'O'
            state.player = 'X'
        }
        state.isPlayer.innerHTML = "You play for " + state.player
    },
    checkDraw() {
        if (state.move === 9) {
            state.result = 'DRAW!'
            this.winnerRender(state.result)
        }
    },
    check() {
        for (let i = 0; i < state.winCombination.length; i++) {
            if (state.boxes[state.winCombination[i][0]].innerHTML === state.pc &&
                state.boxes[state.winCombination[i][1]].innerHTML === state.pc &&
                state.boxes[state.winCombination[i][2]].innerHTML === state.pc) {
                state.result = 'YOU LOSE!'
                this.winnerRender(state.result)
            } else if (state.boxes[state.winCombination[i][0]].innerHTML === state.player
                && state.boxes[state.winCombination[i][1]].innerHTML === state.player
                && state.boxes[state.winCombination[i][2]].innerHTML === state.player) {
                state.result = 'YOU WON!'
                this.winnerRender(state.result)
            }
        }
        this.checkDraw()
    },
    pcMoves() {
        let asd = state.boxesArr.filter((p) => {
            if (!p.innerHTML) {
                return true
            }
        })
        let randomNumber = this.getRandomIntInclusive(0, asd.length - 1)
        for (let i = 0; i < asd.length; i++) {
            if (randomNumber === i) {
                asd[i].innerHTML = state.pc
                state.move++
                this.onPcMovesRender('')
            }
        }
    },
    playerMoves(e) {
        if (!e.target.innerHTML) {
            e.target.innerHTML = state.player
            state.move++
            this.onPcMovesRender('Сlick to make pc move')
        } else if (e.target.innerHTML) {
            let textError = 'This cell is busy, please choose another'
            this.errorRender(textError)
        }
    },
    initialized(e) {
        if (e.target.className === 'box') {
            if (state.result === '') {
                if (state.pc === 'X') {
                    state.move % 2 === 0 ? this.pcMoves() : this.playerMoves(e)
                } else if (state.pc === 'O') {
                    state.move % 2 === 0 ? this.playerMoves(e) : this.pcMoves()
                }
                this.check()
            }
        }
    },
    start() {
        this.choosePlayer()
        let that = this
        state.area.addEventListener('click', (e) => {
            that.initialized(e)
        })
        state.newGame.addEventListener('click', () => {
            location.reload()
        })
    }
}


//START GAME
tikTacToe.start()