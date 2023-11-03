import connection from './conn.js';
import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise'

dotenv.config();


async function readData() {
    try{
        const db = await connection()

        const query = `select * from usuarios`;


        const [result] = await db.query(query)

        console.log("successfully read data")
        console.log(result)
        return result
    }
    catch(err){
        console.error(err)
    }
}

export default readData;