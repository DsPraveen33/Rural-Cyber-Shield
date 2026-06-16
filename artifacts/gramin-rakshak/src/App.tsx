import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home as HomeIcon, BookOpen, Bot, AlertTriangle, Gavel, Phone, User as UserIcon, PlayCircle, ShieldAlert, Target, Trophy } from "lucide-react";
import NotFound from "@/pages/not-found";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { useUserStore } from "@/lib/user-store";
import { useEffect } from "react";

import Home from "./pages/home";
import Learning from "./pages/learning";
import Mitra from "./pages/mitra";
import Emergency from "./pages/emergency";
import Quiz from "./pages/quiz";
import Report from "./pages/report";
import Dashboard from "./pages/dashboard";
import QuizCenter from "./pages/quiz-center";
import VideoCenter from "./pages/video-center";
import ScamAlerts from "./pages/scam-alerts";
import Scanner from "./pages/scanner";
import Leaderboard from "./pages/leaderboard";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { tr, toggle, lang } = useLanguage();
  const { recordActivity } = useUserStore();

  useEffect(() => {
    recordActivity();
  }, [recordActivity]);

  const isActive = (path: string) => location === path;

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[1280px] mx-auto pb-32">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md px-4 py-3 md:px-8 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="text-primary font-black text-lg tracking-tighter">GR</span>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight">{tr.appName}</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              data-testid="button-lang-toggle"
              className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors border border-white/10"
            >
              {lang === "en" ? "EN / TE" : "TE / EN"}
            </button>
            <Link href="/dashboard" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors border border-white/10">
              <UserIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Secondary Navigation for New Ecosystem Centers */}
        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide -mx-2 px-2">
          <Link href="/quiz-center" className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isActive('/quiz-center') ? 'bg-white text-primary' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'}`}>
            <Target className="w-3.5 h-3.5" /> Quiz Center
          </Link>
          <Link href="/video-center" className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isActive('/video-center') ? 'bg-white text-primary' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'}`}>
            <PlayCircle className="w-3.5 h-3.5" /> Videos
          </Link>
          <Link href="/scam-alerts" className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isActive('/scam-alerts') ? 'bg-white text-primary' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'}`}>
            <ShieldAlert className="w-3.5 h-3.5" /> Alerts
          </Link>
          <Link href="/scanner" className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isActive('/scanner') ? 'bg-white text-primary' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'}`}>
            <ShieldAlert className="w-3.5 h-3.5" /> Scanner
          </Link>
          <Link href="/leaderboard" className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isActive('/leaderboard') ? 'bg-white text-primary' : 'bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'}`}>
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </Link>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

      {/* Emergency Strip */}
      <div className="fixed bottom-[72px] md:bottom-0 left-0 right-0 z-40 bg-[#ffdad6] text-[#93000a] py-3 px-4 flex justify-center items-center gap-3 font-bold shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-[#ba1a1a]/20">
        <Phone className="w-5 h-5 animate-pulse" />
        <a href="tel:1930" className="hover:underline">{tr.helpline}</a>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-around items-center h-[72px] px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
        <Link href="/" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <HomeIcon className={`w-6 h-6 mb-1 ${isActive('/') ? 'fill-primary/20' : ''}`} />
          <span className="text-[10px] font-bold">{tr.navHome}</span>
        </Link>
        <Link href="/learning" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/learning') || isActive('/quiz') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <BookOpen className={`w-6 h-6 mb-1 ${isActive('/learning') ? 'fill-primary/20' : ''}`} />
          <span className="text-[10px] font-bold">{tr.navLearning}</span>
        </Link>
        <div className="w-full flex justify-center -mt-6">
          <Link href="/mitra" className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-background hover:bg-primary/90 transition-transform active:scale-95">
            <Bot className="w-7 h-7" />
          </Link>
        </div>
        <Link href="/emergency" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/emergency') ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}>
          <AlertTriangle className={`w-6 h-6 mb-1 ${isActive('/emergency') ? 'fill-destructive/20' : ''}`} />
          <span className="text-[10px] font-bold">{tr.navEmergency}</span>
        </Link>
        <Link href="/report" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/report') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <Gavel className={`w-6 h-6 mb-1 ${isActive('/report') ? 'fill-primary/20' : ''}`} />
          <span className="text-[10px] font-bold">{tr.navReport}</span>
        </Link>
      </nav>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/learning" component={Learning} />
        <Route path="/mitra" component={Mitra} />
        <Route path="/emergency" component={Emergency} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/report" component={Report} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quiz-center" component={QuizCenter} />
        <Route path="/video-center" component={VideoCenter} />
        <Route path="/scam-alerts" component={ScamAlerts} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
