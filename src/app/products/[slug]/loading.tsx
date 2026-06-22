export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-stone-100 rounded" />
        <div className="h-4 w-4" />
        <div className="h-4 w-24 bg-stone-100 rounded" />
        <div className="h-4 w-4" />
        <div className="h-4 w-40 bg-stone-100 rounded" />
      </div>

      {/* Product detail: 2-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8">
        {/* Image */}
        <div className="aspect-square rounded-xl bg-stone-100" />

        {/* Info */}
        <div className="space-y-5">
          <div className="h-4 w-20 bg-stone-100 rounded" />
          <div className="h-9 w-3/4 bg-stone-100 rounded" />

          {/* Stars */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-5 h-5 bg-stone-100 rounded" />
              ))}
            </div>
            <div className="h-4 w-24 bg-stone-100 rounded" />
          </div>

          {/* Price */}
          <div className="h-8 w-24 bg-stone-100 rounded" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-stone-100 rounded" />
            <div className="h-4 w-5/6 bg-stone-100 rounded" />
            <div className="h-4 w-2/3 bg-stone-100 rounded" />
          </div>

          {/* Add to cart */}
          <div className="h-14 w-full bg-stone-100 rounded-full" />

          {/* Accordion items */}
          <div className="border-t border-stone-200 pt-8 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-24 bg-stone-100 rounded" />
                <div className="h-4 w-full bg-stone-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lifestyle image skeleton */}
      <div className="mt-8">
        <div className="aspect-[21/9] rounded-2xl bg-stone-100" />
      </div>

      {/* Related Products */}
      <section className="pb-16 mt-12">
        <div className="h-7 w-48 bg-stone-100 rounded mb-6" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-square rounded-lg bg-stone-100" />
              <div className="h-4 w-3/4 bg-stone-100 rounded" />
              <div className="h-4 w-1/4 bg-stone-100 rounded" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
