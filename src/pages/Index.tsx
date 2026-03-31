import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { SEOMeta } from "@/components/SEOMeta";
import { BASE_URL } from "@/lib/seo";

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Web Material",
  url: BASE_URL,
  description: "Secure cloud file storage and sharing platform. Upload, organize, and share your files with ease.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const Index = () => {
  return (
    <>
      <SEOMeta
        title="Secure Cloud File Storage & Sharing"
        description="Web Material is your premium cloud vault. Upload, organize, and share files securely with anyone — fast, private, and beautifully designed."
        canonical="/"
        structuredData={siteSchema}
      />
      <Sidebar />
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default Index;
