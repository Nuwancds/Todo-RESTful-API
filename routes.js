// routes.js
const express = require('express');
const router = express.Router();
const { pool } = require('./db');

// GET all todos
router.get('/todos', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
});

// GET one todo
router.get('/todos/:id', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM todos WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Todo not found' });
        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// POST new todo
router.post('/todos', async (req, res, next) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '' || title.length > 255) {
        return res.status(400).json({ error: 'Title must be a non-empty string (max 255 chars)' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
            [title.trim(), false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// PUT update todo
router.put('/todos/:id', async (req, res, next) => {
    let { title, completed } = req.body;
    if (title === undefined && completed === undefined)
        return res.status(400).json({ error: 'Must provide title or completed' });

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '' || title.length > 255)
            return res.status(400).json({ error: 'Title must be a non-empty string (max 255 chars)' });
        title = title.trim();
    }

    if (completed !== undefined && typeof completed !== 'boolean')
        return res.status(400).json({ error: 'Completed must be boolean' });

    const fields = [];
    const values = [];
    let i = 1;
    if (title !== undefined) {
        fields.push(`title = $${i++}`);
        values.push(title);
    }
    if (completed !== undefined) {
        fields.push(`completed = $${i++}`);
        values.push(completed);
    }
    values.push(req.params.id);

    const query = `UPDATE todos SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`;

    try {
        const result = await pool.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Todo not found' });
        res.status(200).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE todo
router.delete('/todos/:id', async (req, res, next) => {
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Todo not found' });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;