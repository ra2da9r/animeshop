import { userService } from '../services/userService.js';

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