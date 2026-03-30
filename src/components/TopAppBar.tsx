import { Link, useLocation } from "react-router-dom";
import { Bell, Settings, Search } from "lucide-react";

const TopAppBar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <header className="fixed top-0 w-full z-50 glass-card shadow-soft h-20 px-8 flex justify-between items-center font-headline">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-foreground">
          Web Material
        </Link>
        {isDashboard && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-primary font-semibold border-b-2 border-primary py-6"
            >
              Dashboard
            </Link>
            <span className="text-muted-foreground hover:text-foreground transition-all py-6 cursor-pointer">
              Shared
            </span>
            <span className="text-muted-foreground hover:text-foreground transition-all py-6 cursor-pointer">
              Recent
            </span>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isDashboard && (
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="bg-surface-container-high border-none rounded-lg pl-12 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-sm"
              placeholder="Search files..."
              type="text"
            />
          </div>
        )}
        <button className="p-2 hover:bg-muted rounded-full transition-all active:scale-95">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full transition-all active:scale-95">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden ml-2 ring-2 ring-primary/10 bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">A</span>
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
