import { useState, useRef, useEffect } from "react";
import { useSendChatMessage, useCheckLink } from "@workspace/api-client-react";
import {
  Bot, Send, Shield, Link2, Lock, Flag, HelpCircle, User,
  CheckCircle2, AlertTriangle, XCircle, Search, RotateCcw, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";

type Message = {
  id: string;
  role: "ai" | "user";
  text: string;
  actions?: string[];
};

type Verdict = "safe" | "suspicious" | "dangerous";

type LinkResult = {
  url: string;
  verdict: Verdict;
  explanation: string;
  signals: string[];
};

const VERDICT_CONFIG = {
  safe: {
    icon: <CheckCircle2 className="w-8 h-8" />,
    bg: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon_bg: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-500",
  },
  suspicious: {
    icon: <AlertTriangle className="w-8 h-8" />,
    bg: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    icon_bg: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
  },
  dangerous: {
    icon: <XCircle className="w-8 h-8" />,
    bg: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800 border-red-300",
    icon_bg: "bg-red-100 text-red-700",
    bar: "bg-red-500",
  },
};

export default function Mitra() {
  const { tr, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"chat" | "check">("chat");

  // ── Chat state ──────────────────────────────────────────────
  const SUGGESTED_ACTIONS = [
    { icon: <Link2 className="w-4 h-4" />, label: tr.actionCheckLink },
    { icon: <Lock className="w-4 h-4" />, label: tr.actionLockAadhaar },
    { icon: <Flag className="w-4 h-4" />, label: tr.actionReportFraud },
    { icon: <HelpCircle className="w-4 h-4" />, label: tr.actionSafetyQuiz },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", text: tr.mitraGreeting }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sendMessage = useSendChatMessage();

  useEffect(() => {
    setMessages(prev =>
      prev.length === 1 && prev[0].id === "1"
        ? [{ id: "1", role: "ai", text: tr.mitraGreeting }]
        : prev
    );
  }, [tr.mitraGreeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sendMessage.isPending]);

  const handleSend = (text: string = input) => {
    if (!text.trim() || sendMessage.isPending) return;
    // If user taps "Check Link" quick action, switch to check tab
    if (text === tr.actionCheckLink) {
      setActiveTab("check");
      return;
    }
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    sendMessage.mutate(
      { data: { message: text, language: lang } },
      {
        onSuccess: (data) => {
          setMessages(prev => [
            ...prev,
            { id: Date.now().toString(), role: "ai", text: data.reply, actions: data.suggestedActions },
          ]);
        },
        onError: () => {
          setMessages(prev => [
            ...prev,
            { id: Date.now().toString(), role: "ai", text: tr.mitraError },
          ]);
        }
      }
    );
  };

  // ── Check Link state ─────────────────────────────────────────
  const [linkInput, setLinkInput] = useState("");
  const [linkResult, setLinkResult] = useState<LinkResult | null>(null);
  const checkLink = useCheckLink();
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCheckLink = () => {
    if (!linkInput.trim() || checkLink.isPending) return;
    setLinkResult(null);
    checkLink.mutate(
      { data: { url: linkInput.trim(), language: lang } },
      {
        onSuccess: (data) => {
          setLinkResult(data as LinkResult);
          setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        },
        onError: () => {
          setLinkResult({
            url: linkInput.trim(),
            verdict: "suspicious",
            explanation: tr.mitraError,
            signals: [],
          });
        }
      }
    );
  };

  const resetCheck = () => {
    setLinkInput("");
    setLinkResult(null);
  };

  // ── Shared header ─────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-3 flex items-center gap-3 shrink-0">
        <div className="bg-primary text-primary-foreground p-2 rounded-full">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-foreground">{tr.mitraTitle}</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="w-3 h-3 text-secondary" /> {tr.mitraSecure}
          </p>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex bg-muted/40 rounded-xl p-1 mb-3 shrink-0 gap-1">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "chat"
              ? "bg-white text-primary shadow-sm border border-border/40"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-testid="tab-chat"
        >
          <Bot className="w-4 h-4" />
          {tr.chatTab}
        </button>
        <button
          onClick={() => setActiveTab("check")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "check"
              ? "bg-white text-primary shadow-sm border border-border/40"
              : "text-muted-foreground hover:text-foreground"
          }`}
          data-testid="tab-check-link"
        >
          <Search className="w-4 h-4" />
          {tr.checkLinkTab}
        </button>
      </div>

      {/* ── CHAT TAB ─────────────────────────────────────────── */}
      {activeTab === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-2 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="shrink-0 mt-auto mb-1">
                    {msg.role === 'user' ? (
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-primary">
                        <User className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className={`px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#0f4c81] text-white rounded-br-sm'
                        : 'bg-[#e6f6ff] text-foreground rounded-bl-sm border border-[#c7dde9]'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(action)}
                            className="bg-white border border-primary/20 text-primary text-xs px-3 py-1.5 rounded-full font-medium shadow-sm hover:bg-primary/5 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {sendMessage.isPending && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="shrink-0 mt-auto mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-[#e6f6ff] rounded-bl-sm border border-[#c7dde9] flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && !sendMessage.isPending && (
            <div className="grid grid-cols-2 gap-2 mb-4 shrink-0">
              {SUGGESTED_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.label)}
                  data-testid={`button-quick-action-${i}`}
                  className="flex items-center gap-2 bg-white border border-border/50 p-2.5 rounded-xl shadow-sm text-sm font-medium text-foreground hover:bg-muted active:scale-[0.98] transition-all"
                >
                  <div className="bg-accent/30 p-1.5 rounded-lg text-primary">{action.icon}</div>
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div className="shrink-0 flex gap-2 items-center bg-white p-2 rounded-full shadow-md border border-border/50 mt-auto">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={tr.mitraPlaceholder}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 shadow-none px-4 text-base"
              disabled={sendMessage.isPending}
              data-testid="input-mitra-message"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || sendMessage.isPending}
              className="rounded-full w-10 h-10 p-0 shrink-0"
              data-testid="button-mitra-send"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </>
      )}

      {/* ── CHECK LINK TAB ─────────────────────────────────── */}
      {activeTab === "check" && (
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">

          {/* Intro card */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-1">
            <h3 className="font-bold text-foreground text-base">{tr.checkLinkTitle}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{tr.checkLinkSubtitle}</p>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckLink()}
              placeholder={tr.checkLinkPlaceholder}
              className="flex-1 h-12 bg-white border-border/60 focus-visible:ring-primary/30 text-sm"
              disabled={checkLink.isPending}
              data-testid="input-check-link"
            />
            <Button
              onClick={handleCheckLink}
              disabled={!linkInput.trim() || checkLink.isPending}
              className="h-12 px-5 font-semibold rounded-xl shrink-0"
              data-testid="button-check-link-submit"
            >
              {checkLink.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {tr.checkLinkChecking}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  {tr.checkLinkButton}
                </div>
              )}
            </Button>
          </div>

          {/* Result card */}
          {linkResult && (
            <div ref={resultRef} className={`rounded-2xl border-2 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-400 ${VERDICT_CONFIG[linkResult.verdict].bg}`}>

              {/* Verdict badge */}
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${VERDICT_CONFIG[linkResult.verdict].icon_bg}`}>
                  {VERDICT_CONFIG[linkResult.verdict].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${VERDICT_CONFIG[linkResult.verdict].badge}`}>
                    {linkResult.verdict === "safe" && <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
                    {linkResult.verdict === "suspicious" && <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />}
                    {linkResult.verdict === "dangerous" && <XCircle className="w-3.5 h-3.5 mr-1.5" />}
                    {linkResult.verdict === "safe" ? tr.checkLinkVerdictSafe
                      : linkResult.verdict === "suspicious" ? tr.checkLinkVerdictSuspicious
                      : tr.checkLinkVerdictDangerous}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{linkResult.url}</p>
                </div>
              </div>

              {/* Verdict bar */}
              <div className="h-1.5 rounded-full bg-black/10 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${VERDICT_CONFIG[linkResult.verdict].bar} ${
                  linkResult.verdict === "safe" ? "w-1/4" : linkResult.verdict === "suspicious" ? "w-2/3" : "w-full"
                }`} />
              </div>

              {/* Explanation */}
              <p className="text-sm text-foreground leading-relaxed">{linkResult.explanation}</p>

              {/* Signals */}
              {linkResult.signals && linkResult.signals.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide">{tr.checkLinkSignals}</p>
                  <ul className="space-y-1.5">
                    {linkResult.signals.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reset */}
              <Button
                onClick={resetCheck}
                variant="outline"
                className="w-full h-10 font-semibold rounded-xl border-border/50"
                data-testid="button-check-another"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {tr.checkLinkCheckAnother}
              </Button>
            </div>
          )}

          {/* Safety tip */}
          <div className="flex items-start gap-3 bg-secondary/5 border border-secondary/20 rounded-xl p-4">
            <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">{tr.checkLinkTip}</p>
          </div>

        </div>
      )}

    </div>
  );
}
