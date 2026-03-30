import { Home, Folder, Plus, Share2, User } from "lucide-react";

const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full glass-card flex justify-around items-center h-20 px-4 z-50">
      <a href="#" className="flex flex-col items-center gap-1 text-primary">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
      </a>
      <a href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
        <Folder className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Files</span>
      </a>
      <div className="relative -top-8">
        <button className="w-14 h-14 gradient-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center">
          <Plus className="w-7 h-7" />
        </button>
      </div>
      <a href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
        <Share2 className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Shared</span>
      </a>
      <a href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
      </a>
    </nav>
  );
};

export default MobileNav;
