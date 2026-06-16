import { useState } from "react";
import { ShieldCheck, AlertTriangle, ScanLine, Loader2, MessageSquare, Link as LinkIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export default function Scanner() {
  const { lang: currentLang } = useLanguage();
  const [content, setContent] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<{
    verdict: "safe" | "suspicious" | "dangerous";
    explanation: string;
    signals: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!content.trim()) return;
    
    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/check-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, language: currentLang }),
      });

      if (!response.ok) {
        throw new Error("Failed to scan content");
      }

      const data = await response.json();
      setResult({
        verdict: data.verdict,
        explanation: data.explanation,
        signals: data.signals || []
      });
    } catch (err) {
      console.error(err);
      setError(currentLang === 'te' ? "స్కాన్ చేయడంలో విఫలమైంది." : "Failed to scan. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl font-black flex items-center gap-2">
            <ScanLine className="w-6 h-6" /> Live SMS & Link Scanner
          </h1>
          <p className="text-blue-100 font-medium max-w-md leading-relaxed">
            Paste a suspicious SMS, WhatsApp message, or website link here. Our AI will instantly check if it's safe or a scam.
          </p>
        </div>
        <ShieldCheck className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12" />
      </div>

      {/* Scanner Input Area */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <div className="flex gap-4 mb-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <MessageSquare className="w-4 h-4 text-slate-600" /> SMS / WhatsApp Text
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <LinkIcon className="w-4 h-4 text-slate-600" /> Web Links
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste message or link here... (e.g. 'Dear customer, your electricity will be cut off...')"
          className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none mb-4"
        />

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {error}
          </div>
        )}

        <Button 
          onClick={handleScan}
          disabled={!content.trim() || isScanning}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" /> Scanning Content...
            </>
          ) : (
            <>
              <ScanLine className="w-6 h-6" /> Scan Now
            </>
          )}
        </Button>
      </div>

      {/* Results Area */}
      {result && (
        <div className={`rounded-2xl border p-6 shadow-sm animate-in zoom-in duration-300 ${
          result.verdict === 'safe' ? 'bg-emerald-50 border-emerald-200' :
          result.verdict === 'suspicious' ? 'bg-amber-50 border-amber-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${
              result.verdict === 'safe' ? 'bg-emerald-100 text-emerald-600' :
              result.verdict === 'suspicious' ? 'bg-amber-100 text-amber-600' :
              'bg-red-100 text-red-600'
            }`}>
              {result.verdict === 'safe' ? <ShieldCheck className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            
            <div className="space-y-3 flex-1">
              <div>
                <h3 className={`text-xl font-black uppercase tracking-wide ${
                  result.verdict === 'safe' ? 'text-emerald-700' :
                  result.verdict === 'suspicious' ? 'text-amber-700' :
                  'text-red-700'
                }`}>
                  Verdict: {result.verdict}
                </h3>
                <p className="text-slate-700 mt-1 font-medium">{result.explanation}</p>
              </div>

              {result.signals.length > 0 && (
                <div className="mt-4 pt-4 border-t border-black/5">
                  <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4" /> Warning Signals Detected:
                  </h4>
                  <ul className="space-y-1.5">
                    {result.signals.map((signal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-red-500 mt-0.5">•</span> {signal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
