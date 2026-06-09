import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home as HomeIcon, BookOpen, Bot, AlertTriangle, Gavel, Phone } from "lucide-react";
import NotFound from "@/pages/not-found";

import Home from "./pages/home";
import Learning from "./pages/learning";
import Mitra from "./pages/mitra";
import Emergency from "./pages/emergency";
import Quiz from "./pages/quiz";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-[1280px] mx-auto pb-32">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md px-4 py-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
            <span className="text-primary font-black text-lg tracking-tighter">GR</span>
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight">Gramin Rakshak</span>
        </Link>
        <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors border border-white/10">
          EN / TE
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

      {/* Emergency Strip */}
      <div className="fixed bottom-[72px] md:bottom-0 left-0 right-0 z-40 bg-[#ffdad6] text-[#93000a] py-3 px-4 flex justify-center items-center gap-3 font-bold shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-[#ba1a1a]/20">
        <Phone className="w-5 h-5 animate-pulse" />
        <a href="tel:1930" className="hover:underline">Helpline: 1930</a>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-around items-center h-[72px] px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
        
        <Link href="/" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <HomeIcon className={`w-6 h-6 mb-1 ${isActive('/') ? 'fill-primary/20' : ''}`} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        
        <Link href="/learning" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/learning') || isActive('/quiz') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
          <BookOpen className={`w-6 h-6 mb-1 ${isActive('/learning') ? 'fill-primary/20' : ''}`} />
          <span className="text-[10px] font-bold">Learning</span>
        </Link>
        
        <div className="w-full flex justify-center -mt-6">
          <Link href="/mitra" className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-background hover:bg-primary/90 transition-transform active:scale-95">
            <Bot className="w-7 h-7" />
          </Link>
        </div>

        <Link href="/emergency" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/emergency') ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}`}>
          <AlertTriangle className={`w-6 h-6 mb-1 ${isActive('/emergency') ? 'fill-destructive/20' : ''}`} />
          <span className="text-[10px] font-bold">Emergency</span>
        </Link>
        
        <button className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors">
          <Gavel className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Report</span>
        </button>

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
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;