let players = [];
let currentPlayerIndex = 0;

let hasUsedAnApp = false;

function checkPlayer(event, input) {
    let rank = input.getAttribute("rank");
    let value = input.value;
    const enterKey = "Enter";
    if (enterKey === event.code && enterKey === event.key && value.length > 0) {
        addPlayer(value, rank);
        if (rank === (currentPlayerIndex - 1).toString()) {
            addPlayerInput();
        }
    } else { //Modifier un pseudo
        if (players.length > rank) {
            players[rank] = value;
        }
    }
}

function addPlayerInput() {
    let tableOfPlayers = document.getElementById("playersList");
    let row = tableOfPlayers.insertRow();
    let firstCell = createHTMLElement("TD", {}, "Joueur " + (currentPlayerIndex + 1));
    let inputCell = createHTMLElement("TD", {});
    let inputText = createHTMLElement("INPUT", {
        type: "text",
        rank: currentPlayerIndex,
        onkeydown: "checkPlayer(event, this)"
    });
    inputCell.appendChild(inputText);
    row.append(firstCell, inputCell);

    if (currentPlayerIndex >= 2) {
        document.getElementById("btnStartGame").classList.remove("hidden");
    }
}

function addPlayer(name, rank) {
    if ((players.length > 0).and(players.indexOf(name) !== -1, players.indexOf(name) !== rank)) {
        addPlayer(name + " Bis", rank);
    } else {
        players.push(name);
        ++currentPlayerIndex;
    }
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    hasUsedAnApp = false;
    currentStateGame();
}

function launchGame() {
    currentPlayerIndex = 0;
    document.getElementById("screenStart").classList.add("hidden");
    document.getElementById("screenMainPage").classList.remove("hidden");
    currentStateGame();
}

function getCurrentPlayer() {
    return players[currentPlayerIndex];
}

function currentStateGame() {
    document.getElementById("headerMainPage").innerHTML = getCurrentPlayer();
    clickableImage(false);
}


function clickableImage(disable) {
    Array.from(document.getElementsByClassName("appIcon")).forEach(app => {
        app.classList.toggle("nonClickable", disable);
    });
}