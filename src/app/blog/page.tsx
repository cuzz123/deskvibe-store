import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Blog — DeskVibe", description: "Desk setup guides, product tips, and workspace inspiration." };

const posts = [
  { title: "The Ultimate Desk Cable Management Guide (2026)", slug: "desk-cable-management-guide", date: "2026-06-10", excerpt: "Invisible cables in 15 minutes — no drilling, no zip ties. A step-by-step guide to a cleaner workspace." },
  { title: "Monitor Height Matters: Ergonomic Setup 101", slug: "monitor-height-ergonomics", date: "2026-06-03", excerpt: "The top of your screen should be at eye level. Here's why, and how to achieve it with the right stand." },
  { title: "5 Desk Accessories That Instantly Upgrade Your WFH Setup", slug: "5-desk-accessories-upgrade", date: "2026-05-27", excerpt: "Small changes, big impact. These five pieces transformed our team's home offices." },
  { title: "Why We Chose Walnut: A Material Story", slug: "why-walnut-material-story", date: "2026-05-20", excerpt: "FSC-certified American walnut isn't just beautiful — it's one of the most sustainable hardwoods on the market." },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">DeskVibe Blog</h1>
      <p className="text-stone-500 mb-10">Desk setup guides, product tips, and workspace inspiration.</p>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} href={'/blog/' + post.slug} className="block group">
            <time className="text-xs text-stone-400">{post.date}</time>
            <h2 className="text-lg font-bold mt-1 group-hover:text-indigo-600 transition-colors">{post.title}</h2>
            <p className="text-sm text-stone-500 mt-1">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold mt-2 group-hover:gap-2 transition-all">Read more <ArrowRight className="w-3 h-3" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
