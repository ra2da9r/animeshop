import { db } from '../db/arr.js';

const formatComment = async (comment) => {
    if (!comment) return comment;

    const { productId, ...commentData } = comment;
    const anime = await db.getAnimeById(productId);

    return {
        ...commentData,
        anime: anime ? anime.name : 'Аниме удалено',
    };
};

export const commentService = {
    getAll: async () => {
        const comments = await db.getAllComments();
        return Promise.all(comments.map((comment) => formatComment(comment)));
    },
    getByProductId: async (productId) => {
        const comments = await db.getCommentsByANIMEId(productId);
        return Promise.all(comments.map((comment) => formatComment(comment)));
    },
    create: async (data) => formatComment(await db.createComment(data)),
    update: async (id, data) => formatComment(await db.updateComment(id, data)),
    remove: async (id) => db.deleteComment(id),
};