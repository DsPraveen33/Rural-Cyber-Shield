import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface CertificateProps {
  userName: string;
  score: number;
  badge: string;
}

export default function CertificateGenerator({ userName: initialUserName, score, badge }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [participantName, setParticipantName] = useState(initialUserName);

  const generatePDF = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current, { 
        scale: 2,
        useCORS: true,
        logging: true
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Cyber-Safety-Certificate.pdf");
    } catch (error: any) {
      console.error("Error generating certificate:", error);
      alert(`Failed to generate certificate: ${error?.message || error}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-end gap-3">
      <div className="flex flex-col gap-1 w-full sm:w-auto">
        <label className="text-xs font-bold text-muted-foreground ml-1">Participant Name</label>
        <Input 
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          placeholder="Enter participant name"
          className="min-w-[250px] shadow-sm bg-white"
        />
      </div>
      <Button 
        onClick={generatePDF} 
        disabled={isGenerating || score === 0 || !participantName.trim()}
        className="font-bold shadow-md hover:shadow-lg transition-all"
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? "Generating..." : "Download Certificate"}
      </Button>

      {/* Hidden Certificate Template to capture with html2canvas */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <div 
          ref={certificateRef}
          className="w-[1000px] h-[707px] bg-[#fdfbf7] p-[40px] relative overflow-hidden font-sans"
          style={{ color: '#000000' }}
        >
          {/* Outer Border */}
          <div className="w-full h-full border-[3px] border-[#0f172a] p-2 relative">
            {/* Inner Gold Border */}
            <div className="w-full h-full border-[1.5px] border-[#d4af37] p-[40px] relative flex flex-col">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]"></div>

              {/* Watermark Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>

              {/* Header */}
              <div className="text-center relative z-10 mb-4 mt-2">
                <p className="text-[#d4af37] tracking-[0.3em] uppercase text-sm font-bold mb-2">Gramin Mitra Cyber Shield</p>
                <h1 className="text-5xl font-black text-[#0f172a] tracking-widest uppercase" style={{ fontFamily: "Georgia, serif" }}>
                  Certificate of Achievement
                </h1>
              </div>

              {/* Body Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                <p className="text-lg text-[#6b7280] font-medium mb-4 uppercase tracking-widest">This is proudly presented to</p>
                
                <h2 className="text-6xl text-[#d4af37] border-b-[2px] border-[#d4af37] pb-3 mb-6 px-16 inline-block font-bold drop-shadow-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>
                  {participantName}
                </h2>
                
                <p className="text-lg text-[#4b5563] max-w-2xl leading-relaxed mb-6">
                  For demonstrating exceptional dedication to online security, digital literacy, and rural empowerment through the successful completion of the <strong className="text-[#0f172a]">Cyber Safety Curriculum</strong>.
                </p>
              </div>

              {/* Footer Section */}
              <div className="mt-auto relative z-10 flex justify-between items-end px-8 pb-2">
                
                {/* Left Signatures */}
                <div className="text-center w-48">
                  <div className="border-b-[1.5px] border-[#9ca3af] mb-2 relative h-12 flex items-end justify-center">
                    <span className="font-['Brush_Script_MT',cursive] text-2xl text-[#0f172a] transform -rotate-2 -translate-y-1">MR.N.PRAVEEN</span>
                  </div>
                  <p className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold">Director</p>
                </div>

                {/* Center Badge / Seal */}
                <div className="flex flex-col items-center translate-y-2">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 rounded-full">
                      <polygon points="50,5 61,16 76,14 82,28 95,35 89,49 95,63 82,70 76,84 61,82 50,93 39,82 24,84 18,70 5,63 11,49 5,35 18,28 24,14 39,16" fill="#0f172a" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#d4af37" strokeWidth="2.5" />
                      <circle cx="50" cy="50" r="34" fill="#d4af37" />
                      <circle cx="50" cy="50" r="32" fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <span className="text-[10px] font-bold text-[#0f172a] uppercase tracking-widest mt-1">Official</span>
                      <span className="text-[20px] font-black text-[#0f172a] leading-tight my-0.5" style={{fontFamily: "Georgia, serif"}}>{score}</span>
                      <span className="text-[9px] font-bold text-[#0f172a] uppercase tracking-widest border-t border-[#cbd5e1] pt-0.5">Score</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center bg-[#0f172a] text-[#d4af37] px-4 py-1 rounded-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest">{badge}</p>
                  </div>
                </div>

                {/* Right Date */}
                <div className="text-center w-48">
                  <div className="border-b-[1.5px] border-[#9ca3af] mb-2 h-12 flex items-end justify-center">
                    <span className="text-lg text-[#0f172a] font-bold mb-1" style={{fontFamily: "Georgia, serif"}}>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <p className="text-[10px] text-[#6b7280] uppercase tracking-widest font-bold">Date of Achievement</p>
                </div>

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
