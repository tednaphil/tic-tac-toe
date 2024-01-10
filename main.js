// QUERY SELECTORS
var playerOneWins = document.querySelector('#player-one-wins');
var playerTwoWins = document.querySelector('#player-two-wins');
var announcement = document.querySelector('#announcement')
var gameBoard = document.querySelector('.game-board');
var boardSpaces = {
    0: document.querySelector('#position-0'),
    1: document.querySelector('#position-1'),
    2: document.querySelector('#position-2'),
    3: document.querySelector('#position-3'),
    4: document.querySelector('#position-4'),
    5: document.querySelector('#position-5'),
    6: document.querySelector('#position-6'),
    7: document.querySelector('#position-7'),
    8: document.querySelector('#position-8')
};

// GLOBAL VARIABLES
var players = [];
var gameBoardMoves = {
    playerOneMoves: [],
    playerTwoMoves: []
};
var startedGame = 'playerOne'
var turns = 0

// EVENT LISTENERS
addEventListener('load', loadGame);
gameBoard.addEventListener('click',function(event) {
    if(event.target.classList.contains('grid-item')) {
        updateGameboard(event)
        displayMoves()
        switchTurns()
        checkBoard()
        increaseWins()
        announceTurn()
     }
})


// FUNCTIONS
// Create a player:

function createPlayer() {
    // console.log('createPlayer')
    var playerOne = {
        id: 1,
        token: '🐝',
        isTurn: true,
        wins: 0
    }
    var playerTwo = {
        id: 2,
        token: '🐻',
        isTurn: false,
        wins: 0
    }
    players.push(playerOne, playerTwo)
};

// Display player data
function displayWins() {
    playerOneWins.innerText = `${players[0].wins} wins`
    playerTwoWins.innerText = `${players[1].wins} wins`
};

function clearBoard() {
    boardSpaces[0].innerText = '';
    boardSpaces[1].innerText = '';
    boardSpaces[2].innerText = '';
    boardSpaces[3].innerText = '';
    boardSpaces[4].innerText = '';
    boardSpaces[5].innerText = '';
    boardSpaces[6].innerText = '';
    boardSpaces[7].innerText = '';
    boardSpaces[8].innerText = '';
};

function loadGame() {
    createPlayer();
    displayWins();
    clearBoard();
    announceTurn();
}

// Increase Wins:
function increaseWins() {
    // console.log('increase wins winner:', checkBoard())
    if (checkBoard() === 'playerOne') {
        players[0].wins ++
        console.log('win for player one')
        console.log(players[0].wins)
        // announceWinner(players[0])
        resetGame()
    }
    if (checkBoard() === 'playerTwo') {
        players[1].wins ++
        console.log('win for player two')
        console.log(players[1].wins)
        // announceWinner(players[1])
        resetGame()
    } else if (checkBoard() === null) {
        console.log('twas a draw')
        // announceWinner()
        resetGame()
    }
    displayWins()
}

// Keep track of gameboard data
function updateGameboard(e) {
    // console.log(`updateGameboard`)
    // console.log(e.srcElement.attributes[1].nodeValue)
    // only allow a boardSpace to be added once
    if (players[0].isTurn) {
        gameBoardMoves.playerOneMoves.push(e.srcElement.attributes[1].nodeValue)
    }
    if (players[1].isTurn) {
        gameBoardMoves.playerTwoMoves.push(e.srcElement.attributes[1].nodeValue)
    }
    gameBoardMoves.playerOneMoves.sort()
    gameBoardMoves.playerTwoMoves.sort()
    console.log(`player two sorted moves`, gameBoardMoves.playerTwoMoves)
    // console.log('gameboardMoves', gameBoardMoves)
    //if player.isTurn change the target's inner text to that players token
}

// Display gameboard data:
function displayMoves() {
    var playerOneMoves = gameBoardMoves.playerOneMoves;
    var playerTwoMoves = gameBoardMoves.playerTwoMoves;
    for (var i = 0; i < playerOneMoves.length; i++) {
        boardSpaces[playerOneMoves[i]].innerText = `${players[0].token}`
        console.log(boardSpaces[playerOneMoves[i]])
    }
    for (var i = 0; i < playerTwoMoves.length; i++) {
        boardSpaces[playerTwoMoves[i]].innerText = `${players[1].token}`
        console.log(boardSpaces[playerTwoMoves[i]])
    }
}

function announceTurn() {
// update the announcement element's innerText to display whose turn it is
// if someone has won, announce the winner, then timeout and display whose turn it is
// if there is draw, announce there's a draw, then timeout and display whose turn it is  
    if (players[0].isTurn) {
        announcement.innerText = `It's ${players[0].token}'s turn`
    }
    if (players[1].isTurn) {
        announcement.innerText = `It's ${players[1].token}'s turn`
    }   
}

// function announceWinner(playerObject) {
//     console.log(`announceWinner`)
//     console.log(playerObject.token)
//     if (checkBoard()) {
//         announcement.innerText = `${playerObject.token} won the honey!`
//         console.log('winner announcement')
//     } else {
//         announcement.innerText = `It's a draw!`
//         console.log('draw announcement')
//     }
// }

// Keep track of which player's turn it is:
function switchTurns() {
    turns ++
    if (players[0].isTurn) {
        players[1].isTurn = true;
        players[0].isTurn = false;
        console.log(`it's player two's turn next`)
    } else {
        players[0].isTurn = true;
        players[1].isTurn = false;
        console.log(`it's player one's turn next`)
    }
}

// Check board for win conditions & check board for a draw:
function checkBoard() {
    var winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    var winner = ''
    for (var i = 0; i < winningConditions.length; i++) {
        // console.log('checkBoard for loop')
        // console.log('gameboard moves player One', gameBoardMoves.playerOneMoves.toString())
        // console.log('winning condition 0', winningConditions[0].toString())
        // console.log(gameBoardMoves.playerOneMoves.toString().includes(winningConditions[i]))
        // console.log(gameBoardMoves.playerOneMoves.includes(winningConditions[i]))
        // console.log(winningConditions[3])
        // console.log('player one moves', gameBoardMoves.playerOneMoves.toString())
        if (gameBoardMoves.playerOneMoves.toString().includes(winningConditions[i])) {
            winner = 'playerOne'
            console.log('player one wins')
        } else if (gameBoardMoves.playerTwoMoves.toString().includes(winningConditions[i])) {
            winner = 'playerTwo'
            console.log('player two wins')
        } else if (turns === 9) {
            winner = null
            console.log('a draw')
        }
    }
    return winner
}


// Reset gameboard and start new game:
function resetGame() {
    gameBoardMoves = {
        playerOneMoves: [],
        playerTwoMoves: []
    };
    console.log('started this game', startedGame)
    if (startedGame === 'playerOne') {
        startedGame = 'playerTwo'
        players[1].isTurn = true
        players[0].isTurn = false
        }
    else if (startedGame === 'playerTwo') {
        startedGame = 'playerOne'
        players[0].isTurn = true
        players[1].isTurn = false
    };
    turns = 0;
    clearBoard();
console.log('starting next game', startedGame)
console.log(gameBoardMoves)
}
