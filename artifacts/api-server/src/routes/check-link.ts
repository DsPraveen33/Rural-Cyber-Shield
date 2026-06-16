import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { CheckLinkBody } from "@workspace/api-zod";

const router = Router();

router.post("/check-link", async (req, res) => {
  const parsed = CheckLinkBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { content, language } = parsed.data;
  const langInstruction =
    language === "te"
      ? "Respond in Telugu (తెలుగు) language."
      : "Respond in English.";

  try {
    let raw = "{}";
    const isMock = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy-key";
    
    if (isMock) {
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes("sbi") || lowerContent.includes("bank") || lowerContent.includes("pay") || lowerContent.includes("free") || lowerContent.includes("electricity") || lowerContent.includes("cut")) {
        raw = JSON.stringify({
          verdict: "dangerous",
          explanation: language === "te" 
            ? "ఈ కంటెంట్ సురక్షితం కాదు. ఇది మీ డేటాను లేదా డబ్బును దొంగిలించడానికి ప్రయత్నిస్తున్న మోసం కావచ్చు." 
            : "This text or link is dangerous. It appears to be a phishing attempt or scam to steal your information or money.",
          signals: ["Suspicious keywords", "Urgency or threat detected", "Possible phishing attempt"]
        });
      } else {
        raw = JSON.stringify({
          verdict: "safe",
          explanation: language === "te" 
            ? "ఈ కంటెంట్ సురక్షితంగా కనిపిస్తోంది. అయితే, ఎప్పుడూ జాగ్రత్తగా ఉండండి." 
            : "This text or link appears to be safe. However, always exercise caution online.",
          signals: []
        });
      }
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Check this URL or SMS message content: ${content}`,
        config: {
          systemInstruction: `You are a cybersecurity expert who analyzes text messages (SMS/WhatsApp) and URLs for phishing, scams, and malicious patterns. Analyze the given content and return ONLY valid JSON (no markdown, no extra text) with exactly these fields:
{
  "verdict": "safe" | "suspicious" | "dangerous",
  "explanation": "2-3 sentence explanation in simple language",
  "signals": ["up to 3 key warning signals, or empty array if safe"]
}

Verdict rules:
- "dangerous": clear phishing indicators (fake domain, typosquatting, promises of free money/jobs, threats of disconnection/arrest, OTP requests)
- "suspicious": ambiguous signals (URL shorteners, unknown numbers asking for money, spelling mistakes)
- "safe": normal conversational text, known legitimate domains, no deceptive patterns

${langInstruction}`,
          responseMimeType: "application/json",
        }
      });

      raw = response.text ?? "{}";
      raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();
    }

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
      content,
      verdict,
      explanation: result.explanation ?? "Could not analyse this content.",
      signals: result.signals ?? [],
    });
  } catch (err) {
    req.log.error({ err }, "check-link error");
    res.status(500).json({ error: "Failed to analyse content" });
  }
});

export default router;
