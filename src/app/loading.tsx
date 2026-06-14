export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-stone-100 rounded w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-stone-100 rounded-lg" />
              <div className="h-4 bg-stone-100 rounded w-3/4" />
              <div className="h-4 bg-stone-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
