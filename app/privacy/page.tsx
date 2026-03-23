import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | EasyInvofy',
  description: 'Read the EasyInvofy privacy policy. Your data stays on your device — we never store or transmit your financial information.',
  alternates: {
    canonical: 'https://easyinvofy.com/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0e0d14] text-white py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>Privacy Policy</h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to EasyInvofy. We respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy outlines our practices regarding the information we collect and how we use it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">1. Data Storage and Processing</h2>
            <p>EasyInvofy is designed as a "local-first" or "offline-first" application. This means that <strong>we do not store your financial data, client information, or generated invoices on our servers.</strong></p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>All invoice data you enter is stored exclusively within your browser's local storage (on your device).</li>
              <li>When you generate a PDF invoice, the file is created locally on your device.</li>
              <li>Because your data does not leave your device, we cannot view, share, or access your business information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">2. Google AdSense and Cookies</h2>
            <p>To keep EasyInvofy free for all users, we use Google AdSense to display advertisements on our website.</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" className="text-violet-400 hover:underline" target="_blank" rel="noreferrer">Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">3. Analytics and Usage Data</h2>
            <p>We may collect basic, anonymous analytics data (such as page views or browser types) to understand how visitors use our website and to improve the user experience. This data is aggregated and does not contain personally identifiable financial information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">4. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">5. Contact Us</h2>
            <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:contact.yourami@gmail.com" className="text-violet-400 hover:underline">contact.yourami@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
