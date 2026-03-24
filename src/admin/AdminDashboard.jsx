import { useSite } from "../context/SiteContext";
import { Link } from "react-router-dom";
import { FileText, Newspaper, Globe, Users, ArrowRight, Eye } from "lucide-react";

export default function AdminDashboard() {
  const { content, currentUser } = useSite();
  const pageCount = Object.keys(content.pages).length;
  const newsCount = content.news.length;
  const navCount = content.navigation.length;

  const stats = [
    { label: "Pages", value: pageCount, icon: FileText, color: "bg-blue-50 text-blue-600", link: "/admin/pages" },
    { label: "News Articles", value: newsCount, icon: Newspaper, color: "bg-green-50 text-green-600", link: "/admin/news" },
    { label: "Nav Items", value: navCount, icon: Globe, color: "bg-purple-50 text-purple-600", link: "/admin/navigation" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser?.name || "User"}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your website content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/pages"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-verdot-light transition-colors group"
          >
            <FileText size={20} className="text-gray-400 group-hover:text-verdot" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-verdot">Edit Pages</span>
          </Link>
          <Link
            to="/admin/news"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-verdot-light transition-colors group"
          >
            <Newspaper size={20} className="text-gray-400 group-hover:text-verdot" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-verdot">Manage News</span>
          </Link>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-verdot-light transition-colors group"
          >
            <Eye size={20} className="text-gray-400 group-hover:text-verdot" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-verdot">View Live Site</span>
          </a>
        </div>
      </div>

      {/* Recent news */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent News</h2>
          <Link to="/admin/news" className="text-sm text-verdot font-medium hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {content.news.slice(0, 5).map((article) => (
            <div key={article.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <div className="text-sm font-medium text-gray-900">{article.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{new Date(article.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
