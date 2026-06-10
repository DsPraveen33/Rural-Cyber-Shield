export type AlertSeverity = "critical" | "high" | "moderate" | "monitor";

export type CommunityAlert = {
  id: number;
  district: string;
  districtTe: string;
  scamType: string;
  scamTypeTe: string;
  reportCount: number;
  hoursAgo: number;
  severity: AlertSeverity;
  icon: string;
};

const DISTRICTS = [
  { en: "Vijayawada", te: "విజయవాడ" },
  { en: "Guntur", te: "గుంటూరు" },
  { en: "Visakhapatnam", te: "విశాఖపట్నం" },
  { en: "Nellore", te: "నెల్లూరు" },
  { en: "Kurnool", te: "కర్నూలు" },
  { en: "Rajahmundry", te: "రాజమహేంద్రవరం" },
  { en: "Tirupati", te: "తిరుపతి" },
  { en: "Kakinada", te: "కాకినాడ" },
  { en: "Hyderabad", te: "హైదరాబాద్" },
  { en: "Warangal", te: "వరంగల్" },
  { en: "Nizamabad", te: "నిజామాబాద్" },
  { en: "Karimnagar", te: "కరీంనగర్" },
  { en: "Srikakulam", te: "శ్రీకాకుళం" },
  { en: "Eluru", te: "ఏలూరు" },
  { en: "Ongole", te: "ఒంగోలు" },
];

const SCAM_TYPES: Array<{
  en: string;
  te: string;
  severity: AlertSeverity;
  icon: string;
  counts: number[];
}> = [
  { en: "OTP / Bank Fraud", te: "OTP / బ్యాంక్ మోసం", severity: "critical", icon: "📱", counts: [12, 18, 7, 23, 9, 15] },
  { en: "UPI Collect Scam", te: "UPI కలెక్ట్ మోసం", severity: "high", icon: "💸", counts: [5, 8, 11, 4, 14, 6] },
  { en: "Digital Arrest", te: "డిజిటల్ అరెస్ట్", severity: "critical", icon: "🚨", counts: [3, 6, 9, 2, 7, 4] },
  { en: "Fake Govt Links", te: "నకిలీ ప్రభుత్వ లింకులు", severity: "high", icon: "🔗", counts: [8, 13, 5, 17, 10, 6] },
  { en: "Lottery Fraud", te: "లాటరీ మోసం", severity: "moderate", icon: "🎰", counts: [4, 7, 3, 9, 5, 11] },
  { en: "Aadhaar Misuse", te: "ఆధార్ దుర్వినియోగం", severity: "high", icon: "🪪", counts: [6, 3, 8, 5, 10, 4] },
  { en: "Fake Customer Care", te: "నకిలీ కస్టమర్ కేర్", severity: "moderate", icon: "☎️", counts: [9, 4, 12, 6, 3, 8] },
];

const HOURS_OPTIONS = [1, 2, 3, 5, 7, 11, 14, 18, 22, 26, 31, 38, 47];

/** Simple deterministic pseudo-random from a seed */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/** Returns 5 realistic community alert cards, rotating daily */
export function getCommunityAlerts(): CommunityAlert[] {
  const dayIndex = Math.floor(Date.now() / (24 * 60 * 60 * 1000));
  const rand = seededRandom(dayIndex * 31337);

  const usedDistricts = new Set<number>();
  const alerts: CommunityAlert[] = [];

  for (let i = 0; i < 5; i++) {
    // Pick a district not yet used
    let dIdx: number;
    do {
      dIdx = Math.floor(rand() * DISTRICTS.length);
    } while (usedDistricts.has(dIdx));
    usedDistricts.add(dIdx);

    const scamIdx = Math.floor(rand() * SCAM_TYPES.length);
    const scam = SCAM_TYPES[scamIdx];
    const countIdx = Math.floor(rand() * scam.counts.length);
    const hoursIdx = Math.floor(rand() * HOURS_OPTIONS.length);

    alerts.push({
      id: i + 1,
      district: DISTRICTS[dIdx].en,
      districtTe: DISTRICTS[dIdx].te,
      scamType: scam.en,
      scamTypeTe: scam.te,
      reportCount: scam.counts[countIdx],
      hoursAgo: HOURS_OPTIONS[hoursIdx],
      severity: scam.severity,
      icon: scam.icon,
    });
  }

  // Sort: most recent first
  return alerts.sort((a, b) => a.hoursAgo - b.hoursAgo);
}

/** Format "2 hours ago" / "Yesterday" */
export function formatTimeAgo(hoursAgo: number, lang: "en" | "te"): string {
  if (lang === "te") {
    if (hoursAgo < 2) return "1 గంట క్రితం";
    if (hoursAgo < 24) return `${hoursAgo} గంటల క్రితం`;
    if (hoursAgo < 48) return "నిన్న";
    return `${Math.floor(hoursAgo / 24)} రోజుల క్రితం`;
  }
  if (hoursAgo < 2) return "1 hour ago";
  if (hoursAgo < 24) return `${hoursAgo} hours ago`;
  if (hoursAgo < 48) return "Yesterday";
  return `${Math.floor(hoursAgo / 24)} days ago`;
}
