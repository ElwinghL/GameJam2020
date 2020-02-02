let players = [];
let currentPlayerIndex = 0;
const APPS = {
    MAINAPP: "mainApp",
    THEGOODCORNER: "theGoodCorner",
    THEDARKNET: "theDarkNet"
};

let currentApp = APPS.MAINAPP;

function checkPlayer(event, input) {
    let rank = input.getAttribute("rank");
    let value = input.value;
    const enterKey = "Enter";
    if (enterKey === event.code && enterKey === event.key && value.length > 0 && currentPlayerIndex < 4) {
        addPlayer(value, rank);
        if (rank === (currentPlayerIndex - 1).toString() && currentPlayerIndex < 4) {
            addPlayerInput();
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
        actualDelivery[name] = {
            fakeOffer: 0, //Number of fake offers
            command: []
        };
        const line = document.getElementById("tablePlayers").insertRow();
        line.insertCell().appendChild(createHTMLElement("BUTTON", {
            onClick: "hackPlayer('" + name + "')",
            id: "btn" + name.Capitalize()
        }, "criminal.HACK(" + name + ")"));
    }
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentStateGame();
    decrementTimeLeft(getCurrentPlayer());
}

function launchGame() {
    currentPlayerIndex = 0;
    document.getElementById("screenStart").classList.add("hidden");
    document.getElementById("screenShared").classList.remove("hidden");
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


function clickableImage(disable = false) {
    Array.from(document.getElementsByClassName("appIcon")).forEach(app => {
        app.classList.toggle("nonClickable", disable);
    });
}

function closeCurrentApp() {
    switch (currentApp) {
        case APPS.MAINAPP:
            break;
        case APPS.THEGOODCORNER:
            closeAppTGC();
            break;
        case APPS.THEDARKNET:
            closeAppTDN();
            break;
    }
}

function switchNextPlayer() {
    closeCurrentApp();
    nextPlayer();
}