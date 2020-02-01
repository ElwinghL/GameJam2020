let players = [];
let currentPlayerIndex = 0;

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function getCurrentPlayer() {
    return players[currentPlayerIndex];
}