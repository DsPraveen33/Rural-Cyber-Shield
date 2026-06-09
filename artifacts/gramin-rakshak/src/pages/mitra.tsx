import { useState, useRef, useEffect } from "react";
import { useSendChatMessage } from "@workspace/api-client-react";
import { Bot, Send, Shield, Link2, Lock, Flag, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";

type Message = {
  id: string;
  role: "ai" | "user";
  text: string;
  actions?: string[];
};

export default function Mitra() {
  const { tr, lang } = useLanguage();

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

  // Update greeting when language changes (only if it's still just the initial message)
  useEffect(() => {
    setMessages(prev =>
      prev.length === 1 && prev[0].id === "1"
        ? [{ id: "1", role: "ai", text: tr.mitraGreeting }]
        : prev
    );
  }, [tr.mitraGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sendMessage.isPending]);

  const handleSend = (text: string = input) => {
    if (!text.trim() || sendMessage.isPending) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    sendMessage.mutate(
      { data: { message: text, language: lang } },
      {
        onSuccess: (data) => {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "ai",
              text: data.reply,
              actions: data.suggestedActions,
            }
          ]);
        },
        onError: () => {
          setMessages(prev => [
            ...prev,
            { id: Date.now().toString(), role: "ai", text: tr.mitraError }
          ]);
        }
      }
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Info */}
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mb-4 flex items-center gap-3 shrink-0">
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

      {/* Chat Area */}
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
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-[#0f4c81] text-white rounded-br-sm'
                      : 'bg-[#e6f6ff] text-foreground rounded-bl-sm border border-[#c7dde9]'
                  }`}
                >
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

      {/* Quick Actions */}
      {messages.length <= 2 && !sendMessage.isPending && (
        <div className="grid grid-cols-2 gap-2 mb-4 shrink-0">
          {SUGGESTED_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.label)}
              data-testid={`button-quick-action-${i}`}
              className="flex items-center gap-2 bg-white border border-border/50 p-2.5 rounded-xl shadow-sm text-sm font-medium text-foreground hover:bg-muted active:scale-[0.98] transition-all"
            >
              <div className="bg-accent/30 p-1.5 rounded-lg text-primary">
                {action.icon}
              </div>
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
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

    </div>
  );
}
