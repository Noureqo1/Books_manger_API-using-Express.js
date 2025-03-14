const express = require('express');
const router = express.Router();
const Plog = require('../models/blog');
const { pgPool } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const plogs = await Plog.find().sort({ createdAt: -1 });
        res.json(plogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const plog = await Plog.findById(req.params.id);
        if (!plog) return res.status(404).json({ message: 'Plog not found' });
        res.json(plog);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Plog not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        if (authorId) {
            const authorResult = await pgPool.query('SELECT id FROM authors WHERE id = $1', [authorId]);
            if (authorResult.rows.length === 0) {
                return res.status(400).json({ message: 'Author not found' });
            }
        }

        const newPlog = new Plog({
            title,
            content,
            authorId: authorId || 1, // Default to first author
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        const savedPlog = await newPlog.save();
        res.status(201).json(savedPlog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const plog = await Plog.findByIdAndDelete(req.params.id);
        
        if (!plog) return res.status(404).json({ message: 'Plog not found' });
        
        res.status(204).send();
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Plog not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
