import connection from '../conn.js';
import dotenv from 'dotenv';

dotenv.config();


async function insertSomeData(nome, email) {
    try{
        const db = await connection()

        const query = `insert into usuarios (nome, email) values (?, ?)`;
        const values = [nome, email]

        const [result] = await db.query(query, values)

        console.log('Successfully inserted', result.id)
    }
    catch(err){
        console.error(err)
    }
}

insertSomeData('carolina', 'carol@email.com')