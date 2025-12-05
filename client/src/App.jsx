import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './api';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const { todos: updated } = await createTodo(input.trim());
      setTodos(updated);
      setInput('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(todo) {
    setLoading(true);
    try {
      const { todos: updated } = await updateTodo(todo.id, {
        title: todo.title,
        completed: !todo.completed
      });
      setTodos(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      const { todos: updated } = await deleteTodo(id);
      setTodos(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">React + SQLite + Docker</p>
          <h1>Todoリスト</h1>
        </div>
        <p className="hint">ローカルSQLデータベースでタスクを管理します。</p>
      </header>

      <main className="card">
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="やることを入力"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>追加</button>
        </form>

        {error && <div className="error">{error}</div>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                  disabled={loading}
                />
                <span>{todo.title}</span>
              </label>
              <button
                className="delete"
                onClick={() => handleDelete(todo.id)}
                disabled={loading}
                aria-label="delete"
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        {loading && <p className="loading">読み込み中...</p>}
      </main>
    </div>
  );
}

export default TodoApp;
