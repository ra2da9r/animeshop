import { commentService } from '../services/commentService.js';
import { productService } from '../services/productService.js';

export const commentController = {
    getAll: (req, res) => res.json(commentService.getAll()),
    getByProductId: (req, res) => {
        const productId = Number(req.params.id);
        if (!productService.getById(productId)) return res.status(404).json({ message: 'АНИМЕ НЕ НАЙДЕНО!!! какие еще комменты?' });
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