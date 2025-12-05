const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const defaultDbFile = process.env.DB_FILE || path.join(__dirname, '..', 'data', 'todos.db');

function ensureDatabaseDirectory(dbFile) {
  const dir = path.dirname(dbFile);
  if (!require('fs').existsSync(dir)) {
    require('fs').mkdirSync(dir, { recursive: true });
  }
}

function createConnection() {
  ensureDatabaseDirectory(defaultDbFile);
  const db = new sqlite3.Database(defaultDbFile);

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );
  });

  return db;
}

module.exports = {
  createConnection
};
