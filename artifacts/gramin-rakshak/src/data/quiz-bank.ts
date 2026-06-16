import { Question } from "@/components/quiz/quiz-engine";

export const MASTER_QUIZ_BANK: Record<string, Question[]> = {
  Beginner: [
    {
      id: "b_1",
      text: "You receive an SMS saying 'Your electricity will be disconnected tonight. Update your bill here'. What should you do?",
      options: [
        "Click the link to pay immediately",
        "Call the number in the SMS to clarify",
        "Ignore the message; it's a scam",
        "Forward it to your friends"
      ],
      correctIndex: 2,
      explanation: "Electricity boards never send disconnection warnings with payment links via SMS. It is a common phishing scam."
    },
    {
      id: "b_2",
      text: "What is a 'Digital Arrest'?",
      options: [
        "A real process where police arrest you via video call",
        "A scam where fraudsters pretend to be police on a video call to extort money",
        "A feature on modern smartphones to lock apps",
        "A new government policy for online offenders"
      ],
      correctIndex: 1,
      explanation: "Digital Arrest is a fake term used by scammers to scare victims into paying money. Real police will never arrest or interrogate you via Skype/WhatsApp."
    },
    {
      id: "b_3",
      text: "You want to receive money from a friend on PhonePe. Do you need to enter your UPI PIN?",
      options: [
        "Yes, to verify my account",
        "Yes, if the amount is above Rs. 10,000",
        "No, PIN is only required to SEND money",
        "Yes, but only the first 4 digits"
      ],
      correctIndex: 2,
      explanation: "Your UPI PIN is ONLY used to authorize money LEAVING your account. Never enter a PIN to receive money."
    },
    {
      id: "b_4",
      text: "You get a call offering a 'Zero Interest Loan' under a PM Yojana, but they ask for a Rs. 1000 registration fee. What is this?",
      options: [
        "A great opportunity",
        "A standard bank procedure",
        "An advance fee scam",
        "A government tax"
      ],
      correctIndex: 2,
      explanation: "Legitimate loans never require an upfront 'registration fee'. Fraudsters use government scheme names to build trust."
    },
    {
      id: "b_5",
      text: "Why should you never share an OTP (One Time Password) with anyone on a phone call?",
      options: [
        "It might expire faster",
        "It gives them access to your money or accounts",
        "It is illegal to share numbers",
        "It will block your SIM card"
      ],
      correctIndex: 1,
      explanation: "OTP is your final security key. Scammers need it to complete unauthorized transactions from your account."
    }
  ],
  Intermediate: [
    {
      id: "i_1",
      text: "Someone calls claiming your Aadhaar card was found in a suspicious parcel containing drugs. They demand money to 'settle' the case. What do you do?",
      options: [
        "Pay the money to avoid police trouble",
        "Give them your bank details to verify your identity",
        "Disconnect the call and report it on the National Cyber Crime portal",
        "Argue with them on the phone"
      ],
      correctIndex: 2,
      explanation: "This is a parcel scam. Law enforcement agencies never demand money over the phone to settle criminal cases."
    },
    {
      id: "i_2",
      text: "A WhatsApp message offers a job 'liking YouTube videos' for Rs. 5000 a day. After you do a few tasks, they ask you to 'invest' to unlock premium tasks. What is this?",
      options: [
        "A legitimate multi-level marketing job",
        "A Task Fraud scam",
        "A YouTube promotional campaign",
        "A standard gig-economy job"
      ],
      correctIndex: 1,
      explanation: "Task frauds bait victims with small initial payments, then trap them into 'investing' large sums which they never get back."
    },
    {
      id: "i_3",
      text: "What does the 'S' in HTTPS stand for in a website URL?",
      options: [
        "System",
        "Software",
        "Secure",
        "Standard"
      ],
      correctIndex: 2,
      explanation: "HTTPS means Hypertext Transfer Protocol Secure. It ensures the communication between your browser and the website is encrypted."
    },
    {
      id: "i_4",
      text: "You find a customer care number for your bank through a Google search. When you call, they ask you to download 'AnyDesk'. Should you do it?",
      options: [
        "Yes, it helps them fix the issue faster",
        "Yes, it is a standard banking app",
        "No, it is a screen-sharing app that lets them see your passwords and OTPs",
        "Yes, but only if they promise to be quick"
      ],
      correctIndex: 2,
      explanation: "Scammers manipulate Google search results to show fake customer care numbers. AnyDesk gives them full control over your phone."
    },
    {
      id: "i_5",
      text: "What is 'Phishing'?",
      options: [
        "A type of computer virus that deletes files",
        "A scam where fraudsters send fake emails or links to steal login credentials",
        "A secure way to transfer money",
        "A tool used to block spam calls"
      ],
      correctIndex: 1,
      explanation: "Phishing involves tricking users into revealing sensitive information by pretending to be a trustworthy entity."
    }
  ],
  Advanced: [
    {
      id: "a_1",
      text: "What is 'SIM Swapping'?",
      options: [
        "Changing your mobile network provider",
        "When a scammer tricks your telecom provider into issuing a new SIM card with your number, gaining access to your OTPs",
        "Using two SIM cards in one phone",
        "Transferring contacts from one SIM to another"
      ],
      correctIndex: 1,
      explanation: "In a SIM swap, the fraudster takes over your mobile number. Your phone loses signal, and they receive all your banking OTPs."
    },
    {
      id: "a_2",
      text: "You receive an email from your company's CEO urgently requesting you to buy iTunes gift cards for a client. What kind of attack is this?",
      options: [
        "Ransomware",
        "Business Email Compromise (BEC) / Spear Phishing",
        "DDoS Attack",
        "SQL Injection"
      ],
      correctIndex: 1,
      explanation: "Fraudsters spoof or compromise executive emails to trick employees into sending money or gift cards."
    },
    {
      id: "a_3",
      text: "Why is using Public Wi-Fi for banking transactions dangerous?",
      options: [
        "The bank's app might crash",
        "Hackers on the same network can intercept your data through 'Man-in-the-Middle' attacks",
        "It consumes too much battery",
        "The transaction fee is higher"
      ],
      correctIndex: 1,
      explanation: "Public Wi-Fi is often unsecured, allowing attackers to sniff network traffic and steal login credentials or session cookies."
    },
    {
      id: "a_4",
      text: "What is the primary purpose of Two-Factor Authentication (2FA)?",
      options: [
        "To make your password twice as long",
        "To require a second form of verification (like an OTP or authenticator app) beyond just a password",
        "To let you log in from two devices simultaneously",
        "To encrypt your hard drive"
      ],
      correctIndex: 1,
      explanation: "2FA adds an extra layer of security, meaning even if a hacker steals your password, they still cannot access your account without the second factor."
    },
    {
      id: "a_5",
      text: "A website prompts you to allow notifications. Later, you get system alerts saying your PC is infected with 5 viruses and you must click to clean them. This is an example of:",
      options: [
        "Legitimate Antivirus software",
        "Scareware / Malvertising",
        "A zero-day exploit",
        "A botnet"
      ],
      correctIndex: 1,
      explanation: "Scareware uses fake alarming pop-ups to trick you into downloading actual malware or paying for useless 'cleaning' software."
    }
  ]
};

// Seeded random number generator for Daily Quizzes
function randomSeed(seed: number) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function generateDailyQuiz(date: Date) {
  // Use YYYYMMDD as a seed so everyone gets the same questions on the same day
  const seedStr = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const seed = parseInt(seedStr, 10);
  
  // Pick 5 random questions across all levels
  const allQs = [...MASTER_QUIZ_BANK.Beginner, ...MASTER_QUIZ_BANK.Intermediate, ...MASTER_QUIZ_BANK.Advanced];
  
  // Shuffle based on seed
  let shuffled = [...allQs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomSeed(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return {
    id: `daily_${seedStr}`,
    title: "Daily Cyber Challenge",
    description: "Your dynamic daily challenge. Test your knowledge against the latest threats to earn XP and build your streak!",
    level: "Intermediate" as const,
    questions: shuffled.slice(0, 5),
    isWeekly: false
  };
}

export function generateWeeklyChallenge(date: Date) {
  // Use Year and Week Number as seed
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  
  const seedStr = `${date.getFullYear()}${weekNo}`;
  const seed = parseInt(seedStr, 10);
  
  // Pick 10 harder questions
  const allQs = [...MASTER_QUIZ_BANK.Intermediate, ...MASTER_QUIZ_BANK.Advanced, ...MASTER_QUIZ_BANK.Beginner];
  
  let shuffled = [...allQs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(randomSeed(seed + i * 2) * (i + 1)); // Different seed multiplier
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return {
    id: `weekly_${seedStr}`,
    title: "Weekly Master Challenge",
    description: "A tougher 10-question challenge. Complete it to earn a massive 50 XP boost!",
    level: "Advanced" as const,
    questions: shuffled.slice(0, 10),
    isWeekly: true
  };
}
