CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO authors (name, email, bio) 
VALUES 
  ('John Doe', 'john@example.com', 'Tech writer and software developer'),
  ('Jane Smith', 'jane@example.com', 'Data scientist and AI researcher')
ON CONFLICT (email) DO NOTHING;