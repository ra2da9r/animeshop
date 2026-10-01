import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

// Инициализация Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

// Определение моделей
export const AnimeProduct = sequelize.define('AnimeProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: false });

// Модель для хранения информации об анимешниках
export const Animeshnick = sequelize.define('Animeshnick', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: false });

// Модель для хранения комментариев
export const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, { timestamps: false });

export const hashPassword = (password) => bcrypt.hashSync(String(password), 10);
export const comparePassword = (password, passwordHash) => bcrypt.compareSync(String(password), String(passwordHash));


// Инициализация базы данных

export const initializeDatabase = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });


    // Проверка наличия продуктов
    const productCount = await AnimeProduct.count();
    if (productCount === 0) {
        await AnimeProduct.bulkCreate([
            { name: 'Становясь Волшебницей', price: 2000, stock: 10 },
            { name: 'Мадока Магика', price: 1500, stock: 45 },
        ]);
    }

    // Проверка наличия анимешников
    const userCount = await Animeshnick.count();
    if (userCount === 0) {
        await Animeshnick.bulkCreate([
            { username: 'LittleFairy34', email: 'littlefairy@gmail.com', passwordHash: hashPassword('12345678') },
            { username: 'Maclover', email: 'yourbigfatmom@gmail.com', passwordHash: hashPassword('87654321') },
        ]);
    }

    // Проверка наличия комментариев
    const commentCount = await Comment.count();
    if (commentCount === 0) {
        const product1 = await AnimeProduct.findOne({ where: { name: 'Становясь Волшебницей' } });
        const product2 = await AnimeProduct.findOne({ where: { name: 'Мадока Магика' } });
        const user1 = await Animeshnick.findOne({ where: { email: 'littlefairy@gmail.com' } });
        const user2 = await Animeshnick.findOne({ where: { email: 'yourbigfatmom@gmail.com' } });

        // Создание комментариев
        await Comment.bulkCreate([
            { productId: product1?.id ?? 1, userId: user1?.id ?? 1, text: 'Коммент Коммент коммент коммент.' },
            { productId: product1?.id ?? 1, userId: user2?.id ?? 2, text: 'АНИМЕ КАЛ.' },
            { productId: product2?.id ?? 2, userId: user1?.id ?? 1, text: 'Я люблю это аниме!' },
            { productId: product2?.id ?? 2, userId: user2?.id ?? 2, text: 'Я тоже люблю это аниме!' },
        ]);
    }
};

export { sequelize };
