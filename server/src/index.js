const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const buildRouter = require('./routes');
const { createConnection } = require('./db');
const TodoRepository = require('./todoRepository');

const app = express();
const port = process.env.PORT || 3000;

const db = createConnection();
const todoRepo = new TodoRepository(db);

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
