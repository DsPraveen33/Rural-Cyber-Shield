import { Router } from "express";
import OpenAI from "openai";
import { CheckLinkBody } from "@workspace/api-zod";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

router.post("/check-link", async (req, res) => {
  const parsed = CheckLinkBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { url, language } = parsed.data;
  const langInstruction =
    language === "te"
      ? "Respond in Telugu (తెలుగు) language."
      : "Respond in English.";

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: `You are a cybersecurity expert who checks URLs for phishing, scams, and malicious patterns. Analyse the given URL and return ONLY valid JSON (no markdown, no extra text) with exactly these fields:
{
  "verdict": "safe" | "suspicious" | "dangerous",
  "explanation": "2-3 sentence explanation in simple language",
  "signals": ["up to 3 key warning signals, or empty array if safe"]
}

Verdict rules:
- "dangerous": clear phishing indicators (fake domain, typosquatting, suspicious TLD like .xyz/.tk/.ru combined with brand names, data-harvesting patterns)
- "suspicious": ambiguous signals (URL shorteners, unusual subdomains, unknown domains asking for credentials)
- "safe": known legitimate domain, standard HTTPS, no deceptive patterns

${langInstruction}`,
        },
        {
          role: "user",
          content: `Check this URL: ${url}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    let result: { verdict?: string; explanation?: string; signals?: string[] };
    try {
      result = JSON.parse(raw);
    } catch {
      result = {};
    }

    const verdict = ["safe", "suspicious", "dangerous"].includes(result.verdict ?? "")
      ? (result.verdict as "safe" | "suspicious" | "dangerous")
      : "suspicious";

    res.json({
      url,
      verdict,
      explanation: result.explanation ?? "Could not analyse this URL.",
      signals: result.signals ?? [],
    });
  } catch (err) {
    req.log.error({ err }, "check-link error");
    res.status(500).json({ error: "Failed to analyse URL" });
  }
});

export default router;
