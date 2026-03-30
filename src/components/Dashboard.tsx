import { useCallback, useState, useRef } from "react";
import { Upload, FileText, Image, Film, Share2, Users, ShieldCheck, Copy, Check } from "lucide-react";
import storageHero from "@/assets/storage-hero.jpg";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: "pdf" | "image" | "video" | "archive";
  status: "Secure" | "Syncing" | "Uploading";
  shareLink?: string;
}

const mockFiles: UploadedFile[] = [
  { id: "1", name: "Quarterly_Report_2024.pdf", size: "4.2 MB", date: "Oct 24, 2023", type: "pdf", status: "Secure", shareLink: "webmaterial.org/d/aX7z9" },
  { id: "2", name: "Brand_Assets_V2.zip", size: "128.5 MB", date: "Oct 23, 2023", type: "archive", status: "Syncing" },
  { id: "3", name: "Keynote_Hero_Video.mp4", size: "856.0 MB", date: "Oct 22, 2023", type: "video", status: "Secure", shareLink: "webmaterial.org/d/bK4m2" },
];

const fileIcons: Record<string, { icon: typeof FileText; bgClass: string; textClass: string }> = {
  pdf: { icon: FileText, bgClass: "bg-red-100", textClass: "text-red-600" },
  image: { icon: Image, bgClass: "bg-blue-100", textClass: "text-blue-600" },
  video: { icon: Film, bgClass: "bg-amber-100", textClass: "text-amber-600" },
  archive: { icon: Image, bgClass: "bg-blue-100", textClass: "text-blue-600" },
};

const statusColors: Record<string, string> = {
  Secure: "bg-green-100 text-green-700",
  Syncing: "bg-blue-100 text-blue-700",
  Uploading: "bg-amber-100 text-amber-700",
};

const Dashboard = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const copyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const circumference = 2 * Math.PI * 40;
  const progress = uploadProgress !== null ? Math.min(uploadProgress, 100) : 0;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex pt-20">
      <main className="flex-1 md:ml-72 p-8 lg:p-12 bg-background min-h-screen">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-2 font-headline">
            Welcome Back, Alex
          </h1>
          <p className="text-lg text-muted-foreground font-medium opacity-70">
            Your digital gallery is organized and secure.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Upload Zone */}
          <div className="xl:col-span-8 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
              <div
                className={`relative glass-card rounded-xl p-12 lg:p-20 flex flex-col items-center justify-center text-center cursor-pointer shadow-soft hover:-translate-y-1 transition-all duration-300 ${
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
                      <circle
                        className="text-surface-container"
                        cx="48" cy="48" fill="transparent" r="40"
                        stroke="currentColor" strokeWidth="8"
                      />
                      <circle
                        className="text-primary transition-all duration-300"
                        cx="48" cy="48" fill="transparent" r="40"
                        stroke="currentColor" strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-primary uppercase tracking-widest">
                      {progress >= 100 ? "Complete!" : "Uploading..."}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Files */}
            <div className="bg-surface-container-low rounded-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold font-headline">Recent Files</h2>
                <a href="/files" className="text-primary font-bold text-sm hover:underline">View All</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <thead className="text-muted-foreground font-bold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 pb-4">File Name</th>
                      <th className="px-4 pb-4">Size</th>
                      <th className="px-4 pb-4">Upload Date</th>
                      <th className="px-4 pb-4">Share Link</th>
                      <th className="px-4 pb-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {mockFiles.map((file) => {
                      const { icon: FileIcon, bgClass, textClass } = fileIcons[file.type];
                      return (
                        <tr key={file.id} className="group hover:bg-surface-container-lowest transition-all">
                          <td className="px-4 py-4 rounded-l-lg flex items-center gap-3">
                            <div className={`w-10 h-10 rounded ${bgClass} flex items-center justify-center`}>
                              <FileIcon className={`w-5 h-5 ${textClass}`} />
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">Documents</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">{file.size}</td>
                          <td className="px-4 py-4 text-muted-foreground">{file.date}</td>
                          <td className="px-4 py-4">
                            {file.shareLink ? (
                              <button
                                onClick={() => copyLink(file.id, file.shareLink!)}
                                className="flex items-center gap-2 text-primary text-xs font-semibold hover:underline"
                              >
                                {copiedId === file.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copiedId === file.id ? "Copied!" : file.shareLink}
                              </button>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="px-4 py-4 rounded-r-lg text-right">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[file.status]}`}>
                              {file.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="xl:col-span-4 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="gradient-primary p-6 rounded-lg text-primary-foreground">
                <Share2 className="w-8 h-8 mb-4" />
                <div className="text-2xl font-bold">124</div>
                <div className="text-xs opacity-70 uppercase font-bold tracking-widest">Shared Files</div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-lg shadow-soft border border-outline-variant/10">
                <Users className="w-8 h-8 mb-4 text-primary" />
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Active Teams</div>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl group">
              <img
                alt="Storage Preview"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={storageHero}
                width={800}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-primary-foreground">
                <h3 className="text-2xl font-bold mb-2 font-headline">Curate your space</h3>
                <p className="text-primary-foreground/70 text-sm mb-6">Discover new ways to organize your creative assets with AI-powered tagging.</p>
                <button className="bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-foreground/20 transition-all">
                  Explore Insights
                </button>
              </div>
            </div>

            {/* Security Banner */}
            <div className="bg-surface-container-highest p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground font-headline">End-to-End Encrypted</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Your data is secured using military-grade AES-256 encryption. Only you hold the keys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
