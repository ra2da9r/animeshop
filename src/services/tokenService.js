import jwt from 'jsonwebtoken';

// Функция для получения секретного ключа из переменных окружения
const getSecret = (name) => {
    const secret = process.env[name];
    if (!secret) {
        const error = new Error(`Не задана переменная окружения ${name}`);
        error.status = 500;
        throw error;
    }
    return secret;
};

// Сервис для работы с токенами
export const tokenService = {
    generateAccessToken: (user) => jwt.sign(
        { email: user.email, tokenType: 'access' },
        getSecret('JWT_ACCESS_SECRET'),
        { subject: String(user.id), expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' },
    ),
    generateRefreshToken: (user) => jwt.sign(
        { email: user.email, tokenType: 'refresh' },
        getSecret('JWT_REFRESH_SECRET'),
        { subject: String(user.id), expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' },
    ),
    verifyAccessToken: (token) => {
        const payload = jwt.verify(token, getSecret('JWT_ACCESS_SECRET'));
        if (payload.tokenType !== 'access') throw new Error('Неверный тип токена');
        return payload;
    },
    verifyRefreshToken: (token) => {
        const payload = jwt.verify(token, getSecret('JWT_REFRESH_SECRET'));
        if (payload.tokenType !== 'refresh') throw new Error('Неверный тип токена');
        return payload;
    },
};