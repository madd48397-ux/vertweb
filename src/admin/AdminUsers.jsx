import { useState } from "react";
import { ROLES, DEFAULT_USERS } from "../data/roles";
import { Users, Shield, Edit3, Trash2, Plus } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("verdot_cms_users");
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("verdot_cms_users", JSON.stringify(updated));
  };

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ username: "", password: "", role: "marketing", name: "" });

  const startNew = () => {
    setForm({ username: "", password: "", role: "marketing", name: "" });
    setEditing("new");
  };

  const startEdit = (user) => {
    setForm({ ...user, password: "" });
    setEditing(user.id);
  };

  const handleSave = () => {
    if (!form.username || !form.name) return;
    if (editing === "new") {
      if (!form.password) return alert("Password required for new user.");
      saveUsers([...users, { ...form, id: `user-${Date.now()}` }]);
    } else {
      saveUsers(
        users.map((u) =>
          u.id === editing ? { ...u, ...form, password: form.password || u.password } : u
        )
      );
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (users.length <= 1) return alert("Cannot delete the last user.");
    if (confirm("Delete this user?")) {
      saveUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage user accounts and their permission levels.</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 bg-verdot text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-verdot-dark transition-colors"
        >
          <Plus size={18} />
          New User
        </button>
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(ROLES).map(([key, role]) => (
          <div key={key} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-verdot" />
              <span className="font-semibold text-gray-900 text-sm">{role.label}</span>
            </div>
            <p className="text-xs text-gray-500">{role.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {role.permissions.slice(0, 4).map((p) => (
                <span key={p} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {p.replace(/_/g, " ")}
                </span>
              ))}
              {role.permissions.length > 4 && (
                <span className="text-[10px] text-gray-400">+{role.permissions.length - 4} more</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 animate-fade-in">
          <h3 className="font-semibold text-gray-900 mb-4">
            {editing === "new" ? "New User" : "Edit User"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                Password {editing !== "new" && "(leave blank to keep)"}
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
              >
                {Object.entries(ROLES).map(([key, role]) => (
                  <option key={key} value={key}>{role.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-verdot text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-verdot-dark">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-verdot/10 rounded-full flex items-center justify-center">
                  <span className="text-verdot font-semibold text-sm">{user.name?.charAt(0) || "U"}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span>@{user.username}</span>
                    <span className="text-xs bg-verdot-light text-verdot px-2 py-0.5 rounded-full font-medium capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(user)}
                  className="p-2 text-gray-400 hover:text-verdot rounded-lg hover:bg-verdot-light/50 transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
