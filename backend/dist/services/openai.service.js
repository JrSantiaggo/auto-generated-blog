"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateArticle = generateArticle;
const openai_1 = __importDefault(require("openai"));
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    console.warn("⚠️  OPENAI_API_KEY not configured. Article generation will not work.");
}
let client = null;
function getOpenAIClient() {
    if (!OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY not configured");
    }
    if (!client) {
        client = new openai_1.default({
            apiKey: OPENAI_API_KEY,
        });
    }
    return client;
}
async function generateArticle(request = {}) {
    const openAIClient = getOpenAIClient();
    const { topic = "technology", style = "light and informal", paragraphs = 3, } = request;
    const userPrompt = `Write an article with ${paragraphs} paragraphs about ${topic}, ${style} style.`;
    const completion = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a simple article generator for a generic blog.",
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
    });
    const generatedContent = completion.choices[0]?.message?.content;
    if (!generatedContent) {
        throw new Error("Failed to generate article content");
    }
    return generatedContent;
}
