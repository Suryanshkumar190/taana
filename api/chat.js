// Vercel serverless function: POST /api/chat
// Uses Groq's free API (OpenAI-compatible endpoint, Llama model) so this
// runs at zero cost. Keeps the key server-side — the frontend never sees it.
//
// Get a free key (no credit card) at https://console.groq.com → API Keys.
// Then set GROQ_API_KEY in Vercel → Project Settings → Environment Variables.

import { products, clusters } from "../src/data/products.js";

const catalogSummary = products
  .map((p) => {
    const c = clusters.find((cl) => cl.id === p.cluster);
    return `- ${p.name} | ${c.name} weave (${c.state}) | ${p.unit} | \u20B9${p.price} | ${c.note}`;
  })
  .join("\n");

const SYSTEM_PROMPT = `You are the Taana Weaving Guide, a knowledgeable, friendly assistant on a handloom textile marketplace called Taana. Your job is to help buyers pick the right piece from the catalog below based on what they describe (occasion, budget, fabric weight, colour, etc.).

Catalog:
${catalogSummary}

Rules:
- Only recommend items from this catalog. Never invent products, prices, or weavers.
- Keep replies short (3-5 sentences), warm, and specific — name the actual piece and explain why it fits.
- If nothing in the catalog fits well, say so honestly and suggest the closest option.
- You can briefly explain weaving techniques (ikat, brocade, block-print, etc.) when it helps the buyer decide.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY is not set on the server. Get a free key at console.groq.com and add it in Vercel → Project Settings → Environment Variables.",
    });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "";
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown server error" });
  }
}
