const { Pool } = require('pg');

const connectionConfig = {
  host: process.env.PGHOST || 'db',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'todo',
  password: process.env.PGPASSWORD || 'todo',
  database: process.env.PGDATABASE || 'todo'
};

async function ensureSchema(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}

async function createPool() {
  const pool = new Pool(connectionConfig);
  await ensureSchema(pool);
  return pool;
}

module.exports = {
  createPool
};
