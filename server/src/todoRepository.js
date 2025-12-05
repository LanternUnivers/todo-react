function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.created_at
  };
}

class TodoRepository {
  constructor(db) {
    this.db = db;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM todos ORDER BY created_at DESC', (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(mapRow));
      });
    });
  }

  create(title) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('INSERT INTO todos(title, completed) VALUES(?, 0)');
      stmt.run(title, function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  update(id, { title, completed }) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ?');
      stmt.run(title, completed ? 1 : 0, id, function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('DELETE FROM todos WHERE id = ?');
      stmt.run(id, function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = TodoRepository;
