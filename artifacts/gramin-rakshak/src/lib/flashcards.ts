export type Flashcard = {
  id: number;
  scamType: string;
  scamTypeTe: string;
  icon: string;
  color: string; // Tailwind card bg
  accentColor: string; // Tailwind accent bar + badge
  textAccent: string; // Tailwind text color for accent
  script: string; // What the scammer says (EN)
  scriptTe: string; // What the scammer says (TE)
  redFlags: string[];
  redFlagsTe: string[];
  whatToDo: string;
  whatToDoTe: string;
};

export const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    scamType: "OTP Fraud",
    scamTypeTe: "OTP మోసం",
    icon: "📱",
    color: "bg-red-50",
    accentColor: "bg-red-500",
    textAccent: "text-red-600",
    script:
      '"Namaste, I am calling from SBI bank. Your account has been flagged for KYC non-compliance. It will be blocked in 24 hours unless you verify now. Please share the OTP just sent to your phone."',
    scriptTe:
      '"నమస్కారం, నేను SBI బ్యాంక్ నుండి మాట్లాడుతున్నాను. మీ అకౌంట్ KYC నిబంధన పాటించలేదు అని ఫ్లాగ్ అయింది. ఇప్పుడు వెరిఫై చేయకపోతే 24 గంటల్లో బ్లాక్ అవుతుంది. దయచేసి ఫోన్‌కు వచ్చిన OTP చెప్పండి."',
    redFlags: [
      "Banks NEVER call to ask for your OTP",
      "Urgency and threat of account blocking is a pressure tactic",
      "Legitimate bank calls come from official numbers, not private numbers",
    ],
    redFlagsTe: [
      "బ్యాంకులు ఎప్పుడూ OTP కోసం కాల్ చేయవు",
      "అకౌంట్ బ్లాక్ అవుతుందనే హడావిడి ఒక ఒత్తిడి వ్యూహం",
      "నిజమైన బ్యాంక్ కాల్‌లు అధికారిక నంబర్ల నుండి వస్తాయి",
    ],
    whatToDo: "Hang up immediately. Call your bank's official helpline (on the back of your card) to verify.",
    whatToDoTe: "వెంటనే ఫోన్ పెట్టేయండి. వెరిఫై చేయడానికి మీ కార్డు వెనక ఉన్న అధికారిక హెల్ప్‌లైన్‌కి కాల్ చేయండి.",
  },
  {
    id: 2,
    scamType: "Digital Arrest",
    scamTypeTe: "డిజిటల్ అరెస్ట్",
    icon: "🚨",
    color: "bg-purple-50",
    accentColor: "bg-purple-600",
    textAccent: "text-purple-700",
    script:
      '"This is CBI officer Sharma. A parcel registered in your name contains illegal items. You are under digital arrest. Do NOT disconnect this call or you will be physically arrested within the hour. Pay ₹50,000 to close this case quietly."',
    scriptTe:
      '"నేను CBI అధికారి శర్మ మాట్లాడుతున్నాను. మీ పేరు మీద నమోదు చేసిన పార్సెల్‌లో చట్టవిరుద్ధ వస్తువులు ఉన్నాయి. మీరు డిజిటల్ అరెస్ట్‌లో ఉన్నారు. ఈ కాల్ డిస్‌కనెక్ట్ చేయవద్దు. ₹50,000 చెల్లిస్తే ఈ కేసు నిశ్శబ్దంగా మూసేస్తాం."',
    redFlags: [
      '"Digital arrest" is not a real legal concept in India',
      "No govt agency conducts arrests or investigations over video calls",
      "Demanding immediate payment to 'close a case' is always a scam",
    ],
    redFlagsTe: [
      '"డిజిటల్ అరెస్ట్" భారతదేశంలో నిజమైన చట్టపరమైన భావన కాదు',
      "ఏ ప్రభుత్వ సంస్థా వీడియో కాల్‌లో అరెస్ట్‌లు లేదా విచారణలు నిర్వహించదు",
      "కేసు మూసేయడానికి తక్షణ చెల్లింపు అడగడం ఎల్లప్పుడూ మోసం",
    ],
    whatToDo: "Hang up. Note the number and report it to 1930. Tell your family immediately.",
    whatToDoTe: "ఫోన్ పెట్టేయండి. నంబర్ నమోదు చేసి 1930కి నివేదించండి. వెంటనే కుటుంబానికి చెప్పండి.",
  },
  {
    id: 3,
    scamType: "Fake Subsidy Link",
    scamTypeTe: "నకిలీ సబ్సిడీ లింక్",
    icon: "🔗",
    color: "bg-blue-50",
    accentColor: "bg-blue-600",
    textAccent: "text-blue-700",
    script:
      '"Good news! The government has released PM Kisan 18th installment early. Your ₹6,000 is ready. Click the link below and update your Aadhaar details to receive it directly. Offer valid for 24 hours only!"',
    scriptTe:
      '"శుభవార్త! ప్రభుత్వం PM కిసాన్ 18వ వాయిదా ముందుగా విడుదల చేసింది. మీ ₹6,000 సిద్ధంగా ఉంది. నేరుగా స్వీకరించడానికి దిగువ లింక్ క్లిక్ చేసి ఆధార్ వివరాలు అప్‌డేట్ చేయండి. ఆఫర్ 24 గంటలు మాత్రమే!"',
    redFlags: [
      "Government scheme money is deposited automatically — you never need to 'click a link'",
      "Time pressure ('24 hours only') is designed to stop you thinking clearly",
      "Asking for Aadhaar details via a WhatsApp link is always fraudulent",
    ],
    redFlagsTe: [
      "ప్రభుత్వ పథకం డబ్బు స్వయంచాలకంగా జమవుతుంది — మీరు ఎప్పుడూ 'లింక్ క్లిక్' చేయాల్సిన అవసరం లేదు",
      "సమయ ఒత్తిడి ('24 గంటలు మాత్రమే') మీరు స్పష్టంగా ఆలోచించకుండా ఆపడానికి రూపొందించబడింది",
      "WhatsApp లింక్ ద్వారా ఆధార్ వివరాలు అడగడం ఎల్లప్పుడూ మోసం",
    ],
    whatToDo: "Delete the message. Check your PM Kisan status only at pmkisan.gov.in or your bank.",
    whatToDoTe: "మెసేజ్ తొలగించండి. PM కిసాన్ స్థితిని pmkisan.gov.in లేదా మీ బ్యాంక్‌లో మాత్రమే తనిఖీ చేయండి.",
  },
  {
    id: 4,
    scamType: "UPI Collect Trick",
    scamTypeTe: "UPI కలెక్ట్ మోసం",
    icon: "💸",
    color: "bg-orange-50",
    accentColor: "bg-orange-500",
    textAccent: "text-orange-600",
    script:
      '"Hello, I saw your OLX listing. I am interested in buying your item. I am sending you ₹15,000 via UPI right now. You will get a request — just approve it and the money will be in your account immediately."',
    scriptTe:
      '"హలో, నేను మీ OLX లిస్టింగ్ చూశాను. మీ వస్తువు కొనడానికి ఆసక్తిగా ఉన్నాను. నేను ఇప్పుడే UPI ద్వారా ₹15,000 పంపుతున్నాను. మీకు ఒక రిక్వెస్ట్ వస్తుంది — అప్రూవ్ చేయండి, డబ్బు వెంటనే మీ అకౌంట్‌కు వస్తుంది."',
    redFlags: [
      "A UPI 'collect request' TAKES money from you — it never deposits money",
      "To receive money you need to do nothing — the sender sends it directly",
      "Anyone who says 'approve this request to receive money' is lying",
    ],
    redFlagsTe: [
      "UPI 'కలెక్ట్ రిక్వెస్ట్' మీ నుండి డబ్బు తీసుకుంటుంది — ఇది డబ్బు జమ చేయదు",
      "డబ్బు స్వీకరించడానికి మీరు ఏమీ చేయాల్సిన అవసరం లేదు — పంపేవాడు నేరుగా పంపుతాడు",
      "'డబ్బు స్వీకరించడానికి ఈ రిక్వెస్ట్ అప్రూవ్ చేయండి' అని చెప్పే వ్యక్తి అబద్ధం చెబుతున్నాడు",
    ],
    whatToDo: "Decline all UPI collect requests from unknown people. Sellers receive money — they never approve requests.",
    whatToDoTe: "తెలియని వ్యక్తుల నుండి అన్ని UPI కలెక్ట్ రిక్వెస్ట్‌లను తిరస్కరించండి. విక్రేతలు డబ్బు స్వీకరిస్తారు — వారు ఎప్పుడూ రిక్వెస్ట్‌లు అప్రూవ్ చేయరు.",
  },
  {
    id: 5,
    scamType: "Lottery Scam",
    scamTypeTe: "లాటరీ మోసం",
    icon: "🎰",
    color: "bg-amber-50",
    accentColor: "bg-amber-500",
    textAccent: "text-amber-600",
    script:
      '"Congratulations! Your mobile number has been selected in the KBC Lucky Draw. You have won ₹25 lakhs. To claim your prize, pay a small processing fee of ₹5,000 to our designated account. This is a one-time fee — after payment your prize will be released."',
    scriptTe:
      '"అభినందనలు! మీ మొబైల్ నంబర్ KBC లకీ డ్రా లో ఎంపికైంది. మీరు ₹25 లక్షలు గెలిచారు. మీ బహుమతి పొందడానికి, మా నిర్ణీత అకౌంట్‌కు ₹5,000 చిన్న ప్రాసెసింగ్ ఫీజు చెల్లించండి. ఇది ఒకే సారి — చెల్లింపు తర్వాత మీ బహుమతి విడుదల అవుతుంది."',
    redFlags: [
      "You cannot win a lottery you never entered",
      "Legitimate prizes never require you to pay fees to collect winnings",
      "After the first 'fee' they will keep asking for more — there is no prize",
    ],
    redFlagsTe: [
      "మీరు ఎప్పుడూ పాల్గొనని లాటరీలో గెలవలేరు",
      "చట్టబద్ధమైన బహుమతులు వసూలు చేయడానికి ఫీజు చెల్లించమని ఎప్పుడూ అడగవు",
      "మొదటి 'ఫీజు' తర్వాత వారు మళ్లీ మళ్లీ అడుగుతారు — బహుమతి అనేది లేదు",
    ],
    whatToDo: "Block and report the number. Never pay any fee to claim a 'prize'. Forward warning to family.",
    whatToDoTe: "నంబర్ బ్లాక్ చేసి నివేదించండి. 'బహుమతి' పొందడానికి ఎప్పుడూ ఫీజు చెల్లించకండి. కుటుంబానికి హెచ్చరిక పంపండి.",
  },
  {
    id: 6,
    scamType: "Fake Customer Care",
    scamTypeTe: "నకిలీ కస్టమర్ కేర్",
    icon: "☎️",
    color: "bg-teal-50",
    accentColor: "bg-teal-600",
    textAccent: "text-teal-700",
    script:
      '"Hello, this is Google Pay support. We noticed a failed transaction of ₹8,000 on your account. To reverse the issue and protect your account, please install AnyDesk on your phone so our technician can fix it remotely."',
    scriptTe:
      '"హలో, నేను Google Pay సపోర్ట్ మాట్లాడుతున్నాను. మీ అకౌంట్‌లో ₹8,000 విఫలమైన లావాదేవీ గమనించాం. సమస్యను రివర్స్ చేయడానికి మీ ఫోన్‌లో AnyDesk ఇన్‌స్టాల్ చేయండి, మా టెక్నీషియన్ రిమోట్‌గా పరిష్కరిస్తారు."',
    redFlags: [
      "No payment app ever calls you to fix a problem — you must contact them",
      "Remote access apps (AnyDesk, TeamViewer) give a stranger full control of your phone",
      "Real customer support NEVER asks you to install any app",
    ],
    redFlagsTe: [
      "ఏ చెల్లింపు యాప్ సమస్య పరిష్కరించడానికి మీకు కాల్ చేయదు — మీరే వారిని సంప్రదించాలి",
      "రిమోట్ యాక్సెస్ యాప్‌లు (AnyDesk, TeamViewer) మీ ఫోన్‌పై అపరిచితుడికి పూర్తి నియంత్రణ ఇస్తాయి",
      "నిజమైన కస్టమర్ సపోర్ట్ ఎప్పుడూ ఏదైనా యాప్ ఇన్‌స్టాల్ చేయమని అడగదు",
    ],
    whatToDo: "Hang up. Never install AnyDesk or similar apps for 'support'. Get official numbers from your app or card.",
    whatToDoTe: "ఫోన్ పెట్టేయండి. 'సపోర్ట్' కోసం AnyDesk లేదా అలాంటి యాప్‌లు ఎప్పుడూ ఇన్‌స్టాల్ చేయకండి. అధికారిక నంబర్లు మీ యాప్ లేదా కార్డు నుండి తీసుకోండి.",
  },
];
