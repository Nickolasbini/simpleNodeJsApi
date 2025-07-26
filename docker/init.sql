CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255)
);

INSERT INTO users (name, email) VALUES
('Maria Silva', 'maria@example.com'),
('Pedro Santos', 'pedro@example.com'),
('Ana Oliveira', 'ana@example.com');
