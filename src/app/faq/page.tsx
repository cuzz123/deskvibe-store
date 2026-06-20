import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQ — DeskVibe" };

const faqs = [
  { q: "How long does shipping take?", a: "Orders ship within 1-3 business days. Delivery takes 7-12 business days to the US and Canada, 5-8 business days to Europe. Tracking is provided on every order." },
  { q: "What is your return policy?", a: "30-day trial on all products. If you're not satisfied, return it in original packaging for a full refund. Return shipping is on us if the product has a manufacturing defect." },
  { q: "Are the wood products sustainably sourced?", a: "Yes. All wood products are FSC-certified, sourced from sustainably managed forests. Our packaging is recycled and plastic-free." },
  { q: "Do you ship internationally?", a: "Yes — we ship to 60+ countries including US, Canada, UK, EU, Australia, Japan, and Singapore. Free shipping on orders over $75." },
  { q: "How do I clean my desk mat?", a: "Our linen desk mats have a water-resistant coating. Wipe with a damp cloth and mild soap. Do not machine wash or bleach." },
  { q: "Does the monitor light bar fit curved monitors?", a: "Yes — the clamp fits monitors up to 1.2 inches thick, including most curved displays. The asymmetric light design prevents glare on any screen type." },
  { q: "Can I buy replacement cable clips?", a: "The Magnetic Cable Organizer 8-piece set includes spare clips. Additional sets are available for purchase separately." },
  { q: "What payment methods do you accept?", a: "We accept PayPal. All major credit and debit cards are supported through PayPal's checkout. Your payment information is always encrypted and secure." },
];

export default function FAQPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h1>
      <p className="text-stone-500 mb-10">Everything you need to know about DeskVibe products.</p>
      <div className="space-y-1">
        {faqs.map((faq) => (
          <details key={faq.q} className="group border-b border-stone-100">
            <summary className="font-semibold text-sm cursor-pointer list-none flex items-center justify-between py-4 hover:text-stone-900 text-stone-700">
              {faq.q}
              <span className="text-stone-500 group-open:rotate-45 transition-transform text-lg ml-4 flex-shrink-0">+</span>
            </summary>
            <p className="text-sm text-stone-500 pb-4 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-stone-500">Still have questions? <Link href="/contact" className="text-indigo-600 font-semibold hover:underline">Contact us</Link></p>
      </div>
    </div>
  );
}
