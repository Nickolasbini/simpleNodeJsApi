const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const enviroment = process.env.ENVIROMENT ?? 'local';
const port = process.env.PORT || 3000;
const ip = process.env.IP || '';
const hash_salt = parseInt(process.env.HASH_SALT) || 10;
const jwtSecret = process.env.JWT_SECRET || '11kjsajg@#';

app.use(express.json());


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] ?? '';
    const token = authHeader.split(' ')[1] ?? null;
    
    if (!token) {
        return res.status(401).json({ error: 'token not found' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'invalid token' });
        }

        req.authUser = user;
        next();
    });
}


app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, hash_salt);
        const [result] = await db.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPass, name]);
        const userId = result.insertId ?? null;

        if (!userId) {
            return res.status(500).json({ message: 'Usuário não foi cadastrado!' });
        }
        res.status(201).json({ message: 'Usuário cadastrado', userId: userId });

    } catch (error) {
        console.log('error at register', error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [results] = await db.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        const user = results[0] ?? null;

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos!' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            jwtSecret,
            { expiresIn: '1h' }
        );
        res.json({ token });

    } catch (error) {
        console.log('error at login', error);
        res.status(500).json({ message: 'Erro ao logar' });
    }
});

app.get('/users', authenticateToken, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for users' });
    }
});

app.get('/users/:id', authenticateToken, async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT * FROM users WHERE id = ? LIMIT 1',
            [req.params.id ?? null]
        );
        res.json(
            users.length ?
                users[0] :
                null
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for user' });
    }
});

if (enviroment == 'production') {
    app.listen(port, ip, () => {
        console.log(`Servidor rodando na porta ${ip} - ${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}