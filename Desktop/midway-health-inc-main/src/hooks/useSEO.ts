import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to dynamically set page title and meta description for SEO.
 */
const useSEO = (title: string, description: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}${pathname}`);

    return () => {
      document.title = "Midway Health Inc. | Compassionate Home Healthcare";
    };
  }, [title, description, pathname]);
};

export default useSEO;
