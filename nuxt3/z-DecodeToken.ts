// // const token = "MTgudGhhbGlzc29uLXZpZWlyYS4xNzI5NTI2MTUxODkz";

// // const decodedToken = Buffer.from(token, 'base64').toString('utf-8');

// // console.log(decodedToken);

// //////////////////////////////
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY não está definida nas variáveis de ambiente.');
}

// const tokenHmac = "flIDWhnVfalQLasR4rU9GhK1mI/drN/AV3B9lc4Hw/k=";

// const decodedPayload = Buffer.from(tokenHmac, 'base64').toString('utf-8');

// const [id, name, expiration] = decodedPayload.split('.');

// if (parseInt(expiration) < Date.now()) {
//   console.log({ error: 'Token expired.' });
// } else {
//   console.log("Token still in time", parseInt(expiration), id, name);
// }

const tokenInfo = "MTgudGhhbGlzc29uLXZpZWlyYS4xNzI5NTI2MDI5OTcz"
const decodedToken = Buffer.from(tokenInfo, 'base64').toString('utf-8');
console.log(decodedToken);

const tokenHash = "9/qEfq502aCGFib3MJolcfKr2JgHG8Ut7ZvKmLWW6o4="
const tokenHashVerify = crypto.createHmac('sha256', apiKey)
                      .update(decodedToken)
                      .digest('base64');

const timeToken = decodedToken.split('.')[2]

if(parseInt(timeToken) < Date.now()){
    console.log('time valid')
}
else{
    console.log('time invalid')
}

if (tokenHash === tokenHashVerify){
    console.log("hash token valido")
}
else {
    console.log("hash token invalid")
}