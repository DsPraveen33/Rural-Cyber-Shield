import { Router } from "express";

const router = Router();

const threats = [
  {
    id: 1,
    name: "Phishing",
    description: "Fake links and emails stealing passwords and personal data.",
    severity: "high",
    icon: "at-sign",
    learnMoreUrl: null,
  },
  {
    id: 2,
    name: "OTP Fraud",
    description: "Scammers call pretending to be bank officials to steal your OTP.",
    severity: "critical",
    icon: "message-square",
    learnMoreUrl: null,
  },
  {
    id: 3,
    name: "UPI Fraud",
    description: "Fake 'receive money' links that deduct money instead of crediting.",
    severity: "moderate",
    icon: "credit-card",
    learnMoreUrl: null,
  },
  {
    id: 4,
    name: "Aadhaar Misuse",
    description: "Unauthorized use of your biometric identity data.",
    severity: "monitor",
    icon: "fingerprint",
    learnMoreUrl: null,
  },
  {
    id: 5,
    name: "Digital Arrest Scam",
    description: "Fraudsters pose as police/CBI claiming you are under 'digital arrest'.",
    severity: "critical",
    icon: "alert-triangle",
    learnMoreUrl: null,
  },
  {
    id: 6,
    name: "Lottery & Prize Fraud",
    description: "Fake prize messages asking you to pay fees to claim non-existent winnings.",
    severity: "high",
    icon: "gift",
    learnMoreUrl: null,
  },
];

router.get("/threats", (req, res) => {
  res.json(threats);
});

export default router;
