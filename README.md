# Books & Plogs API

A simple RESTful API for managing books and plogs using Express.js.

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

### Books

#### GET /api/books
- Returns all books

#### GET /api/books/:id
- Returns a single book by ID

#### POST /api/books
- Creates a new book
- Request body: { "title": "string", "author": "string", "year": number }

#### PUT /api/books/:id
- Updates an existing book
- Request body: { "title": "string", "author": "string", "year": number }

#### DELETE /api/books/:id
- Deletes a book

### Plogs

#### GET /api/plogs
- Returns all plogs

#### GET /api/plogs/:id
- Returns a single plog by ID

#### POST /api/plogs
- Creates a new plog
- Request body: { "title": "string", "content": "string", "author": "string" }

#### PUT /api/plogs/:id
- Updates an existing plog
- Request body: { "title": "string", "content": "string", "author": "string" }

#### DELETE /api/plogs/:id
- Deletes a plog



## Example Objects

### Book
```json
{
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
}
```
