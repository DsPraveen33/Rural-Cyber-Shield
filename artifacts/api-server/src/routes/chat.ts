import { Router } from "express";
import OpenAI from "openai";
import { SendChatMessageBody } from "@workspace/api-zod";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const parsed = SendChatMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { message, language } = parsed.data;
  const langInstruction =
    language === "te"
      ? "Respond in Telugu (తెలుగు) language."
      : "Respond in English.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content: `You are Gramin Mitra, a friendly and knowledgeable AI assistant helping rural Indian citizens stay safe from cyber threats. You specialize in:
- Phishing and SMS scams
- OTP fraud prevention
- UPI and digital payment safety
- Aadhaar biometric protection
- WhatsApp scam awareness
- How to report fraud to the national cybercrime helpline (1930)

${langInstruction}

Keep responses concise (2-4 sentences), use simple language suitable for first-time internet users, and always end with an actionable tip or next step. If a message looks like a scam, clearly warn the user and advise not clicking any links.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "I'm sorry, I could not process your request. Please try again.";

    const suggestedActions = getSuggestedActions(message, reply);

    res.json({ reply, suggestedActions });
  } catch (err) {
    req.log.error({ err }, "OpenAI chat error");
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

function getSuggestedActions(message: string, reply: string): string[] {
  const lower = (message + reply).toLowerCase();
  const actions: string[] = [];

  if (lower.includes("phishing") || lower.includes("link") || lower.includes("url")) {
    actions.push("Check suspicious link");
  }
  if (lower.includes("aadhaar") || lower.includes("biometric")) {
    actions.push("Lock Aadhaar biometrics");
  }
  if (lower.includes("fraud") || lower.includes("scam") || lower.includes("report")) {
    actions.push("Report fraud to 1930");
  }
  if (lower.includes("upi") || lower.includes("payment") || lower.includes("bank")) {
    actions.push("UPI safety tips");
  }
  if (lower.includes("otp") || lower.includes("password")) {
    actions.push("Password security guide");
  }
  if (actions.length === 0) {
    actions.push("Take the safety quiz", "View all threats");
  }
  return actions.slice(0, 3);
}

export default router;
