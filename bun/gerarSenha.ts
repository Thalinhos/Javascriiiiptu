const crypto = require('crypto');

console.log(crypto.createHash('sha256').update('thalinhos123').digest('hex'))
