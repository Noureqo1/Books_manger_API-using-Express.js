# Books & Plogs API

A simple RESTful API for managing books and plogs using Express.js with PostgreSQL and MongoDB.

## Database Architecture

This API uses a hybrid database approach:
- **PostgreSQL**: Stores structured data (authors)
- **MongoDB**: Stores unstructured data (plogs)

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

### Starting the Server

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

### Authors (PostgreSQL)

#### GET /api/authors
- Returns all authors

#### GET /api/authors/:id
- Returns a single author by ID

#### POST /api/authors
- Creates a new author
- Request body: { "name": "string", "email": "string", "bio": "string" }

#### DELETE /api/authors/:id
- Deletes an author

### Plogs (MongoDB)

#### GET /api/plogs
- Returns all plogs

#### GET /api/plogs/:id
- Returns a single plog by ID

#### POST /api/plogs
- Creates a new plog
- Request body: { "title": "string", "content": "string", "authorId": number }

#### DELETE /api/plogs/:id
- Deletes a plog

## Authentication

All API endpoints require authentication using a Bearer token:
```
Authorization: Bearer ZEWAIL
```

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

### Author (PostgreSQL)
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Tech writer and software developer",
    "created_at": "2025-03-14T14:05:58.000Z"
}
```

### Plog (MongoDB)
```json
{
    "_id": "60f7b0b9e6c7a234b8765432",
    "title": "Introduction to Express.js",
    "content": "Express.js is a minimal and flexible Node.js web application framework...",
    "authorId": 1,
    "createdAt": "2025-03-14T14:05:58.000Z",
    "updatedAt": "2025-03-14T14:05:58.000Z"
}
