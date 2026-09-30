import { commentService } from '../services/commentService.js';
import { productService } from '../services/productService.js';

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