import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — DeskVibe" };

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 prose prose-stone prose-sm">
      <h1>Privacy Policy</h1>
      <p>Last updated: June 16, 2026</p>

      <h2>1. Information We Collect</h2>
      <p>When you place an order, we collect your name, email address, shipping address, and payment information. We do not store your credit card or PayPal credentials — payment processing is handled entirely by PayPal.</p>
      <p>We use Google Analytics to understand how visitors use our site. Google Analytics collects anonymous usage data including pages visited, time on site, and referring sources.</p>
      <p>We use cookies for cart functionality (storing your selected items) and analytics purposes.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information solely to:</p>
      <ul><li>Process and ship your orders</li><li>Send order confirmations and shipping updates via email</li><li>Respond to your customer service inquiries</li><li>Improve our website and product offerings</li></ul>
      <p>We never sell, rent, or share your personal information with third parties for their marketing purposes.</p>

      <h2>3. Data Storage & Security</h2>
      <p>Your data is stored on secure servers provided by Vercel and NeonDB. All connections are encrypted via HTTPS. Payment information is processed exclusively through PayPal's secure servers and is never stored on our infrastructure.</p>

      <h2>4. Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at support@deskvibe.com. We will respond within 30 days.</p>

      <h2>5. Cookies</h2>
      <p>We use essential cookies for shopping cart functionality and analytics cookies (Google Analytics). You may disable cookies in your browser settings, though this may affect site functionality.</p>

      <h2>6. Contact</h2>
      <p>For privacy-related questions: support@deskvibe.com</p>
    </div>
  );
}
