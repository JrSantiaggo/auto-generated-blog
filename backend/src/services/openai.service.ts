import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn(
    "⚠️  OPENAI_API_KEY not configured. Article generation will not work."
  );
}

let client: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  if (!client) {
    client = new OpenAI({
      apiKey: OPENAI_API_KEY,
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
  const openAIClient = getOpenAIClient();

  const {
    topic = "technology",
    style = "light and informal",
    paragraphs = 3,
  } = request;

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
