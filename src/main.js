import express from 'express'
import { db } from './db/arr.js'
import { requireAuthorization } from './db/classes.js'
const app = express()
//Middleware

app.use((req, res, next) =>{ 
    console.log(req.method, req.url, new Date());
    next 
})

app.use(express.json());

app.post('/echo', (req, res) => { 
    res.json(req.body);
});

app.get('/admin', requireAuthorization, (req, res) => {
    res.json({ message: 'ПРИВЕТИК!!! АДОМИИИН' });
});

//Аниме
app.get('/products', (req, res) => {
    res.json(db.getAllAnimeProducts());
});

app.get('/products/:id', (req, res) => {
    const product = db.getAnimeById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
    res.json(product);
});

app.post('/products', (req, res) => {
    const newProduct = db.createAnime(req.body);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const updated = db.updateAnime(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
    res.json(updated);
});

app.delete('/products/:id', (req, res) => {
    const success = db.deleteAnime(Number(req.params.id));
    if (!success) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
    res.json({ message: 'ТАКОГО ЗДЕСЬ БОЛЬШЕ НЕТ' });
});

//АНИМЕШНИКИ

app.get('/users', (req, res) => {
    res.json(db.getAllAnimeshniki());
});

app.get('/users/:id', (req, res) => {
    const user = db.getAnimeshById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = db.createAnimeshnik(req.body);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const updated = db.updateAnimeshnik(Number(req.params.id), req.body);
    if (!updated) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
    res.json(updated);
});

app.delete('/users/:id', (req, res) => {
    const success = db.deleteAnimeshnik(Number(req.params.id));
    if (!success) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
    res.json({ message: 'Почему ты так пристально смотришь на свои часы?' });
});

app.get('/comments', (req, res) => {
    res.json(db.getAllComments());
});


app.get('/products/:id/comments', (req, res) => {
    const productId = Number(req.params.id);
    if (!db.getAnimeById(productId)) {
        return res.status(404).json({ message: 'Товар не найден, какие еще комменты?' });
    }
    const productComments = db.getCommentsByANIMEId(productId);
    res.json(productComments);
});


app.post('/comments', (req, res) => {
    try {

        const newComment = db.createComment(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/comments/:id', (req, res) => {
    try {
        const updated = db.updateComment(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: 'Хм, такого отзыва тут не оставляли...' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/comments/:id', (req, res) => {
    const success = db.deleteComment(Number(req.params.id));
    if (!success) return res.status(404).json({ message: 'Хм, такого отзыва тут не оставляли...' });
    res.json({ message: 'ssss' });
});



//Запуск серва
app.listen(3000, () => {
  console.log('Сервер бежит, пон <3 http://localhost:3000')
})