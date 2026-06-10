import { useState } from "react";
import { useGetTips } from "@workspace/api-client-react";
import { BookOpen, Search, Lock, Phone, CreditCard, ShieldCheck, AlertOctagon, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { recordTipRead } from "@/lib/progress";
import { getScamOfWeek, getWeekLabel } from "@/lib/scam-of-week";

const RAW_CATEGORIES = ["All", "phishing", "upi", "aadhaar", "password", "whatsapp"];

export default function Learning() {
  const { tr, lang } = useLanguage();
  const { data: tips, isLoading } = useGetTips();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [scamExpanded, setScamExpanded] = useState(false);

  const scam = getScamOfWeek();
  const weekLabel = getWeekLabel(lang);
  const scamTitle = lang === "te" ? scam.titleTe : scam.title;
  const scamTag = lang === "te" ? scam.tagTe : scam.tag;
  const scamCase = lang === "te" ? scam.caseDescTe : scam.caseDesc;
  const scamTips = lang === "te" ? scam.howToStaySafeTe : scam.howToStaySafe;

  const filteredTips = tips?.filter(tip => {
    const matchesCategory = activeCategory === "All" || tip.category === activeCategory;
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'phishing': return <Search className="w-5 h-5 text-blue-500" />;
      case 'upi': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'aadhaar': return <Lock className="w-5 h-5 text-amber-500" />;
      case 'password': return <ShieldCheck className="w-5 h-5 text-purple-500" />;
      case 'whatsapp': return <Phone className="w-5 h-5 text-emerald-500" />;
      default: return <BookOpen className="w-5 h-5 text-primary" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "All": return tr.catAll;
      case "phishing": return tr.catPhishing;
      case "upi": return tr.catUpi;
      case "aadhaar": return tr.catAadhaar;
      case "password": return tr.catPassword;
      case "whatsapp": return tr.catWhatsapp;
      default: return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">{tr.learningTitle}</h1>
        <p className="text-muted-foreground text-sm">{tr.learningSubtitle}</p>
      </div>

      {/* ── Scam of the Week ──────────────────────────────── */}
      <div className={`rounded-2xl border-2 overflow-hidden shadow-sm ${scam.color}`}>
        {/* Top accent bar */}
        <div className={`h-1.5 w-full ${scam.accentColor}`} />

        <div className="p-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-2xl leading-none">{scam.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white ${scam.accentColor}`}>
                  {tr.scamOfWeekLabel}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">{weekLabel}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <AlertOctagon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{scamTag}</span>
              </div>
              <h3 className="font-bold text-foreground text-base mt-1 leading-snug">{scamTitle}</h3>
            </div>
            <button
              onClick={() => setScamExpanded(v => !v)}
              className="shrink-0 p-1.5 rounded-full hover:bg-black/5 transition-colors mt-1"
              aria-label={scamExpanded ? "Collapse" : "Expand"}
              data-testid="button-scam-toggle"
            >
              {scamExpanded
                ? <ChevronUp className="w-5 h-5 text-muted-foreground" />
                : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>
          </div>

          {/* Collapsed preview — first sentence */}
          {!scamExpanded && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {scamCase}
            </p>
          )}

          {/* Expanded content */}
          {scamExpanded && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
              {/* Real case */}
              <div className="bg-white/70 rounded-xl p-3 border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5">{tr.scamOfWeekCaseTitle}</p>
                <p className="text-sm text-foreground leading-relaxed">{scamCase}</p>
              </div>

              {/* How to stay safe */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  {tr.scamOfWeekHowTo}
                </p>
                <ul className="space-y-2">
                  {scamTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-[10px] font-black ${scam.accentColor}`}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tap to expand hint */}
          {!scamExpanded && (
            <button
              onClick={() => setScamExpanded(true)}
              className="mt-2 text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
              data-testid="button-scam-read-more"
            >
              Read more <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="font-semibold text-sm text-foreground">{tr.yourProgress}</h3>
            <p className="text-xs text-muted-foreground">{tr.beginnerGuardian}</p>
          </div>
          <span className="font-bold text-primary">30%</span>
        </div>
        <Progress value={30} className="h-2 bg-primary/20 [&>div]:bg-primary" />
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={tr.searchLessons}
            className="pl-9 bg-white border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-lessons"
          />
        </div>

        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2 scrollbar-none">
          {RAW_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              data-testid={`button-category-${category}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-white border border-border/50 text-foreground hover:bg-muted"
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-32 rounded-xl" />
          ))
        ) : filteredTips?.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-border/50">
            <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="font-semibold text-foreground">{tr.noLessonsFound}</h3>
            <p className="text-sm text-muted-foreground">{tr.tryDifferentSearch}</p>
          </div>
        ) : (
          filteredTips?.map((tip) => (
            <div
              key={tip.id}
              data-testid={`card-tip-${tip.id}`}
              onClick={() => recordTipRead(tip.id)}
              className="bg-white rounded-xl p-4 shadow-sm border border-border/50 flex gap-4 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="bg-muted w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                {getCategoryIcon(tip.category)}
              </div>
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className="bg-accent/50 text-primary hover:bg-accent/50 mb-1 rounded-sm text-[10px] px-1.5 py-0">
                  {tip.category.toUpperCase()}
                </Badge>
                <h4 className="font-semibold text-foreground text-sm mb-1 truncate">{tip.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{tip.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
