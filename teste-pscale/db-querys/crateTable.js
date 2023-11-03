import connection from './conn.js';
import dotenv from 'dotenv';

dotenv.config();

async function createTable() {
  try {
    const db = await connection(); // Aguarde a conexão ser estabelecida

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

    await db.query(createTableQuery);
    console.log('Tabela "usuarios" criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
  }
}

createTable();