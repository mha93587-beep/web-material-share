import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Mail, HardDrive, Shield, Bell, Moon,
  LogOut, ChevronRight, Camera, Star, FileText, Share2
} from "lucide-react";
import TopAppBar from "@/components/TopAppBar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/use-theme";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const stats = [
    { label: "Files", value: "10", icon: FileText },
    { label: "Shared", value: "4", icon: Share2 },
    { label: "Starred", value: "4", icon: Star },
  ];

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", action: "link" as const, path: "/profile/edit" },
        { icon: Mail, label: "Email Notifications", action: "toggle" as const, value: notifications, onToggle: () => setNotifications(!notifications) },
        { icon: Shield, label: "Privacy & Security", action: "link" as const },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Moon, label: "Dark Mode", action: "toggle" as const, value: darkMode, onToggle: () => setDarkMode(!darkMode) },
        { icon: Bell, label: "Push Notifications", action: "link" as const },
        { icon: HardDrive, label: "Storage Management", action: "link" as const },
      ],
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />

      <main className="pt-20 px-4 md:px-8 lg:px-12 pb-28 md:pb-12 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mt-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-surface-container text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground font-headline">
            Profile
          </h1>
        </div>

        {/* Avatar Card */}
        <div className="glass-card rounded-2xl p-6 mb-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-extrabold shadow-lg">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-surface-container border-2 border-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-extrabold text-foreground font-headline">John Doe</h2>
          <p className="text-sm text-muted-foreground mt-0.5">john.doe@example.com</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 w-full max-w-xs">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-4 h-4 text-primary mb-1" />
                <span className="text-lg font-extrabold text-foreground">{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage */}
        <div className="glass-card rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <HardDrive className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground text-sm">Storage</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">1.06 GB used</span>
            <span className="text-muted-foreground">5 GB total</span>
          </div>
          <div className="h-2 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full gradient-primary rounded-full" style={{ width: "21%" }} />
          </div>
        </div>

        {/* Settings */}
        {settingsGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-1">
              {group.title}
            </h3>
            <div className="glass-card rounded-xl overflow-hidden divide-y divide-outline-variant/10">
              {group.items.map((item) => (
                <div
                  key={item.label}
                  onClick={item.action === "link" && "path" in item ? () => navigate((item as any).path) : undefined}
                  className="flex items-center gap-3 px-5 py-4 hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-sm font-bold text-foreground">{item.label}</span>
                  {item.action === "toggle" ? (
                    <button
                      onClick={item.onToggle}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        item.value ? "bg-primary" : "bg-surface-container"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-background shadow-sm transition-transform ${
                          item.value ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign Out */}
        <button className="w-full glass-card rounded-xl px-5 py-4 flex items-center gap-3 text-destructive hover:bg-destructive/5 transition-colors mb-6">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-bold">Sign Out</span>
        </button>
      </main>

      <MobileNav />
      <Footer />
    </div>
  );
};

export default ProfilePage;
