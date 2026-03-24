import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DynamicPage from "./pages/DynamicPage";
import HomePage from "./pages/HomePage";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="*"
            element={
              <PublicLayout>
                <DynamicPage />
              </PublicLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
