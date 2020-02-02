function launchAppTDN(playerName) {
    currentApp = APPS.THEDARKNET;
    document.getElementById("screenDarkNet").classList.remove("hidden");
    document.getElementById("screenMainPage").classList.add("hidden");
    document.getElementById("modalContent").classList.remove("hidden");
    document.getElementById("btn" + playerName.Capitalize()).classList.add("hidden");
}

function closeAppTDN() {
    hideDarkWeb();
    clickableImage(true);
}

function hideDarkWeb() {
    document.getElementById("screenDarkNet").classList.add("hidden");
    document.getElementById("screenMainPage").classList.remove("hidden");
    document.getElementById("btn" + getCurrentPlayer().Capitalize()).classList.remove("hidden");
}

function confirmPaiement(cancel = false) {
    if (cancel) {
        hideDarkWeb();
    } else {
        document.getElementById("screenDarkNetIndex").classList.add("hidden");
        document.getElementById("modalContent").classList.add("hidden");
    }
}

function hackPlayer(name) {
    giveAFakeOffer(name);
    closeAppTDN();
}