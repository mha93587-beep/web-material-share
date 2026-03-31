import { Outlet } from "react-router-dom";
import TopAppBar from "@/components/TopAppBar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";

const AppLayout = () => {
  return (
    <div className="bg-background min-h-screen">
      <TopAppBar />
      <Outlet />
      <MobileNav />
      <Footer />
    </div>
  );
};

export default AppLayout;
