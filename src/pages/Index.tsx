import TopAppBar from "@/components/TopAppBar";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />
      <Sidebar />
      <Dashboard />
      <MobileNav />
      <Footer />
    </div>
  );
};

export default Index;
