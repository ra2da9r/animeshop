import { Router } from 'express';
import { db } from '../db/arr.js';
import { hashPassword, comparePassword } from '../db/database.js';
import { tokenService } from '../services/tokenService.js';

const authRouter = Router();

// Валидация email
const validateEmail = (email) => {
    const value = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) throw new Error('Email обязателен');
    if (!emailPattern.test(value)) throw new Error('Некорректный email');

    return value;
};
// Валидация данных регистрации
const validateRegisterInput = ({ name, email, password }) => {
    if (typeof name !== 'string' || name.trim().length < 2) {
        throw new Error('СЛИШКОМ КОРОТКОЕ ИМЯ!! ДУРАК');
    }

    const validEmail = validateEmail(email);

    if (typeof password !== 'string' || password.length < 8) {
        throw new Error('У тебя слишкаам короткий парооооль D:< ');
    }

    return {
        name: name.trim(),
        email: validEmail,
        password,
    };
};
// Валидация данных входа
const validateLoginInput = ({ email, password }) => {
    if (typeof password !== 'string' || password.length < 8) {
        throw new Error('У тебя слишкаам короткий парооооль D:< ');
    }

    return {
        email: validateEmail(email),
        password,
    };
};

const findUserByEmail = async (email) => db.getAnimeshByEmail(email);

// Опции для установки cookies
const cookieOptions = (maxAge) => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
});

// Выдача токенов
const issueTokens = (res, user) => {
    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    res.cookie('accessToken', accessToken, cookieOptions(15 * 60 * 1000));
    res.cookie('refreshToken', refreshToken, cookieOptions(7 * 24 * 60 * 60 * 1000));

    return accessToken;
};
// Регистрация
authRouter.post('/registration', async (req, res) => {
    
    try {
        const payload = validateRegisterInput(req.body || {});
        const existingUser = await findUserByEmail(payload.email);

        if (existingUser) {
            return res.status(409).json({ message: 'Извини-ка, но человек с таким email уже зареган. Думаю, ты чутка подзабыл, либо украл чужую почту :P' });
        }

        const user = await db.createAnimeshnik({
            username: payload.name,
            email: payload.email,
            passwordHash: hashPassword(payload.password),
        });

        return res.status(201).json({
            message: 'Приветствуем тебя в наших кругах. Хехехех',
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

// Вход
authRouter.post('/login', async (req, res) => {

    try {
        const payload = validateLoginInput(req.body || {});
        const user = await findUserByEmail(payload.email);

        if (!user) {
            return res.status(401).json({ message: 'Нет таких' });
        }

        const isPasswordValid = comparePassword(payload.password, user.passwordHash || '');
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Невернооооооо!!!' });
        }

        const accessToken = issueTokens(res, user);

        return res.json({
            message: 'КРАСАВА ВОШЁЛ',
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.username,
            },
        });

    } catch (error) {
        return res.status(error.status || 400).json({ message: error.message });
    }
});

// Обновление access-токена
authRouter.post('/refresh', (req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Требуется refresh токен' });
    }

    try {
        const payload = tokenService.verifyRefreshToken(refreshToken);
        const accessToken = issueTokens(res, { id: payload.sub, email: payload.email });
        return res.json({ accessToken });
    } catch {
        res.clearCookie('accessToken', cookieOptions(0));
        res.clearCookie('refreshToken', cookieOptions(0));
        return res.status(401).json({ message: 'Refresh токен недействителен или истек' });
    }
});

authRouter.post('/logout', (req, res) => {
    res.clearCookie('accessToken', cookieOptions(0));
    res.clearCookie('refreshToken', cookieOptions(0));
    return res.json({ message: 'Выход выполнен' });
});

export { authRouter };