import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  generateArticleController,
} from "../controllers/article.controller";

const router = Router();

const ARTICLES_ROUTE = "/articles";
const ARTICLE_BY_ID_ROUTE = "/articles/:id";
const GENERATE_ARTICLE_ROUTE = "/articles/generate";

router.get(ARTICLES_ROUTE, getAllArticles);
router.get(ARTICLE_BY_ID_ROUTE, getArticleById);
router.post(GENERATE_ARTICLE_ROUTE, generateArticleController);

export default router;
