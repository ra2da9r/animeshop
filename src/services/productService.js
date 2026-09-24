import { db } from '../db/arr.js';

export const productService = {
    getAll: () => db.getAllAnimeProducts(),
    getById: (id) => db.getAnimeById(id),
    create: (data) => db.createAnime(data),
    update: (id, data) => db.updateAnime(id, data),
    remove: (id) => db.deleteAnime(id),
};