import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";
import { ArrowRight, Calendar } from "lucide-react";

export default function NewsSection({ data }) {
  const { content } = useSite();
  const maxItems = data.maxItems || 3;
  const articles = (content.news || []).slice(0, maxItems);

  if (!articles.length) return null;

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>
          <Link
            to="/about/newsroom"
            className="hidden sm:inline-flex items-center gap-2 text-verdot font-semibold hover:gap-3 transition-all"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-verdot/5 to-verdot/15 flex items-center justify-center">
                <div className="w-16 h-16 bg-verdot/10 rounded-full flex items-center justify-center">
                  <span className="text-verdot font-bold text-2xl">V</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Calendar size={14} />
                  {new Date(article.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-verdot transition-colors line-clamp-2 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-verdot font-semibold text-sm">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/about/newsroom"
            className="inline-flex items-center gap-2 text-verdot font-semibold"
          >
            View All News <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
