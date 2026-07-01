// ============================================================
//  Función serverless (Vercel) — el concierge le habla a OpenAI
//  desde aquí, nunca desde el navegador, para no exponer la
//  API key del proyecto (OPENAI_API_KEY vive solo en el servidor).
// ============================================================
import { SYSTEM_PROMPT } from "../src/data.js";

const MODEL = "gpt-4o-mini";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { lang, messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Falta el arreglo de mensajes" });
    return;
  }

  const system = SYSTEM_PROMPT[lang] || SYSTEM_PROMPT.es;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        temperature: 0.7,
        messages: [
          { role: "system", content: system },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (!openaiRes.ok) {
      const detail = await openaiRes.text();
      console.error("OpenAI error:", openaiRes.status, detail);
      res.status(502).json({ error: "El proveedor de IA no respondió correctamente" });
      return;
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error llamando a OpenAI:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
