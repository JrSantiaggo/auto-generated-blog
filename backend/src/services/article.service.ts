import type { Article } from "../types/article.types";
import { MOCK_ARTICLES } from "../constants/articles.constants";

class ArticleService {
  private articles: Article[];

  constructor() {
    this.articles = [...MOCK_ARTICLES];
  }

  findAll(): Article[] {
    return this.articles;
  }

  findById(articleId: number): Article | undefined {
    return this.articles.find((article) => article.id === articleId);
  }

  create(title: string, content: string): Article {
    const newId = Math.max(...this.articles.map((a) => a.id), 0) + 1;
    const newArticle: Article = {
      id: newId,
      title,
      content,
    };
    this.articles.push(newArticle);
    return newArticle;
  }
}

export const articleService = new ArticleService();
