import { useState } from "react";
import { AlertTriangle, Phone, FileText, Banknote, ShieldAlert, Search, MapPin, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { searchCenters, type CyberCenter } from "@/lib/cyber-centers";

export default function Emergency() {
  const { tr } = useLanguage();

  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<CyberCenter[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setResults(searchCenters(query));
    setSearched(true);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
  };

  const STEPS = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: tr.step1Title,
      description: tr.step1Desc,
      action: "tel:1930",
      actionLabel: tr.step1Action,
      color: "bg-destructive/10 text-destructive border-destructive/20",
    },
    {
      icon: <Banknote className="w-6 h-6" />,
      title: tr.step2Title,
      description: tr.step2Desc,
      action: null,
      actionLabel: null,
      color: "bg-primary/10 text-primary border-primary/20",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: tr.step3Title,
      description: tr.step3Desc,
      action: "https://cybercrime.gov.in",
      actionLabel: tr.step3Action,
      color: "bg-secondary/10 text-secondary border-secondary/20",
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: tr.step4Title,
      description: tr.step4Desc,
      action: null,
      actionLabel: null,
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
  ];

  return (
    <div className="space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Hero banner */}
      <div className="bg-destructive text-destructive-foreground p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <AlertTriangle className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="bg-white/20 w-fit p-2 rounded-lg mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{tr.emergencyTitle}</h1>
          <p className="text-destructive-foreground/90 mb-4">{tr.emergencySubtitle}</p>
          <a
            href="tel:1930"
            className="inline-flex items-center justify-center gap-2 bg-white text-destructive font-bold px-6 py-3 rounded-full shadow-sm hover:bg-white/90 active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5 fill-current" />
            {tr.dialNow}
          </a>
        </div>
      </div>

      {/* Steps timeline */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border/50">
        {STEPS.map((step, index) => (
          <div key={index} className="relative flex items-start gap-4 md:justify-between">
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 z-10 shadow-sm md:order-1 md:mx-auto">
              {index + 1}
            </div>
            <div className={`bg-white rounded-xl p-5 shadow-sm border md:w-[calc(50%-2.5rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:order-2'} border-border/50`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${step.color} border`}>
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{step.description}</p>
              {step.action && step.actionLabel && (
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

      {/* ── Nearby Cyber Help Centers ─────────────────────────── */}
      <div className="space-y-4">

        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2.5 rounded-xl shrink-0">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{tr.nearbyTitle}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{tr.nearbySubtitle}</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={tr.nearbyPlaceholder}
              className="pl-9 pr-9 h-11 bg-white border-border/60 focus-visible:ring-primary/30"
              data-testid="input-nearby-search"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            disabled={!query.trim()}
            className="h-11 px-5 font-semibold rounded-xl shrink-0"
            data-testid="button-nearby-search"
          >
            {tr.nearbySearch}
          </Button>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {results.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="p-5 text-center space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {tr.nearbyNoResults} &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-muted-foreground">{tr.nearbyTryHint}</p>
                </CardContent>
              </Card>
            ) : (
              results.map((center) => (
                <Card key={center.id} className="border-primary/15 shadow-sm overflow-hidden">
                  {/* State / district header */}
                  <div className="bg-primary/5 border-b border-primary/10 px-4 py-2 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">
                      {center.district}, {center.state}
                    </span>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Unit name */}
                    <p className="font-semibold text-foreground text-sm leading-snug">{center.unit}</p>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/60" />
                      <p className="text-xs leading-relaxed">{center.address}</p>
                    </div>

                    {/* Call button */}
                    <a href={`tel:${center.phone}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full h-10 font-bold border-secondary/40 text-secondary hover:bg-secondary/5 gap-2"
                        data-testid={`button-call-center-${center.id}`}
                      >
                        <Phone className="w-4 h-4 fill-secondary/30" />
                        {tr.nearbyCall}: {center.phone}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* National helpline card — always visible */}
        <Card className="border-destructive/20 bg-destructive/5 shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <a
              href="tel:1930"
              className="bg-destructive text-destructive-foreground rounded-full p-3 shrink-0 hover:bg-destructive/90 active:scale-95 transition-all"
            >
              <Phone className="w-5 h-5 fill-current" />
            </a>
            <div>
              <p className="font-bold text-foreground text-sm">{tr.nearbyNationalHelpline}</p>
              <p className="text-xs text-muted-foreground">{tr.nearbyNationalDesc}</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
