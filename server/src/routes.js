const express = require('express');

function buildRouter(todoRepo) {
  const router = express.Router();

  router.get('/todos', async (_req, res, next) => {
    try {
      const todos = await todoRepo.getAll();
      res.json(todos);
    } catch (err) {
      next(err);
    }
  });

  router.post('/todos', async (req, res, next) => {
    try {
      const title = (req.body.title || '').trim();
      if (!title) {
        return res.status(400).json({ message: 'title is required' });
      }
      const { id } = await todoRepo.create(title);
      const todos = await todoRepo.getAll();
      res.status(201).json({ id, todos });
    } catch (err) {
      next(err);
    }
  });

  router.put('/todos/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { title, completed } = req.body;
      if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'title is required' });
      }
      await todoRepo.update(id, { title: title.trim(), completed: Boolean(completed) });
      const todos = await todoRepo.getAll();
      res.json({ todos });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/todos/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      await todoRepo.delete(id);
      const todos = await todoRepo.getAll();
      res.status(204).json({ todos });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = buildRouter;
