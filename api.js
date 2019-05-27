const storeHierarchy = require('./data/storeHierarchy');
const storeSales = require('./data/storeSales');

const getStoreHierarchy = async () => {
    // Note: the only reason for the timeout is to simulate an API call to a server
    return new Promise((resolve) => {
        setTimeout(resolve(storeHierarchy), 100);
    });
}

const getStoreSales = async () => {
    // Note: the only reason for the timeout is to simulate an API call to a server
    return new Promise((resolve) => {
        setTimeout(resolve(storeSales), 100);
    });
}

module.exports = {
    getStoreHierarchy: getStoreHierarchy,
    getStoreSales: getStoreSales
}