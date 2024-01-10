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
var gameBoardMoves = {
    playerOneMoves: [],
    playerTwoMoves: []
};
var turns = 0

// EVENT LISTENERS
addEventListener('load', loadGame);
gameBoard.addEventListener('click',function(event) {
    if(event.target.classList.contains('grid-item')) {
        updateGameboard(event)
        // switchTurns()
        // checkBoard()
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
}

// Increase Wins
// if checkBoard() is playerOne, players[0].wins ++
// if checkBoard() is playerTwo, players[1].wins ++

// Keep track of gameboard data
function updateGameboard(e) {
    console.log(`updateGameboard`)
    // console.log(e.srcElement.attributes[1].nodeValue)
    gameBoardMoves.playerOneMoves.push(e.srcElement.attributes[1].nodeValue)
    console.log('gameboardMoves', gameBoardMoves)
    //if player.isTurn change the target's inner text to that players token
}

// Display gameboard data:
// function displayMoves() {

// }

// function makeAnnouncement() {
// update the announcement element's innerText to display whose turn it is
// if someone has won, announce the winner, then timeout and display whose turn it is
// if there is draw, announce there's a draw, then timeout and display whose turn it is
// }

// Keep track of which player's turn it is:
function switchTurns() {
    // turns ++
    // Q: how will I keep track of who started the last round?

    //check the player object to see if it's their turn
    //if it is the players turn, reassign isTurn to false
    //and assign the other players turn to true
    
    
}

// Check board for win conditions & check board for a draw:
function checkBoard() {
// declare winner variable
// look through gameBoardMoves[0] and [1]
// if gameboardMoves[0] includes a winning condition, player one assigned to winner
// if gameboardMoves[1] includes a winning condition, player two to winner
// if turns = 9 and neither array includes a winning condition, determine a draw
// and winner assigned to null
// return winner
}



// Reset gameboard and start new game
function endGame() {
// reset gameBoardMoves
}



