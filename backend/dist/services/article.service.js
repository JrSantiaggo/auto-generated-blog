"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleService = void 0;
const database_service_1 = require("./database.service");
class ArticleService {
    async findAll() {
        const rows = await (0, database_service_1.query)("SELECT id, title, content FROM articles ORDER BY id DESC");
        return rows;
    }
    async findById(articleId) {
        const rows = await (0, database_service_1.query)("SELECT id, title, content FROM articles WHERE id = $1", [articleId]);
        return rows[0];
    }
    async create(title, content) {
        const rows = await (0, database_service_1.query)("INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING id, title, content", [title, content]);
        return rows[0];
    }
}
exports.articleService = new ArticleService();
