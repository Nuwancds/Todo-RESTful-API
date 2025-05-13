// db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

const initializeDatabase = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT false
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Table "todos" is ready.');
    } catch (err) {
        console.error('Error initializing the database:', err);
    }
};

module.exports = { pool, initializeDatabase };