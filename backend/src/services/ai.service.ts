import { Groq } from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.warn(
    "⚠️  GROQ_API_KEY not configured. Article generation will not work."
  );
}

let client: Groq | null = null;

function getGroqClient(): Groq {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY not configured");
  }

  if (!client) {
    client = new Groq({
      apiKey: GROQ_API_KEY,
    });
  }

  return client;
}

interface GenerateArticleRequest {
  topic?: string;
  style?: string;
  paragraphs?: number;
}

export async function generateArticle(
  request: GenerateArticleRequest = {}
): Promise<string> {
  const groqClient = getGroqClient();

  const {
    topic = "technology",
    style = "light and informal",
    paragraphs = 3,
  } = request;

  const userPrompt = `Write an article with ${paragraphs} paragraphs about ${topic}, ${style} style.`;

  const completion = await groqClient.chat.completions.create({
    model: "llama-3.3-70b-versatile",
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
