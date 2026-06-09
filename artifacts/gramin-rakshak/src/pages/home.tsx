import { useState } from "react";
import { Link } from "wouter";
import { useGetCommunityStats, useGetThreats, useGetDailyTip } from "@workspace/api-client-react";
import { Bot, Shield, AlertTriangle, ArrowRight, Activity, Users, ShieldAlert, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useGetCommunityStats();
  const { data: threats, isLoading: threatsLoading } = useGetThreats();
  const { data: dailyTip, isLoading: tipLoading } = useGetDailyTip();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-[#ba1a1a] text-white';
      case 'moderate': return 'bg-[#773900] text-white';
      case 'monitor': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Community Stats */}
      <section className="bg-primary rounded-2xl p-6 text-primary-foreground shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <h2 className="text-xl font-bold mb-1">Community Safety</h2>
        <p className="text-primary-foreground/80 text-sm mb-6">Your village is highly protected. Keep learning to stay safe.</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-card-foreground flex flex-col items-center justify-center relative">
            {statsLoading ? (
              <Skeleton className="w-16 h-16 rounded-full" />
            ) : (
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-muted fill-none" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    className="stroke-secondary fill-none" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * (stats?.safetyScore || 0)) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-bold text-xl">{stats?.safetyScore || 0}%</span>
              </div>
            )}
            <span className="text-xs font-semibold mt-2 text-muted-foreground">Safety Score</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-primary-foreground/70">Awareness</p>
                {statsLoading ? <Skeleton className="w-12 h-4 mt-1 bg-white/20" /> : <p className="font-semibold text-sm">{stats?.awarenessCount} trained</p>}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
              <Activity className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-primary-foreground/70">Readiness</p>
                {statsLoading ? <Skeleton className="w-12 h-4 mt-1 bg-white/20" /> : <p className="font-semibold text-sm">{stats?.readinessPercent}%</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Daily Tip */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Tip of the Day</h2>
        </div>
        {tipLoading ? (
          <Skeleton className="w-full h-32 rounded-2xl" />
        ) : dailyTip ? (
          <Card className="border-primary/20 bg-accent/20 shadow-none">
            <CardContent className="p-5 flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-fit text-primary shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{dailyTip.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{dailyTip.body}</p>
                <Badge variant="outline" className="bg-white">{dailyTip.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      {/* Common Threats */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Recent Threats in Area</h2>
          <Link href="/learning" className="text-sm text-primary font-medium flex items-center gap-1">
            Learn More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {threatsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-24 rounded-xl" />
            ))
          ) : threats?.slice(0, 3).map((threat) => (
            <Card key={threat.id} className="overflow-hidden shadow-sm">
              <div className="flex border-l-4" style={{ borderColor: threat.severity === 'critical' ? 'hsl(var(--destructive))' : threat.severity === 'high' ? '#ba1a1a' : 'hsl(var(--secondary))' }}>
                <CardContent className="p-4 w-full flex items-start gap-4">
                  <div className="bg-muted p-2 rounded-lg shrink-0">
                    <ShieldAlert className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-foreground truncate">{threat.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{threat.description}</p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Action - Helpline */}
      <section>
        <a href="tel:1930" className="block w-full bg-destructive text-destructive-foreground rounded-2xl p-5 shadow-md hover:bg-destructive/90 transition-colors active:scale-[0.98] transform">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Cyber Crime Helpline</h3>
              <p className="text-destructive-foreground/90 text-sm font-medium">Tap to call 1930 immediately</p>
            </div>
          </div>
        </a>
      </section>
    </div>
  );
}