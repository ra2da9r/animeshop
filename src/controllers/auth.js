import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/registration', (req, res) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Нужно передать name, email и password' });
    }

    res.status(201).json({
        message: 'Пользователь успешно зарегистрирован',
        user: { name, email },
    });
});

authRouter.post('/login', (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ message: 'Email и password обязательны' });
    }

    res.json({
        message: 'Успешный вход',
        user: { email },
    });
});