import { useCallback, useState, useRef } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopAppBar from "@/components/TopAppBar";
import Footer from "@/components/Footer";
import useDocumentTitle from "@/hooks/use-document-title";

const UploadPage = () => {
  useDocumentTitle("Upload");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  }, []);

  const handleFileSelect = useCallback(() => {
    simulateUpload();
  }, []);

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const circumference = 2 * Math.PI * 40;
  const progress = uploadProgress !== null ? Math.min(uploadProgress, 100) : 0;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />
      <main className="pt-20 px-4 md:px-8 lg:px-12 pb-12 max-w-3xl mx-auto min-h-[80vh] flex flex-col">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 mt-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2 font-headline">
          Upload Files
        </h1>
        <p className="text-muted-foreground mb-8">
          Securely upload and share your files with anyone.
        </p>

        <div className="relative group flex-1 flex flex-col">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-10 blur-xl group-hover:opacity-20 transition-opacity rounded-xl" />
          <div
            className={`relative glass-card rounded-xl p-12 lg:p-20 flex-1 flex flex-col items-center justify-center text-center cursor-pointer shadow-soft hover:-translate-y-1 transition-all duration-300 ${
              isDragging ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={handleFileSelect}
            />
            <div className="w-24 h-24 mb-6 rounded-full bg-primary/5 flex items-center justify-center">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-headline">
              Drag & Drop files here or <span className="text-primary">Browse</span>
            </h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Upload documents, high-resolution images, or archives to your vault.
            </p>

            {uploadProgress !== null && (
              <div className="mt-8 relative w-24 h-24">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                  <circle
                    cx="48" cy="48" r="40" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Max file size: 2 GB &middot; Supported formats: All file types
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default UploadPage;
