const express = require('express');
const router = express.Router();
const { pgPool } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM authors ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pgPool.query('SELECT * FROM authors WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, bio } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        
        const result = await pgPool.query(
            'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
            [name, email || null, bio || null]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        
        if (err.code === '23505') {
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const checkResult = await pgPool.query('SELECT * FROM authors WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        
        await pgPool.query('DELETE FROM authors WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
