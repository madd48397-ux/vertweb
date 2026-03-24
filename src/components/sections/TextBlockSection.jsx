export default function TextBlockSection({ data }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {data.heading}
        </h2>
        {data.body && (
          <p className="mt-6 text-lg text-gray-600 leading-relaxed whitespace-pre-line">
            {data.body}
          </p>
        )}
      </div>
    </section>
  );
}
