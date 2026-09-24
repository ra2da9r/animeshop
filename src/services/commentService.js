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

export const commentService = {
    getAll: () => db.getAllComments().map(formatComment),
    getByProductId: (productId) => db.getCommentsByANIMEId(productId).map(formatComment),
    create: (data) => formatComment(db.createComment(data)),
    update: (id, data) => formatComment(db.updateComment(id, data)),
    remove: (id) => db.deleteComment(id),
};