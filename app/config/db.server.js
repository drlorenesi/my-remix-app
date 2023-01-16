require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool(process.env.DATABASE_URL);

// Test connection
async function mysqlConnect() {
  try {
    const db = await pool.getConnection();
    console.log(`- Connected to ${db.config.database} on ${db.config.host}`);
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
}

// Query function
// const data = await query(`SELECT NOW()`);
// const { rows, fields } = await query(`SELECT NOW()`);
async function query(sql) {
  try {
    const [rows, fields] = await pool.query(sql);
    return { rows, fields };
  } catch (error) {
    throw new Error(error);
  }
}

// Execute function
// const data = await execute(`SELECT NOW()`);
// const { rows, fields } = await execute(`SELECT NOW()`);
async function execute(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return { rows, fields };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { mysqlConnect, query, execute };
