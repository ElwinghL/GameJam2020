/* ARRAY */
Array.prototype.last = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
    return null;
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

/* OBJECTS */
Object.prototype.forEach = function (callback, thisArg = this) {
    const keys = Object.keys(this);
    keys.forEach(callback, thisArg);
};

String.prototype.trueEqual = function (...params) {
    params.forEach(param => {
        if (this !== param)
            return false;
    });
    return true;
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