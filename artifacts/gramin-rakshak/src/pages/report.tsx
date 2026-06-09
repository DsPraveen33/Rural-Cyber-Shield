import { useState, useRef } from "react";
import { Flag, Copy, Check, Printer, ExternalLink, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

type FormData = {
  fraudType: string;
  amount: string;
  date: string;
  phone: string;
  bank: string;
  txnId: string;
  description: string;
};

const EMPTY_FORM: FormData = {
  fraudType: "",
  amount: "",
  date: "",
  phone: "",
  bank: "",
  txnId: "",
  description: "",
};

export default function Report() {
  const { tr, lang } = useLanguage();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const isValid = form.fraudType && form.amount && form.date && form.phone && form.description;

  const generateLetter = () => {
    if (!isValid) return;
    setGenerated(true);
    setTimeout(() => letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const buildLetterText = () => {
    const lines = [
      tr.reportLetterTitle,
      "",
      tr.reportLetterTo,
      "",
      tr.reportLetterSubject,
      "",
      tr.reportLetterSir,
      "",
      tr.reportLetterBody1,
      "",
      tr.reportLetterDetails,
      `- ${tr.reportLetterFraudType}: ${form.fraudType}`,
      `- ${tr.reportLetterDate}: ${form.date}`,
      `- ${tr.reportLetterAmount}: ₹${form.amount}`,
      `- ${tr.reportLetterPhone}: ${form.phone}`,
      ...(form.bank ? [`- ${tr.reportLetterBank}: ${form.bank}`] : []),
      ...(form.txnId ? [`- ${tr.reportLetterTxnId}: ${form.txnId}`] : []),
      "",
      `${tr.reportLetterDesc}: ${form.description}`,
      "",
      tr.reportLetterBody2,
      "",
      tr.reportLetterBody3,
      "",
      tr.reportLetterYours,
      "",
      `${tr.reportLetterPhone}: ${form.phone}`,
      `${tr.reportLetterDate2}: ${today}`,
      `${tr.reportLetterPlace}: _______________`,
      "",
      `${tr.reportLetterSign}: _______________`,
    ];
    return lines.join("\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildLetterText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => window.print();

  const inputCls = "bg-white border-border/60 focus-visible:ring-primary/30 h-11";
  const labelCls = "text-sm font-semibold text-foreground mb-1.5 block";

  return (
    <div className="max-w-2xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="bg-destructive/10 p-3 rounded-xl shrink-0">
          <Flag className="w-7 h-7 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{tr.reportTitle}</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{tr.reportSubtitle}</p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-6 space-y-5">

          {/* Fraud Type */}
          <div>
            <label className={labelCls}>{tr.reportFraudType} <span className="text-destructive">*</span></label>
            <select
              value={form.fraudType}
              onChange={set("fraudType")}
              data-testid="select-fraud-type"
              className="w-full h-11 rounded-md border border-border/60 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
            >
              <option value="">{tr.reportFraudTypePlaceholder}</option>
              {tr.fraudTypes.map((ft: string) => (
                <option key={ft} value={ft}>{ft}</option>
              ))}
            </select>
          </div>

          {/* Amount + Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{tr.reportAmount} <span className="text-destructive">*</span></label>
              <Input
                type="number"
                placeholder={tr.reportAmountPlaceholder}
                value={form.amount}
                onChange={set("amount")}
                className={inputCls}
                data-testid="input-amount"
              />
            </div>
            <div>
              <label className={labelCls}>{tr.reportDate} <span className="text-destructive">*</span></label>
              <Input
                type="date"
                value={form.date}
                onChange={set("date")}
                className={inputCls}
                data-testid="input-date"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={labelCls}>{tr.reportPhone} <span className="text-destructive">*</span></label>
            <Input
              type="tel"
              placeholder={tr.reportPhonePlaceholder}
              value={form.phone}
              onChange={set("phone")}
              maxLength={10}
              className={inputCls}
              data-testid="input-phone"
            />
          </div>

          {/* Bank + TxnId row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>{tr.reportBank}</label>
              <Input
                placeholder={tr.reportBankPlaceholder}
                value={form.bank}
                onChange={set("bank")}
                className={inputCls}
                data-testid="input-bank"
              />
            </div>
            <div>
              <label className={labelCls}>{tr.reportTxnId}</label>
              <Input
                placeholder={tr.reportTxnIdPlaceholder}
                value={form.txnId}
                onChange={set("txnId")}
                className={inputCls}
                data-testid="input-txn-id"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>{tr.reportDescription} <span className="text-destructive">*</span></label>
            <Textarea
              placeholder={tr.reportDescriptionPlaceholder}
              value={form.description}
              onChange={set("description")}
              rows={4}
              className="bg-white border-border/60 focus-visible:ring-primary/30 resize-none"
              data-testid="textarea-description"
            />
          </div>

          <Button
            onClick={generateLetter}
            disabled={!isValid}
            className="w-full h-12 font-bold text-base rounded-xl"
            data-testid="button-generate-letter"
          >
            <Flag className="w-4 h-4 mr-2" />
            {tr.reportGenerate}
          </Button>

          {!isValid && (
            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" /> Fill all required fields marked with *
            </p>
          )}

        </CardContent>
      </Card>

      {/* Generated Letter */}
      {generated && (
        <div ref={letterRef} className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-400">

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="flex-1 h-11 font-semibold border-primary/30 text-primary hover:bg-primary/5"
              data-testid="button-copy-letter"
            >
              {copied ? <Check className="w-4 h-4 mr-2 text-secondary" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? tr.reportCopied : tr.reportCopy}
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1 h-11 font-semibold border-border/50"
              data-testid="button-print-letter"
            >
              <Printer className="w-4 h-4 mr-2" />
              {tr.reportPrint}
            </Button>
          </div>

          {/* The letter itself */}
          <Card className="border-primary/20 shadow-md overflow-hidden">
            <div className="bg-primary px-6 py-3 flex items-center gap-2">
              <Flag className="w-4 h-4 text-primary-foreground/80" />
              <span className="text-primary-foreground font-bold text-sm tracking-wide">{tr.reportLetterTitle}</span>
            </div>
            <CardContent className="p-6">
              <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                {buildLetterText()}
              </pre>
            </CardContent>
          </Card>

          {/* Where to submit */}
          <Card className="border-secondary/20 bg-secondary/5 shadow-none">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-bold text-foreground text-sm">{tr.reportSubmitTo}</h3>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border/50 hover:border-primary/30 transition-colors group"
                data-testid="link-cybercrime-portal"
              >
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {tr.reportSubmitOnline}
                </span>
              </a>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border/50">
                <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                  <Printer className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{tr.reportSubmitPolice}</span>
              </div>
              <a
                href="tel:1930"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border/50 hover:border-destructive/30 transition-colors group"
                data-testid="link-helpline-1930"
              >
                <div className="bg-destructive/10 p-2 rounded-lg text-destructive">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-destructive transition-colors">
                  {tr.reportSubmitHelpline}
                </span>
              </a>
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
}
