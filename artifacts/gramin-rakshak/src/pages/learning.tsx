import { useState, useRef } from "react";
import { useGetTips } from "@workspace/api-client-react";
import { BookOpen, Search, Lock, Phone, CreditCard, ShieldCheck, AlertOctagon, ChevronDown, ChevronUp, CheckCircle2, Share2, Check, ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/language-context";
import { recordTipRead } from "@/lib/progress";
import { getScamOfWeek, getWeekLabel, buildShareText } from "@/lib/scam-of-week";
import { FLASHCARDS } from "@/lib/flashcards";

const RAW_CATEGORIES = ["All", "phishing", "upi", "aadhaar", "password", "whatsapp"];

export default function Learning() {
  const { tr, lang } = useLanguage();
  const { data: tips, isLoading } = useGetTips();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [scamExpanded, setScamExpanded] = useState(false);
  const [shareDone, setShareDone] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  function goToCard(idx: number) {
    const clamped = Math.max(0, Math.min(FLASHCARDS.length - 1, idx));
    setCardIdx(clamped);
    scrollRef.current?.children[clamped]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  const scam = getScamOfWeek();
  const weekLabel = getWeekLabel(lang);
  const scamTitle = lang === "te" ? scam.titleTe : scam.title;
  const scamTag = lang === "te" ? scam.tagTe : scam.tag;
  const scamCase = lang === "te" ? scam.caseDescTe : scam.caseDesc;
  const scamTips = lang === "te" ? scam.howToStaySafeTe : scam.howToStaySafe;

  async function handleShareScam() {
    const text = buildShareText(scam, lang);
    // Try native share (mobile)
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // user cancelled or not supported — fall through
      }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      setShareDone(true);
      setTimeout(() => setShareDone(false), 3000);
    } catch {
      // last resort: open WhatsApp web
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  }

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

          {/* Collapsed footer: Read more + Share */}
          {!scamExpanded && (
            <div className="mt-2 flex items-center justify-between">
              <button
                onClick={() => setScamExpanded(true)}
                className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                data-testid="button-scam-read-more"
              >
                {tr.scamOfWeekReadMore} <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleShareScam}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  shareDone
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-white/80 text-primary border border-primary/20 hover:bg-primary/5"
                }`}
                data-testid="button-scam-share"
              >
                {shareDone
                  ? <><Check className="w-3.5 h-3.5" /> {tr.scamOfWeekShared}</>
                  : <><Share2 className="w-3.5 h-3.5" /> {tr.scamOfWeekShare}</>}
              </button>
            </div>
          )}

          {/* Expanded footer: Share button */}
          {scamExpanded && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleShareScam}
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all shadow-sm ${
                  shareDone
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-white text-primary border border-primary/25 hover:bg-primary/5 hover:border-primary/40"
                }`}
                data-testid="button-scam-share-expanded"
              >
                {shareDone
                  ? <><Check className="w-4 h-4" /> {tr.scamOfWeekShared}</>
                  : <><Share2 className="w-4 h-4" /> {tr.scamOfWeekShare}</>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Know Your Scammer Flashcards ──────────────────── */}
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-bold text-foreground">{tr.flashcardsTitle}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{tr.flashcardsSubtitle}</p>
        </div>

        {/* Card carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const idx = Math.round(el.scrollLeft / el.offsetWidth);
            setCardIdx(idx);
          }}
        >
          {FLASHCARDS.map((card) => {
            const title = lang === "te" ? card.scamTypeTe : card.scamType;
            const script = lang === "te" ? card.scriptTe : card.script;
            const redFlags = lang === "te" ? card.redFlagsTe : card.redFlags;
            const whatToDo = lang === "te" ? card.whatToDoTe : card.whatToDo;

            return (
              <div
                key={card.id}
                className={`snap-center shrink-0 w-full rounded-2xl overflow-hidden border border-black/10 shadow-sm flex flex-col ${card.color}`}
              >
                {/* Accent top bar */}
                <div className={`h-1.5 w-full ${card.accentColor}`} />

                <div className="p-4 flex flex-col gap-3 flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl leading-none">{card.icon}</span>
                      <span className={`text-xs font-black uppercase tracking-wider ${card.textAccent}`}>{title}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {card.id} {tr.flashcardsOf} {FLASHCARDS.length}
                    </span>
                  </div>

                  {/* Script bubble */}
                  <div className="bg-white/80 rounded-xl p-3 border border-black/5 relative">
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1 ${card.textAccent}`}>
                      <span>💬</span> {tr.flashcardsScript}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed italic">{script}</p>
                    {/* Quote corner */}
                    <div className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center ${card.accentColor}`}>
                      <span className="text-white text-[10px] font-black">"</span>
                    </div>
                  </div>

                  {/* Red flags */}
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1 ${card.textAccent}`}>
                      <TriangleAlert className="w-3 h-3" /> {tr.flashcardsRedFlags}
                    </p>
                    <ul className="space-y-1.5">
                      {redFlags.map((flag, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500 font-black text-xs mt-0.5 shrink-0">🚩</span>
                          <span className="text-xs text-foreground leading-snug">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What to do */}
                  <div className={`rounded-xl p-3 border ${card.accentColor.replace("bg-", "border-")}/30 bg-white/60`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1 ${card.textAccent}`}>
                      <CheckCircle2 className="w-3 h-3" /> {tr.flashcardsWhatToDo}
                    </p>
                    <p className="text-sm text-foreground font-medium leading-snug">{whatToDo}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => goToCard(cardIdx - 1)}
            disabled={cardIdx === 0}
            className="flex items-center gap-1 text-xs font-semibold text-primary disabled:opacity-30 disabled:cursor-not-allowed px-2 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> {tr.flashcardsPrev}
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {FLASHCARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === cardIdx
                    ? "w-5 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Card ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToCard(cardIdx + 1)}
            disabled={cardIdx === FLASHCARDS.length - 1}
            className="flex items-center gap-1 text-xs font-semibold text-primary disabled:opacity-30 disabled:cursor-not-allowed px-2 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
          >
            {tr.flashcardsNext} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

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
          (Array.isArray(filteredTips) ? filteredTips : []).map((tip) => (
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
