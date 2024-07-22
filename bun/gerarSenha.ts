const crypto = require('crypto');
const senha = process.argv[2]
console.log(crypto.createHash('sha256').update(senha).digest('hex'))
console.log(senha)
