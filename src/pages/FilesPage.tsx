import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText, Image, Film, Archive, Search, Grid3X3, List,
  MoreVertical, Download, Share2, Trash2, FolderOpen, ArrowLeft,
  SortAsc, Filter, Plus, Copy, Check, HardDrive, Clock, Star
} from "lucide-react";
import TopAppBar from "@/components/TopAppBar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

interface FileItem {
  id: string;
  name: string;
  size: string;
  date: string;
  type: "pdf" | "image" | "video" | "archive" | "document";
  folder: string;
  starred: boolean;
  shareLink?: string;
}

const allFiles: FileItem[] = [
  { id: "1", name: "Quarterly_Report_2024.pdf", size: "4.2 MB", date: "Oct 24, 2023", type: "pdf", folder: "Documents", starred: true, shareLink: "webmaterial.org/d/aX7z9" },
  { id: "2", name: "Brand_Assets_V2.zip", size: "128.5 MB", date: "Oct 23, 2023", type: "archive", folder: "Projects", starred: false },
  { id: "3", name: "Keynote_Hero_Video.mp4", size: "856.0 MB", date: "Oct 22, 2023", type: "video", folder: "Media", starred: true, shareLink: "webmaterial.org/d/bK4m2" },
  { id: "4", name: "Profile_Photo.jpg", size: "2.1 MB", date: "Oct 21, 2023", type: "image", folder: "Media", starred: false },
  { id: "5", name: "Invoice_September.pdf", size: "340 KB", date: "Oct 20, 2023", type: "pdf", folder: "Documents", starred: false },
  { id: "6", name: "Presentation_Final.pdf", size: "12.8 MB", date: "Oct 19, 2023", type: "pdf", folder: "Projects", starred: true },
  { id: "7", name: "Product_Demo.mp4", size: "1.2 GB", date: "Oct 18, 2023", type: "video", folder: "Media", starred: false },
  { id: "8", name: "Logo_Pack.zip", size: "45.3 MB", date: "Oct 17, 2023", type: "archive", folder: "Projects", starred: false },
  { id: "9", name: "Meeting_Notes.pdf", size: "120 KB", date: "Oct 16, 2023", type: "document", folder: "Documents", starred: false },
  { id: "10", name: "Banner_Design.jpg", size: "8.4 MB", date: "Oct 15, 2023", type: "image", folder: "Media", starred: true },
];

const folders = ["All Files", "Documents", "Media", "Projects"];

const fileIconMap: Record<string, { icon: typeof FileText; bgClass: string; textClass: string }> = {
  pdf: { icon: FileText, bgClass: "bg-destructive/10", textClass: "text-destructive" },
  image: { icon: Image, bgClass: "bg-primary/10", textClass: "text-primary" },
  video: { icon: Film, bgClass: "bg-amber-100", textClass: "text-amber-600" },
  archive: { icon: Archive, bgClass: "bg-violet-100", textClass: "text-violet-600" },
  document: { icon: FileText, bgClass: "bg-emerald-100", textClass: "text-emerald-600" },
};

const FilesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeFolder, setActiveFolder] = useState("All Files");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [starredFilter, setStarredFilter] = useState(false);

  const filtered = allFiles.filter((f) => {
    const matchesFolder = activeFolder === "All Files" || f.folder === activeFolder;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStar = !starredFilter || f.starred;
    return matchesFolder && matchesSearch && matchesStar;
  });

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
              File Manager
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} files &middot; Manage and organize your uploads
            </p>
          </div>
          <button
            onClick={() => navigate("/upload")}
            className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="glass-card rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStarredFilter(!starredFilter)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                starredFilter ? "bg-primary/10 text-primary" : "bg-surface-container-low text-muted-foreground hover:text-foreground"
              }`}
            >
              <Star className={`w-4 h-4 ${starredFilter ? "fill-primary" : ""}`} />
              <span className="hidden sm:inline">Starred</span>
            </button>
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
        </div>

        {/* Folder Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeFolder === folder
                  ? "gradient-primary text-primary-foreground shadow-sm"
                  : "bg-surface-container-low text-muted-foreground hover:text-foreground hover:bg-surface-container"
              }`}
            >
              {folder === "All Files" && <HardDrive className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
              {folder}
            </button>
          ))}
        </div>

        {/* File List / Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold text-foreground font-headline mb-1">No files found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
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
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Link</th>
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
                              <p className="text-xs text-muted-foreground">{file.folder}</p>
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
                        <td className="px-5 py-4 hidden lg:table-cell">
                          {file.shareLink ? (
                            <button
                              onClick={() => copyLink(file.id, file.shareLink!)}
                              className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline"
                            >
                              {copiedId === file.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {copiedId === file.id ? "Copied!" : file.shareLink}
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-surface-container text-muted-foreground hover:text-destructive/80 transition-colors">
                              <Trash2 className="w-4 h-4" />
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
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{file.folder}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-surface-container text-muted-foreground hover:text-foreground">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-surface-container text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Storage Info */}
        <div className="mt-8 glass-card rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <HardDrive className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-foreground">Storage Used</span>
              <span className="text-muted-foreground">1.06 GB / 5 GB</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: "21%" }} />
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
};

export default FilesPage;
