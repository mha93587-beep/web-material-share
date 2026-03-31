import { useEffect } from "react";

const BASE_TITLE = "Web Material";

const useDocumentTitle = (pageTitle?: string) => {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${BASE_TITLE}` : `${BASE_TITLE} – Secure Cloud File Storage & Sharing`;
  }, [pageTitle]);
};

export default useDocumentTitle;
