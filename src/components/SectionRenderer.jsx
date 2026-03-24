import {
  HeroSection,
  TextImageSection,
  CardsSection,
  TextBlockSection,
  NewsSection,
  NewsletterSection,
  ContactFormSection,
} from "./sections";

const sectionComponents = {
  hero: HeroSection,
  "text-image": TextImageSection,
  cards: CardsSection,
  "text-block": TextBlockSection,
  news: NewsSection,
  newsletter: NewsletterSection,
  "contact-form": ContactFormSection,
};

export default function SectionRenderer({ sections }) {
  if (!sections || !sections.length) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p className="text-lg">No sections configured for this page.</p>
        <p className="text-sm mt-2">Add sections from the admin panel.</p>
      </div>
    );
  }

  return (
    <>
      {sections.map((section, index) => {
        const Component = sectionComponents[section.type];
        if (!Component) {
          return (
            <div key={section.id || index} className="py-12 text-center text-gray-400 bg-gray-50">
              <p>Unknown section type: <code>{section.type}</code></p>
            </div>
          );
        }
        return <Component key={section.id || index} data={section} />;
      })}
    </>
  );
}
