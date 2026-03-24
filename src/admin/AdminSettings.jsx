import { useState } from "react";
import { useSite } from "../context/SiteContext";
import { Save, RotateCcw, Download, Upload } from "lucide-react";

export default function AdminSettings() {
  const { content, updateContent, resetContent, replaceContent } = useSite();
  const [saved, setSaved] = useState(false);
  const g = content.global;

  const update = (key, value) => {
    updateContent(`global.${key}`, value);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verdot-cms-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.global && data.pages && data.navigation) {
          replaceContent(data);
          alert("Content imported successfully!");
        } else {
          alert("Invalid backup file.");
        }
      } catch {
        alert("Failed to parse file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset ALL content to defaults? This cannot be undone.")) {
      resetContent();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Global website settings and configuration.</p>
      </div>

      {/* General settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">General</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Site Name</label>
              <input
                type="text"
                value={g.siteName}
                onChange={(e) => update("siteName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Tagline</label>
              <input
                type="text"
                value={g.tagline}
                onChange={(e) => update("tagline", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Contact Email</label>
              <input
                type="email"
                value={g.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Contact Phone</label>
              <input
                type="text"
                value={g.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Address</label>
            <input
              type="text"
              value={g.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Footer Text</label>
            <input
              type="text"
              value={g.footerText}
              onChange={(e) => update("footerText", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
            />
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">LinkedIn URL</label>
            <input
              type="url"
              value={g.socialLinks?.linkedin || ""}
              onChange={(e) => updateContent("global.socialLinks.linkedin", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">YouTube URL</label>
            <input
              type="url"
              value={g.socialLinks?.youtube || ""}
              onChange={(e) => updateContent("global.socialLinks.youtube", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
            />
          </div>
        </div>
      </div>

      {/* Data management */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Export Backup
          </button>
          <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Upload size={16} />
            Import Backup
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <RotateCcw size={16} />
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
