"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateArticleController = exports.getArticleById = exports.getAllArticles = void 0;
const article_service_1 = require("../services/article.service");
const ai_service_1 = require("../services/ai.service");
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};
const getAllArticles = async (_req, res) => {
    try {
        const articles = await article_service_1.articleService.findAll();
        res.status(HTTP_STATUS.OK).json(articles);
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: error instanceof Error ? error.message : "Error fetching articles",
        });
    }
};
exports.getAllArticles = getAllArticles;
const getArticleById = async (req, res) => {
    try {
        const articleId = parseInt(req.params.id, 10);
        if (isNaN(articleId)) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                error: "Invalid article ID",
            });
            return;
        }
        const article = await article_service_1.articleService.findById(articleId);
        if (!article) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                error: "Article not found",
            });
            return;
        }
        res.status(HTTP_STATUS.OK).json(article);
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: error instanceof Error ? error.message : "Error fetching article",
        });
    }
};
exports.getArticleById = getArticleById;
const generateArticleController = async (req, res) => {
    try {
        const { topic, style, paragraphs, title } = req.body;
        const generatedContent = await (0, ai_service_1.generateArticle)({
            topic,
            style,
            paragraphs,
        });
        const articleTitle = title || `Article about ${topic || "technology"}`;
        const newArticle = await article_service_1.articleService.create(articleTitle, generatedContent);
        res.status(HTTP_STATUS.CREATED).json(newArticle);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error generating article";
        if (errorMessage.includes("GROQ_API_KEY")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: "Groq API configuration not found",
            });
            return;
        }
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error: errorMessage,
        });
    }
};
exports.generateArticleController = generateArticleController;
