import Slideshow from "@/components/Slideshow";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

const SETUPS = [
  { name:"Warm Minimal", img:"/images/setup-warm.jpg", products:[1,8,15,13] },
  { name:"Dark & Focused", img:"/images/setup-dark.jpg", products:[3,5,10,17] },
  { name:"Scandi Light", img:"/images/setup-scandi.jpg", products:[22,9,11,69] },
  { name:"Compact Space", img:"/images/setup-compact.jpg", products:[4,65,36,29] },
  { name:"Zero Clutter", img:"/images/setup-cable.jpg", products:[5,6,7,24] },
  { name:"Ergo First", img:"/images/setup-ergo.jpg", products:[63,62,60,31] },
];

export default function Home() {
  return (
    <>
      <Slideshow />

      {/* ── Shop the Look ── */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Shop the Look</h2>
            <p className="text-stone-500">Complete desk setups curated by our designers. Click any product to shop.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SETUPS.map((setup) => (
              <div key={setup.name} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-lg transition-all">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image src={setup.img} alt={setup.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{setup.name}</h3>
                </div>
                <div className="p-4 flex items-center gap-2 overflow-x-auto">
                  {setup.products.map((pid) => {
                    const p = PRODUCTS.find(x => x.id === pid);
                    if (!p) return null;
                    return (
                      <Link key={pid} href={`/products/${p.slug}`} className="flex-shrink-0 w-14 h-14 rounded-lg bg-stone-100 overflow-hidden border-2 border-transparent hover:border-indigo-400 transition-all" title={p.name}>
                        <Image src={p.imageUrl} alt={p.name} width={56} height={56} className="object-cover" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {PRODUCTS.slice(0, 8).map((p) => (
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

      {/* Trust Bar */}
      <section className="py-14 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "75", l: "Products" },
              { n: "8", l: "Categories" },
              { n: "60+", l: "Countries" },
              { n: "30-Day", l: "Trial" },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-xl p-6 border border-stone-200">
                <div className="text-3xl font-bold text-indigo-600">{s.n}</div>
                <div className="text-sm text-stone-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-stone-400 mt-6">Free shipping over $75 · FSC-certified materials · Carbon-neutral delivery</p>
        </div>
      </section>

      {/* ── Desk Inspiration Gallery ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">Desk Inspiration</h2>
            <p className="text-stone-500">Real setups from our community. Tag <strong>@deskvibe</strong> to be featured.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              ["/images/setup-warm.jpg","Warm Minimal"],
              ["/images/setup-night.jpg","Night Vibes"],
              ["/images/setup-scandi.jpg","Scandi Light"],
              ["/images/setup-gaming.jpg","Clean Gaming"],
              ["/images/setup-ergo.jpg","Ergonomic"],
              ["/images/setup-bundle.jpg","Full Makeover"],
            ].map(([src, alt]) => (
              <div key={alt} className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer">
                <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)50vw,33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-semibold text-sm">{alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
