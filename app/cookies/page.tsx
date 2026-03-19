import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | EasyInvofy',
  description: 'Read the EasyInvofy cookie policy.',
  alternates: {
    canonical: 'https://easyinvofy.com/cookies',
  },
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#0e0d14] text-white py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>Cookie Policy</h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>This Cookie Policy explains how InvoiceFlow uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">1. Local Storage (Not Cookies)</h2>
            <p className="mb-4">It is important to understand that InvoiceFlow relies primarily on your browser's <strong>Local Storage</strong>, not cookies, to function. When you add a client, update your company details, or create an invoice, that data is saved locally on your device using Local Storage. This allows the application to remain fast, offline-capable, and entirely private.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">2. What are Cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">3. Why do we use Cookies?</h2>
            <p className="mb-4">We use cookies primarily for advertising purposes. Because InvoiceFlow is entirely free, we rely on Google AdSense to monetize the platform.</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Google AdSense:</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">4. How can I control Cookies?</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website (and generate invoices), though some advertising functionality might be restricted.</p>
            <p className="mt-4">Furthermore, you may opt out of personalized advertising from Google by visiting <a href="https://myadcenter.google.com/" className="text-violet-400 hover:underline" target="_blank" rel="noreferrer">Google Ads Settings</a>. For third-party vendor cookies aimed at personalized advertising, you can visit <a href="https://www.aboutads.info" className="text-violet-400 hover:underline" target="_blank" rel="noreferrer">www.aboutads.info</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">5. Updates to this Policy</h2>
            <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
