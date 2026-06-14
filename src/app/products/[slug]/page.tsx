import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { ProductJsonLd } from "@/components/ui/JsonLd";
import { StarRating } from "@/components/ui/StarRating";
import { ProductActions } from "@/components/product/ProductActions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return { title: "Not Found" };
    return {
      title: `${product.name} — DeskVibe`,
      description: product.description,
      openGraph: { title: product.name, description: product.description, images: [product.imageUrl] },
    };
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.description}
        images={[product.imageUrl]}
        price={product.price}
        comparePrice={product.compareAt}
        sku={`DV-${product.id.toString().padStart(3, "0")}`}
        ratingValue={product.rating}
        reviewCount={product.reviews}
        url={`/products/${product.slug}`}
        brand="DeskVibe"
        category={product.category}
      />

      {/* Answer Capsule (GEO optimized) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: `What is the ${product.name}?`, acceptedAnswer: { "@type": "Answer", text: `The ${product.name} by DeskVibe is a premium ${product.category.toLowerCase()} designed for the modern workspace. ${product.description} Price: $${product.price} with free shipping on orders over $75.` } },
              { "@type": "Question", name: `What materials is the ${product.name} made of?`, acceptedAnswer: { "@type": "Answer", text: "FSC-certified wood, aerospace-grade aluminum, and OEKO-TEX certified linen. All materials are sustainably sourced with no plastics." } },
              { "@type": "Question", name: `Does DeskVibe offer returns on the ${product.name}?`, acceptedAnswer: { "@type": "Answer", text: "Yes. DeskVibe offers a 30-day trial on all products including the " + product.name + ". Return it in original packaging for a full refund." } },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="hover:text-stone-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="#" className="hover:text-stone-700">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-700 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="aspect-square rounded-xl overflow-hidden bg-stone-100">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <span className="text-xs uppercase tracking-[1px] text-indigo-600 font-bold">{product.category}</span>
          <h1 className="text-2xl lg:text-3xl font-bold mt-2 mb-3 tracking-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <StarRating rating={product.rating} showValue count={product.reviews} />
          </div>

          <p className="text-stone-500 leading-relaxed mb-8">{product.description}</p>

          <ProductActions
            productId={product.id}
            productName={product.name}
            productSlug={product.slug}
            images={[product.imageUrl]}
            price={product.price}
            comparePrice={product.compareAt}
          />

          {/* Details accordion */}
          <div className="border-t border-stone-200 mt-10 pt-8 space-y-4">
            {[
              { title: "Materials", content: "FSC-certified wood, aerospace-grade aluminum, OEKO-TEX certified linen. No plastics, no shortcuts." },
              { title: "Shipping", content: "Free shipping on orders over $75. Carbon-neutral delivery to 60+ countries. 7–12 business days." },
              { title: "Returns", content: "30-day trial. Not satisfied? Return it for a full refund. No questions asked." },
            ].map((faq) => (
              <details key={faq.title} className="group">
                <summary className="font-semibold text-sm cursor-pointer list-none flex items-center justify-between py-2 border-b border-stone-100">
                  {faq.title}
                  <span className="text-stone-400 group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="text-sm text-stone-500 py-3 leading-relaxed">{faq.content}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="group">
              <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h4 className="text-sm font-semibold">{p.name}</h4>
              <p className="text-sm font-bold">${p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
