import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { content } = useSite();
  const { global: g, navigation } = content;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-verdot rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">VERDOT</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tailored purification technologies through sustainable engineering. Over 70 years of custom solution design.
            </p>
            <div className="flex gap-3 pt-2">
              {g.socialLinks?.linkedin && (
                <a href={g.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-verdot flex items-center justify-center transition-colors">
                  <Linkedin size={18} />
                </a>
              )}
              {g.socialLinks?.youtube && (
                <a href={g.socialLinks.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-verdot flex items-center justify-center transition-colors">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-3">
              {(navigation.find((n) => n.id === "solutions")?.children || []).map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="text-sm hover:text-verdot transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {(navigation.find((n) => n.id === "about")?.children || []).map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="text-sm hover:text-verdot transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="shrink-0 mt-0.5 text-verdot" />
                <span>{g.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="shrink-0 text-verdot" />
                <span>{g.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="shrink-0 text-verdot" />
                <a href={`mailto:${g.contactEmail}`} className="hover:text-verdot transition-colors">{g.contactEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">{g.footerText}</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
