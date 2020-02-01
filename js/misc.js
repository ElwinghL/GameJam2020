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
        init &= param
    });
};

Boolean.prototype.or = function (...params) {
    let init = this;
    params.forEach(param => {
        init |= param
    });
};

Boolean.prototype.xor = function (...params) {
    let init = this;
    params.forEach(param => {
        init ^= param
    });
};

/* OBJECTS */
Object.prototype.forEach = function (callback, thisArg = this) {
    const keys = Object.keys(this);
    keys.forEach(callback, thisArg);
};