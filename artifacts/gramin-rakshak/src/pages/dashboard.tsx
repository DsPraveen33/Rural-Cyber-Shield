import { useUserStore, BADGE_DEFINITIONS, LEVELS } from "@/lib/user-store";
import { useLanguage } from "@/lib/language-context";
import { Shield, Award, Activity as ActivityIcon, CheckCircle2, Search, Video, FileText, Flame, Snowflake, TrendingUp, Zap } from "lucide-react";
import CertificateGenerator from "@/components/dashboard/certificate-generator";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";

export default function Dashboard() {
  const { tr } = useLanguage();
  const { 
    xp, 
    level, 
    badges, 
    activityHistory, 
    completedQuizzes, 
    watchedVideos, 
    scamReports, 
    linksChecked,
    currentStreak,
    longestStreak,
    streakFreezes,
    getStreakStatus
  } = useUserStore();

  const getProgressToNextLevel = () => {
    const currentIndex = LEVELS.findIndex(l => l.level === level.level);
    const nextLevel = LEVELS[currentIndex + 1];
    
    if (!nextLevel) return { percentage: 100, label: "Max Rank Achieved!", next: null, remaining: 0 };
    
    const range = nextLevel.minXp - level.minXp;
    const currentProgress = xp - level.minXp;
    const percentage = Math.min(100, Math.max(0, (currentProgress / range) * 100));
    
    return {
      percentage,
      label: `${nextLevel.minXp - xp} XP to ${nextLevel.name}`,
      next: nextLevel,
      remaining: nextLevel.minXp - xp
    };
  };

  const progress = getProgressToNextLevel();
  const streakStatus = getStreakStatus();

  // Process data for charts
  const processChartData = () => {
    const last7Days = Array.from({length: 7}).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        dateStr: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        xp: 0
      };
    });

    activityHistory.forEach(act => {
      const actDate = act.date.split('T')[0];
      const day = last7Days.find(d => d.dateStr === actDate);
      if (day) day.xp += act.xp;
    });

    return last7Days;
  };

  const chartData = processChartData();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Profile & Streak Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-4xl border-4 border-primary/20 shrink-0">
            {level.level === 6 ? "🏆" : level.level >= 4 ? "🛡️" : level.level >= 2 ? "🔍" : "🌱"}
          </div>
          <div className="flex-1 space-y-2 w-full">
            <h1 className="text-2xl font-black text-foreground">Cyber Security Profile</h1>
            <p className="text-muted-foreground font-medium flex justify-center md:justify-start items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> 
              Lvl {level.level}: <span className="text-primary font-bold">{level.name}</span>
            </p>
            
            <div className="pt-3 w-full">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-primary flex items-center gap-1"><Zap className="w-3.5 h-3.5 fill-current" /> {xp} XP</span>
                <span className="text-muted-foreground">{progress.label}</span>
              </div>
              <div className="h-4 bg-primary/10 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 relative"
                  style={{ width: `${progress.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Duolingo Style Streak Widget */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-5 ${streakStatus === 'active' ? 'text-orange-500' : 'text-gray-300'}`}>
            <Flame className="w-full h-full" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center space-y-1">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow-inner ${streakStatus === 'active' ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-400'}`}>
              <Flame className={`w-8 h-8 ${streakStatus === 'active' ? 'fill-current' : ''}`} />
            </div>
            <h3 className="text-3xl font-black">{currentStreak}</h3>
            <span className="text-sm font-bold text-muted-foreground tracking-wide uppercase">Day Streak</span>
            
            <div className="flex items-center gap-3 mt-3 pt-3 border-t w-full justify-center">
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1" title="Longest Streak">
                <TrendingUp className="w-3.5 h-3.5" /> Best: {longestStreak}
              </div>
              <div className="w-px h-3 bg-border"></div>
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1" title="Streak Freezes Available">
                <Snowflake className="w-3.5 h-3.5 text-blue-400" /> Freezes: {streakFreezes}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weekly Activity Chart */}
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="font-bold flex items-center gap-2"><ActivityIcon className="w-5 h-5 text-primary" /> XP Activity (Last 7 Days)</h2>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                <XAxis dataKey="dayName" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="xp" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.xp > 0 ? 'hsl(var(--primary))' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-emerald-200 transition-colors">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mb-1"><CheckCircle2 className="w-5 h-5" /></div>
            <span className="text-2xl font-black">{completedQuizzes.length}</span>
            <span className="text-xs text-muted-foreground font-bold">Quizzes Passed</span>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-blue-200 transition-colors">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mb-1"><Video className="w-5 h-5" /></div>
            <span className="text-2xl font-black">{watchedVideos.length}</span>
            <span className="text-xs text-muted-foreground font-bold">Videos Watched</span>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-amber-200 transition-colors">
            <div className="bg-amber-100 text-amber-600 p-2 rounded-lg mb-1"><Search className="w-5 h-5" /></div>
            <span className="text-2xl font-black">{linksChecked}</span>
            <span className="text-xs text-muted-foreground font-bold">Links Checked</span>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-red-200 transition-colors">
            <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-1"><FileText className="w-5 h-5" /></div>
            <span className="text-2xl font-black">{scamReports}</span>
            <span className="text-xs text-muted-foreground font-bold">Scams Reported</span>
          </div>
        </div>

      </div>

      {/* Badges Earned */}
      <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> Achievement Badges</h2>
          <span className="text-xs font-bold text-muted-foreground">{badges.length} / {BADGE_DEFINITIONS.length} Unlocked</span>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {BADGE_DEFINITIONS.map((def) => {
            const earned = badges.some(b => b.id === def.id);
            return (
              <div key={def.id} className={`p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${earned ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-muted/30 border-dashed opacity-50 grayscale'}`}>
                <span className="text-3xl">{def.icon}</span>
                <div>
                  <div className="text-xs font-bold leading-tight">{def.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <CertificateGenerator userName="Cyber Guardian" score={xp} badge={level.name} />
      </div>

    </div>
  );
}
