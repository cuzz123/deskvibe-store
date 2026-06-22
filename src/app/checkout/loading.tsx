export default function CheckoutLoading() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-8 w-36 bg-stone-100 rounded mb-8" />

      {/* Cart items */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
            <div className="w-16 h-16 rounded-md bg-stone-100 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-stone-100 rounded" />
              <div className="h-3 w-20 bg-stone-100 rounded" />
            </div>
            <div className="h-5 w-16 bg-stone-100 rounded" />
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-stone-200 pt-6 space-y-2 mb-8">
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-stone-100 rounded" />
          <div className="h-4 w-16 bg-stone-100 rounded" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-stone-100 rounded" />
          <div className="h-4 w-12 bg-stone-100 rounded" />
        </div>
        <div className="flex justify-between pt-2 border-t border-stone-200">
          <div className="h-6 w-12 bg-stone-100 rounded" />
          <div className="h-6 w-20 bg-stone-100 rounded" />
        </div>
      </div>

      {/* PayPal section */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-4 space-y-4">
        <div className="h-6 w-40 bg-stone-100 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-stone-100 rounded" />
          <div className="h-4 w-2/3 bg-stone-100 rounded" />
        </div>
        <div className="h-24 bg-stone-100 rounded-xl" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-stone-100 rounded" />
          <div className="h-4 w-1/2 bg-stone-100 rounded" />
        </div>
      </div>

      {/* Button */}
      <div className="h-14 w-full bg-stone-100 rounded-full" />
    </div>
  );
}
