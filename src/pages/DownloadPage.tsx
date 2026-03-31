import {
  Download, Database, Calendar, DownloadCloud, ShieldCheck,
  Zap, Lock, FileText, Image, Film, Archive,
  Users, Eye, Star, Share2, Copy, Check, ArrowLeft, Globe
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import { parseSlug, BASE_URL } from "@/lib/seo";

interface FileData {
  name: string;
  size: string;
  type: string;
  mimeType: string;
  uploadDate: string;
  uploadDateISO: string;
  downloads: number;
  views: number;
  uploader: string;
  extension: string;
  category: "pdf" | "image" | "video" | "archive" | "document";
  description: string;
}

const fileDatabase: Record<string, FileData> = {
  r2024: {
    name: "Quarterly_Report_2024.pdf",
    size: "4.2 MB",
    type: "PDF Document",
    mimeType: "application/pdf",
    uploadDate: "Oct 24, 2023",
    uploadDateISO: "2023-10-24",
    downloads: 342,
    views: 1280,
    uploader: "Alex Johnson",
    extension: "PDF",
    category: "pdf",
    description: "Official quarterly financial report for Q3 2024, including performance metrics, revenue breakdown, and strategic outlook.",
  },
  kv2023: {
    name: "Keynote_Hero_Video.mp4",
    size: "856.0 MB",
    type: "Video File",
    mimeType: "video/mp4",
    uploadDate: "Oct 22, 2023",
    uploadDateISO: "2023-10-22",
    downloads: 89,
    views: 430,
    uploader: "Alex Johnson",
    extension: "MP4",
    category: "video",
    description: "High-definition keynote presentation hero reel for product launch event, featuring brand storytelling and feature highlights.",
  },
  pf2023: {
    name: "Presentation_Final.pdf",
    size: "12.8 MB",
    type: "PDF Document",
    mimeType: "application/pdf",
    uploadDate: "Oct 19, 2023",
    uploadDateISO: "2023-10-19",
    downloads: 156,
    views: 612,
    uploader: "Alex Johnson",
    extension: "PDF",
    category: "pdf",
    description: "Final version of the product strategy presentation for the executive board meeting, Q4 2023.",
  },
  bd2023: {
    name: "Banner_Design.jpg",
    size: "8.4 MB",
    type: "JPEG Image",
    mimeType: "image/jpeg",
    uploadDate: "Oct 15, 2023",
    uploadDateISO: "2023-10-15",
    downloads: 67,
    views: 298,
    uploader: "Alex Johnson",
    extension: "JPG",
    category: "image",
    description: "High-resolution marketing banner design for digital and print campaigns, in full-color format.",
  },
};

const defaultFile: FileData = {
  name: "Annual_Report_2025.pdf",
  size: "4.2 MB",
  type: "PDF Document",
  mimeType: "application/pdf",
  uploadDate: "Feb 12, 2026",
  uploadDateISO: "2026-02-12",
  downloads: 128,
  views: 520,
  uploader: "Web Material",
  extension: "PDF",
  category: "pdf",
  description: "Official annual report for 2025, shared securely via Web Material. Download and view the full document instantly.",
};

const categoryIconMap: Record<string, { icon: typeof FileText; color: string }> = {
  pdf:      { icon: FileText, color: "text-red-500" },
  image:    { icon: Image,    color: "text-blue-500" },
  video:    { icon: Film,     color: "text-amber-500" },
  archive:  { icon: Archive,  color: "text-violet-500" },
  document: { icon: FileText, color: "text-emerald-500" },
};

const features = [
  { icon: Zap,         title: "Instant Delivery",   desc: "CDN-powered global edge network for maximum speed." },
  { icon: ShieldCheck, title: "Virus Scanned",      desc: "Every file is scanned before download." },
  { icon: Lock,        title: "End-to-End Secure",  desc: "TLS 1.3 encryption on every transfer." },
  { icon: Globe,       title: "Globally Available", desc: "Download from anywhere in the world." },
];

export default function DownloadPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { fileId } = parseSlug(slug);
  const file = fileDatabase[fileId] ?? defaultFile;
  const { icon: FileIcon, color: iconColor } = categoryIconMap[file.category] ?? categoryIconMap.document;

  const [copied, setCopied] = useState(false);

  const pageUrl = `${BASE_URL}/download/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Download", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      name: `Download ${file.name}`,
      description: file.description,
      url: pageUrl,
      datePublished: file.uploadDateISO,
      author: { "@type": "Person", name: file.uploader },
      mainEntity: {
        "@type": "DigitalDocument",
        name: file.name,
        description: file.description,
        fileSize: file.size,
        encodingFormat: file.mimeType,
        datePublished: file.uploadDateISO,
        author: { "@type": "Person", name: file.uploader },
        url: pageUrl,
        potentialAction: {
          "@type": "DownloadAction",
          name: "Download",
          target: pageUrl,
        },
      },
    },
  ];

  return (
    <>
      <SEOMeta
        title={`Download ${file.name}`}
        description={`Download ${file.name} (${file.size}) — ${file.description} Shared securely via Web Material.`}
        canonical={`/download/${slug}`}
        structuredData={structuredData}
      />

      <main className="min-h-screen pt-20 pb-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container max-w-5xl px-4 md:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 mt-4">
            <Link to="/" className="hover:text-foreground flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-xs">{file.name}</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-3 font-headline">
              Your file is ready.
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Secure, high-speed delivery from{" "}
              <span className="text-primary font-bold">The Vault</span>'s premium storage network.
            </p>
          </div>

          {/* Main Card */}
          <article className="glass-card rounded-2xl p-8 md:p-10 w-full shadow-elevated mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* File Icon Preview */}
              <div className="w-full md:w-48 shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-high relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/5" />
                <div className="relative w-20 h-20 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center shadow-xl">
                  <FileIcon className={`w-10 h-10 ${iconColor}`} />
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-surface-container-lowest/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full">
                    {file.extension}
                  </span>
                </div>
              </div>

              {/* File Metadata */}
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/70 px-3 py-1 bg-primary/5 rounded-full inline-block">
                    {file.type}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground break-words font-headline">
                    {file.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{file.description}</p>
                </div>

                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 border-t border-outline-variant/10 pt-5">
                  <div className="space-y-1">
                    <dt className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">File Size</dt>
                    <dd className="flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold text-sm">{file.size}</span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Uploaded</dt>
                    <dd className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold text-sm">{file.uploadDate}</span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Downloads</dt>
                    <dd className="flex items-center gap-1.5">
                      <DownloadCloud className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold text-sm">{file.downloads.toLocaleString()}</span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Views</dt>
                    <dd className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold text-sm">{file.views.toLocaleString()}</span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Shared by</dt>
                    <dd className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-semibold text-sm">{file.uploader}</span>
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Security</dt>
                    <dd className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-semibold text-sm">Verified Safe</span>
                    </dd>
                  </div>
                </dl>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="#"
                    data-testid="button-download"
                    className="flex-1 flex items-center justify-center gap-2 gradient-primary text-primary-foreground px-6 py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-primary-glow transition-all hover:-translate-y-0.5"
                    aria-label={`Download ${file.name}`}
                  >
                    <Download className="w-5 h-5" />
                    Download File
                  </a>
                  <button
                    onClick={copyLink}
                    data-testid="button-copy-link"
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-low border border-outline-variant/20 text-foreground font-semibold text-sm transition-all"
                    aria-label="Copy download link"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    data-testid="button-share"
                    className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-low border border-outline-variant/20 text-foreground font-semibold text-sm transition-all"
                    aria-label="Share file"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Trust Features */}
          <section aria-label="Security features" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-xl p-4 text-center hover:-translate-y-1 transition-transform duration-200">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </section>

          {/* About Web Material */}
          <section aria-label="About Web Material" className="glass-card rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-lg font-bold text-foreground font-headline">Powered by Web Material</h2>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-5">
              Web Material is a premium cloud storage and file sharing platform. Upload, organize, and share your files with anyone — securely and at blazing speed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all"
            >
              Get Started Free
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
