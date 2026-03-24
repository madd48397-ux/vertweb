import { Image } from "lucide-react";

export default function TextImageSection({ data }) {
  const imageRight = data.layout !== "image-left";

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {data.heading}
      </h2>
      <div className="mt-6 text-gray-600 leading-relaxed whitespace-pre-line text-lg">
        {data.body}
      </div>
    </div>
  );

  const imageBlock = (
    <div className="relative">
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt={data.imageAlt || data.heading}
          className="rounded-2xl shadow-xl w-full h-80 md:h-96 object-cover"
        />
      ) : (
        <div className="rounded-2xl bg-gradient-to-br from-verdot-light to-verdot/10 w-full h-80 md:h-96 flex items-center justify-center">
          <div className="text-center text-verdot/40">
            <Image size={64} className="mx-auto mb-3" />
            <p className="text-sm font-medium">Image Placeholder</p>
          </div>
        </div>
      )}
      {/* Decorative element */}
      <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-verdot/10" />
    </div>
  );

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {imageRight ? (
            <>
              {textBlock}
              {imageBlock}
            </>
          ) : (
            <>
              {imageBlock}
              {textBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
