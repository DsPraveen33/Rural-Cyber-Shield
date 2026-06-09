import { Router } from "express";

const router = Router();

const tips = [
  {
    id: 1,
    title: "Never share your OTP",
    body: "Your bank or any official agency will NEVER ask for your OTP over phone or SMS. Hang up immediately if anyone asks.",
    category: "phishing",
    icon: "phone-off",
  },
  {
    id: 2,
    title: "Verify UPI requests carefully",
    body: "Scammers send fake UPI 'receive money' links that actually deduct money. Always double-check — receiving money never requires your PIN.",
    category: "upi",
    icon: "credit-card",
  },
  {
    id: 3,
    title: "Lock your Aadhaar biometrics",
    body: "You can lock your Aadhaar biometrics on the UIDAI website or mAadhaar app to prevent unauthorized use of your fingerprint.",
    category: "aadhaar",
    icon: "fingerprint",
  },
  {
    id: 4,
    title: "Use strong, unique passwords",
    body: "Use a password that is at least 8 characters long with numbers and symbols. Never reuse the same password for multiple accounts.",
    category: "password",
    icon: "lock",
  },
  {
    id: 5,
    title: "Beware of WhatsApp forwards",
    body: "Government agencies and banks never send important notices via WhatsApp. Do not click links or share personal information through WhatsApp.",
    category: "whatsapp",
    icon: "message-square",
  },
  {
    id: 6,
    title: "Report fraud immediately to 1930",
    body: "If you are a victim of cybercrime, call the National Cybercrime Helpline 1930 immediately. Quick reporting can help recover your money.",
    category: "general",
    icon: "phone",
  },
  {
    id: 7,
    title: "Check URLs before clicking",
    body: "Official government and bank websites use .gov.in or .bank.in domains. Bit.ly or other shortened links are often used by scammers.",
    category: "phishing",
    icon: "link",
  },
  {
    id: 8,
    title: "Enable two-factor authentication",
    body: "Turn on 2-step verification on all your important apps like Google, WhatsApp, and banking apps for extra security.",
    category: "general",
    icon: "shield",
  },
];

router.get("/tips", (req, res) => {
  res.json(tips);
});

router.get("/tips/daily", (req, res) => {
  const dayIndex = new Date().getDate() % tips.length;
  res.json(tips[dayIndex]);
});

export default router;
