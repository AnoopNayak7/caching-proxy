const cache = new Map();

function set(key, data) {
    cache.set(key, data);
}

function get(key) {
    return cache.get(key);
}

function clear() {
    cache.clear();
}

module.exports = { set, get, clear };
