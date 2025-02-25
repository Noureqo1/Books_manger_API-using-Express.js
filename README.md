# Books API

A simple RESTful API for managing books using Express.js.

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on http://localhost:3000

## API Endpoints

### GET /api/books
- Returns all books
- Response: Array of book objects

### GET /api/books/:id
- Returns a single book by ID
- Response: Book object or 404 error

### POST /api/books
- Creates a new book
- Request body: { "title": "string", "author": "string", "year": number }
- Response: Created book object

### PUT /api/books/:id
- Updates an existing book
- Request body: { "title": "string", "author": "string", "year": number }
- Response: Updated book object or 404 error

### DELETE /api/books/:id
- Deletes a book
- Response: 204 No Content or 404 error

## Example Book Object
```json
{
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
}
```
