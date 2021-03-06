/* ARRAY */
Array.prototype.last = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
    return null;
};

Array.prototype.shuffle = function () {
    this.sort(() => Math.random() - 0.5);
};

/* BOOLEAN */
Boolean.prototype.and = function (...params) {
    let init = this;
    params.forEach(param => {
        init &= param;
    });
};

Boolean.prototype.or = function (...params) {
    let init = this;
    params.forEach(param => {
        init |= param;
    });
};

Boolean.prototype.xor = function (...params) {
    let init = this;
    params.forEach(param => {
        init ^= param;
    });
};

/* STRINGS */

/**
 * @return {string}
 */
String.prototype.Capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substring(1);
};

/* OBJECTS */
Object.prototype.forEach = function (callback, thisArg = this) {
    const keys = Object.keys(this);
    keys.forEach(callback, thisArg);
};

/* OTHER */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTruth() {
    console.log("Tu pues Marie");
    console.warn("Tu brainstorm dans le vide");
    console.error("Bon, commence à bosser là !");
    return "Et genre bcp";
}

function createHTMLElement(TAG, attributes = {}, innerHTML = "") {
    let element = document.createElement(TAG);
    attributes.forEach(key => {
        element.setAttribute(key, attributes[key]);
    });
    element.innerHTML = innerHTML;
    return element;
}