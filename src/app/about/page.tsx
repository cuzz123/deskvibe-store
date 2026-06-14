import type { Metadata } from "next";

export const metadata: Metadata = { title: "About — DeskVibe" };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-6">About DeskVibe</h1>

      <div className="prose prose-stone max-w-none space-y-6">
        <p className="text-lg text-stone-500 leading-relaxed">
          We started DeskVibe because we were tired of choosing between ugly plastic office gear and overpriced designer pieces. There had to be a middle ground — premium materials, honest prices, and designs that actually look good on your desk.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 my-12">
          {[
            { n: "2024", l: "Founded in Stockholm" },
            { n: "8", l: "Products launched" },
            { n: "60+", l: "Countries shipped" },
            { n: "2,400+", l: "Happy customers" },
            { n: "FSC", l: "Certified wood" },
            { n: "30-Day", l: "Trial on everything" },
          ].map((s) => (
            <div key={s.l} className="text-center p-4 bg-stone-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{s.n}</div>
              <div className="text-sm text-stone-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-10">Our Materials</h2>
        <p className="text-stone-500 leading-relaxed">
          Every DeskVibe product goes through 12+ design iterations before it reaches your desk. We use FSC-certified American walnut, aerospace-grade 6061 aluminum, and OEKO-TEX certified European linen. No plastics, no shortcuts, no materials we wouldn&apos;t put on our own desks.
        </p>

        <h2 className="text-xl font-bold mt-10">Our Promise</h2>
        <p className="text-stone-500 leading-relaxed">
          Try any product for 30 days. If it doesn&apos;t make your workspace better, return it for a full refund. We design products that last, not products that end up in a landfill after six months.
        </p>
      </div>
    </div>
  );
}
