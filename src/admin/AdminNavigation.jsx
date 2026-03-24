import { useState } from "react";
import { useSite } from "../context/SiteContext";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Save } from "lucide-react";

export default function AdminNavigation() {
  const { content, updateNavigation } = useSite();
  const [nav, setNav] = useState(structuredClone(content.navigation));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateNavigation(nav);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    setNav([...nav, {
      id: `nav-${Date.now()}`,
      label: "New Link",
      href: "/new-page",
      children: [],
    }]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...nav];
    updated[index] = { ...updated[index], [field]: value };
    setNav(updated);
  };

  const removeItem = (index) => {
    setNav(nav.filter((_, i) => i !== index));
  };

  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= nav.length) return;
    const updated = [...nav];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setNav(updated);
  };

  const addChild = (parentIndex) => {
    const updated = [...nav];
    const parent = { ...updated[parentIndex] };
    parent.children = [...(parent.children || []), {
      id: `nav-child-${Date.now()}`,
      label: "New Sub-link",
      href: "/new-sub-page",
    }];
    updated[parentIndex] = parent;
    setNav(updated);
  };

  const updateChild = (parentIndex, childIndex, field, value) => {
    const updated = [...nav];
    const parent = { ...updated[parentIndex] };
    parent.children = [...parent.children];
    parent.children[childIndex] = { ...parent.children[childIndex], [field]: value };
    updated[parentIndex] = parent;
    setNav(updated);
  };

  const removeChild = (parentIndex, childIndex) => {
    const updated = [...nav];
    const parent = { ...updated[parentIndex] };
    parent.children = parent.children.filter((_, i) => i !== childIndex);
    updated[parentIndex] = parent;
    setNav(updated);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigation</h1>
          <p className="text-gray-500 mt-1">Manage your site navigation menu.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-600 font-medium animate-fade-in">✓ Saved</span>}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-verdot text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-verdot-dark transition-colors"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {nav.map((item, index) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              <GripVertical size={16} className="text-gray-300 shrink-0" />
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateItem(index, "label", e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => updateItem(index, "href", e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                  placeholder="/path"
                />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                  <ChevronUp size={14} />
                </button>
                <button onClick={() => moveItem(index, 1)} disabled={index === nav.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                  <ChevronDown size={14} />
                </button>
                <button onClick={() => removeItem(index)} className="p-1 text-gray-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Children */}
            {item.children && item.children.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-3 ml-8 space-y-2">
                {item.children.map((child, ci) => (
                  <div key={child.id} className="flex items-center gap-3">
                    <div className="w-4 border-l-2 border-b-2 border-gray-200 h-4 rounded-bl" />
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={child.label}
                        onChange={(e) => updateChild(index, ci, "label", e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                        placeholder="Sub-label"
                      />
                      <input
                        type="text"
                        value={child.href}
                        onChange={(e) => updateChild(index, ci, "href", e.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                        placeholder="/sub-path"
                      />
                    </div>
                    <button onClick={() => removeChild(index, ci)} className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-gray-50 px-4 py-2">
              <button
                onClick={() => addChild(index)}
                className="text-xs text-verdot font-medium hover:underline"
              >
                + Add sub-item
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-verdot hover:text-verdot transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Navigation Item
      </button>
    </div>
  );
}
