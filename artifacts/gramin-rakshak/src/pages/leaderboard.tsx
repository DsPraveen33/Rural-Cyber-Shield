import { useState, useEffect } from "react";
import { Trophy, Medal, Star, Award, Shield, User as UserIcon } from "lucide-react";
import { useUserStore, LEVELS } from "@/lib/user-store";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const MOCK_LEADERBOARD = [
  { id: "1", name: "Ramesh Kumar", xp: 1850, avatar: "RK" },
  { id: "2", name: "Suresh Reddy", xp: 1420, avatar: "SR" },
  { id: "3", name: "Priya Sharma", xp: 950, avatar: "PS" },
  { id: "4", name: "Anita Devi", xp: 600, avatar: "AD" },
  { id: "5", name: "Ravi Teja", xp: 200, avatar: "RT" },
  { id: "6", name: "Kavitha N", xp: 50, avatar: "KN" },
];

export default function Leaderboard() {
  const { xp, level } = useUserStore();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = {
      id: "current_user",
      name: "You (Cyber Yodha)",
      xp: xp,
      avatar: "You",
      isCurrentUser: true,
    };

    // Combine mock data with current user and sort
    const combined = [...MOCK_LEADERBOARD, currentUser].sort((a, b) => b.xp - a.xp);
    setLeaderboard(combined);
  }, [xp]);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1: return <Medal className="w-6 h-6 text-slate-400" />;
      case 2: return <Medal className="w-6 h-6 text-amber-700" />;
      default: return <span className="text-slate-500 font-bold w-6 text-center">#{index + 1}</span>;
    }
  };

  const getLevelName = (userXp: number) => {
    let lvlName = LEVELS[0].name;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (userXp >= LEVELS[i].minXp) {
        lvlName = LEVELS[i].name;
        break;
      }
    }
    return lvlName;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Award className="w-6 h-6" /> Cyber Yodha Leaderboard
          </h1>
          <p className="text-indigo-100 font-medium max-w-md leading-relaxed">
            Compete with others in your district! Learn, report scams, and earn XP to become the top Cyber Guardian.
          </p>
        </div>
        <Star className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12" />
      </div>

      {/* Current User Stats */}
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 border-4 border-indigo-50 flex items-center justify-center text-indigo-600">
            <UserIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Your Current Rank</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-sm font-bold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> {level.name}
              </span>
              <span className="text-slate-500 font-medium text-sm">{xp} XP Total</span>
            </div>
          </div>
        </div>

        {xp >= 100 ? (
          <Link href="/dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Award className="w-4 h-4 mr-2" /> Claim Certificate
            </Button>
          </Link>
        ) : (
          <div className="text-sm text-slate-500 text-center md:text-right">
            Earn <strong className="text-indigo-600">{100 - xp} more XP</strong> to unlock your <br/>Official Cyber Yodha Certificate!
          </div>
        )}
      </div>

      {/* Leaderboard List */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-700">Top Guardians in Your District</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Rank</span>
        </div>
        
        <div className="divide-y divide-slate-100">
          {leaderboard.map((user, index) => (
            <div 
              key={user.id} 
              className={`p-4 flex items-center justify-between transition-colors ${
                user.isCurrentUser ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 flex justify-center items-center">
                  {getRankIcon(index)}
                </div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  user.isCurrentUser ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {user.avatar}
                </div>
                
                <div>
                  <h4 className={`font-bold ${user.isCurrentUser ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {user.name}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {getLevelName(user.xp)}
                  </p>
                </div>
              </div>
              
              <div className={`font-black text-lg ${user.isCurrentUser ? 'text-indigo-600' : 'text-slate-600'}`}>
                {user.xp} <span className="text-xs font-bold text-slate-400">XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
