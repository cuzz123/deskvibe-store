export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
      {/* Hero skeleton */}
      <div className="mb-16 space-y-4">
        <div className="h-10 w-72 bg-stone-100 rounded" />
        <div className="h-5 w-96 bg-stone-100 rounded" />
        <div className="h-12 w-48 bg-stone-100 rounded-full mt-4" />
      </div>

      {/* Shop the Look skeleton */}
      <div className="mb-16">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-48 bg-stone-100 rounded" />
          <div className="h-4 w-64 bg-stone-100 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/3] rounded-xl bg-stone-100" />
              <div className="h-5 w-2/3 bg-stone-100 rounded" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="w-12 h-12 rounded-lg bg-stone-100" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid skeleton */}
      <div className="mb-16">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-48 bg-stone-100 rounded" />
          <div className="h-4 w-72 bg-stone-100 rounded" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg bg-stone-100" />
          ))}
        </div>
      </div>

      {/* Featured Products skeleton */}
      <div>
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 w-56 bg-stone-100 rounded" />
            <div className="h-4 w-72 bg-stone-100 rounded" />
          </div>
          <div className="h-5 w-24 bg-stone-100 rounded hidden sm:block" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square rounded-lg bg-stone-100" />
              <div className="h-4 w-3/4 bg-stone-100 rounded" />
              <div className="h-4 w-1/3 bg-stone-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
