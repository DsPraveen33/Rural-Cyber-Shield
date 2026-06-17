import { ShieldAlert, AlertTriangle, Share2, MapPin, Clock, Info, Loader2 } from "lucide-react";
import { useGetReports } from "@workspace/api-client-react";
import { formatDistanceToNow } from "date-fns";

export default function ScamAlerts() {
  const { data: alerts, isLoading, isError } = useGetReports();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl font-black flex items-center gap-2"><ShieldAlert className="w-6 h-6" /> Live Scam Alerts</h1>
          <p className="text-red-100 font-medium max-w-md leading-relaxed">
            Stay updated on the latest cyber frauds happening around you. Be aware, be safe.
          </p>
        </div>
        <AlertTriangle className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12" />
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          </div>
        )}
        
        {isError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center">
            Failed to load scam alerts. Please try again.
          </div>
        )}

        {alerts?.length === 0 && (
          <div className="bg-slate-50 text-slate-500 p-8 rounded-xl text-center border">
            No active scam alerts in your area right now.
          </div>
        )}

        {(alerts || []).map((alert) => (
          <div key={alert.id} className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
            <div className={`w-full md:w-2 ${alert.severity === 'high' || alert.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
            
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      alert.severity === 'high' || alert.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {alert.createdAt ? formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true }) : 'Recently'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground leading-tight">{alert.scamType}</h3>
                </div>
                
                <button className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted shrink-0">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{alert.description}</p>
              
              <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <MapPin className="w-3.5 h-3.5" /> Reported in: {alert.district}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
