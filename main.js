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

// EVENT LISTENERS
addEventListener('load', loadGame);


// FUNCTIONS
// Create a player:

function createPlayer() {
    // console.log('createPlayer')
    var playerOne = {
        id: 1,
        token: '🐝',
        wins: 0
    }
    var playerTwo = {
        id: 2,
        token: '🐻',
        wins: 0
    }
    players.push(playerOne, playerTwo)
};

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
// Keep track of gameboard data
// Keep track of which player's turn it is
// Check board for win conditions
// Check board for a draw
// Reset gameboard and start new game
// Display gameboard data
// Display player data

