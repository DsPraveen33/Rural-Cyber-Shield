import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Bot, Loader2, Sparkles, Languages, Settings, AlertCircle, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InteractiveStoryPlayer, { AiScenarioData } from "./interactive-story-player";

const TOPICS = [
  "UPI Fraud",
  "OTP Scam",
  "Fake Job Scam",
  "Loan App Fraud",
  "WhatsApp Scam",
  "Digital Arrest Scam",
  "Banking Fraud"
];

const LANGUAGES = [
  { id: "en", name: "English" },
  { id: "hi", name: "Hindi" },
  { id: "te", name: "Telugu" }
];

export default function InteractiveScenarioStudio() {
  const { lang: currentUiLang } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES.find(l => l.id === currentUiLang)?.id || "en");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScenario, setGeneratedScenario] = useState<AiScenarioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedScenario(null);

    const langName = LANGUAGES.find(l => l.id === selectedLang)?.name || "English";

    // Strict prompt to generate a branching visual novel / choose-your-own-adventure game
    const prompt = `You are a Cybersecurity Interactive Scenario Designer. Create a branching "Choose Your Own Adventure" simulator about "${selectedTopic}".
    
You MUST respond with ONLY a valid raw JSON object. Do not include markdown formatting like \`\`\`json. 

The JSON must perfectly match this structure:
{
  "id": "auto_generated",
  "title": "A catchy title for the interactive scenario",
  "topic": "${selectedTopic}",
  "scenes": [
    {
      "sceneId": "scene_1",
      "imagePrompt": "A detailed visual description for an AI image generator (e.g. A suspicious WhatsApp message popping up on a glowing smartphone screen in a dark room)",
      "narration": "Narration/Story text in ${langName}",
      "choices": [
        { "text": "Choice option 1 in ${langName}", "nextSceneId": "scene_2" },
        { "text": "Choice option 2 in ${langName}", "nextSceneId": "bad_ending_1" }
      ]
    },
    {
      "sceneId": "scene_2",
      "imagePrompt": "Detailed visual description...",
      "narration": "Narration text in ${langName} continuing the safe/smart path",
      "choices": [
        { "text": "Safe choice in ${langName}", "nextSceneId": "good_ending" },
        { "text": "Risky choice in ${langName}", "nextSceneId": "bad_ending_2" }
      ]
    }
  ],
  "endings": {
    "bad_ending_1": {
      "type": "game_over",
      "message": "Message explaining what went wrong in ${langName}",
      "takeaway": "Educational takeaway in ${langName}"
    },
    "bad_ending_2": {
      "type": "game_over",
      "message": "Message explaining what went wrong in ${langName}",
      "takeaway": "Educational takeaway in ${langName}"
    },
    "good_ending": {
      "type": "win",
      "message": "Congratulations message in ${langName}",
      "takeaway": "Summary of safe practices in ${langName}"
    }
  }
}

Rules:
1. Generate exactly 3 to 4 standard scenes before reaching an ending.
2. The choices must lead to either the next scene or one of the endings.
3. The imagePrompts must be in English, highly descriptive, focusing on the visual elements of the scene (e.g., "A tense person looking at a laptop with a red warning screen").
4. Ensure the JSON is structurally perfect.`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Use english for prompt processing, but the prompt itself dictates the output language
        body: JSON.stringify({ message: prompt, language: "en" }),
      });

      if (!response.ok) throw new Error("Failed to contact AI backend");

      const data = await response.json();
      let rawText = data.reply;
      
      // Attempt to clean markdown if the AI ignored instructions
      if (rawText.startsWith("\`\`\`json")) {
        rawText = rawText.replace(/\`\`\`json\n?/, "").replace(/\`\`\`$/, "");
      }
      
      const parsedScenario = JSON.parse(rawText) as AiScenarioData;
      parsedScenario.id = `ai_scenario_${Date.now()}`;
      
      setGeneratedScenario(parsedScenario);
    } catch (err) {
      console.error(err);
      setError("The AI backend failed to generate a valid scenario. Please ensure the GEMINI_API_KEY is active and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (generatedScenario) {
    return (
      <InteractiveStoryPlayer 
        scenario={generatedScenario} 
        onClose={() => setGeneratedScenario(null)} 
      />
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700 text-slate-200">
      <div className="p-6 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Interactive Scenario Simulator</h2>
            <p className="text-sm text-slate-400">Generate a custom "Choose Your Own Adventure" cyber threat scenario</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8 bg-slate-800">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 text-red-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Topic Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Settings className="w-4 h-4" /> 1. Select Threat Topic
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${
                    selectedTopic === topic 
                      ? "bg-purple-600 border-purple-500 text-white shadow-md" 
                      : "bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Language & Generate */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Languages className="w-4 h-4" /> 2. Target Scenario Language
              </label>
              <div className="flex gap-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`flex-1 p-3 rounded-lg border text-sm font-medium text-center transition-all ${
                      selectedLang === lang.id 
                        ? "bg-purple-600 border-purple-500 text-white shadow-md" 
                        : "bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-xl shadow-[0_0_20px_rgba(5,150,105,0.4)] border border-emerald-500 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" /> Generating Scenario...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" /> Start Simulation
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> Powered by Gemini & AI Comic Generation
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
