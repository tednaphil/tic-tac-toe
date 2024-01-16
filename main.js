// QUERY SELECTORS
var playerOneWins = document.querySelector('#player-one-wins');
var playerTwoWins = document.querySelector('#player-two-wins');
var announcement = document.querySelector('#announcement')
var gameBoard = document.querySelector('.game-board');
var boardSpaces = {
    0: document.querySelector('#position0'),
    1: document.querySelector('#position1'),
    2: document.querySelector('#position2'),
    3: document.querySelector('#position3'),
    4: document.querySelector('#position4'),
    5: document.querySelector('#position5'),
    6: document.querySelector('#position6'),
    7: document.querySelector('#position7'),
    8: document.querySelector('#position8')
};

// GLOBAL VARIABLES
var players = [];
var gameBoardMoves = {
    playerOneMoves: [],
    playerTwoMoves: [],
    allMoves: []
};
// var startedGame = 'playerOne'
var winner = ''

// EVENT LISTENERS
addEventListener('load', loadGame);
gameBoard.addEventListener('click',function(event) {
    if(event.target.classList.contains('grid-item')) {
        updateGameboard(event)
        displayMoves()
        announceTurn()
        checkBoard()
        increaseWins(winner)
     }
});

// FUNCTIONS
function createPlayer() {
    var playerOne = {
        id: 'One',
        token: '🐝',
        isTurn: true,
        startGame: true,
        wins: 0
    }
    var playerTwo = {
        id: 'Two',
        token: '🐻',
        isTurn: false,
        startGame: false,
        wins: 0
    }
    players.push(playerOne, playerTwo)
};

function switchTurns() {
    if (players[0].isTurn) {
        players[1].isTurn = true
        players[0].isTurn = false
    } else {
        players[0].isTurn = true
        players[1].isTurn = false
    }
};

function displayWins() {
    playerOneWins.innerText = `${players[0].wins} wins`
    playerTwoWins.innerText = `${players[1].wins} wins`
};

function displayMoves() {
    var playerOneMoves = gameBoardMoves.playerOneMoves
    var playerTwoMoves = gameBoardMoves.playerTwoMoves
    for (var i = 0; i < playerOneMoves.length; i++) {
        boardSpaces[playerOneMoves[i]].innerText = `${players[0].token}`
    }
    for (var i = 0; i < playerTwoMoves.length; i++) {
        boardSpaces[playerTwoMoves[i]].innerText = `${players[1].token}`
    }
};

function announceTurn() {
    for (var i = 0; i < players.length; i++) {
        if (players[i].isTurn) {
            announcement.innerText = `It's ${players[i].token}'s turn`
        }
    }
};

function updateGameboard(e) {
    var space = e.srcElement.attributes[1].nodeValue
    if (players[0].isTurn && !gameBoardMoves.allMoves.includes(space)) {
        gameBoardMoves.playerOneMoves.push(space)
        gameBoardMoves.allMoves.push(space)
        switchTurns()
    }
    if (players[1].isTurn && !gameBoardMoves.allMoves.includes(space)) {
        gameBoardMoves.playerTwoMoves.push(space)
        gameBoardMoves.allMoves.push(space)
        switchTurns()
    }
    gameBoardMoves.playerOneMoves.sort()
    gameBoardMoves.playerTwoMoves.sort()
};

function checkBoard() {
    var winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (var i = 0; i < winningConditions.length; i++) {
        if (gameBoardMoves.playerOneMoves.toString().includes(winningConditions[i][0])
            && gameBoardMoves.playerOneMoves.toString().includes(winningConditions[i][1])
            && gameBoardMoves.playerOneMoves.toString().includes(winningConditions[i][2])) {
                winner = players[0]
        }
        else if (gameBoardMoves.playerTwoMoves.toString().includes(winningConditions[i][0])
                && gameBoardMoves.playerTwoMoves.toString().includes(winningConditions[i][1])
                && gameBoardMoves.playerTwoMoves.toString().includes(winningConditions[i][2])) {
                    winner = players[1]
        }
        else if (gameBoardMoves.allMoves.length === 9 && winner === '') {
            winner = null
        }
    }
    return winner
};

function announceWinner(playerObject) {
    if (checkBoard()) {
        announcement.innerText = `${playerObject.token} won the honey!`
    } else if (checkBoard() === null) {
        announcement.innerText = `It's a draw!`
    }
};

function increaseWins(winner) {
    if (checkBoard()) {
        winner.wins ++
        announceWinner(winner)
        disableBoard()
        setTimeout(resetGame, 2500)
    } else if (checkBoard() === null) {
        announceWinner('draw')
        disableBoard()
        setTimeout(resetGame, 2500)
    }
    displayWins()
};

function clearBoard() {
    for (var i = 0; i < 9; i++) {
        boardSpaces[i].innerText = ''
    }
};

function disableBoard() {
    for (var i = 0; i < 9; i++) {
        boardSpaces[i].disabled = true
    }
};

function enableBoard() {
    for (var i = 0; i < 9; i++) {
        boardSpaces[i].disabled = false
    }
};

function resetGame() {
    gameBoardMoves = {
        playerOneMoves: [],
        playerTwoMoves: [],
        allMoves: []
    }
    for (var i = 0; i < players.length; i++)
        if (!players[i].startGame) {
            players[i].startGame = true
            players[i].isTurn = players[i].startGame ? true : false
        } else if (players[i].startGame) {
            players[i].startGame = false
        }
    winner = ''
    clearBoard()
    enableBoard()
    announceTurn()
};

function loadGame() {
    createPlayer()
    displayWins()
    announceTurn()
};

