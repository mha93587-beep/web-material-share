import TopAppBar from "@/components/TopAppBar";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import useDocumentTitle from "@/hooks/use-document-title";

const Index = () => {
  useDocumentTitle();

  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />
      <Sidebar />
      <main>
        <Dashboard />
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default Index;
