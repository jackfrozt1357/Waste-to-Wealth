const API = require('phone-number-validation');
const key = require('./secret').access_key;

const numverify = new API({
    access_key: key
});

module.exports= numverify;