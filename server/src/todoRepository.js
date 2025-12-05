function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.created_at
  };
}

class TodoRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAll() {
    const result = await this.pool.query(
      'SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC'
    );
    return result.rows.map(mapRow);
  }

  async create(title) {
    const result = await this.pool.query(
      'INSERT INTO todos(title, completed) VALUES($1, FALSE) RETURNING id',
      [title]
    );
    return { id: result.rows[0].id };
  }

  async update(id, { title, completed }) {
    const result = await this.pool.query(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3',
      [title, Boolean(completed), id]
    );
    return { changes: result.rowCount };
  }

  async delete(id) {
    const result = await this.pool.query('DELETE FROM todos WHERE id = $1', [id]);
    return { changes: result.rowCount };
  }
}

module.exports = TodoRepository;
