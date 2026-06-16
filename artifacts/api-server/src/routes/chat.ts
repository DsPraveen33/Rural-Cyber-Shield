import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { SendChatMessageBody } from "@workspace/api-zod";

const router = Router();

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
    let reply = "";
    const isMock = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "dummy-key";
    
    if (isMock) {
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("quiz") || lowerMsg.includes("question") || lowerMsg.includes("ask")) {
        reply = language === "te" 
          ? "ఆన్‌లైన్ భద్రతపై ఇంకో ప్రశ్న: ఒకరిని తమ బ్యాంక్ వివరాలు అడిగే కాల్ వస్తే ఏమి చేయాలి? \n1) వివరాలు చెప్పాలి \n2) కాల్ కట్ చేసి రిపోర్ట్ చేయాలి." 
          : "Sure, here is a safety question: What should you do if someone calls asking for your bank OTP? \n1) Share it \n2) Disconnect and block the number.";
      } else if (lowerMsg.includes("link") || lowerMsg.includes("url")) {
        reply = language === "te"
          ? "తెలియని లింక్‌లపై ఎప్పుడూ క్లిక్ చేయకండి. అవి మీ డేటాను దొంగిలించవచ్చు. అనుమానం ఉంటే వెంటనే చెక్ చేసుకోండి."
          : "Never click on unknown links. They could be phishing attempts to steal your data. When in doubt, don't click.";
      } else if (lowerMsg.includes("upi")) {
        reply = language === "te"
          ? "UPI భద్రతా చిట్కా: డబ్బును స్వీకరించడానికి మీరు ఎప్పుడూ UPI పిన్ ఎంటర్ చేయాల్సిన అవసరం లేదు. ఎవరైనా డబ్బు పంపడానికి పిన్ అడిగితే అది మోసం!"
          : "UPI Safety Tip: You NEVER need to enter your UPI PIN to receive money. If someone asks you to enter your PIN to get a payment, it is a scam!";
      } else if (lowerMsg.includes("aadhaar") || lowerMsg.includes("biometric")) {
        reply = language === "te"
          ? "మీ ఆధార్ బయోమెట్రిక్స్ లాక్ చేయడం ద్వారా అనధికారిక వేలిముద్ర మోసాలను నిరోధించవచ్చు. మీరు mAadhaar యాప్ ద్వారా దీన్ని సులభంగా చేయవచ్చు."
          : "Locking your Aadhaar biometrics prevents unauthorized fingerprint scams (AePS fraud). You can easily do this via the mAadhaar app or UIDAI website.";
      } else if (lowerMsg.includes("report") || lowerMsg.includes("1930")) {
        reply = language === "te"
          ? "మీరు సైబర్ మోసానికి గురైతే, వెంటనే 1930 కి కాల్ చేయండి లేదా cybercrime.gov.in లో రిపోర్ట్ చేయండి."
          : "If you have lost money to a cyber scam, dial the national cybercrime helpline 1930 immediately, or report it at cybercrime.gov.in.";
      } else if (lowerMsg.includes("password")) {
        reply = language === "te"
          ? "పాస్‌వర్డ్ భద్రత: ఎల్లప్పుడూ బలమైన పాస్‌వర్డ్‌లను (అక్షరాలు, సంఖ్యలు, చిహ్నాలు) ఉపయోగించండి మరియు వాటిని ఎవరితోనూ పంచుకోవద్దు."
          : "Password Security: Always use strong passwords (letters, numbers, symbols) and never share them with anyone. Avoid using your name or date of birth.";
      } else if (lowerMsg.includes("threat")) {
        reply = language === "te"
          ? "తాజా మోసాల గురించి తెలుసుకోవడానికి దయచేసి హోమ్ పేజీలోని 'కమ్యూనిటీ హెచ్చరికలు' విభాగాన్ని తనిఖీ చేయండి."
          : "Please check the 'Community Alerts' section on the Home page to see the latest threats reported by others in your area.";
      } else if (lowerMsg === "1" || lowerMsg === "2" || lowerMsg.includes("disconnect") || lowerMsg.includes("share")) {
        reply = language === "te"
          ? "సరైన సమాధానం 2! ఎప్పుడూ OTP ని పంచుకోకండి. మీరు జాగ్రత్తగా ఉన్నందుకు సంతోషం."
          : "The correct answer is 2! Never share your OTP. Great job staying alert!";
      } else {
        reply = language === "te"
          ? "గ్రామీణ రక్షక్‌కు స్వాగతం! నా బ్రెయిన్ పని చేయడానికి GEMINI_API_KEY అవసరం. దయచేసి దాన్ని యాడ్ చేయండి!"
          : "Hello! My AI brain is currently disconnected. Please add a GEMINI_API_KEY to my environment to unlock my full ChatGPT/Gemini capabilities!";
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
    } else {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction: `You are Gramin Mitra, a friendly and knowledgeable AI assistant helping rural Indian citizens stay safe from cyber threats. You specialize in:
- Phishing and SMS scams
- OTP fraud prevention
- UPI and digital payment safety
- Aadhaar biometric protection
- WhatsApp scam awareness
- How to report fraud to the national cybercrime helpline (1930)

${langInstruction}

Keep responses concise (2-4 sentences), use simple language suitable for first-time internet users, and always end with an actionable tip or next step. If a message looks like a scam, clearly warn the user and advise not clicking any links.`,
        }
      });

      reply = response.text ?? "I'm sorry, I could not process your request. Please try again.";
    }

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
