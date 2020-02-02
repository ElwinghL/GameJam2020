function launchAppDarkNet(playerName) {
    document.getElementById("screenDarkNet").classList.remove("hidden");
    document.getElementById("screenDarkNetIndex").classList.remove("hidden");
    document.getElementById("screenDarkNetListPlayers").classList.add("hidden");
    document.getElementById("screenMainPage").classList.add("hidden");
    document.getElementById("btn"+playerName.Capitalize()).classList.add("hidden");
}

function closeAppDarkNet() {
    document.getElementById("screenDarkNet").classList.add("hidden");
    document.getElementById("screenDarkNetIndex").classList.add("hidden");
    document.getElementById("screenDarkNetListPlayers").classList.add("hidden");
    document.getElementById("screenMainPage").classList.remove("hidden");
    document.getElementById("btn"+getCurrentPlayer().Capitalize()).classList.remove("hidden");
    clickableImage(false);
}

function confirmPaiement(){
    document.getElementById("screenDarkNetIndex").classList.add("hidden");
    document.getElementById("screenDarkNetListPlayers").classList.remove("hidden");
}

function hackPlayer(name){
    giveAFakeOffer(name);
    closeAppDarkNet();
}