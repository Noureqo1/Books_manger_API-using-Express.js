const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory books array
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960
    }
];

// GET all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET a single book by id
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

// POST a new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) a book
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, year } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }

    book.title = title;
    book.author = author;
    book.year = year;

    res.json(book);
});

// DELETE a book
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Books API server is running on http://localhost:${port}`);
});
