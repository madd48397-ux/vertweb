import { Link } from "react-router-dom";
import { ArrowRight, Columns3, Filter, Settings, FlaskConical, Box } from "lucide-react";

const iconMap = {
  Columns3: Columns3,
  Filter: Filter,
  Settings: Settings,
  FlaskConical: FlaskConical,
  Box: Box,
};

export default function CardsSection({ data }) {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{data.heading}</h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${(data.cards?.length || 0) >= 3 ? "lg:grid-cols-3" : ""} gap-8`}>
          {(data.cards || []).map((card) => {
            const IconComponent = iconMap[card.icon] || Box;
            return (
              <Link
                key={card.id}
                to={card.link || "#"}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-verdot/20 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-verdot-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-verdot group-hover:text-white transition-colors text-verdot">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-verdot transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-2 text-verdot font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
