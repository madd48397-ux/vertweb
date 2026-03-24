import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { content } = useSite();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const nav = content.navigation || [];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-verdot rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold text-verdot-dark tracking-tight">
              VERDOT
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith(item.href) && item.href !== "/"
                      ? "text-verdot bg-verdot-light"
                      : "text-gray-700 hover:text-verdot hover:bg-verdot-light/50"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                </Link>

                {item.children && openDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-verdot hover:bg-verdot-light/30 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden sm:inline-flex bg-verdot text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-verdot-dark transition-colors"
            >
              Request a Quote
            </Link>
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-verdot"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {nav.map((item) => (
              <div key={item.id}>
                <Link
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-verdot-light hover:text-verdot transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:text-verdot hover:bg-verdot-light/30"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 text-center bg-verdot text-white px-5 py-3 rounded-lg font-semibold"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
