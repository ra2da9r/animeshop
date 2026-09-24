import { productService } from '../services/productService.js';

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