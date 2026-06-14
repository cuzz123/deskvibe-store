import Slideshow from "@/components/Slideshow";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Slideshow />

      {/* Category Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
            <p className="text-stone-500 max-w-lg mx-auto">
              8 categories · 40 products · Everything your desk needs.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <a key={cat.slug} href="#" className="relative group rounded-lg overflow-hidden aspect-[4/5] flex items-end">
                <img
                  src={`/images/${cat.imageKey}.jpg`}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative z-10 p-5 text-white">
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <span className="text-xs opacity-80">Shop Collection</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
            <p className="text-stone-500">Premium materials · Minimal design · Built to last</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 12).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="bg-stone-50 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { title: "FSC-Certified Wood", desc: "All wood products sourced from sustainably managed forests" },
            { title: "30-Day Trial", desc: "Try any product for 30 days. Not satisfied? Free return, no questions." },
            { title: "Free Shipping $75+", desc: "Carbon-neutral delivery to 60+ countries worldwide" },
            { title: "2,400+ Reviews", desc: "Rated 4.8 stars by our community of remote workers and creators" },
          ].map((f) => (
            <div key={f.title}>
              <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">✓</div>
              <h4 className="font-bold text-sm mb-1">{f.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-10 lg:p-16 flex flex-col justify-center">
          <h3 className="text-2xl font-bold tracking-tight mb-4">Designed in Stockholm. Built to Last.</h3>
          <p className="text-stone-500 leading-relaxed mb-4 text-sm">
            We started DeskVibe because we were tired of choosing between ugly plastic office gear and overpriced designer pieces. There had to be a middle ground — premium materials, honest prices, and designs that actually look good on your desk.
          </p>
          <p className="text-stone-500 leading-relaxed mb-6 text-sm">
            Every product goes through 12+ design iterations before it reaches your desk. We use FSC-certified walnut, aerospace-grade aluminum, and OEKO-TEX certified linen. No shortcuts.
          </p>
          <a href="#" className="text-indigo-600 font-semibold text-sm hover:gap-3 inline-flex items-center gap-1.5 transition-all">
            Read Our Full Story →
          </a>
        </div>
        <div className="bg-stone-200 min-h-[300px] flex items-center justify-center overflow-hidden">
          <img src="/images/story.jpg" alt="DeskVibe design studio" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">What Our Customers Say</h2>
            <p className="text-stone-500">2,400+ reviews from people who upgraded their workspace</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "The walnut riser completely changed how my desk looks. I used to have cables everywhere and now it's actually clean. My Zoom background has never looked better. Worth every dollar.", author: "Marcus T." },
              { text: "Bought the magnetic cable clips on a whim. Took me literally 2 minutes to install under my desk. My girlfriend walked in and asked if I bought a new desk. Nope, just 30 bucks of cable management.", author: "Rachel K." },
              { text: "Got the Complete Makeover Kit as a birthday gift to myself. Everything came in one box, beautifully packaged. My desk went from 'IT department' to 'architectural digest' in an hour.", author: "David L." },
            ].map((r) => (
              <div key={r.author} className="bg-white border border-stone-100 rounded-lg p-6">
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm text-stone-500 leading-relaxed italic mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-xs font-bold">{r.author} <span className="text-stone-400 font-normal">— Verified Buyer</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
