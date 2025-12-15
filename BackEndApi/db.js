const pg = require('pg');
require('dotenv').config();

const config = {
  host: process.env.PGHOST || 'postgres_container',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'changeme',
  database: process.env.PGDATABASE || 'testdb',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  max: process.env.PG_MAX_CLIENTS ? Number(process.env.PG_MAX_CLIENTS) : 10,
  idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT_MS ? Number(process.env.PG_IDLE_TIMEOUT_MS) : 30000,
};

const pool = new pg.Pool(config);

async function query(text, params) {
  const result = await pool.query(text, params);
  return result.rows;
}

module.exports = {
  query,
  pool,
};