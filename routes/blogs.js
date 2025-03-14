const express = require('express');
const router = express.Router();


let plogs = [
    { 
        id: 1, 
        title: 'Introduction to Express.js', 
        content: 'Express.js is a minimal and flexible Node.js web application framework...', 
        author: 'John Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    { 
        id: 2, 
        title: 'RESTful API Design', 
        content: 'REST (Representational State Transfer) is an architectural style...', 
        author: 'Jane Smith',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

router.get('/', (req, res) => {
    res.json(plogs);
});

router.get('/:id', (req, res) => {
    const plog = plogs.find(p => p.id === parseInt(req.params.id));
    if (!plog) return res.status(404).json({ message: 'Plog not found' });
    res.json(plog);
});

// CREATE plog

router.post('/', (req, res) => {
    const { title, content, author } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    const newPlog = {
        id: plogs.length + 1,
        title,
        content,
        author: author || 'Anonymous',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    plogs.push(newPlog);
    res.status(201).json(newPlog);
});

router.put('/:id', (req, res) => {
    const plog = plogs.find(p => p.id === parseInt(req.params.id));
    if (!plog) return res.status(404).json({ message: 'Plog not found' });

    const { title, content, author } = req.body;
    
    if (title) plog.title = title;
    if (content) plog.content = content;
    if (author) plog.author = author;
    
    plog.updatedAt = new Date().toISOString();

    res.json(plog);
});

router.delete('/:id', (req, res) => {
    const plogIndex = plogs.findIndex(p => p.id === parseInt(req.params.id));
    if (plogIndex === -1) return res.status(404).json({ message: 'Plog not found' });

    plogs.splice(plogIndex, 1);
    res.status(204).send();
});

module.exports = router;
