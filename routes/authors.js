const express = require('express');
const router = express.Router();

let authors = [
    { id: 1, name: 'F. Scott Fitzgerald' },
    { id: 2, name: 'George Orwell' },
];

router.get('/', (req, res) => {
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
});

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const newAuthor = {
        id: authors.length + 1,
        name
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.put('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (!author) return res.status(404).json({ message: 'Author not found' });

    const { name } = req.body;
    if (name) author.name = name;

    res.json(author);
});

router.delete('/:id', (req, res) => {
    const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (authorIndex === -1) return res.status(404).json({ message: 'Author not found' });

    authors.splice(authorIndex, 1);
    res.status(204).send();
});

module.exports = router;
