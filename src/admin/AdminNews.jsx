import { useState } from "react";
import { useSite } from "../context/SiteContext";
import { Plus, Edit3, Trash2, X, Save, Calendar } from "lucide-react";

export default function AdminNews() {
  const { content, addNews, updateNews, deleteNews } = useSite();
  const [editing, setEditing] = useState(null); // null | "new" | article id
  const [form, setForm] = useState({ title: "", date: "", excerpt: "", body: "", slug: "", image: "" });

  const articles = content.news || [];

  const startNew = () => {
    setForm({
      title: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      body: "",
      slug: "",
      image: "",
    });
    setEditing("new");
  };

  const startEdit = (article) => {
    setForm({ ...article });
    setEditing(article.id);
  };

  const handleSave = () => {
    if (!form.title || !form.date) return;
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (editing === "new") {
      addNews({ ...form, id: `news-${Date.now()}`, slug });
    } else {
      updateNews(editing, { ...form, slug });
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this article?")) {
      deleteNews(id);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Blog</h1>
          <p className="text-gray-500 mt-1">Manage your news articles and blog posts.</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 bg-verdot text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-verdot-dark transition-colors"
        >
          <Plus size={18} />
          New Article
        </button>
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {editing === "new" ? "New Article" : "Edit Article"}
            </h3>
            <button onClick={() => setEditing(null)} className="p-1 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                  placeholder="Article title"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot resize-none"
                placeholder="Short summary..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Full Content</label>
              <textarea
                rows={6}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot resize-none"
                placeholder="Full article content..."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                  placeholder="auto-generated-from-title"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  value={form.image || ""}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 bg-verdot text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-verdot-dark"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {articles.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p>No articles yet. Click "New Article" to create one.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900">{article.title}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="truncate">{article.excerpt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => startEdit(article)}
                    className="p-2 text-gray-400 hover:text-verdot rounded-lg hover:bg-verdot-light/50 transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
