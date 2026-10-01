import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initializeDatabase } from './db/database.js';
import { authenticateToken } from './middlewares/authMiddleware.js';
import { commentController, productController, userController } from './controllers/resourceControllers.js';
import { authRouter } from './controllers/auth.js';

// Инициализация Express-приложения
const app = express();
const PORT = 3000;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];


// Настройка CORS
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.method, req.url, new Date());
    next();
});

// Настройка маршрутов
app.use('/auth', authRouter);

// Маршрут для эхо-сервиса
app.post('/echo', (req, res) => {
    res.json(req.body);
});

// Маршруты, требующие аутентификации
app.use(['/admin', '/products', '/users', '/comments'], authenticateToken);

// Маршрут для администратора
app.get('/admin', (req, res) => {
    res.json({ message: 'ПРИВЕТИК!!! АДОМИИИН' });
});

// Маршрут для аниме-товаров
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.post('/products', productController.create);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);


// Маршрут для анимешников
app.get('/users', userController.getAll);
app.get('/users/:id', userController.getById);
app.post('/users', userController.create);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.remove);

// Маршрут для комментариев
app.get('/comments', commentController.getAll);
app.get('/products/:id/comments', commentController.getByProductId);
app.post('/comments', commentController.create);
app.put('/comments/:id', commentController.update);
app.delete('/comments/:id', commentController.remove);


// Запуск сервера
const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log('Сервер бежит, пон <3 http://localhost:' + PORT);
        });
    } catch (error) {
        console.error('Не повезло! </3', error);
        process.exit(1);
    }
};

startServer();