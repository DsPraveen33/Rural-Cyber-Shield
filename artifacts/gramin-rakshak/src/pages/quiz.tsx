import { useState } from "react";
import { useGetQuizQuestions, useSubmitQuiz } from "@workspace/api-client-react";
import { HelpCircle, CheckCircle2, Award, RefreshCcw, ArrowRight } from "lucide-react";
import { recordQuizScore } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/language-context";

export default function Quiz() {
  const { tr } = useLanguage();
  const { data: questions, isLoading } = useGetQuizQuestions();
  const submitQuiz = useSubmitQuiz();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; selectedIndex: number }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleNext = () => {
    if (!questions) return;

    const newAnswers = [...answers, { questionId: questions[currentIndex].id, selectedIndex: selectedOption! }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      submitQuiz.mutate(
        { data: { answers: newAnswers } },
        {
          onSuccess: (data) => {
            recordQuizScore(data.percentage);
          }
        }
      );
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setSelectedOption(null);
    submitQuiz.reset();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4">
        <Skeleton className="w-1/3 h-8" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-40 rounded-xl" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="w-full h-16 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">{tr.quizNone}</div>;
  }

  if (isFinished) {
    const isPending = submitQuiz.isPending;
    const result = submitQuiz.data;

    return (
      <div className="max-w-md mx-auto space-y-6 py-8 animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-border/50 relative overflow-hidden">

          {isPending ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <h2 className="text-xl font-bold">{tr.quizCalculating}</h2>
            </div>
          ) : result ? (
            <>
              <div className="absolute top-0 left-0 w-full h-2 bg-secondary" />
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-secondary" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">{tr.quizComplete}</h2>
              <div className="text-5xl font-black text-primary mb-4">{result.percentage}%</div>

              <p className="text-muted-foreground mb-6 font-medium px-4">{result.feedback}</p>

              {result.badge && (
                <div className="bg-accent/30 border border-primary/20 text-primary font-bold py-2 px-4 rounded-lg inline-flex items-center gap-2 mb-8">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  {tr.quizEarned} {result.badge}
                </div>
              )}

              <Button onClick={handleRestart} className="w-full font-bold h-12 rounded-xl" variant="outline" data-testid="button-quiz-restart">
                <RefreshCcw className="w-4 h-4 mr-2" /> {tr.quizRetake}
              </Button>
            </>
          ) : (
            <div className="text-destructive font-semibold">{tr.quizError}</div>
          )}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto pb-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            {tr.quizTitle}
          </h1>
          <span className="text-sm font-semibold text-muted-foreground bg-white px-3 py-1 rounded-full border shadow-sm">
            {currentIndex + 1} {tr.quizOf} {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2.5 bg-border/50" />
      </div>

      {/* Question Card */}
      <Card className="border-border/50 shadow-md mb-6 overflow-hidden">
        <div className="bg-primary/5 p-6 border-b border-border/50">
          <h2 className="text-xl font-semibold text-foreground leading-relaxed">
            {currentQ.question}
          </h2>
        </div>
        <CardContent className="p-4 space-y-3 bg-white">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              data-testid={`button-quiz-option-${idx}`}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                selectedOption === idx
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-transparent bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              <span className="font-medium text-base pr-4">{opt}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                selectedOption === idx ? 'border-primary' : 'border-muted-foreground/30'
              }`}>
                {selectedOption === idx && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Footer Action */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full sm:w-auto h-14 px-8 rounded-full font-bold text-lg shadow-md disabled:shadow-none"
          data-testid="button-quiz-next"
        >
          {currentIndex === questions.length - 1 ? tr.quizFinish : tr.quizNext}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

    </div>
  );
}
