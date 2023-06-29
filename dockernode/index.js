const express = require('express');

const port = 3000;
const HOST = '0.0.0.0';

const app = express();

app.get('/', function(req, res) {
    res.send('hello world');
})

app.listen(port, HOST);

//docker run -p 3000:3000 nodejs
//para rodar em docker