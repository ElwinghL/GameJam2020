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

function pickARandomAdresse() {
    return pickInStock(ADDRESS);
}

function pickInStock(objectOfStock) {
    let globalStocks = [];
    objectOfStock.forEach(part => {
        if (objectOfStock.hasOwnProperty("stock")) {
            for (let i = 0; i < objectOfStock[part].stock; ++i) {
                globalStocks.push(part);
            }
        } else {
            globalStocks.push(part);
        }
    });
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
            const address = pickARandomAdresse();
            const key = (randomInt(1, 20) === 20 ? pickARandomDice() : pickARandomSparePart());
            let offer = {
                sparePart: key,
                timeLeft: randomInt(2, 5),
                address: address.availableNumber[randomInt(0, address.availableNumber.length - 1)] + " " + address,
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

function launchAppTGC(playerName) {
    currentOffers = getYourOffers(playerName);
}

function closeAppTGC() {
    currentOffers = [];
    document.getElementById("screenGoodCorner").classList.add("hidden");
    document.getElementById("screenMainPage").classList.remove("hidden");
    clickableImage(true);
}

function passCommand(playerName, indexOfProduct) {
    if (!currentOffers[indexOfProduct].fake) {
        actualDelivery[playerName].command.push({
            sparePart: currentOffers[indexOfProduct].sparePart,
            timeLeft: currentOffers[indexOfProduct].sparePart,
            address: currentOffers[indexOfProduct].address,
            tolerance: currentOffers[indexOfProduct].tolerance,
        });
    } else {
        alert("Oh non... C'était une fausse annonce. Votre appli cesse de fonctionner... :(");
        closeAppTGC();
    }
}
