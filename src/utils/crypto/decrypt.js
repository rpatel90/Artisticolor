module.exports = function(data, key) {
    const CryptoJS = require('crypto-js');
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
}