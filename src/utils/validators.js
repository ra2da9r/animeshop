const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isNonEmptyString = (value) =>
    typeof value === 'string' && value.trim().length > 0;

export const isPositiveNumber = (value) =>
    Number.isFinite(value) && value > 0;

export const isValidId = (value) => Number.isInteger(value) && value > 0;

export const isValidEmail = (email) =>
    typeof email === 'string' && emailPattern.test(email.trim());

export const isValidPassword = (password) =>
    typeof password === 'string' && password.length >= 6;

export const validateProduct = (data) => {
    const errors = {};
    if (!isNonEmptyString(data?.name)) errors.name = 'Название обязательно';
    if (!isPositiveNumber(data?.price)) errors.price = 'Цена должна быть больше нуля';
    if (!isPositiveNumber(data?.stock)) errors.stock = 'Количество должно быть больше нуля';
    return errors;
};

export const validateUser = (data, { partial = false } = {}) => {
    const errors = {};
    if (!partial || data?.username !== undefined) {
        if (!isNonEmptyString(data?.username)) errors.username = 'Имя обязательно';
    }
    if (!partial || data?.email !== undefined) {
        if (!isValidEmail(data?.email)) errors.email = 'Укажите корректную почту';
    }
    if (data?.password !== undefined && !isValidPassword(data.password)) {
        errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    return errors;
};

export const validateComment = (data, { partial = false } = {}) => {
    const errors = {};
    if (!partial || data?.productId !== undefined) {
        if (!isValidId(data?.productId)) errors.productId = 'Некорректный идентификатор товара';
    }
    if (!partial || data?.userId !== undefined) {
        if (!isValidId(data?.userId)) errors.userId = 'Некорректный идентификатор пользователя';
    }
    if (!partial || data?.text !== undefined) {
        if (!isNonEmptyString(data?.text)) errors.text = 'Текст комментария обязателен';
    }
    return errors;
};

export const validationError = (errors) => {
    const error = new Error('Некорректные данные');
    error.status = 400;
    error.details = errors;
    return error;
};