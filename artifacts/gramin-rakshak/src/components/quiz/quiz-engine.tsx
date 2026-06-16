import { useState, useEffect } from "react";
import { useUserStore } from "@/lib/user-store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, ArrowRight, Award } from "lucide-react";

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type QuizData = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  questions: Question[];
};

interface QuizEngineProps {
  quiz: QuizData;
  onClose: () => void;
}

export default function QuizEngine({ quiz, onClose }: QuizEngineProps) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30s per question
  const [isCompleted, setIsCompleted] = useState(false);
  
  const { markQuizCompleted } = useUserStore();

  const currentQ = quiz.questions[currentQIndex];

  // Timer logic
  useEffect(() => {
    if (isAnswered || isCompleted) return;
    if (timeLeft <= 0) {
      handleAnswer(null); // Time's up
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isCompleted]);

  const handleAnswer = (index: number | null) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      setIsCompleted(true);
      const passMark = Math.ceil(quiz.questions.length * 0.7); // 70% to pass
      if (score >= passMark) {
        // @ts-ignore - isWeekly injected dynamically
        setTimeout(() => markQuizCompleted(quiz.id, quiz.isWeekly || false, score), 100);
      }
    }
  };

  if (isCompleted) {
    const passed = score >= Math.ceil(quiz.questions.length * 0.7);
    // @ts-ignore
    const xpReward = quiz.isWeekly ? 50 : 20;
    
    return (
      <div className="bg-white rounded-2xl shadow-xl border p-8 max-w-lg w-full mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
          {passed ? <Award className="w-10 h-10" /> : <Clock className="w-10 h-10" />}
        </div>
        <div>
          <h2 className="text-2xl font-black">{passed ? "Challenge Conquered!" : "Keep Practicing"}</h2>
          <p className="text-muted-foreground mt-2">You scored {score} out of {quiz.questions.length}</p>
        </div>
        
        {passed ? (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm font-bold border border-emerald-200">
            🎉 +{xpReward} XP Earned!
          </div>
        ) : (
          <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm font-medium border border-amber-200">
            You need 70% to pass and earn XP. Don't give up, try again!
          </div>
        )}

        <Button onClick={onClose} className="w-full font-bold h-12">
          Back to Quiz Center
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6 max-w-2xl w-full mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      
      {/* Header Info */}
      <div className="flex justify-between items-center text-sm font-bold text-muted-foreground pb-4 border-b">
        <span>Question {currentQIndex + 1} of {quiz.questions.length}</span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${timeLeft <= 10 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-primary/10 text-primary'}`}>
          <Clock className="w-4 h-4" /> 00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-foreground leading-relaxed">{currentQ.text}</h2>

      {/* Options */}
      <div className="space-y-3">
        {currentQ.options.map((option, idx) => {
          let styleClass = "bg-white border-border hover:bg-muted/50 hover:border-primary/40";
          let Icon = null;

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              styleClass = "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm";
              Icon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
            } else if (idx === selectedOption) {
              styleClass = "bg-red-50 border-red-400 text-red-900 opacity-80";
              Icon = <XCircle className="w-5 h-5 text-red-500" />;
            } else {
              styleClass = "opacity-50 border-border bg-gray-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 font-medium ${styleClass}`}
            >
              <span>{option}</span>
              {Icon}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswered && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 animate-in fade-in zoom-in-95 duration-300">
          <p className="text-sm font-bold text-primary mb-1">Explanation:</p>
          <p className="text-sm text-foreground leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <Button onClick={handleNext} className="w-full font-bold h-12 text-md">
          {currentQIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}

    </div>
  );
}
