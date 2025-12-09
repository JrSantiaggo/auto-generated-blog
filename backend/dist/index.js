"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const article_routes_1 = __importDefault(require("./routes/article.routes"));
const server_constants_1 = require("./constants/server.constants");
const database_service_1 = require("./services/database.service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(article_routes_1.default);
async function startServer() {
    try {
        // Initialize database connection and create tables
        await (0, database_service_1.initializeDatabase)();
        app.listen(server_constants_1.PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${server_constants_1.PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, closing database connections...");
    await (0, database_service_1.closeDatabase)();
    process.exit(0);
});
process.on("SIGINT", async () => {
    console.log("SIGINT received, closing database connections...");
    await (0, database_service_1.closeDatabase)();
    process.exit(0);
});
startServer();
