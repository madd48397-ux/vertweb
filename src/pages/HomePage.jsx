import { useSite } from "../context/SiteContext";
import SectionRenderer from "../components/SectionRenderer";

export default function HomePage() {
  const { content } = useSite();
  const page = content.pages.home;

  if (!page) return null;

  return <SectionRenderer sections={page.sections} />;
}
