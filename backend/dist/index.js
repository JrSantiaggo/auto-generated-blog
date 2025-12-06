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
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(article_routes_1.default);
app.listen(server_constants_1.PORT, () => {
    console.log(`Server running on port ${server_constants_1.PORT}`);
});
