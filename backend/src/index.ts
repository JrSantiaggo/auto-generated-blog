import "dotenv/config";
import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.routes";
import { PORT } from "./constants/server.constants";
import { initializeDatabase, closeDatabase } from "./services/database.service";

const app = express();

app.use(cors());
app.use(express.json());
app.use(articleRoutes);

async function startServer() {
  try {
    // Initialize database connection and create tables
    await initializeDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing database connections...");
  await closeDatabase();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing database connections...");
  await closeDatabase();
  process.exit(0);
});

startServer();
