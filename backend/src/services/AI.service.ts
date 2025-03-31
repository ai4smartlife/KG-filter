import { GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_AI_STUDIO_API_KEY, AI_API_URL } from "../env-value";

const genAI = new GoogleGenerativeAI(GOOGLE_AI_STUDIO_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const answer = async (question: string) => {
  try {
    // const result = await model.generateContent(question);
    // const response = result.response;
    // const text = response.text();
    // return text

    const response = await fetch(`${AI_API_URL}/biomedical-response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    return data.answer || "I'm sorry, but I couldn't find the answer to your question";
  } catch (error) {
    console.log(error);
    return "We're sorry, but our server is currently experiencing issues. Please try again later";
  }
};

export const AIService = { answer };
