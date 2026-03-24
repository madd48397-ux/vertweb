import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ data }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            {data.heading}
          </h1>
          {data.subheading && (
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {data.subheading}
            </p>
          )}
          {data.ctaText && (
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={data.ctaLink || "/solutions"}
                className="inline-flex items-center gap-2 bg-white text-verdot-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all hover:shadow-lg hover:shadow-white/20"
              >
                {data.ctaText}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
