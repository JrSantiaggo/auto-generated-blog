import type { Article } from "../types/article.types";
import { query } from "./database.service";

class ArticleService {
  async findAll(): Promise<Article[]> {
    const rows = await query<Article>(
      "SELECT id, title, content FROM articles ORDER BY id DESC"
    );
    return rows;
  }

  async findById(articleId: number): Promise<Article | undefined> {
    const rows = await query<Article>(
      "SELECT id, title, content FROM articles WHERE id = $1",
      [articleId]
    );
    return rows[0];
  }

  async create(title: string, content: string): Promise<Article> {
    const rows = await query<Article>(
      "INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING id, title, content",
      [title, content]
    );
    return rows[0];
  }
}

export const articleService = new ArticleService();
