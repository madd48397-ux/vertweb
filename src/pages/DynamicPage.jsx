import { useParams, useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import SectionRenderer from "../components/SectionRenderer";

export default function DynamicPage() {
  const { content } = useSite();
  const location = useLocation();

  // Find matching page by slug
  const pageEntry = Object.values(content.pages).find(
    (p) => p.slug === location.pathname
  );

  if (!pageEntry) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-verdot-light rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, this page doesn't exist yet.</p>
        <a href="/" className="text-verdot font-semibold hover:underline">
          ← Back to Home
        </a>
      </div>
    );
  }

  return (
    <main>
      <SectionRenderer sections={pageEntry.sections} />
    </main>
  );
}
