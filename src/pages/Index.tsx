import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import useDocumentTitle from "@/hooks/use-document-title";

const Index = () => {
  useDocumentTitle();

  return (
    <>
      <Sidebar />
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default Index;
