import { useState } from "react";
import { useUserStore } from "@/lib/user-store";
import { CheckCircle2, ShieldAlert, Award, ArrowRight, ShieldX, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AiScenarioData {
  id: string;
  title: string;
  topic: string;
  scenes: {
    sceneId: string;
    imagePrompt: string;
    narration: string;
    choices: {
      text: string;
      nextSceneId: string;
    }[];
  }[];
  endings: {
    [key: string]: {
      type: "win" | "game_over";
      message: string;
      takeaway: string;
    };
  };
}

interface Props {
  scenario: AiScenarioData;
  onClose: () => void;
}

export default function InteractiveStoryPlayer({ scenario, onClose }: Props) {
  const { markAiVideoWatched } = useUserStore();
  const [currentSceneId, setCurrentSceneId] = useState<string>("scene_1");
  const [showEnding, setShowEnding] = useState<string | null>(null);

  const handleChoice = (nextSceneId: string) => {
    if (scenario.endings[nextSceneId]) {
      setShowEnding(nextSceneId);
      if (scenario.endings[nextSceneId].type === "win") {
        markAiVideoWatched(scenario.id);
      }
    } else {
      setCurrentSceneId(nextSceneId);
    }
  };

  const handleRestart = () => {
    setCurrentSceneId("scene_1");
    setShowEnding(null);
  };

  if (showEnding) {
    const ending = scenario.endings[showEnding];
    const isWin = ending.type === "win";

    return (
      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700 text-slate-200 animate-in fade-in duration-500">
        <div className="p-6 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
          <h2 className={`text-xl font-black flex items-center gap-2 ${isWin ? "text-emerald-400" : "text-red-400"}`}>
            {isWin ? <CheckCircle2 className="w-6 h-6" /> : <ShieldX className="w-6 h-6" />}
            {isWin ? "Simulation Completed" : "Game Over"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-sm">
            Close Simulator
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8 bg-slate-800">
          {isWin && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-center gap-3 text-emerald-300 font-bold">
              <Award className="w-6 h-6" /> +15 XP Awarded! You stayed safe!
            </div>
          )}

          {!isWin && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center justify-center gap-3 text-red-300 font-bold">
              <ShieldAlert className="w-6 h-6" /> You fell for the scam!
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 text-center">
              <h3 className="font-bold text-2xl text-white mb-4">
                {ending.message}
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed border-t border-slate-700 pt-4 mt-4">
                <span className="text-indigo-400 font-black block mb-2">Key Takeaway</span>
                {ending.takeaway}
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            {!isWin && (
              <Button onClick={handleRestart} className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2">
                <Undo2 className="w-5 h-5" /> Try Again
              </Button>
            )}
            <Button onClick={onClose} variant={isWin ? "default" : "secondary"} className={`flex-1 h-12 font-bold ${isWin ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
              Return to Academy
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const scene = scenario.scenes.find(s => s.sceneId === currentSceneId) || scenario.scenes[0];

  // Using pollinations.ai for dynamic image generation based on the prompt
  // Adding specific style keywords for a consistent graphic novel feel
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(scene.imagePrompt + ", highly detailed digital art, comic book style, graphic novel, dramatic lighting")}`;

  return (
    <div className="bg-black rounded-2xl shadow-2xl overflow-hidden border border-slate-800 text-slate-200 animate-in zoom-in-95 duration-500 flex flex-col max-h-[85vh]">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center shrink-0">
        <div>
          <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded">Interactive Scenario</span>
          <h2 className="font-bold text-white text-lg mt-1">{scenario.title}</h2>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white text-sm font-bold bg-slate-800 px-3 py-1 rounded-md">
          Exit
        </button>
      </div>

      {/* Main Comic/Story Area */}
      <div className="flex-1 overflow-y-auto bg-slate-950 flex flex-col">
        {/* Dynamic Image Panel */}
        <div className="relative w-full border-b border-slate-800 shrink-0 bg-slate-900 flex justify-center">
          <div className="max-w-2xl w-full aspect-video md:aspect-[21/9] relative bg-black overflow-hidden shadow-inner">
             {/* Note: In a real production app, generating images dynamically via GET request per user click could be slow. Pollinations generates instantly on cache miss but may take ~5s first time. */}
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
               <div className="animate-pulse flex flex-col items-center gap-2">
                 <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Generating Panel...</span>
               </div>
             </div>
             <img 
               src={imageUrl} 
               alt={scene.imagePrompt}
               key={imageUrl} // forces re-render/re-fetch on prompt change
               className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 bg-slate-900" 
               onLoad={(e) => {
                 (e.target as HTMLImageElement).classList.add('opacity-100');
               }}
               onError={(e) => {
                 // Fallback if image fails
                 (e.target as HTMLImageElement).style.display = 'none';
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
          </div>
        </div>
        
        {/* Narration and Choices */}
        <div className="p-6 md:p-8 max-w-3xl mx-auto w-full space-y-8 flex-1 flex flex-col">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg relative">
            <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Story
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed pt-2">
              {scene.narration}
            </p>
          </div>

          <div className="space-y-3 mt-auto">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest text-center mb-4">What will you do?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scene.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(choice.nextSceneId)}
                  className="bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-left p-4 rounded-xl transition-all group flex justify-between items-center shadow-sm"
                >
                  <span className="font-bold text-slate-300 group-hover:text-white">{choice.text}</span>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-200 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
