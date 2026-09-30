import { Router } from 'express';
import { db } from '../db/arr.js';
import { hashPassword, comparePassword } from '../db/database.js';

const authRouter = Router();

const validateEmail = (email) => {
    const value = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) throw new Error('Email обязателен');
    if (!emailPattern.test(value)) throw new Error('Некорректный email');

    return value;
};

const validateRegisterInput = ({ name, email, password }) => {
    if (typeof name !== 'string' || name.trim().length < 2) {
        throw new Error('Имя должно содержать минимум 2 символа');
    }

    const validEmail = validateEmail(email);

    if (typeof password !== 'string' || password.length < 8) {
        throw new Error('Пароль должен содержать минимум 8 символов');
    }

    return {
        name: name.trim(),
        email: validEmail,
        password,
    };
};

const validateLoginInput = ({ email, password }) => {
    if (typeof password !== 'string' || password.length < 8) {
        throw new Error('Пароль должен содержать минимум 8 символов');
    }

    return {
        email: validateEmail(email),
        password,
    };
};

const findUserByEmail = async (email) => db.getAnimeshByEmail(email);

authRouter.post('/registration', async (req, res) => {
    try {
        const payload = validateRegisterInput(req.body || {});
        const existingUser = await findUserByEmail(payload.email);

        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
        }

        const user = await db.createAnimeshnik({
            username: payload.name,
            email: payload.email,
            passwordHash: hashPassword(payload.password),
        });

        return res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            user: {
                id: user.id,
                email: user.email,
                name: user.username,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const payload = validateLoginInput(req.body || {});
        const user = await findUserByEmail(payload.email);

        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }

        const isPasswordValid = comparePassword(payload.password, user.passwordHash || '');
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }

        return res.json({
            message: 'Успешный вход',
            user: {
                id: user.id,
                email: user.email,
                name: user.username,
            },
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

export { authRouter };
