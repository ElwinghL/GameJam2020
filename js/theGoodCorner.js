/**
 * {
 *     person : {
 *         fakeOffer :0, //Number of fake offers 0 - 3
 *         command : [
 *             {
 *                 sparePart : KEY,
 *                 timeLeft : n,
 *                 address: "address for the delivery",
 *                 tolerance: n
 *             }
 *         ]
 *     }
 * }
 *
 */
let actualDelivery = [];
let currentOffers = [];

function pickARandomSparePart() {
    return pickInStock(SPARE_PARTS);
}

function pickARandomDice() {
    return pickInStock(DICES);
}

function pickARandomAdress() {
    return pickInStock(ADDRESS);
}

function pickInStock(objectOfStock) {
    let globalStocks = [];
    objectOfStock.forEach(part => {
        if (objectOfStock[part].hasOwnProperty("stock")) {
            for (let i = 0; i < objectOfStock[part].stock; ++i) {
                globalStocks.push(part);
            }
        } else {
            globalStocks.push(part);
        }
    });
    console.log(globalStocks);
    return globalStocks[randomInt(0, globalStocks.length - 1)];
}

function getThePrice(key) {
    let globalStock = {};
    Object.assign(globalStock, SPARE_PARTS, DICES);
    return globalStock[key].price;
}

function tossACoin() { //To your witcher ?
    return randomInt(0, 1) === 1;
}

function randomizePrice(key) {
    const initialPrice = getThePrice(key);
    return initialPrice + (tossACoin() ? randomInt(0, Math.floor(initialPrice * 0.8)) : -Math.floor(initialPrice * 0.8));
}

function getYourOffers(playerName) {
    let ret = [];
    const commands = actualDelivery[playerName];
    if (commands.command.length < 3) {
        for (let i = 0; i < 3 - commands.command.length; ++i) {
            const address = pickARandomAdress();
            const key = (randomInt(1, 20) === 1 ? pickARandomDice() : pickARandomSparePart());
            let offer = {
                sparePart: key,
                timeLeft: randomInt(2, 5),
                address: ADDRESS[address].availableNumber[randomInt(0, ADDRESS[address].availableNumber.length - 1)] + "_" + address,
                tolerance: randomInt(0, 4),
                fake: false,
                price: randomizePrice(key)
            };
            if (commands.fakeOffer > 0) {
                --actualDelivery[playerName].fakeOffer;
                offer.fake = true;
            }
            ret.push(offer);
        }
    }
    ret.shuffle(); //Pour ne pas avoir les fakes toujours au dessus
    return ret;
}

function giveAFakeOffer(playerName) {
    ++actualDelivery[playerName].fakeOffer;
}

function launchAppTGC(playerName) {
    currentApp = APPS.THEGOODCORNER;
    currentOffers = getYourOffers(playerName);
    displayOffers(playerName);
    document.getElementById("screenGoodCorner").classList.remove("hidden");
    document.getElementById("screenMainPage").classList.add("hidden");
}

function closeAppTGC() {
    currentOffers = [];
    document.getElementById("screenGoodCorner").classList.add("hidden");
    document.getElementById("screenMainPage").classList.remove("hidden");
    clickableImage(true);
}

function passCommand(playerName, indexOfProduct) {
    console.log({currentOffers, indexOfProduct});
    if (!currentOffers[indexOfProduct].fake) {
        actualDelivery[playerName].command.push({
            sparePart: currentOffers[indexOfProduct].sparePart,
            timeLeft: currentOffers[indexOfProduct].timeLeft,
            address: currentOffers[indexOfProduct].address,
            tolerance: currentOffers[indexOfProduct].tolerance,
        });
        currentOffers.splice(indexOfProduct, 1); //-1 parce que avant l'ajout
        displayOffers(playerName);
    } else {
        alert("Oh non... C'était une fausse annonce. Votre appli cesse de fonctionner... :(");
        closeAppTGC();
    }
}

function removeCommand(playerName, indexOfProduct) {
    actualDelivery[playerName].command.splice(indexOfProduct, 1);
    displayOffers(playerName);
}

function displayOffer(offer, table, index) {
    const line = createHTMLElement("TR");
    const imageCell = createHTMLElement("TD", {rowSpan: 2});
    const image = createHTMLElement("IMG", {src: "img/spareParts/"+offer.sparePart+".png", class: "pieceIcon"});
    imageCell.appendChild(image);
    const nameCell = createHTMLElement("TD", {colSpan: 2}, sanitizeName(offer.sparePart));
    const commandCell = createHTMLElement("TD", {rowSpan: 2});
    commandCell.appendChild(createHTMLElement("BUTTON", {onClick: "passCommand(getCurrentPlayer()," + index + ")"}, "Commander"));
    line.append(imageCell, nameCell, commandCell);
    const secondLine = createHTMLElement("TR");
    const princeCell = createHTMLElement("TD", {colSpan: 2}, offer.price + "€");
    secondLine.appendChild(princeCell);
    table.append(line, secondLine);
}

function displayCommand(command, table, index) {
    const line = createHTMLElement("TR");
    const imageCell = createHTMLElement("TD", {rowSpan: 3});
    const image = createHTMLElement("IMG", {src: "img/spareParts/screw.png", class: "pieceIcon"});
    imageCell.appendChild(image);
    const nameCell = createHTMLElement("TD", {colSpan: 2}, sanitizeName(command.sparePart));
    const commandCell = createHTMLElement("TD", {rowSpan: 3});
    commandCell.appendChild(createHTMLElement("BUTTON", {onClick: "removeCommand(getCurrentPlayer()," + index + ")"}, "Annuler"));
    line.append(imageCell, nameCell, commandCell);
    const secondLine = createHTMLElement("TR");
    const timeLeftCell = createHTMLElement("TD", {colSpan: 2}, command.timeLeft + " tours restants");
    secondLine.append(timeLeftCell);
    const addressLine = createHTMLElement("TR");
    const addressCell = createHTMLElement("TD", {colSpan: 2}, sanitizeName(command.address) + " ± " + command.tolerance + " cases");
    addressLine.appendChild(addressCell);
    table.append(line, secondLine, addressLine);
}

function displayOffers(playerName) {
    const table = document.getElementById("tableOffers");
    table.innerHTML = "";
    let i = 0;
    actualDelivery[playerName].command.forEach(command => {
        displayCommand(command, table, i++);
    });
    i = 0;
    currentOffers.forEach(offer => {
        displayOffer(offer, table, i++);
    });
}

function sanitizeName(str) {
    let ret = "";
    str.split("_").forEach(elt => {
        if (elt === "TPTS") {
            elt = "...";
        }
        ret += elt.toLowerCase().Capitalize() + " ";
    });
    return ret;
}

function decrementTimeLeft(playerName) {
    let articleToDelete = [];
    actualDelivery[playerName].command.forEach(article => {
        if (--article.timeLeft === 0) {
            articleToDelete.push(article);
        }
    });
    articleToDelete.forEach(article => {
        actualDelivery[playerName].command.splice(actualDelivery[playerName].command.indexOf(article), 1);
    })
}