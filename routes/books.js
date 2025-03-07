const express = require('express');
const router = express.Router();

// In-memory data store
let books = [
    { id: 1, title: 'The Great Gatsby', author: 1, isAvailable: true },
    { id: 2, title: '1984', author: 2, isAvailable: true },
];

// GET all books
router.get('/', (req, res) => {
    res.json(books);
});

// GET single book
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// POST new book
router.post('/', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        isAvailable: true
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, author } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// DELETE book
router.delete('/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(bookIndex, 1);
    res.status(204).send();
});

module.exports = router;
