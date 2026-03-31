import { ArrowLeft, FileText, Share2, Shield, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/use-document-title";

const notifications = [
  { id: 1, icon: Share2, title: "File shared with you", desc: "Alice shared 'Project Brief.pdf'", time: "2 min ago", unread: true },
  { id: 2, icon: FileText, title: "Upload complete", desc: "'Design Assets.zip' uploaded successfully", time: "1 hour ago", unread: true },
  { id: 3, icon: Shield, title: "Security alert", desc: "New login detected from Chrome on Windows", time: "3 hours ago", unread: false },
  { id: 4, icon: Share2, title: "File shared with you", desc: "Bob shared 'Meeting Notes.docx'", time: "Yesterday", unread: false },
  { id: 5, icon: Trash2, title: "File moved to trash", desc: "'Old Report.xlsx' will be deleted in 30 days", time: "2 days ago", unread: false },
];

const NotificationsPage = () => {
  useDocumentTitle("Notifications");
  const navigate = useNavigate();

  return (
    <main className="pt-20 px-4 md:px-8 lg:px-12 pb-28 md:pb-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mt-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-headline">
          Notifications
        </h1>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <article
            key={n.id}
            className={`glass-card rounded-xl px-5 py-4 flex items-start gap-4 transition-colors hover:bg-surface-container-low/50 cursor-pointer ${
              n.unread ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              n.unread ? "bg-primary/10 text-primary" : "bg-surface-container text-muted-foreground"
            }`}>
              <n.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold ${n.unread ? "text-foreground" : "text-muted-foreground"}`}>
                {n.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
              <time className="text-[10px] text-muted-foreground/70 mt-1 block">{n.time}</time>
            </div>
            {n.unread && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
          </article>
        ))}
      </div>
    </main>
  );
};

export default NotificationsPage;
