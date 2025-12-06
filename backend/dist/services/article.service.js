"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleService = void 0;
const articles_constants_1 = require("../constants/articles.constants");
class ArticleService {
    constructor() {
        this.articles = [...articles_constants_1.MOCK_ARTICLES];
    }
    findAll() {
        return this.articles;
    }
    findById(articleId) {
        return this.articles.find((article) => article.id === articleId);
    }
    create(title, content) {
        const newId = Math.max(...this.articles.map((a) => a.id), 0) + 1;
        const newArticle = {
            id: newId,
            title,
            content,
        };
        this.articles.push(newArticle);
        return newArticle;
    }
}
exports.articleService = new ArticleService();
