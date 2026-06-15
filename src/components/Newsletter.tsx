"use client";

export default function Newsletter() {
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-stone-900 rounded-2xl py-14 px-6 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Get 10% Off Your First Order</h2>
          <p className="text-stone-400 mb-6">Desk inspiration, product drops, and exclusive deals — no spam, ever.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Welcome to DeskVibe! Check your inbox for 10% off."); }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-stone-700 text-white placeholder:text-stone-400 outline-none focus:border-emerald-500"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-white text-stone-900 font-bold hover:bg-indigo-600 hover:text-white transition whitespace-nowrap"
            >
              Subscribe & Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
