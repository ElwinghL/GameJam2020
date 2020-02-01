let players = [];
let currentPlayerIndex = 0;

function checkPlayer(event, input) {
    if ("Enter".trueEqual(event.code, event.key)) {
        addPlayer(input.value);
    }
}

function addPlayer(name) {
    if (players.length > 0 && players.includes(name)) {
        addPlayer(name + " Bis");
    } else {
        players.push(name);
    }
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function getCurrentPlayer() {
    return players[currentPlayerIndex];
}