import { AnimeProduct, Animeshnick, Comment } from "./classes.js";

class DatabaseAnime { 
    constructor(){ 
        this.animeproduct = [
            new AnimeProduct(1, 'Становясь Волшебницей', 2000, 10), 
            new AnimeProduct(2, 'Мадока Магика', 1500, 45)
        ]
        this.users = [ 
            new Animeshnick(1, 'LittleFairy34', 'littlefairy@gmail.com'), 
            new Animeshnick(2, 'Maclover', 'yourbigfatmom@gmail.com')
        ]
        this.comments = [
            new Comment(1, 1, 1, 'Коммент Коммент коммент коммент.'),
            new Comment(2, 1, 2, 'АНИМЕ КАЛ.'),
            new Comment(3, 2, 1, 'Я люблю это аниме!'),
            new Comment(4, 2, 2, 'Я тоже люблю это аниме!'),
        ]
    }

    //animeeeeeeeeee
    getAllAnimeProducts(){return this.animeproduct;}
    getAnimeById(id){return this.animeproduct.find(p => p.id === id)}
    createAnime(data){ 
        const nextId = this.animeproduct.length ? Math.max(...this.animeproduct.map(p => p.id)) + 1 : 1;
        const newAnimeproduct = new AnimeProduct(nextId, data.name, data.price, data.stock)
        return newAnimeproduct
    }

    updateAnime(id, data){ 
        const animepr = this.getAnimeById(id); 
        if(!animepr) return null;
        if(data.name !== undefined){ 
            animepr.name = data.name
        }
        if(data.price !== undefined){ 
            animepr.price = data.price
        }
        if(data.stock !== undefined){ 
            animepr.stock = data.stock
        }
        return animepr
    }

    deleteAnime(id){ 
        const index = this.animeproduct.findIndex(p => p.id === id);
        if (index === -1) return false; 
        this.animeproduct.splice(index, 1); 
        return true;
    }

    //Animeshniki 
    getAllAnimeshniki(){return this.users; }
    getAnimeshById(id){ return this.users.find(u => u.id === id)}
    createAnimeshnik(data){ 
        const nextId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
        const newAnimeshnik = new Animeshnick(nextId, data.username, data.email); 
        this.users.push(newAnimeshnik); 
        return newAnimeshnik;
    }

    updateAnimeshnik(id, data){ 
        const lvlup = this.getAnimeshById(id); 
        if(!lvlup) return null;
        if(data.username !== undefined){ 
            lvlup.username = data.username
        }
        if(data.email !== undefined){ 
            lvlup.email = data.email
        }

        return lvlup
    }

    deleteAnimeshnik(id){ 
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return false; 
        this.users.splice(index, 1); 
        return true;
    }


    //каменты
    getAllComments(){ return this.comments; }
    getCommentById(id){ return this.comments.find(c => c.id === id); }
    
    getCommentsByANIMEId(productId){
        return this.comments.filter(c => c.productId === productId);
    }

    createComment(data){
        if (!this.getAnimeById(data.productId)) throw new Error("Такого аниме нет в магазине! (｡•́︿•̀｡)");
        if (!this.getAnimeshById(data.userId)) throw new Error("Такой анимешник не зарегистрирован! (⇀⇀)");

        const nextId = this.comments.length ? Math.max(...this.comments.map(c => c.id)) + 1 : 1;
        const newComment = new Comment(nextId, data.productId, data.userId, data.text);
        this.comments.push(newComment);
        return newComment;
    }

    updateComment(id, data){
        const comment = this.getCommentById(id);
        if(!comment) return null;
        if(data.text !== undefined) comment.text = data.text;
        return comment;
    }

    deleteComment(id){
        const index = this.comments.findIndex(c => c.id === id);
        if (index === -1) return false;
        this.comments.splice(index, 1);
        return true;
    }
}

export const db = new DatabaseAnime();