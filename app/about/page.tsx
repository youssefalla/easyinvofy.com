import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Zap, Shield, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | EasyInvofy',
  description: 'Learn about EasyInvofy — a free online invoice generator built for freelancers and small businesses.',
  alternates: {
    canonical: 'https://easyinvofy.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0e0d14] text-white py-20 px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>About InvoiceFlow</h1>
        
        <div className="space-y-12 text-zinc-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-zinc-100">The Story</h2>
            <p className="mb-4">
              I'm a developer who has spent years freelancing. And if there's one thing I dreaded more than anything, it was the end of the month: <strong>billing day</strong>.
            </p>
            <p className="mb-4">
              I found myself wasting precious hours fighting with clunky software just to generate a simple PDF. I was forced to create accounts I didn't want, subscribe to monthly fees for features I never used, or wrangle messy spreadsheets that always seemed to break their own formatting.
            </p>
            <p>
              I wanted a tool that would allow me to generate a beautiful, professional invoice instantly—no signup, no friction, and no tracking. That’s why I built InvoiceFlow.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 text-zinc-100">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-[#16161e]">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-medium text-zinc-100 mb-2">Privacy-First</h3>
                <p className="text-sm text-zinc-400">Everything is stored locally on your device. We respect your financial data and have zero databases storing your information.</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-[#16161e]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-medium text-zinc-100 mb-2">Maximum Speed</h3>
                <p className="text-sm text-zinc-400">Time is money. Our tool is optimized so you can add a client, generate an invoice, and download the PDF in under 60 seconds.</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-[#16161e]">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="font-medium text-zinc-100 mb-2">Always Free</h3>
                <p className="text-sm text-zinc-400">We don't believe in paywalling basic business administrative tools. InvoiceFlow will remain free to use forever.</p>
              </div>
            </div>
          </section>

          <section className="mt-12 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Contact Us</h2>
            <p className="mb-6">
              I'm actively working to make InvoiceFlow the best (and fastest) free invoice generator on the internet. Your feedback is what drives the next set of features.
            </p>
            <div className="bg-[#16161e] border border-violet-500/20 rounded-2xl p-8">
              <p className="font-medium text-zinc-100 mb-2">Got a suggestion or found a bug?</p>
              <p className="mb-6 text-sm text-zinc-400">Whether you are requesting a specific currency, a new PDF layout, or simply want to say hi, I want to hear from you.</p>
              <a 
                href="mailto:contact.yourami@gmail.com" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                contact.yourami@gmail.com
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
