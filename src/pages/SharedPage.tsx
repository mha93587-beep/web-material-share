import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText, Image, Film, Archive, Search, Grid3X3, List,
  Download, Share2, Copy, Check, Clock, Star, ArrowLeft, Link2
} from "lucide-react";
import TopAppBar from "@/components/TopAppBar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

interface SharedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: "pdf" | "image" | "video" | "archive" | "document";
  shareLink: string;
  starred: boolean;
}

const sharedFiles: SharedFile[] = [
  { id: "1", name: "Quarterly_Report_2024.pdf", size: "4.2 MB", date: "Oct 24, 2023", type: "pdf", starred: true, shareLink: "webmaterial.org/d/aX7z9" },
  { id: "3", name: "Keynote_Hero_Video.mp4", size: "856.0 MB", date: "Oct 22, 2023", type: "video", starred: true, shareLink: "webmaterial.org/d/bK4m2" },
  { id: "6", name: "Presentation_Final.pdf", size: "12.8 MB", date: "Oct 19, 2023", type: "pdf", starred: true, shareLink: "webmaterial.org/d/cN8p3" },
  { id: "10", name: "Banner_Design.jpg", size: "8.4 MB", date: "Oct 15, 2023", type: "image", starred: false, shareLink: "webmaterial.org/d/dR2v5" },
];

const fileIconMap: Record<string, { icon: typeof FileText; bgClass: string; textClass: string }> = {
  pdf: { icon: FileText, bgClass: "bg-destructive/10", textClass: "text-destructive" },
  image: { icon: Image, bgClass: "bg-primary/10", textClass: "text-primary" },
  video: { icon: Film, bgClass: "bg-amber-100", textClass: "text-amber-600" },
  archive: { icon: Archive, bgClass: "bg-violet-100", textClass: "text-violet-600" },
  document: { icon: FileText, bgClass: "bg-emerald-100", textClass: "text-emerald-600" },
};

const SharedPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = sharedFiles.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyLink = (id: string, link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />

      <main className="pt-20 px-4 md:px-8 lg:px-12 pb-28 md:pb-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mt-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-headline">
              Shared Files
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} shared files &middot; Files you've shared with others
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="glass-card rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search shared files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="flex rounded-lg bg-surface-container-low p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Link2 className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold text-foreground font-headline mb-1">No shared files</h3>
            <p className="text-sm text-muted-foreground">Files you share will appear here.</p>
          </div>
        ) : viewMode === "list" ? (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Size</th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Date</th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Share Link</th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((file) => {
                    const { icon: Icon, bgClass, textClass } = fileIconMap[file.type];
                    return (
                      <tr key={file.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${bgClass} flex items-center justify-center shrink-0`}>
                              <Icon className={`w-5 h-5 ${textClass}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-foreground text-sm truncate">{file.name}</p>
                            </div>
                            {file.starred && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-muted-foreground hidden sm:table-cell">{file.size}</td>
                        <td className="px-5 py-4 text-sm text-muted-foreground hidden md:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {file.date}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => copyLink(file.id, file.shareLink)}
                            className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline"
                          >
                            {copiedId === file.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedId === file.id ? "Copied!" : file.shareLink}
                          </button>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((file) => {
              const { icon: Icon, bgClass, textClass } = fileIconMap[file.type];
              return (
                <div
                  key={file.id}
                  className="glass-card rounded-xl p-4 hover:-translate-y-1 hover:shadow-soft transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${textClass}`} />
                    </div>
                    {file.starred && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                  </div>
                  <h4 className="font-bold text-sm text-foreground truncate mb-1">{file.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{file.size} &middot; {file.date}</p>
                  <button
                    onClick={() => copyLink(file.id, file.shareLink)}
                    className="flex items-center gap-1 text-primary text-[10px] font-bold hover:underline"
                  >
                    {copiedId === file.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedId === file.id ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
};

export default SharedPage;
