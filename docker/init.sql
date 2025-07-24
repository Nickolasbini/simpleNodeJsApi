CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO users (nome, email) VALUES
('Maria Silva', 'maria@example.com'),
('Pedro Santos', 'pedro@example.com'),
('Ana Oliveira', 'ana@example.com');
