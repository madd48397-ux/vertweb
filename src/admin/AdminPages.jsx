import { useState } from "react";
import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { hasPermission } from "../data/roles";
import { FileText, Plus, Edit3, Trash2, Eye, Layers } from "lucide-react";

export default function AdminPages() {
  const { content, currentUser, addPage, deletePage } = useSite();
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const pages = Object.entries(content.pages);
  const canCreate = hasPermission(currentUser?.role, "create_pages");
  const canDelete = hasPermission(currentUser?.role, "delete_pages");

  const handleCreate = (e) => {
    e.preventDefault();
    const id = newSlug.replace(/^\//, "").replace(/\//g, "-") || newTitle.toLowerCase().replace(/\s+/g, "-");
    addPage(id, {
      id,
      title: newTitle,
      slug: newSlug.startsWith("/") ? newSlug : `/${newSlug}`,
      sections: [],
    });
    setNewTitle("");
    setNewSlug("");
    setShowNew(false);
  };

  const handleDelete = (pageId) => {
    if (pageId === "home") return alert("Cannot delete the home page.");
    if (confirm(`Delete page "${content.pages[pageId]?.title}"?`)) {
      deletePage(pageId);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-500 mt-1">Manage your website pages and their content.</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 bg-verdot text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-verdot-dark transition-colors"
          >
            <Plus size={18} />
            New Page
          </button>
        )}
      </div>

      {/* New page form */}
      {showNew && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 animate-fade-in">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Page</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  setNewSlug("/" + e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""));
                }}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                placeholder="e.g. Our Team"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                placeholder="/our-team"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-verdot text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-verdot-dark"
            >
              Create Page
            </button>
            <button
              type="button"
              onClick={() => setShowNew(false)}
              className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Pages list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {pages.map(([id, page]) => (
            <div key={id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-verdot-light rounded-xl flex items-center justify-center">
                  <FileText size={18} className="text-verdot" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{page.title}</div>
                  <div className="text-sm text-gray-400 flex items-center gap-3">
                    <span>{page.slug}</span>
                    <span className="flex items-center gap-1">
                      <Layers size={12} />
                      {page.sections?.length || 0} sections
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={page.slug}
                  target="_blank"
                  className="p-2 text-gray-400 hover:text-verdot rounded-lg hover:bg-verdot-light/50 transition-colors"
                  title="View page"
                >
                  <Eye size={16} />
                </a>
                <Link
                  to={`/admin/pages/${id}`}
                  className="p-2 text-gray-400 hover:text-verdot rounded-lg hover:bg-verdot-light/50 transition-colors"
                  title="Edit page"
                >
                  <Edit3 size={16} />
                </Link>
                {canDelete && id !== "home" && (
                  <button
                    onClick={() => handleDelete(id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete page"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
