import { Pool, PoolClient } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER || "blog_user",
  password: process.env.DB_PASSWORD || "blog_password",
  database: process.env.DB_NAME || "blog",
});

export async function getClient(): Promise<PoolClient> {
  return await pool.connect();
}

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await getClient();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    // Create articles table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert mock articles if table is empty
    const existingArticles = await query<{ count: string }>(
      "SELECT COUNT(*) as count FROM articles"
    );
    const count = parseInt(existingArticles[0]?.count || "0", 10);

    if (count === 0) {
      await query(
        `INSERT INTO articles (title, content) VALUES ($1, $2), ($3, $4)`,
        ["First post", "Lorem ipsum...", "Second post", "..."]
      );
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  await pool.end();
}

