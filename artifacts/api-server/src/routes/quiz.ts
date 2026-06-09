import { Router } from "express";
import { SubmitQuizBody } from "@workspace/api-zod";

const router = Router();

const questions = [
  {
    id: 1,
    question: "You receive an SMS: 'Your bank account will be blocked. Click here to update KYC: bit.ly/bank-kyc'. What should you do?",
    options: [
      "Click the link immediately to protect your account",
      "Call your bank's official number to verify",
      "Share the link with family to warn them",
      "Reply to the SMS asking for more details",
    ],
    correctIndex: 1,
    explanation: "Banks never send KYC update links via SMS. Always call your bank's official helpline number printed on your card or passbook.",
  },
  {
    id: 2,
    question: "Someone calls claiming to be from your bank and asks for your OTP to 'verify your account'. What should you do?",
    options: [
      "Share the OTP since they called from a bank number",
      "Ask them to call back after 10 minutes",
      "Immediately hang up — banks never ask for OTPs",
      "Give only the first 3 digits of the OTP",
    ],
    correctIndex: 2,
    explanation: "No bank, government agency, or legitimate company will ever ask for your OTP over a phone call. Sharing OTP = losing money.",
  },
  {
    id: 3,
    question: "A friend on WhatsApp sends you a link saying you won Rs. 50,000 in a lucky draw. What should you do?",
    options: [
      "Click the link to claim your prize",
      "Share it with others so they can also win",
      "Pay the processing fee to unlock the prize",
      "Ignore it — it is a scam",
    ],
    correctIndex: 3,
    explanation: "Lottery scams are very common on WhatsApp. You cannot win a prize you never entered. These links steal your data or money.",
  },
  {
    id: 4,
    question: "You scan a QR code at a shop and see a screen asking for your UPI PIN to 'receive payment'. What does this mean?",
    options: [
      "The merchant needs your PIN to complete the transaction",
      "This is normal for all UPI payments",
      "This is a scam — receiving money never needs your PIN",
      "Enter your PIN to get the discount",
    ],
    correctIndex: 2,
    explanation: "Your UPI PIN is only needed when YOU send money. Entering PIN on a 'receive money' screen will deduct money from your account.",
  },
  {
    id: 5,
    question: "Which helpline number should you call immediately if you become a victim of cybercrime or online fraud in India?",
    options: ["100", "112", "1930", "1800-11-4000"],
    correctIndex: 2,
    explanation: "1930 is India's National Cyber Crime Helpline. Call immediately after fraud — quick action can help recover your money.",
  },
  {
    id: 6,
    question: "How can you protect your Aadhaar from biometric fraud?",
    options: [
      "Share Aadhaar only on WhatsApp",
      "Lock your Aadhaar biometrics on the UIDAI website or mAadhaar app",
      "Keep Aadhaar card at home always",
      "Share only the last 4 digits of your Aadhaar",
    ],
    correctIndex: 1,
    explanation: "You can lock your biometric data on uidai.gov.in or the mAadhaar app to prevent unauthorized fingerprint-based authentication.",
  },
];

router.get("/quiz/questions", (req, res) => {
  res.json(questions);
});

router.post("/quiz/submit", (req, res) => {
  const parsed = SubmitQuizBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid submission" });
    return;
  }

  const { answers } = parsed.data;
  let score = 0;

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question && question.correctIndex === answer.selectedIndex) {
      score++;
    }
  }

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  let feedback: string;
  let badge: string | null = null;

  if (percentage >= 90) {
    feedback = "Outstanding! You are a true Cyber Safety Champion. Your knowledge can protect your entire community!";
    badge = "Cyber Safety Champion";
  } else if (percentage >= 70) {
    feedback = "Great job! You have strong cyber safety awareness. Review the questions you missed to become even safer online.";
    badge = "Digital Guardian";
  } else if (percentage >= 50) {
    feedback = "Good effort! You understand the basics. Keep learning to better protect yourself and your family from online threats.";
    badge = null;
  } else {
    feedback = "Keep learning! Cyber scams are increasing in rural areas. Complete the Learning Hub modules to improve your knowledge.";
    badge = null;
  }

  res.json({ score, total, percentage, feedback, badge });
});

export default router;
