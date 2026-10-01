import { commentService, productService, userService } from '../services/services.js';

//Комментарий контроллер
export const commentController = {
    getAll: async (req, res) => {
        const comments = await commentService.getAll();
        res.json(comments);
    },
    getByProductId: async (req, res) => {
        const productId = Number(req.params.id);
        if (!(await productService.getById(productId))) {
            return res.status(404).json({ message: 'АНИМЕ НЕ НАЙДЕНО!!! какие еще комменты?' });
        }
        const comments = await commentService.getByProductId(productId);
        res.json(comments);
    },
    create: async (req, res) => {
        try {
            const newComment = await commentService.create(req.body);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updated = await commentService.update(Number(req.params.id), req.body);
            if (!updated) return res.status(404).json({ message: 'Хм, такого отзыва тут не оставляли...' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    remove: async (req, res) => {
        const success = await commentService.remove(Number(req.params.id));
        if (!success) return res.status(404).json({ message: 'Хм, такого отзыва тут не оставляли...' });
        res.json({ message: 'ssss' });
    },
};

//Продукт контроллер

export const productController = {
    getAll: async (req, res) => {
        const products = await productService.getAll();
        res.json(products);
    },
    getById: async (req, res) => {
        const product = await productService.getById(Number(req.params.id));
        if (!product) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
        res.json(product);
    },
    create: async (req, res) => {
        try {
            const newProduct = await productService.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updated = await productService.update(Number(req.params.id), req.body);
            if (!updated) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    remove: async (req, res) => {
        const success = await productService.remove(Number(req.params.id));
        if (!success) return res.status(404).json({ message: 'Нуб такого Аниме нет' });
        res.json({ message: 'ТАКОГО ЗДЕСЬ БОЛЬШЕ НЕТ' });
    },
};

//Юзер контроллер

export const userController = {
    getAll: async (req, res) => {
        const users = await userService.getAll();
        res.json(users);
    },
    getById: async (req, res) => {
        const user = await userService.getById(Number(req.params.id));
        if (!user) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
        res.json(user);
    },
    create: async (req, res) => {
        try {
            const newUser = await userService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const updated = await userService.update(Number(req.params.id), req.body);
            if (!updated) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    remove: async (req, res) => {
        const success = await userService.remove(Number(req.params.id));
        if (!success) return res.status(404).json({ message: 'У нас нет такого Анимешника' });
        res.json({ message: 'Почему ты так пристально смотришь на свои часы?' });
    },
};