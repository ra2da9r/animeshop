import { db } from '../db/arr.js';

export const userService = {
    getAll: () => db.getAllAnimeshniki(),
    getById: (id) => db.getAnimeshById(id),
    create: (data) => db.createAnimeshnik(data),
    update: (id, data) => db.updateAnimeshnik(id, data),
    remove: (id) => db.deleteAnimeshnik(id),
};