import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateProps {
  userName: string;
  score: number;
  badge: string;
}

export default function CertificateGenerator({ userName, score, badge }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const canvas = await html2canvas(certificateRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Cyber-Safety-Certificate.pdf");
    } catch (error) {
      console.error("Error generating certificate", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button 
        onClick={generatePDF} 
        disabled={isGenerating || score === 0}
        className="font-bold shadow-md hover:shadow-lg transition-all"
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Download Certificate"}
      </Button>

      {/* Hidden Certificate Template to capture with html2canvas */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <div 
          ref={certificateRef}
          className="w-[800px] h-[565px] bg-white p-8 relative overflow-hidden font-sans border-[12px] border-primary"
        >
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-white to-white"></div>
          
          <div className="text-center relative z-10 flex flex-col h-full items-center justify-center">
            <h1 className="text-4xl font-black text-primary mb-2 tracking-widest uppercase">Certificate of Achievement</h1>
            <p className="text-lg text-gray-500 font-medium mb-8">This certificate is proudly presented to</p>
            
            <h2 className="text-5xl font-serif text-gray-800 italic border-b-2 border-gray-300 pb-2 mb-8 px-12 inline-block">
              {userName}
            </h2>
            
            <p className="text-base text-gray-600 max-w-lg mb-8 leading-relaxed">
              For demonstrating exceptional dedication to online security and rural digital literacy through the <strong className="text-primary">Gramin Mitra Cyber Shield</strong> platform.
            </p>
            
            <div className="flex gap-12 text-center mt-4">
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Safety Score</p>
                <p className="text-3xl font-black text-emerald-600">{score}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Rank Achieved</p>
                <p className="text-2xl font-black text-primary">{badge}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Date</p>
                <p className="text-xl font-bold text-gray-700">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
