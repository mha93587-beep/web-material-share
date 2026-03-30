import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import DownloadPage from "./pages/DownloadPage.tsx";
import UploadPage from "./pages/UploadPage.tsx";
import FilesPage from "./pages/FilesPage.tsx";
import SharedPage from "./pages/SharedPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import EditProfilePage from "./pages/EditProfilePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/shared" element={<SharedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/d/:fileId" element={<DownloadPageWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

// Wrapper to include header/footer on download page
import TopAppBar from "@/components/TopAppBar";
import Footer from "@/components/Footer";

const DownloadPageWrapper = () => (
  <div className="bg-background min-h-screen">
    <TopAppBar />
    <DownloadPage />
    <Footer />
  </div>
);

export default App;
