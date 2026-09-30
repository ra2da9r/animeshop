import { db } from '../db/arr.js';

export const userService = {
    getAll: async () => db.getAllAnimeshniki(),
    getById: async (id) => db.getAnimeshById(id),
    create: async (data) => db.createAnimeshnik(data),
    update: async (id, data) => db.updateAnimeshnik(id, data),
    remove: async (id) => db.deleteAnimeshnik(id),
};