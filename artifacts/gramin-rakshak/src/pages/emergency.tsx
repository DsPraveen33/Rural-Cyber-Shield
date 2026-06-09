import { AlertTriangle, Phone, FileText, Banknote, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call 1930 Immediately",
    description: "This is the National Cyber Crime Reporting Portal helpline. Call them first to freeze the transaction.",
    action: "tel:1930",
    actionLabel: "Call Now",
    color: "bg-destructive/10 text-destructive border-destructive/20"
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: "Contact Your Bank",
    description: "Call your bank's customer care or visit the nearest branch to block your account/card.",
    action: null,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "File Online Complaint",
    description: "Register a formal complaint at cybercrime.gov.in. Keep transaction screenshots ready.",
    action: "https://cybercrime.gov.in",
    actionLabel: "Visit Portal",
    color: "bg-secondary/10 text-secondary border-secondary/20"
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: "Inform Local Police",
    description: "Visit your nearest police station with a written application detailing the fraud.",
    action: null,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  }
];

export default function Emergency() {
  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-destructive text-destructive-foreground p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <AlertTriangle className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="bg-white/20 w-fit p-2 rounded-lg mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Emergency Response</h1>
          <p className="text-destructive-foreground/90 mb-4">If you have been scammed or notice unauthorized transactions, act quickly. Follow these steps immediately.</p>
          
          <a href="tel:1930" className="inline-flex items-center justify-center gap-2 bg-white text-destructive font-bold px-6 py-3 rounded-full shadow-sm hover:bg-white/90 active:scale-95 transition-all">
            <Phone className="w-5 h-5 fill-current" />
            DIAL 1930 NOW
          </a>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border/50">
        
        {STEPS.map((step, index) => (
          <div key={index} className="relative flex items-start gap-4 md:justify-between">
            {/* Number Indicator */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 z-10 shadow-sm md:order-1 md:mx-auto">
              {index + 1}
            </div>

            {/* Content Card */}
            <div className={`bg-white rounded-xl p-5 shadow-sm border md:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:order-2'} border-border/50`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${step.color} border`}>
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {step.description}
              </p>
              
              {step.action && (
                <a 
                  href={step.action}
                  target={step.action.startsWith('http') ? "_blank" : "_self"}
                  rel="noreferrer"
                >
                  <Button variant={index === 0 ? "destructive" : "outline"} className="w-full sm:w-auto font-medium">
                    {step.actionLabel}
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}