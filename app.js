const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

// Routes
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const transactionsRouter = require('./routes/transactions');

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(authMiddleware);

// Route handlers
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/transactions', transactionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
