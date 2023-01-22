require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool(process.env.DATABASE_URL);
// Check open connections on server
// SHOW VARIABLES LIKE 'max_connections';
// SHOW STATUS WHERE `variable_name` = 'Threads_connected';

// Test connection
async function mysqlConnect() {
  const config = pool.pool.config.connectionConfig;
  try {
    console.log(`- Connected to ${config.database} on ${config.host}`);
  } catch (error) {
    throw new Error(error);
  }
}

// Query function
// const { rows, fields, duration } = await query(`SELECT NOW()`);
async function query(sql) {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.query(sql);
    const duration = Date.now() - start;
    return { rows, fields, duration };
  } catch (error) {
    throw new Error(error);
  } finally {
    pool.end();
  }
}

// Execute function
// const { rows, fields, duration } = await execute(`SELECT NOW()`);
async function execute(sql, params) {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.execute(sql, params);
    const duration = Date.now() - start;
    return { rows, fields, duration };
  } catch (error) {
    throw new Error(error);
  } finally {
    pool.end();
  }
}

module.exports = { mysqlConnect, query, execute };
