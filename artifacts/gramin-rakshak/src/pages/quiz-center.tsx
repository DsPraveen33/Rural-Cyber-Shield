import { useState, useEffect } from "react";
import { useUserStore } from "@/lib/user-store";
import { Target, CheckCircle2, PlayCircle, ShieldCheck, Calendar, Flame } from "lucide-react";
import QuizEngine, { QuizData } from "@/components/quiz/quiz-engine";
import { generateDailyQuiz, generateWeeklyChallenge } from "@/data/quiz-bank";

export default function QuizCenter() {
  const { completedQuizzes } = useUserStore();
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  
  const [dailyQuiz, setDailyQuiz] = useState<QuizData | null>(null);
  const [weeklyQuiz, setWeeklyQuiz] = useState<QuizData | null>(null);

  useEffect(() => {
    // Generate exactly once on mount to prevent hydration/render mismatches
    const today = new Date();
    setDailyQuiz(generateDailyQuiz(today));
    setWeeklyQuiz(generateWeeklyChallenge(today));
  }, []);

  if (activeQuiz) {
    return (
      <div className="py-4">
        <QuizEngine quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />
      </div>
    );
  }

  const isDailyCompleted = dailyQuiz && completedQuizzes.includes(dailyQuiz.id);
  const isWeeklyCompleted = weeklyQuiz && completedQuizzes.includes(weeklyQuiz.id);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl font-black flex items-center gap-2"><Target className="w-6 h-6" /> Cyber Quiz Center</h1>
          <p className="text-blue-100 font-medium max-w-md leading-relaxed">
            Test your knowledge against real-world scams. Complete daily challenges to maintain your streak and earn massive XP!
          </p>
        </div>
        <Target className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12" />
      </div>

      {/* Dynamic Challenges Section */}
      <h2 className="font-bold text-xl flex items-center gap-2 mt-8">
        <Flame className="w-5 h-5 text-orange-500" /> Active Challenges
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Daily Challenge */}
        {dailyQuiz && (
          <div className={`rounded-xl border p-5 shadow-sm transition-all hover:shadow-md flex flex-col relative overflow-hidden ${isDailyCompleted ? 'border-emerald-200 bg-emerald-50/50' : 'bg-white border-orange-200'}`}>
            {!isDailyCompleted && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500" />}
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-100 text-orange-700 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Today's Challenge
              </span>
              {isDailyCompleted && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{dailyQuiz.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{dailyQuiz.description}</p>
            
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> +20 XP
              </span>
              <button 
                onClick={() => setActiveQuiz(dailyQuiz)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isDailyCompleted 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                    : 'bg-orange-500 text-white shadow-sm hover:bg-orange-600'
                }`}
              >
                <PlayCircle className="w-4 h-4" /> {isDailyCompleted ? 'Review' : 'Start Daily Quiz'}
              </button>
            </div>
          </div>
        )}

        {/* Weekly Challenge */}
        {weeklyQuiz && (
          <div className={`rounded-xl border p-5 shadow-sm transition-all hover:shadow-md flex flex-col relative overflow-hidden ${isWeeklyCompleted ? 'border-emerald-200 bg-emerald-50/50' : 'bg-white border-purple-200'}`}>
            {!isWeeklyCompleted && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />}
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 flex items-center gap-1">
                <Target className="w-3 h-3" /> Weekly Master
              </span>
              {isWeeklyCompleted && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{weeklyQuiz.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{weeklyQuiz.description}</p>
            
            <div className="pt-4 border-t flex justify-between items-center">
              <span className="text-xs font-bold text-purple-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> +50 XP
              </span>
              <button 
                onClick={() => setActiveQuiz(weeklyQuiz)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isWeeklyCompleted 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                    : 'bg-purple-600 text-white shadow-sm hover:bg-purple-700'
                }`}
              >
                <PlayCircle className="w-4 h-4" /> {isWeeklyCompleted ? 'Review' : 'Start Weekly Challenge'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
