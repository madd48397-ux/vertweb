import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { hasPermission } from "../data/roles";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Eye,
  Save,
  Type,
  Image,
  LayoutGrid,
  Newspaper,
  Mail,
  MessageSquare,
  FileText,
} from "lucide-react";

const SECTION_TYPES = [
  { type: "hero", label: "Hero Banner", icon: Type, description: "Full-width hero with heading and CTA" },
  { type: "text-image", label: "Text + Image", icon: Image, description: "Side-by-side text and image" },
  { type: "cards", label: "Card Grid", icon: LayoutGrid, description: "Grid of feature/product cards" },
  { type: "text-block", label: "Text Block", icon: FileText, description: "Centered text section" },
  { type: "news", label: "News Feed", icon: Newspaper, description: "Display latest news articles" },
  { type: "newsletter", label: "Newsletter Signup", icon: Mail, description: "Email subscription form" },
  { type: "contact-form", label: "Contact Form", icon: MessageSquare, description: "Contact form with fields" },
];

function sectionTemplate(type) {
  const id = `section-${Date.now()}`;
  switch (type) {
    case "hero":
      return { id, type, heading: "New Hero Section", subheading: "Add your subtitle here", ctaText: "Learn More", ctaLink: "/" };
    case "text-image":
      return { id, type, heading: "New Section", body: "Add your content here.", imageUrl: "", imageAlt: "", layout: "image-right" };
    case "cards":
      return { id, type, heading: "New Cards Section", cards: [
        { id: `card-${Date.now()}`, title: "Card 1", description: "Description here", icon: "Box", link: "#" },
      ]};
    case "text-block":
      return { id, type, heading: "New Text Section", body: "Your content goes here." };
    case "news":
      return { id, type, heading: "Latest News", maxItems: 3 };
    case "newsletter":
      return { id, type, heading: "Stay Updated", body: "Subscribe to our newsletter." };
    case "contact-form":
      return { id, type, heading: "Contact Us" };
    default:
      return { id, type, heading: "New Section" };
  }
}

function SectionEditor({ section, index, pageId, onChange }) {
  const [collapsed, setCollapsed] = useState(false);

  const update = (key, value) => {
    onChange({ ...section, [key]: value });
  };

  const typeInfo = SECTION_TYPES.find((t) => t.type === section.type);
  const Icon = typeInfo?.icon || FileText;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div
        className="flex items-center gap-3 px-4 py-3 bg-gray-50 cursor-pointer select-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        <GripVertical size={16} className="text-gray-300" />
        <Icon size={16} className="text-verdot" />
        <span className="font-medium text-sm text-gray-900 flex-1">
          {section.heading || typeInfo?.label || section.type}
        </span>
        <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full">{section.type}</span>
        {collapsed ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-gray-400" />}
      </div>

      {!collapsed && (
        <div className="p-5 space-y-4">
          {/* Common: heading */}
          {section.heading !== undefined && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Heading</label>
              <input
                type="text"
                value={section.heading || ""}
                onChange={(e) => update("heading", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
          )}

          {/* Common: subheading */}
          {section.subheading !== undefined && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Subtitle</label>
              <textarea
                rows={2}
                value={section.subheading || ""}
                onChange={(e) => update("subheading", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot resize-none"
              />
            </div>
          )}

          {/* Common: body */}
          {section.body !== undefined && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Body Content</label>
              <textarea
                rows={4}
                value={section.body || ""}
                onChange={(e) => update("body", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot resize-none"
              />
            </div>
          )}

          {/* Hero: CTA */}
          {section.type === "hero" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Button Text</label>
                <input
                  type="text"
                  value={section.ctaText || ""}
                  onChange={(e) => update("ctaText", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Button Link</label>
                <input
                  type="text"
                  value={section.ctaLink || ""}
                  onChange={(e) => update("ctaLink", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                />
              </div>
            </div>
          )}

          {/* Text-image: layout + image */}
          {section.type === "text-image" && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  value={section.imageUrl || ""}
                  onChange={(e) => update("imageUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Layout</label>
                <select
                  value={section.layout || "image-right"}
                  onChange={(e) => update("layout", e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                >
                  <option value="image-right">Image Right</option>
                  <option value="image-left">Image Left</option>
                </select>
              </div>
            </>
          )}

          {/* Cards: editable list */}
          {section.type === "cards" && section.cards && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Cards</label>
              <div className="space-y-3">
                {section.cards.map((card, ci) => (
                  <div key={card.id} className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const cards = [...section.cards];
                        cards[ci] = { ...cards[ci], title: e.target.value };
                        update("cards", cards);
                      }}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                      placeholder="Card title"
                    />
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => {
                        const cards = [...section.cards];
                        cards[ci] = { ...cards[ci], description: e.target.value };
                        update("cards", cards);
                      }}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm resize-none"
                      placeholder="Card description"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={card.link || ""}
                        onChange={(e) => {
                          const cards = [...section.cards];
                          cards[ci] = { ...cards[ci], link: e.target.value };
                          update("cards", cards);
                        }}
                        className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                        placeholder="Link URL"
                      />
                      <button
                        onClick={() => {
                          const cards = section.cards.filter((_, i) => i !== ci);
                          update("cards", cards);
                        }}
                        className="p-1.5 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const cards = [...(section.cards || []), {
                      id: `card-${Date.now()}`,
                      title: "New Card",
                      description: "Description",
                      icon: "Box",
                      link: "#",
                    }];
                    update("cards", cards);
                  }}
                  className="text-sm text-verdot font-medium hover:underline"
                >
                  + Add Card
                </button>
              </div>
            </div>
          )}

          {/* News: maxItems */}
          {section.type === "news" && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Max Articles</label>
              <input
                type="number"
                min={1}
                max={12}
                value={section.maxItems || 3}
                onChange={(e) => update("maxItems", parseInt(e.target.value, 10))}
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminPageEditor() {
  const { pageId } = useParams();
  const { content, updateContent, addSection, removeSection, reorderSections, currentUser } = useSite();
  const [showAddSection, setShowAddSection] = useState(false);

  const page = content.pages[pageId];
  const canManageSections = hasPermission(currentUser?.role, "add_sections");

  if (!page) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Page not found.</p>
        <Link to="/admin/pages" className="text-verdot font-medium hover:underline mt-4 inline-block">
          ← Back to Pages
        </Link>
      </div>
    );
  }

  const handleSectionChange = (index, updatedSection) => {
    updateContent(`pages.${pageId}.sections.${index}`, updatedSection);
  };

  const handleAddSection = (type) => {
    addSection(pageId, sectionTemplate(type));
    setShowAddSection(false);
  };

  const handleRemoveSection = (index) => {
    if (confirm("Remove this section?")) {
      removeSection(pageId, index);
    }
  };

  const moveSection = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < page.sections.length) {
      reorderSections(pageId, index, newIndex);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/pages"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
            <p className="text-sm text-gray-400">{page.slug}</p>
          </div>
        </div>
        <a
          href={page.slug}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-verdot font-medium hover:underline"
        >
          <Eye size={16} />
          Preview
        </a>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {page.sections.map((section, index) => (
          <div key={section.id || index} className="relative group">
            <SectionEditor
              section={section}
              index={index}
              pageId={pageId}
              onChange={(updated) => handleSectionChange(index, updated)}
            />
            {/* Section controls */}
            <div className="absolute -right-12 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveSection(index, -1)}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => moveSection(index, 1)}
                disabled={index === page.sections.length - 1}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronDown size={14} />
              </button>
              {canManageSections && (
                <button
                  onClick={() => handleRemoveSection(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add section */}
      {canManageSections && (
        <div className="mt-6">
          {showAddSection ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fade-in">
              <h3 className="font-semibold text-gray-900 mb-4">Add Section</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SECTION_TYPES.map((st) => {
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.type}
                      onClick={() => handleAddSection(st.type)}
                      className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-verdot hover:bg-verdot-light/30 transition-all text-left"
                    >
                      <Icon size={20} className="text-verdot mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{st.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{st.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setShowAddSection(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddSection(true)}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-verdot hover:text-verdot transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Section
            </button>
          )}
        </div>
      )}
    </div>
  );
}
