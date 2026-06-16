import { useState } from "react";
import { useUserStore } from "@/lib/user-store";
import { PlayCircle, CheckCircle2, ShieldCheck, Film, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import InteractiveScenarioStudio from "@/components/learning/ai-video-studio";

const VIDEOS = [
  {
    id: "v_digital_arrest",
    title: "Beware of Digital Arrest Scams (Telugu)",
    description: "Learn how fraudsters impersonate CBI or Police to extort money through fake Skype calls.",
    embedUrl: "https://www.youtube.com/embed/atLNt-1etKY", 
    category: "Impersonation",
    learningPoints: [
      "Real police will NEVER arrest you via a Skype or WhatsApp video call.",
      "Government agencies do not ask you to transfer money to a 'safe account'.",
      "Do not panic. Disconnect the call and report to 1930."
    ]
  },
  {
    id: "v_upi_scam_01",
    title: "How UPI Payment Scams Work (Telugu)",
    description: "Understand how scammers trick you into entering your UPI PIN to steal money instead of receiving it.",
    embedUrl: "https://www.youtube.com/embed/TrX8B2DOd9o", 
    category: "UPI Fraud",
    learningPoints: [
      "You NEVER need a PIN to receive money.",
      "Scammers often pretend to be from the Army, OLX buyers, or trusted brands.",
      "Always verify the receiver's name on the UPI app before confirming."
    ]
  },
  {
    id: "v_otp_scam_01",
    title: "The OTP Bank Call Scam (Telugu)",
    description: "Learn how fraudsters impersonate bank officials to steal your OTP.",
    embedUrl: "https://www.youtube.com/embed/KNfxo8ueXMw", 
    category: "Banking Fraud",
    learningPoints: [
      "Banks will never call and ask for your OTP or CVV.",
      "Do not download screen-sharing apps like AnyDesk if someone calls you.",
      "Hang up immediately if they ask for a code."
    ]
  },
  {
    id: "v_job_scam_01",
    title: "Fake WhatsApp Job Offers (Telugu)",
    description: "A common scam offering money for simply 'liking' YouTube videos or rating hotels.",
    embedUrl: "https://www.youtube.com/embed/egDpd3y9ulw", 
    category: "Job Scam",
    learningPoints: [
      "Real jobs don't ask you to pay a 'registration fee'.",
      "Earning large amounts for liking videos is always a scam (Task Fraud).",
      "Block international numbers offering unsolicited jobs on WhatsApp."
    ]
  },
  {
    id: "v_parcel_scam",
    title: "The FedEx / Customs Parcel Scam (Telugu)",
    description: "Fraudsters call claiming your parcel contains illegal items (like drugs or passports) and demand a fine.",
    embedUrl: "https://www.youtube.com/embed/nbyP0a4nNS8", 
    category: "Courier Fraud",
    learningPoints: [
      "Customs officials do not call you directly to demand money via UPI.",
      "Do not share your Aadhaar or PAN details with these callers.",
      "Verify the tracking number directly on the official courier website."
    ]
  },
  {
    id: "v_public_wifi",
    title: "Cyber Crime Awareness (Telugu)",
    description: "Important precautions and cyber hygiene tips to stay safe online.",
    embedUrl: "https://www.youtube.com/embed/atLNt-1etKY", 
    category: "Cyber Hygiene",
    learningPoints: [
      "Hackers can intercept data on unsecured public networks.",
      "Always use your mobile data (4G/5G) for banking or UPI payments.",
      "Consider using a VPN for extra security."
    ]
  }
];

export default function VideoCenter() {
  const { watchedVideos, markVideoWatched } = useUserStore();
  const [activeVideo, setActiveVideo] = useState<typeof VIDEOS[0] | null>(null);

  if (activeVideo) {
    const isWatched = watchedVideos.includes(activeVideo.id);

    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
        <button onClick={() => setActiveVideo(null)} className="text-primary font-bold text-sm mb-2 hover:underline">
          &larr; Back to Cyber Academy
        </button>

        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          <div className="aspect-video bg-black relative">
            <iframe 
              src={activeVideo.embedUrl} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-2xl font-black text-foreground">{activeVideo.title}</h1>
                {isWatched && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full shrink-0">
                    <CheckCircle2 className="w-4 h-4" /> Watched
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{activeVideo.description}</p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <h3 className="font-bold text-primary flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5" /> Key Learning Points
              </h3>
              <ul className="space-y-2">
                {activeVideo.learningPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {!isWatched && (
              <Button 
                onClick={() => markVideoWatched(activeVideo.id)}
                className="w-full font-bold h-12 bg-emerald-600 hover:bg-emerald-700"
              >
                I Have Finished Watching This Video (+10 XP)
              </Button>
            )}
            
            {isWatched && (
              <div className="flex flex-col gap-3 pt-4 border-t">
                <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider text-center mb-2">Next Steps</h4>
                
                <Link href="/quiz-center">
                  <Button className="w-full font-bold h-12 flex items-center justify-between group">
                    Test your knowledge in the Quiz Center
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button onClick={() => setActiveVideo(null)} variant="outline" className="w-full font-bold h-12">
                  Choose Another Video
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = Math.round((watchedVideos.length / VIDEOS.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <h1 className="text-2xl font-black flex items-center gap-2"><GraduationCap className="w-7 h-7" /> Cyber Academy</h1>
          <p className="text-purple-100 font-medium max-w-md leading-relaxed text-sm">
            Master every cyber threat condition. Watch awareness videos or generate custom AI scenarios to learn how to protect yourself!
          </p>
          
          <div className="bg-white/10 p-3 rounded-xl border border-white/20 backdrop-blur-sm max-w-sm">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>Overall Video Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>
        </div>
        <GraduationCap className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12" />
      </div>

      {/* Interactive Scenario Studio */}
      <div>
        <InteractiveScenarioStudio />
      </div>

      {/* Video Library */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl flex items-center gap-2">
          <Film className="w-5 h-5 text-purple-600" /> Essential Awareness Videos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIDEOS.map((video) => {
            const isWatched = watchedVideos.includes(video.id);
            
            return (
              <div 
                key={video.id} 
                onClick={() => setActiveVideo(video)}
                className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all group flex flex-col"
              >
                <div className="aspect-video bg-slate-900 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={`https://img.youtube.com/vi/${video.embedUrl.split('/').pop()}/mqdefault.jpg`} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-20 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-6 h-6 text-white ml-1" />
                  </div>
                  {isWatched && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg z-20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 z-20">
                     <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
                      {video.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-foreground mb-1 leading-tight group-hover:text-primary transition-colors">{video.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                  
                  <div className="mt-4 pt-3 border-t flex justify-between items-center mt-auto">
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md">
                      +10 XP
                    </span>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
                      Watch Now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
