import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useGetCommunityStats, useGetThreats, useGetDailyTip, useGetReports } from "@workspace/api-client-react";
import { Bot, ArrowRight, Activity, Users, ShieldAlert, Phone, TrendingUp, HelpCircle, BookOpen, Search as SearchIcon, Bell, X, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { getProgress, calcScore, getSafetyLevel, daysSinceLastActive, type ProgressData } from "@/lib/progress";
import { getCommunityAlerts, formatTimeAgo, type AlertSeverity } from "@/lib/community-alerts";

export default function Home() {
  const { tr, lang } = useLanguage();
  const { data: stats, isLoading: statsLoading } = useGetCommunityStats();
  const { data: threats, isLoading: threatsLoading } = useGetThreats();
  const { data: dailyTip, isLoading: tipLoading } = useGetDailyTip();
  const { data: reportsData } = useGetReports();

  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [daysAway, setDaysAway] = useState(0);

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    const days = daysSinceLastActive();
    if (days >= 3) {
      setDaysAway(days);
      setShowBanner(true);
    }
    const onFocus = () => setProgress(getProgress());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const score = progress ? calcScore(progress) : 0;
  const level = getSafetyLevel(score);
  const hasActivity = progress && (progress.quizzesTaken > 0 || progress.tipsRead > 0 || progress.linksChecked > 0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-[#ba1a1a] text-white';
      case 'moderate': return 'bg-[#773900] text-white';
      case 'monitor': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertAccent = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return { border: 'border-red-300', bg: 'bg-red-50', bar: 'bg-red-500', badge: 'bg-red-500 text-white', dot: 'bg-red-500' };
      case 'high': return { border: 'border-orange-300', bg: 'bg-orange-50', bar: 'bg-orange-500', badge: 'bg-orange-500 text-white', dot: 'bg-orange-500' };
      case 'moderate': return { border: 'border-amber-300', bg: 'bg-amber-50', bar: 'bg-amber-500', badge: 'bg-amber-600 text-white', dot: 'bg-amber-500' };
      case 'monitor': return { border: 'border-blue-300', bg: 'bg-blue-50', bar: 'bg-blue-500', badge: 'bg-blue-500 text-white', dot: 'bg-blue-400' };
      default: return { border: 'border-gray-300', bg: 'bg-gray-50', bar: 'bg-gray-500', badge: 'bg-gray-500 text-white', dot: 'bg-gray-400' };
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return tr.communityAlertsSeverityCritical;
      case 'high': return tr.communityAlertsSeverityHigh;
      case 'moderate': return tr.communityAlertsSeverityModerate;
      case 'monitor': return tr.communityAlertsSeverityMonitor;
      default: return "WARNING";
    }
  };

  const communityAlerts = getCommunityAlerts();

  const statItems = [
    { icon: <HelpCircle className="w-4 h-4" />, value: progress?.quizzesTaken ?? 0, label: tr.myScoreQuizzes, max: 3 },
    { icon: <BookOpen className="w-4 h-4" />, value: progress?.tipsRead ?? 0, label: tr.myScoreTips, max: 5 },
    { icon: <SearchIcon className="w-4 h-4" />, value: progress?.linksChecked ?? 0, label: tr.myScoreLinks, max: 3 },
    { icon: <Activity className="w-4 h-4" />, value: progress?.daysActive ?? 0, label: tr.myScoreDays, max: 5 },
  ];

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Re-engagement reminder banner */}
      {showBanner && (
        <div className="relative bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm animate-in slide-in-from-top-2 duration-400 overflow-hidden">
          {/* Accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-l-2xl" />

          <div className="pl-3">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-1.5 rounded-lg">
                  <Bell className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-bold text-foreground text-sm">{tr.reminderTitle}</span>
                  <span className="text-xs text-amber-700 font-medium ml-2">
                    {daysAway} {tr.reminderDays}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
                aria-label={tr.reminderDismiss}
                data-testid="button-dismiss-reminder"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tr.reminderBody}</p>

            <div className="flex gap-2 flex-wrap">
              <Link href="/quiz">
                <button
                  onClick={() => setShowBanner(false)}
                  className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary/90 active:scale-95 transition-all"
                  data-testid="button-reminder-quiz"
                >
                  <HelpCircle className="w-3 h-3" />
                  {tr.reminderQuiz}
                </button>
              </Link>
              <Link href="/mitra">
                <button
                  onClick={() => setShowBanner(false)}
                  className="inline-flex items-center gap-1.5 bg-white border border-amber-300 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-amber-50 active:scale-95 transition-all"
                  data-testid="button-reminder-check-link"
                >
                  <SearchIcon className="w-3 h-3" />
                  {tr.reminderCheckLink}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Community Stats */}
      <section className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <h2 className="text-xl font-bold mb-1">{tr.communityTitle}</h2>
        <p className="text-primary-foreground/80 text-sm mb-6">{tr.communitySubtitle}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-card-foreground flex flex-col items-center justify-center relative">
            {statsLoading ? (
              <Skeleton className="w-16 h-16 rounded-full" />
            ) : (
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-muted fill-none" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40"
                    className="stroke-secondary fill-none"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (stats?.safetyScore || 0)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-bold text-xl">{stats?.safetyScore || 0}%</span>
              </div>
            )}
            <span className="text-xs font-semibold mt-2 text-muted-foreground">{tr.safetyScore}</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-primary-foreground/70">{tr.awareness}</p>
                {statsLoading ? (
                  <Skeleton className="w-12 h-4 mt-1 bg-white/20" />
                ) : (
                  <p className="font-semibold text-sm">{stats?.awarenessCount} {tr.trained}</p>
                )}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
              <Activity className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-primary-foreground/70">{tr.readiness}</p>
                {statsLoading ? (
                  <Skeleton className="w-12 h-4 mt-1 bg-white/20" />
                ) : (
                  <p className="font-semibold text-sm">{stats?.readinessPercent}%</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── My Safety Score ──────────────────────────────────── */}
      <section>
        <Card className={`border ${level.bg} shadow-sm overflow-hidden`}>
          {/* Score bar at top */}
          <div className="h-1.5 w-full bg-black/10">
            <div
              className={`h-full transition-all duration-700 ${level.bar}`}
              style={{ width: `${score}%` }}
            />
          </div>

          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-5 h-5 ${level.color}`} />
                <span className="font-bold text-foreground text-base">{tr.myScoreTitle}</span>
              </div>
              <span className={`text-xs font-medium ${level.color}`}>{tr.myScoreSubtitle}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              {/* Score ring */}
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" className="fill-none stroke-black/10" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="38"
                    className={`fill-none transition-all duration-700 ${level.bar.replace("bg-", "stroke-")}`}
                    strokeWidth="10"
                    strokeDasharray="238.76"
                    strokeDashoffset={238.76 - (238.76 * score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-black text-xl text-foreground leading-none">{score}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">/100</span>
                </div>
              </div>

              {/* Level badge + message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-lg">{level.emoji}</span>
                  <span className={`font-bold text-sm ${level.color}`}>
                    {lang === "te" ? level.labelTe : level.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {hasActivity ? tr.myScoreImprove : tr.myScoreStart}
                </p>
              </div>
            </div>

            {/* Activity mini-stats */}
            <div className="grid grid-cols-4 gap-2">
              {statItems.map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-white/60 rounded-xl py-2 px-1 gap-0.5 border border-black/5">
                  <div className={`${level.color} opacity-70`}>{item.icon}</div>
                  <span className="font-black text-base text-foreground leading-none">{item.value}</span>
                  <span className="text-[9px] text-muted-foreground font-medium text-center leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

          </CardContent>
        </Card>
      </section>

      {/* ── Community Alerts ──────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">{tr.communityAlertsTitle}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{tr.communityAlertsSubtitle}</p>
          </div>
          <Link href="/report" className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shrink-0 hover:bg-primary/20 transition-colors">
            Report Scam
          </Link>
        </div>

        <div className="space-y-2.5">
          {(!Array.isArray(reportsData) || reportsData.length === 0) ? communityAlerts.map((alert) => {
            const accent = getAlertAccent(alert.severity);
            return (
              <div key={alert.id} className={`rounded-xl border ${accent.border} ${accent.bg} overflow-hidden flex`}>
                <div className={`w-1 shrink-0 ${accent.bar}`} />
                <div className="flex items-center gap-3 px-3 py-2.5 w-full min-w-0">
                  <div className="relative shrink-0">
                    <span className="text-2xl leading-none">{alert.icon}</span>
                    <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${accent.dot} animate-pulse`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm ${accent.badge}`}>
                        {getSeverityLabel(alert.severity)}
                      </span>
                      <span className="text-xs font-bold text-foreground truncate">
                        {lang === "te" ? alert.scamTypeTe : alert.scamType}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {lang === "te" ? alert.districtTe : alert.district}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <span className="text-foreground font-bold">{alert.reportCount}</span>
                        &nbsp;{tr.communityAlertsCases}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="whitespace-nowrap">{formatTimeAgo(alert.hoursAgo, lang)}</span>
                  </div>
                </div>
              </div>
            );
          }) : reportsData.map((report) => {
            const accent = getAlertAccent(report.severity as any);
            const hoursAgo = Math.max(1, Math.floor((new Date().getTime() - new Date(report.createdAt).getTime()) / (1000 * 60 * 60)));
            const scamTypeLower = (report.scamType || "").toLowerCase();
            const icon = scamTypeLower.includes("upi") ? "💸" : scamTypeLower.includes("otp") ? "💬" : "⚠️";
            
            return (
              <div key={report.id} className={`rounded-xl border ${accent.border} ${accent.bg} overflow-hidden flex`}>
                <div className={`w-1 shrink-0 ${accent.bar}`} />
                <div className="flex items-center gap-3 px-3 py-2.5 w-full min-w-0">
                  <div className="relative shrink-0">
                    <span className="text-2xl leading-none">{icon}</span>
                    <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${accent.dot} animate-pulse`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm ${accent.badge}`}>
                        {getSeverityLabel(report.severity as any)}
                      </span>
                      <span className="text-xs font-bold text-foreground truncate">
                        {report.scamType}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {report.district}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <span className="text-foreground font-bold">1</span>
                        &nbsp;{tr.communityAlertsCases}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="whitespace-nowrap">{formatTimeAgo(hoursAgo, lang)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Tip */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">{tr.tipOfTheDay}</h2>
        </div>
        {tipLoading ? (
          <Skeleton className="w-full h-32 rounded-2xl" />
        ) : dailyTip ? (
          <Card className="border-primary/20 bg-accent/20 shadow-none">
            <CardContent className="p-5 flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit text-primary shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{dailyTip.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{dailyTip.body}</p>
                <Badge variant="outline" className="bg-white">{dailyTip.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      {/* Common Threats */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">{tr.recentThreats}</h2>
          <Link href="/learning" className="text-sm text-primary font-medium flex items-center gap-1">
            {tr.learnMore} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {threatsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-24 rounded-xl" />
            ))
          ) : (threats || []).slice(0, 3).map((threat) => (
            <Card key={threat.id} className="overflow-hidden shadow-sm">
              <div className="flex border-l-4" style={{ borderColor: threat.severity === 'critical' ? 'hsl(var(--destructive))' : threat.severity === 'high' ? '#ba1a1a' : 'hsl(var(--secondary))' }}>
                <CardContent className="p-4 w-full flex items-start gap-4">
                  <div className="bg-muted p-2 rounded-lg shrink-0">
                    <ShieldAlert className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">{threat.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{threat.description}</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Action - Helpline */}
      <section>
        <a href="tel:1930" className="block w-full bg-destructive text-destructive-foreground rounded-2xl p-5 shadow-md hover:bg-destructive/90 transition-colors active:scale-[0.98] transform">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{tr.cyberHelpline}</h3>
              <p className="text-destructive-foreground/90 text-sm font-medium">{tr.tapToCall}</p>
            </div>
          </div>
        </a>
      </section>
    </div>
  );
}
