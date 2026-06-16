import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping Policy — DeskVibe" };

export default function ShippingPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 prose prose-stone prose-sm">
      <h1>Shipping Policy</h1>
      <table><thead><tr><th>Region</th><th>Standard</th><th>Free Over</th></tr></thead><tbody>
        <tr><td>United States</td><td>7-12 business days</td><td>$75</td></tr>
        <tr><td>Canada</td><td>10-15 business days</td><td>$75</td></tr>
        <tr><td>United Kingdom</td><td>5-8 business days</td><td>$75</td></tr>
        <tr><td>European Union</td><td>5-8 business days</td><td>$75</td></tr>
        <tr><td>Australia</td><td>10-15 business days</td><td>$75</td></tr>
        <tr><td>Japan / Korea</td><td>5-10 business days</td><td>$75</td></tr>
      </tbody></table>
      <p>Orders processed within 1-3 business days. Tracking provided on all orders. Customs duties are the buyer's responsibility.</p>
    </div>
  );
}
