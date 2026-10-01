import { tokenService } from '../services/tokenService.js';

// Middleware для аутентификации токена
export const authenticateToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    const bearerToken = authorization?.startsWith('Bearer ')
        ? authorization.slice(7)
        : null;
    const token = bearerToken || req.cookies?.accessToken;

    // Проверка наличия токена
    if (!token) {
        return res.status(401).json({ message: 'Требуется токен доступа' });
    }

    // Проверка валидности токена
    try {
        const payload = tokenService.verifyAccessToken(token);
        req.user = { id: Number(payload.sub), email: payload.email };
        return next();
    } catch {
        return res.status(401).json({ message: 'Токен недействителен или истек' });
    }
};