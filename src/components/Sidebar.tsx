import { Clock, Star, Folder, Cloud, BarChart3, HelpCircle, LogOut } from "lucide-react";

const sidebarLinks = [
  { icon: Clock, label: "Recent Files" },
  { icon: Star, label: "Favorites" },
  { icon: Folder, label: "Folders" },
  { icon: Cloud, label: "Storage" },
  { icon: BarChart3, label: "Analytics" },
];

const Sidebar = () => {
  const usedGB = 15.4;
  const totalGB = 100;
  const percentage = (usedGB / totalGB) * 100;

  return (
    <aside className="fixed left-0 top-20 bottom-0 py-8 w-72 bg-surface-container-low flex flex-col border-r border-border/20 font-headline text-sm font-medium overflow-y-auto hidden md:flex">
      <div className="px-6 mb-8">
        <h2 className="text-lg font-bold text-foreground">The Vault</h2>
        <p className="text-xs text-muted-foreground font-normal">Premium Storage</p>
      </div>

      <nav className="space-y-2 px-4 flex-1">
        {sidebarLinks.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-full hover:translate-x-1 transition-transform"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="px-6 mt-auto">
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-soft mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold text-muted-foreground">Storage Usage</span>
            <span className="text-xs font-bold text-primary">{usedGB} GB / {totalGB} GB</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <button className="w-full mt-4 py-2 gradient-primary text-primary-foreground rounded-full text-xs font-bold hover:shadow-primary-glow transition-all">
            Upgrade Plan
          </button>
        </div>

        <div className="space-y-2 pb-4">
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:bg-muted rounded-full transition-all">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:bg-muted rounded-full transition-all">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
