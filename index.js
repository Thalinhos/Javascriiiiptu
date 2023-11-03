import express from 'express';
import dotenv from 'dotenv';
import readData from './db-querys/readAll.js';

dotenv.config()

const app = express();

app.get('/', async (req, res) => {
    const data = await readData()
    res.json(data);
    
})

app.listen(3001, () => {
    console.log('listening on http://localhost:3001');
})