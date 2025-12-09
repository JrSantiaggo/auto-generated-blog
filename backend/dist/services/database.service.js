"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = getClient;
exports.query = query;
exports.initializeDatabase = initializeDatabase;
exports.closeDatabase = closeDatabase;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER || "blog_user",
    password: process.env.DB_PASSWORD || "blog_password",
    database: process.env.DB_NAME || "blog",
});
async function getClient() {
    return await pool.connect();
}
async function query(text, params) {
    const client = await getClient();
    try {
        const result = await client.query(text, params);
        return result.rows;
    }
    finally {
        client.release();
    }
}
async function initializeDatabase() {
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
        const existingArticles = await query("SELECT COUNT(*) as count FROM articles");
        const count = parseInt(existingArticles[0]?.count || "0", 10);
        if (count === 0) {
            await query(`INSERT INTO articles (title, content) VALUES ($1, $2), ($3, $4)`, ["First post", "Lorem ipsum...", "Second post", "..."]);
        }
        console.log("Database initialized successfully");
    }
    catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
}
async function closeDatabase() {
    await pool.end();
}
