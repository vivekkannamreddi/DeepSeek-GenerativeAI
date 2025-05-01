import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Load API key from env
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid or missing messages" }, { status: 400 });
    }

    // Prepare the chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = messages.map(m => `${m.role === "user" ? "User" : "AI"}: ${m.content}`).join("\n") + "\nAI:";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ success: true, reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ success: false, message: "AI generation failed", error: error.message }, { status: 500 });
  }
}
