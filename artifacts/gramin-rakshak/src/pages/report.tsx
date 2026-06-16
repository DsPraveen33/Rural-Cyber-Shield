import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubmitReport } from "@workspace/api-client-react";

export default function ReportScam() {
  const [, setLocation] = useLocation();
  const { mutate: submitReport, isPending } = useSubmitReport();

  const [scamType, setScamType] = useState("phishing");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [severity, setSeverity] = useState<"critical" | "high" | "moderate" | "monitor">("moderate");

  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      
      const redirect = setTimeout(() => {
        setLocation("/");
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
    return undefined;
  }, [submitted, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !district) return;

    submitReport(
      {
        data: {
          scamType,
          description,
          district,
          contactNumber,
          severity,
        },
      },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      }
    );
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Report Submitted Successfully</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for helping protect our community. Your alert has been recorded and will be shared with others.
          <br /><br />
          <span className="font-semibold text-primary">Returning to home in {countdown} seconds...</span>
        </p>
        <Link href="/">
          <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors">
            Return Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors -ml-2">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-foreground">Report a Scam</h1>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-primary" />
            Scam Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Type of Scam *</label>
              <select
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="Phishing">Phishing Link / Fake Website</option>
                <option value="OTP Fraud">OTP / Bank Call Fraud</option>
                <option value="UPI Scam">UPI Payment Request</option>
                <option value="Job Scam">Fake Job Offer</option>
                <option value="Lottery Scam">Fake Lottery / Prize</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened? Did they ask for money or OTP?"
                className="w-full min-h-[100px] p-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">District / Village *</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Anantapur"
                  className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="monitor">Low (Monitor)</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Scammer Phone/UPI (Optional)</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full h-12 px-3 rounded-xl border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4"
            >
              {isPending ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
