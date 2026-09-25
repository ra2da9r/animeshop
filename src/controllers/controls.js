import { productService, userService, commentService } from '../services/services.js';
import { productService as productServiceAlias } from '../services/services.js';

export const productController = {
    getAll: (req, res) => res.json(productService.getAll()),
    getById: (req, res) => {
        const product = productService.getById(Number(req.params.id));
        if (!product) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
        res.json(product);
    },
    create: (req, res) => {
        const newProduct = productService.create(req.body);
        res.status(201).json(newProduct);
    },
    update: (req, res) => {
        const updated = productService.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
        res.json(updated);
    },
    remove: (req, res) => {
        const success = productService.remove(Number(req.params.id));
        if (!success) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
        res.json({ message: 'ТАКОГО ЗДЕСЬ БОЛЬШЕ НЕТ' });
    },
};

export const userController = {
    getAll: (req, res) => res.json(userService.getAll()),
    getById: (req, res) => {
        const user = userService.getById(Number(req.params.id));
        if (!user) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
        res.json(user);
    },
    create: (req, res) => {
        const newUser = userService.create(req.body);
        res.status(201).json(newUser);
    },
    update: (req, res) => {
        const updated = userService.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
        res.json(updated);
    },
    remove: (req, res) => {
        const success = userService.remove(Number(req.params.id));
        if (!success) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
        res.json({ message: 'Почему ты так пристально смотришь на свои часы?' });
    },
};

export const commentController = {
    getAll: (req, res) => res.json(commentService.getAll()),
    getByProductId: (req, res) => {
        const productId = Number(req.params.id);
        if (!productServiceAlias.getById(productId)) return res.status(404).json({ message: 'АНИМЕ НЕ НАЙДЕНО!!! какие еще комменты?' });
        res.json(commentService.getByProductId(productId));
    },
    create: (req, res) => {
        try {
            const newComment = commentService.create(req.body);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: (req, res) => {
        try {
            const updated = commentService.update(Number(req.params.id), req.body);
            if (!updated) return res.status(404).json({ message: 'Хм, такого отзыва тут не оставляли...' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    remove: (req, res) => {
        const success = commentService.remove(Number(req.params.id));
        if (!success) return res.status(404).json({ message: 'Хм, такого отзыва тут не оставляли...' });
        res.json({ message: 'ssss' });
    },
};

export const controls = {
    productController,
    userController,
    commentController,
};
