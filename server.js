const express = require('express');
const dotenv = require('dotenv');
const db = require('./db/db');

dotenv.config();

const app = express();
const enviroment = process.env.ENVIROMENT ?? 'local';
const port = process.env.PORT || 3000;
const ip = process.env.IP || '';

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        endpoints: ['/users']
    })
});

app.get('/users', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching for users' });
    }
});

app.get('/users/:id', async (req, res) => {
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