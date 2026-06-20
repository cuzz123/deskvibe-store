import Slideshow from "@/components/Slideshow";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Shield, Truck, Leaf, RotateCcw, ArrowRight } from "lucide-react";

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
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-wrap balance">Shop the Look</h2>
            <p className="text-stone-600 max-w-lg">
              Complete desk setups curated by our designers. Click any product to shop.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SETUPS.map((setup) => (
              <div key={setup.name} className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                <div className="aspect-[4/3] relative overflow-hidden bg-stone-200">
                  {/* Warm brand-grade overlay — unifies different lighting across setup photos */}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-stone-900/55 via-stone-900/8 to-transparent pointer-events-none" />
                  <Image src={setup.img} alt={setup.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" />
                  <h3 className="absolute bottom-3 left-4 z-[2] text-white font-bold text-lg">{setup.name}</h3>
                </div>
                <div className="p-4 flex items-center gap-2 overflow-x-auto">
                  {setup.products.map((pid) => {
                    const p = PRODUCTS.find(x => x.id === pid);
                    if (!p) return null;
                    return (
                      <Link key={pid} href={`/products/${p.slug}`} className="flex-shrink-0 w-12 h-12 rounded-lg bg-stone-100 overflow-hidden border-2 border-transparent hover:border-indigo-400 transition-all" title={p.name}>
                        <Image src={p.imageUrl} alt={p.name} width={48} height={48} className="object-cover" />
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
          <div className="mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-wrap balance">Shop by Category</h2>
            <p className="text-stone-600">
              8 categories · 75 products · Everything your desk needs.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/collections/${cat.slug}`} className="relative group rounded-lg overflow-hidden aspect-[3/4] flex items-end bg-stone-200">
                {/* Warm brand-grade overlay — strongest here since category images vary most */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-stone-900/65 via-stone-900/10 to-transparent pointer-events-none" />
                {/* Subtle warm tint over entire image */}
                <div className="absolute inset-0 z-[1] bg-stone-900/[0.06] pointer-events-none" />
                <Image
                  src={`/images/${cat.imageKey}.jpg`}
                  alt={cat.name}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="relative z-[2] p-5 text-white">
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <span className="text-xs text-white/70 group-hover:text-white/90 transition-colors inline-flex items-center gap-1">
                    Shop Collection <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-wrap balance">Featured Products</h2>
              <p className="text-stone-600">Premium materials · Minimal design · Built to last</p>
            </div>
            <Link href="/collections/monitor-stands" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/collections/monitor-stands" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
              View All 75 Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="bg-stone-900 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "FSC-Certified", desc: "All wood from sustainably managed forests" },
              { icon: RotateCcw, title: "30-Day Trial", desc: "Free returns, no questions asked" },
              { icon: Truck, title: "Free Shipping $75+", desc: "Carbon-neutral to 60+ countries" },
              { icon: Shield, title: "4.8★ · 2,400+ Reviews", desc: "Trusted by creators worldwide" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white mb-0.5">{title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-10 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          <h3 className="text-2xl font-bold tracking-tight mb-4 text-wrap balance">Designed in Stockholm. Built to Last.</h3>
          <p className="text-stone-600 leading-relaxed mb-4">
            We started DeskVibe because we were tired of choosing between ugly plastic office gear and overpriced designer pieces. There had to be a middle ground — premium materials, honest prices, and designs that actually look good on your desk.
          </p>
          <p className="text-stone-600 leading-relaxed mb-6">
            Every product goes through 12+ design iterations before it reaches your desk. We use FSC-certified walnut, aerospace-grade aluminum, and OEKO-TEX certified linen. No shortcuts.
          </p>
          <Link href="/about" className="text-indigo-600 font-semibold text-sm hover:gap-3 inline-flex items-center gap-1.5 transition-all">
            Read Our Full Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="min-h-[350px] flex items-center justify-center overflow-hidden order-1 lg:order-2 relative bg-stone-200">
          <Image src="/images/story.jpg" alt="DeskVibe design studio in Stockholm" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          {/* Warm tint to match brand palette */}
          <div className="absolute inset-0 bg-stone-900/[0.06] pointer-events-none" />
        </div>
      </section>

      {/* ── Desk Inspiration Gallery ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2 text-wrap balance">Desk Inspiration</h2>
            <p className="text-stone-600">Real setups from our community. Tag <strong className="text-stone-900">@deskvibe</strong> to be featured.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ["/images/setup-warm.jpg","Warm Minimal"],
              ["/images/setup-night.jpg","Night Vibes"],
              ["/images/setup-scandi.jpg","Scandi Light"],
              ["/images/setup-gaming.jpg","Clean Gaming"],
              ["/images/setup-ergo.jpg","Ergonomic"],
              ["/images/setup-bundle.jpg","Full Makeover"],
            ].map(([src, alt]) => (
              <div key={alt} className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer bg-stone-200">
                {/* Subtle warm tint for visual coherence */}
                <div className="absolute inset-0 z-[1] bg-stone-900/[0.04] pointer-events-none" />
                <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 50vw, (max-width:768px) 33vw, 33vw" />
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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
