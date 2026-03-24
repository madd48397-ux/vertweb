import { Navigate, Routes, Route, Link, useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { hasPermission } from "../data/roles";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Navigation,
  Settings,
  Users,
  LogOut,
  Image,
  Globe,
  ChevronRight,
} from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import AdminPages from "./AdminPages";
import AdminPageEditor from "./AdminPageEditor";
import AdminNews from "./AdminNews";
import AdminNavigation from "./AdminNavigation";
import AdminSettings from "./AdminSettings";
import AdminUsers from "./AdminUsers";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin", permission: null },
  { id: "pages", label: "Pages", icon: FileText, path: "/admin/pages", permission: "edit_content" },
  { id: "news", label: "News & Blog", icon: Newspaper, path: "/admin/news", permission: "manage_news" },
  { id: "navigation", label: "Navigation", icon: Navigation, path: "/admin/navigation", permission: "manage_navigation" },
  { id: "users", label: "Users", icon: Users, path: "/admin/users", permission: "manage_users" },
  { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings", permission: "manage_settings" },
];

export default function AdminLayout() {
  const { currentUser, logout } = useSite();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const visibleItems = sidebarItems.filter(
    (item) => item.permission === null || hasPermission(currentUser.role, item.permission)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-verdot rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">VERDOT CMS</div>
              <div className="text-xs text-gray-400">Content Management</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-verdot-light text-verdot"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 bg-verdot/10 rounded-full flex items-center justify-center">
              <span className="text-verdot font-semibold text-sm">
                {currentUser.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</div>
              <div className="text-xs text-gray-400 capitalize">{currentUser.role}</div>
            </div>
            <button
              onClick={() => {
                logout();
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="pages/:pageId" element={<AdminPageEditor />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="navigation" element={<AdminNavigation />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
}
