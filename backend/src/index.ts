import "dotenv/config";
import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.routes";
import { PORT } from "./constants/server.constants";

const app = express();

app.use(cors());
app.use(express.json());
app.use(articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
