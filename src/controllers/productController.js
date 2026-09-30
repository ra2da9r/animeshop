import { productService } from '../services/productService.js';

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