const express = require('express');
const app = express();
const authMiddleware = require('./middleware/auth');
const { pgPool, connectMongo } = require('./config/db');

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const transactionsRouter = require('./routes/transactions');
const plogsRouter = require('./routes/blogs');

// Connect to MongoDB
try {
    connectMongo().catch(err => {
        console.error('MongoDB connection error:', err);
        console.log('API will use in-memory data for plogs');
    });
} catch (err) {
    console.error('MongoDB setup error:', err);
    console.log('API will use in-memory data for plogs');
}

app.use(express.json());
app.use(authMiddleware);

app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/plogs', plogsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Test PostgreSQL connection
pgPool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('PostgreSQL connection error:', err);
    } else {
        console.log('PostgreSQL connected successfully');
    }
    });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
