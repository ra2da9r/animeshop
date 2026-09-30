import { db } from '../db/arr.js';

export const productService = {
    getAll: async () => db.getAllAnimeProducts(),
    getById: async (id) => db.getAnimeById(id),
    create: async (data) => db.createAnime(data),
    update: async (id, data) => db.updateAnime(id, data),
    remove: async (id) => db.deleteAnime(id),
};