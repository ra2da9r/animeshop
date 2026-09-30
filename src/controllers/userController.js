import { userService } from '../services/userService.js';

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