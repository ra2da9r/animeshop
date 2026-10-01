import { AnimeProduct, Animeshnick, Comment, hashPassword, comparePassword } from './database.js';

const toObject = (record) => (record ? record.get({ plain: true }) : null);

// Класс для работы с базой данных аниме
class DatabaseAnime {
    async getAllAnimeProducts() {
        const rows = await AnimeProduct.findAll({ order: [['id', 'ASC']] });
        return rows.map((row) => toObject(row));
    }

    async getAnimeById(id) {
        const row = await AnimeProduct.findByPk(Number(id));
        return row ? toObject(row) : null;
    }

    async createAnime(data) {
        const row = await AnimeProduct.create({
            name: String(data.name).trim(),
            price: Number(data.price),
            stock: Number(data.stock),
        });
        return toObject(row);
    }

    async updateAnime(id, data) {
        const row = await AnimeProduct.findByPk(Number(id));
        if (!row) return null;

        if (data.name !== undefined) row.name = String(data.name).trim();
        if (data.price !== undefined) row.price = Number(data.price);
        if (data.stock !== undefined) row.stock = Number(data.stock);

        await row.save();
        return toObject(row);
    }

    async deleteAnime(id) {
        const deleted = await AnimeProduct.destroy({ where: { id: Number(id) } });
        return deleted > 0;
    }

    async getAllAnimeshniki() {
        const rows = await Animeshnick.findAll({ order: [['id', 'ASC']] });
        return rows.map((row) => {
            const user = toObject(row);
            delete user.passwordHash;
            return user;
        });
    }

    async getAnimeshById(id) {
        const row = await Animeshnick.findByPk(Number(id));
        if (!row) return null;
        const user = toObject(row);
        delete user.passwordHash;
        return user;
    }

    async getAnimeshByEmail(email) {
        const row = await Animeshnick.findOne({ where: { email: String(email).trim().toLowerCase() } });
        return row ? toObject(row) : null;
    }

    async createAnimeshnik(data) {
        const payload = {
            username: String(data.username).trim(),
            email: String(data.email).trim().toLowerCase(),
            passwordHash: data.passwordHash || hashPassword(data.password || ''),
        };

        const row = await Animeshnick.create(payload);
        const user = toObject(row);
        delete user.passwordHash;
        return user;
    }

    async updateAnimeshnik(id, data) {
        const row = await Animeshnick.findByPk(Number(id));
        if (!row) return null;

        if (data.username !== undefined) row.username = String(data.username).trim();
        if (data.email !== undefined) row.email = String(data.email).trim().toLowerCase();
        if (data.passwordHash !== undefined) row.passwordHash = data.passwordHash;

        await row.save();
        const user = toObject(row);
        delete user.passwordHash;
        return user;
    }

    async deleteAnimeshnik(id) {
        const deleted = await Animeshnick.destroy({ where: { id: Number(id) } });
        return deleted > 0;
    }

    async getAllComments() {
        const rows = await Comment.findAll({ order: [['id', 'ASC']] });
        return rows.map((row) => toObject(row));
    }

    async getCommentById(id) {
        const row = await Comment.findByPk(Number(id));
        return row ? toObject(row) : null;
    }

    async getCommentsByANIMEId(productId) {
        const rows = await Comment.findAll({
            where: { productId: Number(productId) },
            order: [['id', 'ASC']],
        });
        return rows.map((row) => toObject(row));
    }

    async createComment(data) {
        const product = await this.getAnimeById(data.productId);
        if (!product) throw new Error('Такого аниме нет в магазине! (｡•́︿•̀｡)');

        const user = await this.getAnimeshById(data.userId);
        if (!user) throw new Error('Такой анимешник не зарегистрирован! (⇀⇀)');

        const row = await Comment.create({
            productId: Number(data.productId),
            userId: Number(data.userId),
            text: String(data.text).trim(),
        });

        return toObject(row);
    }

    async updateComment(id, data) {
        const row = await Comment.findByPk(Number(id));
        if (!row) return null;

        if (data.text !== undefined) row.text = String(data.text).trim();
        await row.save();
        return toObject(row);
    }

    async deleteComment(id) {
        const deleted = await Comment.destroy({ where: { id: Number(id) } });
        return deleted > 0;
    }

    async validateCredentials(email, password) {
        const user = await this.getAnimeshByEmail(email);
        if (!user) return null;

        const passwordHash = await Animeshnick.findByPk(user.id, { attributes: ['passwordHash'] });
        if (!passwordHash) return null;

        const isValid = comparePassword(password, passwordHash.passwordHash);
        if (!isValid) return null;

        const safeUser = { ...user };
        return safeUser;
    }
}

export const db = new DatabaseAnime();