import express from 'express'
import cors from 'cors'
import { requireAuthorization } from './db/classes.js'
import { productController } from './controllers/productController.js'
import { userController } from './controllers/userController.js'
import { commentController } from './controllers/commentController.js'
const app = express()

const PORT = 3000;
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
];

//Middleware
app.use(cors({ origin: allowedOrigins }));

app.use((req, res, next) =>{ 
    console.log(req.method, req.url, new Date());
    next()
})

app.use(express.json());

app.post('/echo', (req, res) => { 
    res.json(req.body);
});

app.get('/admin', requireAuthorization, (req, res) => {
    res.json({ message: 'ПРИВЕТИК!!! АДОМИИИН' });
});

//Аниме
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.post('/products', productController.create);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);

//АНИМЕШНИКИ

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



//Запуск серва
app.listen(PORT, () => {
  console.log('Сервер бежит, пон <3 http://localhost:'+ PORT)
})