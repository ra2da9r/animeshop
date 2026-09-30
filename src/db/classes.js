
//Аниме могозин (*/ω＼*) я не онимешник 

export class AnimeProduct{ 
    constructor(id, name, price, stock){ 
        if (typeof name !== 'string' || name.trim() === ''){ 
            throw new Error(`К сожалению у аниме обязано быть название (*/ω＼*)`)
        }
        if (!Number.isFinite(price) || price <=0 || !Number.isFinite(stock) || stock <= 0){ 
            throw new Error(`Мы в долгах?`)
        }
        this.id = id; 
        this.name = name;
        this.price = price; 
        this.stock = stock;
    }
}

export class Animeshnick{ //Онимешник
    constructor(id, username, email){ 
        if (typeof username !== 'string' || username.trim() === ''){ 
            throw new Error(`Прости, но как тебя зовут Сенпай?`)
        }
        if (!email || !email.trim()){ 
            throw new Error(`ГДЕ ПОЧТА!!!`)
        }
        this.id = id; 
        this.username = username; 
        this.email = email; //Ну чтобы понимать, как связаться с анимешником (๑•̀ㅂ•́)و✧
        this.passwordHash = null;

        if(!this.email.toLowerCase().includes("@") || !this.email.toLowerCase().includes(".")){ 
            throw new Error(`Будто бы это не почта. Пожалуйста, не дури меня`)
        }
    }
}

export class Comment {
    constructor(id, productId, userId, text) {

        if (typeof text !== 'string' || text.trim() === '') {
            throw new Error(`Напиши хоть что-нибудь, Бака! (｡•́︿•̀｡)`);
        }
        this.id = id;
        this.productId = productId; 
        this.userId = userId;       
        this.text = text;           
        this.createdAt = new Date(); 
    }
}

export const requireAuthorization = (req, res, next) => { 
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Требуется заголовок Authorization' });
    }
    next();
}