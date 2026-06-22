export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3 animate-pulse">
          <div className="aspect-square rounded-lg bg-stone-100" />
          <div className="h-4 w-3/4 bg-stone-100 rounded" />
          <div className="h-4 w-1/3 bg-stone-100 rounded" />
        </div>
      ))}
    </div>
  );
}
