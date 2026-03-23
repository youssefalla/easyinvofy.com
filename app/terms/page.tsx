import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | EasyInvofy',
  description: 'Read the EasyInvofy terms of service.',
  alternates: {
    canonical: 'https://easyinvofy.com/terms',
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0e0d14] text-white py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>Terms of Service</h1>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to EasyInvofy. By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">1. Use of the Service</h2>
            <p className="mb-4">EasyInvofy provides a free, offline-first tool to generate PDF invoices. You agree to use the Service only for lawful purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">2. Accuracy and Responsibility</h2>
            <p className="font-medium text-amber-400 mb-2">You are solely responsible for the content and accuracy of the invoices you generate.</p>
            <p>EasyInvofy serves strictly as a formatting and generation tool. We do not verify the legal validity, mathematical accuracy, or tax compliance of the documents you create. It is your responsibility to ensure that the invoices meet the legal and financial requirements of your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">3. Data and Privacy</h2>
            <p>As detailed in our Privacy Policy, your invoice data is governed by local storage within your browser. You are responsible for backing up your data (such as by downloading the resulting PDF). If you clear your browser data or use a different device, your previously generated invoices and saved clients will not be accessible.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">4. Advertisements</h2>
            <p>The Service is provided for free, supported by advertising through Google AdSense. By using the Service, you acknowledge and agree that these third-party advertisements will be displayed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">5. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. EasyInvofy makes no representations or warranties of any kind, express or implied, as to the operation of the service, or the information, content, or materials included.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">6. Limitation of Liability</h2>
            <p>In no event shall EasyInvofy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
