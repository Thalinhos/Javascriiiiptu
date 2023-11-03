import dotenv from 'dotenv';
import mysql from 'mysql2/promise'

dotenv.config()

async function connection() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL)
        console.log('Connected to PlanetScale!')
        return connection
    }
    catch(err) {
        console.error(err)
    }
}

export default connection;






  