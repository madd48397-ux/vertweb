import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { DEFAULT_USERS } from "../data/roles";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const { login } = useSite();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = DEFAULT_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      login(user);
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-verdot rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VERDOT Admin</h1>
          <p className="text-gray-500 mt-1">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-verdot text-white py-3.5 rounded-xl font-semibold hover:bg-verdot-dark transition-colors"
          >
            Sign In
          </button>

          <div className="text-xs text-gray-400 text-center pt-2 space-y-1">
            <p><strong>Demo accounts:</strong></p>
            <p>admin / admin &nbsp;•&nbsp; dev / dev123 &nbsp;•&nbsp; marketing / mkt123</p>
          </div>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-500 hover:text-verdot transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
