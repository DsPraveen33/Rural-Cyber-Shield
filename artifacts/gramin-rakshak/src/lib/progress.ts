const STORAGE_KEY = "gr_progress_v1";

export type ProgressData = {
  quizzesTaken: number;
  lastQuizScore: number;
  tipsRead: number;
  readTipIds: number[];
  linksChecked: number;
  daysActive: number;
  lastActive: string;
};

export type SafetyLevel = {
  label: string;
  labelTe: string;
  score: number;
  color: string;
  bg: string;
  bar: string;
  emoji: string;
};

const DEFAULT: ProgressData = {
  quizzesTaken: 0,
  lastQuizScore: 0,
  tipsRead: 0,
  readTipIds: [],
  linksChecked: 0,
  daysActive: 0,
  lastActive: "",
};

export function getProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage unavailable
  }
}

function bumpDayIfNew(data: ProgressData): ProgressData {
  const today = new Date().toISOString().slice(0, 10);
  if (data.lastActive === today) return data;
  return { ...data, daysActive: data.daysActive + 1, lastActive: today };
}

export function recordQuizScore(percentage: number): void {
  let d = getProgress();
  d = bumpDayIfNew(d);
  d.quizzesTaken = d.quizzesTaken + 1;
  d.lastQuizScore = percentage;
  saveProgress(d);
}

export function recordTipRead(tipId: number): void {
  let d = getProgress();
  if (d.readTipIds.includes(tipId)) return;
  d = bumpDayIfNew(d);
  d.readTipIds = [...d.readTipIds, tipId];
  d.tipsRead = d.readTipIds.length;
  saveProgress(d);
}

export function recordLinkChecked(): void {
  let d = getProgress();
  d = bumpDayIfNew(d);
  d.linksChecked = d.linksChecked + 1;
  saveProgress(d);
}

export function calcScore(d: ProgressData): number {
  const quizPart = d.quizzesTaken > 0 ? d.lastQuizScore * 0.40 : 0;
  const tipsPart = Math.min(d.tipsRead / 5, 1) * 30;
  const linksPart = Math.min(d.linksChecked / 3, 1) * 15;
  const daysPart = Math.min(d.daysActive / 5, 1) * 15;
  return Math.round(quizPart + tipsPart + linksPart + daysPart);
}

export function getSafetyLevel(score: number): SafetyLevel {
  if (score >= 75) {
    return {
      label: "Cyber Champion",
      labelTe: "సైబర్ చాంపియన్",
      score,
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      bar: "bg-emerald-500",
      emoji: "🏆",
    };
  }
  if (score >= 50) {
    return {
      label: "Village Guardian",
      labelTe: "గ్రామ రక్షకుడు",
      score,
      color: "text-primary",
      bg: "bg-primary/5 border-primary/15",
      bar: "bg-primary",
      emoji: "🛡️",
    };
  }
  if (score >= 25) {
    return {
      label: "Safety Learner",
      labelTe: "సురక్షత విద్యార్థి",
      score,
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      bar: "bg-amber-500",
      emoji: "📚",
    };
  }
  return {
    label: "New Guard",
    labelTe: "నూతన రక్షకుడు",
    score,
    color: "text-muted-foreground",
    bg: "bg-muted/30 border-border/50",
    bar: "bg-muted-foreground/40",
    emoji: "🌱",
  };
}
