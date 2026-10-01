import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initializeDatabase } from './db/database.js';
import { authenticateToken } from './middlewares/authMiddleware.js';
import { productController } from './controllers/productController.js';
import { userController } from './controllers/userController.js';
import { commentController } from './controllers/commentController.js';
import { authRouter } from './controllers/auth.js';

const app = express();
const PORT = 3000;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.method, req.url, new Date());
    next();
});

app.use('/auth', authRouter);

app.post('/echo', (req, res) => {
    res.json(req.body);
});

app.use(['/admin', '/products', '/users', '/comments'], authenticateToken);

app.get('/admin', (req, res) => {
    res.json({ message: 'ПРИВЕТИК!!! АДОМИИИН' });
});

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.post('/products', productController.create);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);

app.get('/users', userController.getAll);
app.get('/users/:id', userController.getById);
app.post('/users', userController.create);
app.put('/users/:id', userController.update);
app.delete('/users/:id', userController.remove);

app.get('/comments', commentController.getAll);
app.get('/products/:id/comments', commentController.getByProductId);
app.post('/comments', commentController.create);
app.put('/comments/:id', commentController.update);
app.delete('/comments/:id', commentController.remove);

const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log('Сервер бежит, пон <3 http://localhost:' + PORT);
        });
    } catch (error) {
        console.error('Ошибка запуска сервера:', error);
        process.exit(1);
    }
};

startServer();