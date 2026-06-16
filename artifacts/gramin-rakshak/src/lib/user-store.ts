import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
};

export type Activity = {
  id: string;
  action: string;
  xp: number;
  date: string;
};

export type UserLevel = {
  level: number;
  name: string;
  minXp: number;
};

export const LEVELS: UserLevel[] = [
  { level: 1, name: "Beginner", minXp: 0 },
  { level: 2, name: "Aware Citizen", minXp: 150 },
  { level: 3, name: "Scam Spotter", minXp: 350 },
  { level: 4, name: "Cyber Defender", minXp: 700 },
  { level: 5, name: "Cyber Guardian", minXp: 1200 },
  { level: 6, name: "Rural Cyber Champion", minXp: 2000 },
];

export type UserState = {
  xp: number;
  level: UserLevel;
  badges: Badge[];
  
  // Quiz & Content Tracking
  completedQuizzes: string[];
  totalCorrectAnswers: number;
  watchedVideos: string[];
  aiVideosWatched: string[];
  scamReports: number;
  linksChecked: number;
  aiScenariosGenerated: number;
  
  // Streak System
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  streakFreezes: number; // Max 1 per month
  lastFreezeUsedMonth: string | null;
  
  // History
  activityHistory: Activity[];

  // Actions
  addXp: (xp: number, actionDescription: string) => void;
  recordActivity: () => void;
  markQuizCompleted: (quizId: string, isWeekly: boolean, correctAnswers: number) => void;
  markVideoWatched: (videoId: string) => void;
  markAiVideoWatched: (aiVideoId: string) => void;
  incrementScamReports: () => void;
  incrementLinksChecked: () => void;
  incrementAiScenarios: () => void;
  checkAchievements: () => void;
  getStreakStatus: () => "active" | "frozen" | "lost";
};

export const BADGE_DEFINITIONS = [
  { id: "first_quiz", name: "First Steps", description: "Completed your first quiz", icon: "🌱", condition: (s: UserState) => s.completedQuizzes.length >= 1 },
  { id: "100_correct", name: "Knowledge Master", description: "Answered 100 questions correctly", icon: "🎯", condition: (s: UserState) => s.totalCorrectAnswers >= 100 },
  { id: "first_report", name: "Vigilant Citizen", description: "Submitted first scam report", icon: "🚨", condition: (s: UserState) => s.scamReports >= 1 },
  { id: "50_links", name: "Link Inspector", description: "Checked 50 suspicious links", icon: "🔍", condition: (s: UserState) => s.linksChecked >= 50 },
  { id: "first_ai", name: "AI Explorer", description: "Generated first AI Awareness Scenario", icon: "🤖", condition: (s: UserState) => s.aiScenariosGenerated >= 1 },
  { id: "streak_7", name: "Cyber Learner", description: "7-Day Streak", icon: "🔥", condition: (s: UserState) => s.longestStreak >= 7 },
  { id: "streak_15", name: "Cyber Protector", description: "15-Day Streak", icon: "🛡️", condition: (s: UserState) => s.longestStreak >= 15 },
  { id: "streak_30", name: "Cyber Warrior", description: "30-Day Streak", icon: "⚔️", condition: (s: UserState) => s.longestStreak >= 30 },
  { id: "streak_60", name: "Digital Guardian", description: "60-Day Streak", icon: "🏰", condition: (s: UserState) => s.longestStreak >= 60 },
  { id: "streak_100", name: "Cyber Champion", description: "100-Day Streak", icon: "🏆", condition: (s: UserState) => s.longestStreak >= 100 },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: LEVELS[0],
      badges: [],
      completedQuizzes: [],
      totalCorrectAnswers: 0,
      watchedVideos: [],
      aiVideosWatched: [],
      scamReports: 0,
      linksChecked: 0,
      aiScenariosGenerated: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      streakFreezes: 1,
      lastFreezeUsedMonth: null,
      activityHistory: [],

      getStreakStatus: () => {
        const state = get();
        if (!state.lastActivityDate) return "lost";
        
        const today = new Date();
        const lastActivity = new Date(state.lastActivityDate);
        today.setHours(0,0,0,0);
        lastActivity.setHours(0,0,0,0);
        
        const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 3600 * 24));
        
        if (diffDays === 0) return "active"; // Already active today
        if (diffDays === 1) return "active"; // Active from yesterday
        return "lost"; // Missed more than 1 day
      },

      recordActivity: () => {
        const state = get();
        const todayStr = new Date().toISOString().split("T")[0];
        const currentMonth = todayStr.substring(0, 7); // YYYY-MM
        
        // Reset freeze count monthly
        if (state.lastFreezeUsedMonth !== currentMonth) {
          set({ streakFreezes: 1 });
        }

        if (state.lastActivityDate === todayStr) return; // Already recorded today
        
        const today = new Date();
        const lastActivity = state.lastActivityDate ? new Date(state.lastActivityDate) : null;
        if (lastActivity) lastActivity.setHours(0,0,0,0);
        today.setHours(0,0,0,0);

        let newStreak = state.currentStreak;
        let freezes = state.streakFreezes;
        let freezeUsedMonth = state.lastFreezeUsedMonth;

        if (lastActivity) {
          const diffDays = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 3600 * 24));
          
          if (diffDays === 1) {
            // Consecutive day
            newStreak += 1;
          } else if (diffDays === 2 && freezes > 0) {
            // Missed one day but have a freeze
            freezes -= 1;
            freezeUsedMonth = currentMonth;
            newStreak += 1;
            toast.info("Streak Freeze Activated! 🧊 You didn't lose your streak.");
          } else if (diffDays > 1) {
            // Missed more days, streak lost
            newStreak = 1;
            toast.error("Oh no! Your streak was broken. 🔥 Start again!");
          }
        } else {
          newStreak = 1; // First day
        }

        const newLongest = Math.max(state.longestStreak, newStreak);
        
        set({ 
          lastActivityDate: todayStr, 
          currentStreak: newStreak, 
          longestStreak: newLongest,
          streakFreezes: freezes,
          lastFreezeUsedMonth: freezeUsedMonth
        });

        // Award daily login & streak bonuses
        let bonusXp = 5; // Base Daily Login
        if (newStreak === 1) bonusXp += 5;
        if (newStreak === 3) bonusXp += 15;
        if (newStreak > 3) bonusXp += Math.min(newStreak, 20); // Cap daily streak bonus

        state.addXp(bonusXp, `Daily Login + Streak Bonus (${newStreak} Days)`);
      },

      addXp: (xpToAdd, actionDescription) => {
        const state = get();
        const newXp = state.xp + xpToAdd;
        
        // Determine new level
        let newLevel = state.level;
        for (let i = LEVELS.length - 1; i >= 0; i--) {
          if (newXp >= LEVELS[i].minXp) {
            if (LEVELS[i].level > state.level.level) {
              newLevel = LEVELS[i];
              toast.success(`🎉 Level Up! You are now a ${newLevel.name}!`);
            }
            break;
          }
        }

        set((s) => ({
          xp: newXp,
          level: newLevel,
          activityHistory: [
            {
              id: Date.now().toString(),
              action: actionDescription,
              xp: xpToAdd,
              date: new Date().toISOString(),
            },
            ...s.activityHistory,
          ].slice(0, 100), // Keep last 100 for better charts
        }));
        
        get().checkAchievements();
      },

      markQuizCompleted: (quizId, isWeekly, correctAnswers) => {
        const state = get();
        get().recordActivity();
        
        set((s) => ({ 
          totalCorrectAnswers: s.totalCorrectAnswers + correctAnswers,
          completedQuizzes: s.completedQuizzes.includes(quizId) ? s.completedQuizzes : [...s.completedQuizzes, quizId]
        }));
        
        const xpReward = isWeekly ? 50 : 20;
        state.addXp(xpReward, isWeekly ? "Completed Weekly Challenge" : `Completed Daily Quiz: ${quizId}`);
      },

      markVideoWatched: (videoId) => {
        const state = get();
        get().recordActivity();
        if (!state.watchedVideos.includes(videoId)) {
          set((s) => ({ watchedVideos: [...s.watchedVideos, videoId] }));
          state.addXp(10, `Completed Awareness Video`);
        }
      },

      markAiVideoWatched: (aiVideoId) => {
        const state = get();
        get().recordActivity();
        if (!state.aiVideosWatched.includes(aiVideoId)) {
          set((s) => ({ aiVideosWatched: [...s.aiVideosWatched, aiVideoId] }));
          state.addXp(15, `Completed AI Simulated Video`);
        }
      },

      incrementScamReports: () => {
        get().recordActivity();
        set((state) => ({ scamReports: state.scamReports + 1 }));
        get().addXp(25, "Submitted Scam Report");
      },

      incrementLinksChecked: () => {
        get().recordActivity();
        set((state) => ({ linksChecked: state.linksChecked + 1 }));
        get().addXp(10, "Checked Suspicious Link");
      },

      incrementAiScenarios: () => {
        get().recordActivity();
        set((state) => ({ aiScenariosGenerated: state.aiScenariosGenerated + 1 }));
        get().addXp(15, "Generated AI Cyber Scenario");
      },

      checkAchievements: () => {
        const state = get();
        const earnedBadgeIds = state.badges.map(b => b.id);
        
        for (const def of BADGE_DEFINITIONS) {
          if (!earnedBadgeIds.includes(def.id) && def.condition(state)) {
            set((s) => ({
              badges: [
                ...s.badges,
                {
                  id: def.id,
                  name: def.name,
                  description: def.description,
                  icon: def.icon,
                  earnedAt: new Date().toISOString(),
                }
              ]
            }));
            toast.success(`🏆 Achievement Unlocked: ${def.name}!`);
          }
        }
      },
    }),
    {
      name: "gramin-mitra-advanced-gamification",
    }
  )
);
