// src/app/api/gemini/route.ts
import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return new Response("GEMINI_API_KEY not set", { status: 500 });
  }

  const { prompt } = await req.json();

  const models = [
    "gemini-1.5-flash-002",
    "gemini-1.5-flash",
    "gemini-1.5-pro-002",
  ];

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.warn(`Model ${model} failed:`, err);
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return new Response(text, { status: 200 });
    } catch (e) {
      console.warn(`Model ${model} crashed`, e);
    }
  }

  return new Response(JSON.stringify({ error: "All models failed" }), {
    status: 500,
  });
}