export type ScamEntry = {
  id: number;
  tag: string;
  tagTe: string;
  title: string;
  titleTe: string;
  caseDesc: string;
  caseDescTe: string;
  howToStaySafe: string[];
  howToStaySafeTe: string[];
  icon: string;
  color: string; // Tailwind bg/border classes
  accentColor: string;
};

export const SCAMS: ScamEntry[] = [
  {
    id: 1,
    tag: "OTP FRAUD",
    tagTe: "OTP మోసం",
    title: "Fake Bank KYC OTP Scam",
    titleTe: "నకిలీ బ్యాంక్ KYC OTP మోసం",
    caseDesc:
      "A farmer in Nellore received a call from someone claiming to be from SBI. The caller said his account would be blocked unless he completed KYC by sharing the OTP sent to his phone. He shared it — and ₹48,000 was transferred out within minutes.",
    caseDescTe:
      "నెల్లూరులో ఒక రైతుకి SBI నుండి అని చెప్పుకుంటూ ఒక వ్యక్తి కాల్ చేశాడు. KYC పూర్తి చేయకపోతే అకౌంట్ బ్లాక్ అవుతుందని, ఫోన్‌కు వచ్చిన OTP చెప్పమని అడిగాడు. అతను OTP చెప్పాడు — కొన్ని నిమిషాల్లో ₹48,000 ట్రాన్స్‌ఫర్ అయిపోయింది.",
    howToStaySafe: [
      "Banks NEVER ask for OTP over a phone call — hang up immediately.",
      "KYC updates are done only at the bank branch or the bank's official app.",
      "If you receive such a call, report it to 1930 right away.",
    ],
    howToStaySafeTe: [
      "బ్యాంకులు ఎప్పుడూ ఫోన్‌లో OTP అడగవు — వెంటనే ఫోన్ పెట్టేయండి.",
      "KYC అప్‌డేట్‌లు బ్యాంక్ బ్రాంచ్‌లో లేదా అధికారిక యాప్‌లో మాత్రమే చేయబడతాయి.",
      "ఇలాంటి కాల్ వస్తే వెంటనే 1930కి నివేదించండి.",
    ],
    icon: "📱",
    color: "bg-red-50 border-red-200",
    accentColor: "bg-red-500",
  },
  {
    id: 2,
    tag: "UPI FRAUD",
    tagTe: "UPI మోసం",
    title: "Fake Collect Request Scam",
    titleTe: "నకిలీ కలెక్ట్ రిక్వెస్ట్ మోసం",
    caseDesc:
      "A woman in Vijayawada was selling a buffalo on OLX. A buyer called and said he would pay via UPI, sending a 'collect request'. She approved it thinking she was receiving money — but instead ₹12,000 was debited from her account.",
    caseDescTe:
      "విజయవాడలో ఒక మహిళ OLX లో గేదెను అమ్మడానికి పెట్టింది. కొనుగోలుదారు UPI ద్వారా చెల్లిస్తానని 'కలెక్ట్ రిక్వెస్ట్' పంపాడు. ఆమె డబ్బు వస్తుందని అనుకుని అప్రూవ్ చేసింది — కానీ ₹12,000 ఆమె అకౌంట్ నుండి డెబిట్ అయింది.",
    howToStaySafe: [
      "To RECEIVE money on UPI, you never need to enter your PIN or approve a request.",
      "A 'collect request' always takes money FROM you — never approve unless you know why.",
      "Legitimate buyers will simply send money directly; they never send collect requests.",
    ],
    howToStaySafeTe: [
      "UPI లో డబ్బు స్వీకరించడానికి మీరు ఎప్పుడూ PIN నమోదు చేయాల్సిన అవసరం లేదు.",
      "'కలెక్ట్ రిక్వెస్ట్' ఎల్లప్పుడూ మీ నుండి డబ్బు తీసుకుంటుంది — ఎందుకో తెలియకుండా అప్రూవ్ చేయకండి.",
      "చట్టబద్ధమైన కొనుగోలుదారులు నేరుగా డబ్బు పంపుతారు; వారు కలెక్ట్ రిక్వెస్ట్‌లు పంపరు.",
    ],
    icon: "💸",
    color: "bg-orange-50 border-orange-200",
    accentColor: "bg-orange-500",
  },
  {
    id: 3,
    tag: "PHISHING",
    tagTe: "ఫిషింగ్",
    title: "Fake Government Subsidy Link",
    titleTe: "నకిలీ ప్రభుత్వ సబ్సిడీ లింక్",
    caseDesc:
      "Farmers across Andhra Pradesh received a WhatsApp message claiming: 'PM Kisan 18th installment released — click link to update Aadhaar and get ₹6,000.' The link opened a fake government site that stole Aadhaar and bank details.",
    caseDescTe:
      "ఆంధ్రప్రదేశ్‌లో రైతులకు WhatsApp మెసేజ్ వచ్చింది: 'PM కిసాన్ 18వ వాయిదా విడుదల — ₹6,000 పొందడానికి ఆధార్ అప్‌డేట్ చేయడానికి లింక్ క్లిక్ చేయండి.' లింక్ నకిలీ ప్రభుత్వ సైట్ తెరిచి ఆధార్ మరియు బ్యాంక్ వివరాలు దొంగిలించింది.",
    howToStaySafe: [
      "Government schemes never require you to click a WhatsApp link to receive payments.",
      "Check official scheme status only at pmkisan.gov.in or your bank directly.",
      "Paste any suspicious link into Gramin Mitra's Check Link tab before clicking.",
    ],
    howToStaySafeTe: [
      "ప్రభుత్వ పథకాలు చెల్లింపులు స్వీకరించడానికి WhatsApp లింక్ క్లిక్ చేయమని ఎప్పుడూ అడగవు.",
      "అధికారిక పథకాల స్థితిని pmkisan.gov.in లో లేదా నేరుగా మీ బ్యాంక్‌లో మాత్రమే తనిఖీ చేయండి.",
      "ఏదైనా అనుమానాస్పద లింక్‌ను క్లిక్ చేయడానికి ముందు గ్రామీణ మిత్ర చెక్ లింక్ ట్యాబ్‌లో పేస్ట్ చేయండి.",
    ],
    icon: "🔗",
    color: "bg-blue-50 border-blue-200",
    accentColor: "bg-blue-500",
  },
  {
    id: 4,
    tag: "DIGITAL ARREST",
    tagTe: "డిజిటల్ అరెస్ట్",
    title: "Fake CBI Video Call Arrest Threat",
    titleTe: "నకిలీ CBI వీడియో కాల్ అరెస్ట్ బెదిరింపు",
    caseDesc:
      "An elderly man in Hyderabad received a video call from someone in a police uniform claiming to be a CBI officer. He was told a parcel in his name contained drugs. To 'avoid arrest', he paid ₹2.4 lakh via UPI over two days.",
    caseDescTe:
      "హైదరాబాద్‌లో ఒక వృద్ధుడికి పోలీస్ యూనిఫాం ధరించిన వ్యక్తి నుండి CBI అధికారి అని చెప్పుకుంటూ వీడియో కాల్ వచ్చింది. అతని పేరు మీద పార్సెల్‌లో డ్రగ్స్ ఉన్నాయని చెప్పారు. 'అరెస్ట్ నివారించడానికి' అతను రెండు రోజుల్లో UPI ద్వారా ₹2.4 లక్షలు చెల్లించాడు.",
    howToStaySafe: [
      "No real government agency arrests people over a video call — this is always a scam.",
      "If threatened, hang up and immediately call 1930 or your local police station.",
      "Never pay anyone to 'avoid arrest' — legitimate legal processes never work this way.",
    ],
    howToStaySafeTe: [
      "ఏ నిజమైన ప్రభుత్వ సంస్థా వీడియో కాల్‌లో వ్యక్తులను అరెస్ట్ చేయదు — ఇది ఎల్లప్పుడూ మోసం.",
      "బెదిరింపు వస్తే, ఫోన్ పెట్టేసి వెంటనే 1930 లేదా స్థానిక పోలీస్ స్టేషన్‌కు కాల్ చేయండి.",
      "'అరెస్ట్ నివారించడానికి' ఎవరికీ చెల్లించకండి — చట్టపరమైన ప్రక్రియలు ఇలా జరగవు.",
    ],
    icon: "🚨",
    color: "bg-purple-50 border-purple-200",
    accentColor: "bg-purple-500",
  },
  {
    id: 5,
    tag: "LOTTERY FRAUD",
    tagTe: "లాటరీ మోసం",
    title: "KBC Lottery WhatsApp Scam",
    titleTe: "KBC లాటరీ WhatsApp మోసం",
    caseDesc:
      "A villager in Guntur received a WhatsApp message saying his number had won ₹25 lakh in the KBC lottery. To claim the prize, he was asked to pay 'processing fees' of ₹5,000. He paid — and was then asked for more fees repeatedly until he lost ₹23,000 total.",
    caseDescTe:
      "గుంటూరులో ఒక గ్రామస్థుడికి WhatsApp మెసేజ్ వచ్చింది, KBC లాటరీలో అతని నంబర్ ₹25 లక్షలు గెలిచిందని. బహుమతి పొందడానికి ₹5,000 'ప్రాసెసింగ్ ఫీజు' చెల్లించమని అడిగారు. అతను చెల్లించాడు — ఆ తర్వాత మళ్లీ మళ్లీ ఫీజులు అడిగి మొత్తం ₹23,000 కోల్పోయాడు.",
    howToStaySafe: [
      "If you never entered a lottery, you cannot have won one — it's always a scam.",
      "Legitimate prizes never ask you to pay fees upfront to receive winnings.",
      "Block and report such WhatsApp numbers immediately.",
    ],
    howToStaySafeTe: [
      "మీరు లాటరీలో పాల్గొనకపోతే, మీరు గెలవలేరు — ఇది ఎల్లప్పుడూ మోసం.",
      "చట్టబద్ధమైన బహుమతులు గెలుపులు స్వీకరించడానికి ముందస్తు ఫీజు చెల్లించమని ఎప్పుడూ అడగవు.",
      "అటువంటి WhatsApp నంబర్లను వెంటనే బ్లాక్ చేసి నివేదించండి.",
    ],
    icon: "🎰",
    color: "bg-amber-50 border-amber-200",
    accentColor: "bg-amber-500",
  },
  {
    id: 6,
    tag: "FAKE CUSTOMER CARE",
    tagTe: "నకిలీ కస్టమర్ కేర్",
    title: "Google Search Fake Helpline Trap",
    titleTe: "Google శోధన నకిలీ హెల్ప్‌లైన్ మోసం",
    caseDesc:
      "A woman in Karimnagar Googled her bank's customer care number. The first result showed a fake number. The 'executive' asked her to install AnyDesk for 'remote assistance' — then drained her account of ₹67,000 while she watched.",
    caseDescTe:
      "కరీంనగర్‌లో ఒక మహిళ Google లో తన బ్యాంక్ కస్టమర్ కేర్ నంబర్ వెతికింది. మొదటి ఫలితం నకిలీ నంబర్ చూపించింది. 'ఎగ్జిక్యూటివ్' 'రిమోట్ అసిస్టెన్స్' కోసం AnyDesk ఇన్‌స్టాల్ చేయమని అడిగాడు — ఆమె చూస్తుండగానే ₹67,000 అకౌంట్ నుండి తీసుకెళ్ళాడు.",
    howToStaySafe: [
      "Always get your bank's helpline number from the back of your debit/credit card or passbook.",
      "Never install remote access apps (AnyDesk, TeamViewer) for bank support — banks never ask this.",
      "Ignore all customer care numbers found on Google — they may be fake.",
    ],
    howToStaySafeTe: [
      "మీ బ్యాంక్ హెల్ప్‌లైన్ నంబర్ ఎల్లప్పుడూ డెబిట్/క్రెడిట్ కార్డ్ వెనుక లేదా పాస్‌బుక్ నుండి తీసుకోండి.",
      "బ్యాంక్ సపోర్ట్ కోసం రిమోట్ యాక్సెస్ యాప్‌లు (AnyDesk, TeamViewer) ఇన్‌స్టాల్ చేయకండి.",
      "Google లో కనుగొన్న అన్ని కస్టమర్ కేర్ నంబర్లను వదిలేయండి — అవి నకిలీవి కావచ్చు.",
    ],
    icon: "☎️",
    color: "bg-teal-50 border-teal-200",
    accentColor: "bg-teal-500",
  },
  {
    id: 7,
    tag: "AADHAAR FRAUD",
    tagTe: "ఆధార్ మోసం",
    title: "Aadhaar-Enabled Payment Drain",
    titleTe: "ఆధార్ ద్వారా చెల్లింపు మోసం",
    caseDesc:
      "A shopkeeper in Srikakulam allowed a stranger to use his fingerprint on a 'micro-ATM' device, thinking it was for a survey. His Aadhaar-linked bank account was debited ₹10,000 via AEPS (Aadhaar Enabled Payment System) within seconds.",
    caseDescTe:
      "శ్రీకాకుళంలో ఒక దుకాణదారుడు తన వేలిముద్రను సర్వే అని చెప్పి 'మైక్రో-ATM' పరికరంపై ఒక అపరిచితుడికి ఉపయోగించనిచ్చాడు. AEPS (ఆధార్ ఎనేబుల్డ్ పేమెంట్ సిస్టమ్) ద్వారా కొన్ని సెకన్లలో అతని ఆధార్ లింక్డ్ బ్యాంక్ అకౌంట్ నుండి ₹10,000 డెబిట్ అయింది.",
    howToStaySafe: [
      "Never give your fingerprint to anyone for any reason except official government/bank services.",
      "Lock your Aadhaar biometrics at uidai.gov.in or the mAadhaar app when not in use.",
      "AEPS fraudsters target rural areas — warn your neighbours.",
    ],
    howToStaySafeTe: [
      "అధికారిక ప్రభుత్వ/బ్యాంక్ సేవలు తప్ప ఏ కారణం చేతనైనా మీ వేలిముద్రను ఎవరికీ ఇవ్వకండి.",
      "వాడకంలో లేనప్పుడు uidai.gov.in లేదా mAadhaar యాప్‌లో మీ ఆధార్ బయోమెట్రిక్స్ లాక్ చేయండి.",
      "AEPS మోసగాళ్ళు గ్రామీణ ప్రాంతాలను లక్ష్యంగా చేసుకుంటారు — మీ పొరుగువారిని హెచ్చరించండి.",
    ],
    icon: "🪪",
    color: "bg-indigo-50 border-indigo-200",
    accentColor: "bg-indigo-500",
  },
];

/** Pick this week's scam deterministically using ISO week number */
export function getScamOfWeek(): ScamEntry {
  const now = new Date();
  // ISO week number: days since epoch / 7
  const weekIndex = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
  return SCAMS[weekIndex % SCAMS.length];
}

/** Human-readable week label e.g. "Week of Jun 9, 2026" */
export function getWeekLabel(lang: "en" | "te"): string {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday of this week
  const monday = new Date(now.setDate(diff));
  const formatted = monday.toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return lang === "te" ? `వారం: ${formatted}` : `Week of ${formatted}`;
}
