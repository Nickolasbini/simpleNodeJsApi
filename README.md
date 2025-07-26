# API Grátis com Node.js

Este repositório contém o código-fonte da API criada no vídeo do canal **Código Prático**:  
*Como Criar uma API Grátis com Node.js*

---

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL 8
- Docker + Docker Compose
- JWT (JSON Web Token)

---

## Como Rodar Localmente com Docker

```bash
docker-compose up -d
```

---

## Rotas

```bash
POST /register
POST /login
GET /users     *Rota protegida com JWT
GET /users/:id *Rota protegida com JWT
```

---

## Autenticação

A API utiliza JSON Web Tokens (JWT) para proteger rotas e garantir que apenas usuários autenticados possam acessá-las. O fluxo básico é:

    * O usuário se cadastra (POST /register)

    * O usuário faz login (POST /login) e recebe um token JWT

    * O usuário envia esse token no cabeçalho das requisições às rotas protegidas 
    (header de nome 'authorization')

    * A API verifica o token antes de permitir o acesso 

---

## Hospedagem gratuita


Assista ao vídeo: [[https://youtube.com/@codigopratico](https://youtu.be/t6ADvGqeXro)]([https://youtube.com/@codigopratico](https://youtu.be/t6ADvGqeXro)) para saber como hospedar no AlwaysData de forma gratuita.

---

## Contribuições

Pull requests e sugestões são muito bem-vindos!

Desenvolvido por [https://youtube.com/@codigopratico](https://youtube.com/@codigopratico)
