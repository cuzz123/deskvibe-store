import type { Metadata } from "next";

export const metadata: Metadata = { title: "Returns & Refunds — DeskVibe" };

export default function RefundPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 prose prose-stone prose-sm">
      <h1>Returns & Refunds</h1>
      <h2>30-Day Trial</h2>
      <p>Try any product for 30 days. Not satisfied? Return it in original packaging for a full refund. Return shipping is free if the product is defective or damaged. For change-of-mind returns, the buyer covers return shipping.</p>
      <h2>How to Return</h2>
      <ol><li>Email support@deskvibe.com with your order number</li><li>We'll send return instructions within 24 hours</li><li>Ship the item back in original packaging</li><li>Refund processed within 3-5 business days of receiving the return</li></ol>
      <h2>Damaged Items</h2>
      <p>If your item arrives damaged, email us within 48 hours with photos. We'll ship a replacement immediately at no cost.</p>
    </div>
  );
}
