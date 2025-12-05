const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const buildRouter = require('./routes');
const { createPool } = require('./db');
const TodoRepository = require('./todoRepository');

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  const pool = await createPool();
  const todoRepo = new TodoRepository(pool);

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());

  app.use('/api', buildRouter(todoRepo));

  const clientDistPath = path.join(__dirname, '..', 'public');
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
