const express = require('express');
const router = express.Router();

// In-memory data store
let transactions = [];
let books = require('./books').books;

// GET all transactions
router.get('/', (req, res) => {
    res.json(transactions);
});

// POST new borrowing transaction
router.post('/borrow', (req, res) => {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
        return res.status(400).json({ message: 'User ID and Book ID are required' });
    }

    const book = books.find(b => b.id === parseInt(bookId));
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.isAvailable) {
        return res.status(400).json({ message: 'Book is not available' });
    }

    const transaction = {
        id: transactions.length + 1,
        userId,
        bookId,
        type: 'BORROW',
        date: new Date().toISOString()
    };

    book.isAvailable = false;
    transactions.push(transaction);
    res.status(201).json(transaction);
});

// POST return transaction
router.post('/return', (req, res) => {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
        return res.status(400).json({ message: 'User ID and Book ID are required' });
    }

    const book = books.find(b => b.id === parseInt(bookId));
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (book.isAvailable) {
        return res.status(400).json({ message: 'Book is already returned' });
    }

    const borrowTransaction = transactions.find(
        t => t.bookId === parseInt(bookId) && 
        t.userId === parseInt(userId) && 
        t.type === 'BORROW'
    );

    if (!borrowTransaction) {
        return res.status(400).json({ message: 'No matching borrow transaction found' });
    }

    const transaction = {
        id: transactions.length + 1,
        userId,
        bookId,
        type: 'RETURN',
        date: new Date().toISOString()
    };

    book.isAvailable = true;
    transactions.push(transaction);
    res.status(201).json(transaction);
});

module.exports = router;
