import { db } from '../db/arr.js';

const formatComment = (comment) => {
    if (!comment) return comment;

    const { productId, ...commentData } = comment;
    const anime = db.getAnimeById(productId);

    return {
        ...commentData,
        anime: anime ? anime.name : 'Аниме удалено',
    };
};

export const productService = {
    getAll: () => db.getAllAnimeProducts(),
    getById: (id) => db.getAnimeById(id),
    create: (data) => db.createAnime(data),
    update: (id, data) => db.updateAnime(id, data),
    remove: (id) => db.deleteAnime(id),
};

export const userService = {
    getAll: () => db.getAllAnimeshniki(),
    getById: (id) => db.getAnimeshById(id),
    create: (data) => db.createAnimeshnik(data),
    update: (id, data) => db.updateAnimeshnik(id, data),
    remove: (id) => db.deleteAnimeshnik(id),
};

export const commentService = {
    getAll: () => db.getAllComments().map(formatComment),
    getByProductId: (productId) => db.getCommentsByANIMEId(productId).map(formatComment),
    create: (data) => formatComment(db.createComment(data)),
    update: (id, data) => formatComment(db.updateComment(id, data)),
    remove: (id) => db.deleteComment(id),
};

export const services = {
    productService,
    userService,
    commentService,
};
