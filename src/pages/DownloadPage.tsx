import { Download, Database, Calendar, DownloadCloud, ShieldCheck, Zap, Lock, CloudCog } from "lucide-react";
import useDocumentTitle from "@/hooks/use-document-title";

const DownloadPage = () => {
  useDocumentTitle("Download");
  return (
    <main className="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-5xl px-6 relative z-10 flex flex-col items-center">
        {/* Hero */}
        <div className="w-full mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4 font-headline">
            Your file is ready.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Secure, high-speed delivery from <span className="text-primary font-bold">The Vault</span>'s premium storage network.
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-xl p-8 md:p-12 w-full max-w-3xl shadow-elevated flex flex-col md:flex-row gap-10 items-center">
          {/* File Preview */}
          <div className="w-full md:w-56 shrink-0 aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-high relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center shadow-xl">
                <Download className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          {/* File Meta */}
          <div className="flex-1 space-y-8 w-full">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/60 px-3 py-1 bg-primary/5 rounded-full">
                PDF Document
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground break-words font-headline">
                Annual_Report_2025.pdf
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-outline-variant/10 pt-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-semibold">File Size</p>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <p className="text-foreground font-medium">4.2 MB</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-semibold">Uploaded</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p className="text-foreground font-medium">Feb 12, 2026</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-semibold">Downloads</p>
                <div className="flex items-center gap-2">
                  <DownloadCloud className="w-4 h-4 text-primary" />
                  <p className="text-foreground font-medium">128</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-semibold">Security</p>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <p className="text-foreground font-medium">Scanned</p>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="pt-4">
              <button className="w-full py-5 rounded-full gradient-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:scale-95 duration-200">
                <Download className="w-5 h-5" />
                Download Now
              </button>
              <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
                Direct download link. No waiting, no ads.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="p-6 rounded-lg bg-surface-container-low/50 flex flex-col items-center text-center space-y-3">
            <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground font-headline">Unlimited Speed</h3>
            <p className="text-sm text-muted-foreground">We don't throttle your connection. Get your files at maximum bandwidth.</p>
          </div>
          <div className="p-6 rounded-lg bg-surface-container-low/50 flex flex-col items-center text-center space-y-3">
            <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground font-headline">End-to-End Encryption</h3>
            <p className="text-sm text-muted-foreground">Your downloads are protected with military-grade AES-256 encryption.</p>
          </div>
          <div className="p-6 rounded-lg bg-surface-container-low/50 flex flex-col items-center text-center space-y-3">
            <div className="bg-surface-container-lowest p-3 rounded-full shadow-sm">
              <CloudCog className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground font-headline">Verified Origin</h3>
            <p className="text-sm text-muted-foreground">Verified by Web Material's integrity checks for authentic digital signatures.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DownloadPage;
