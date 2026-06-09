import { useState } from "react";
import { useGetTips } from "@workspace/api-client-react";
import { BookOpen, Search, Filter, Lock, Phone, CreditCard, ShieldCheck, Badge } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const CATEGORIES = ["All", "phishing", "upi", "aadhaar", "password", "whatsapp"];

export default function Learning() {
  const { data: tips, isLoading } = useGetTips();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = tips?.filter(tip => {
    const matchesCategory = activeCategory === "All" || tip.category === activeCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'phishing': return <Search className="w-5 h-5 text-blue-500" />;
      case 'upi': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'aadhaar': return <Lock className="w-5 h-5 text-amber-500" />;
      case 'password': return <ShieldCheck className="w-5 h-5 text-purple-500" />;
      case 'whatsapp': return <Phone className="w-5 h-5 text-emerald-500" />;
      default: return <BookOpen className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground">Learning Hub</h1>
        <p className="text-muted-foreground text-sm">Master cyber safety to protect yourself and your family.</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="font-semibold text-sm text-foreground">Your Progress</h3>
            <p className="text-xs text-muted-foreground">Beginner Guardian</p>
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
            placeholder="Search lessons..." 
            className="pl-9 bg-white border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-white border border-border/50 text-foreground hover:bg-muted"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
            <h3 className="font-semibold text-foreground">No lessons found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term.</p>
          </div>
        ) : (
          filteredTips?.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl p-4 shadow-sm border border-border/50 flex gap-4 active:scale-[0.98] transition-transform cursor-pointer">
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