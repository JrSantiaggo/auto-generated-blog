import { Request, Response } from "express";
import { articleService } from "../services/article.service";
import { generateArticle } from "../services/openai.service";

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const getAllArticles = (_req: Request, res: Response): void => {
  const articles = articleService.findAll();
  res.status(HTTP_STATUS.OK).json(articles);
};

export const getArticleById = (req: Request, res: Response): void => {
  const articleId = parseInt(req.params.id, 10);

  if (isNaN(articleId)) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      error: "Invalid article ID",
    });
    return;
  }

  const article = articleService.findById(articleId);

  if (!article) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      error: "Article not found",
    });
    return;
  }

  res.status(HTTP_STATUS.OK).json(article);
};

interface GenerateArticleRequestBody {
  topic?: string;
  style?: string;
  paragraphs?: number;
  title?: string;
}

export const generateArticleController = async (
  req: Request<unknown, unknown, GenerateArticleRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { topic, style, paragraphs, title } = req.body;

    const generatedContent = await generateArticle({
      topic,
      style,
      paragraphs,
    });

    const articleTitle = title || `Article about ${topic || "technology"}`;
    const newArticle = articleService.create(articleTitle, generatedContent);

    res.status(HTTP_STATUS.CREATED).json(newArticle);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error generating article";

    if (errorMessage.includes("OPENAI_API_KEY")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "OpenAI API configuration not found",
      });
      return;
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: errorMessage,
    });
  }
};
