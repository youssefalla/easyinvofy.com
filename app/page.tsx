'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReceiptText, FileText, Users, TrendingUp, Globe, Moon, ChevronRight,
  CheckCircle, ArrowRight, Star, Shield, ChevronDown
} from 'lucide-react';

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/30">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <CheckCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-violet-400' : 'text-zinc-600'}`} />
          <h3 className="font-medium text-lg text-zinc-100">{question}</h3>
        </div>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-violet-400' : 'text-zinc-600'}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-0 pl-[60px]">
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is my financial data safe?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. All data is processed entirely within your local browser. We do not have databases, and your client details, line items, and totals are never transmitted to our servers.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use this invoice generator offline?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Because our tool functions as a local web application, it does not require an active internet connection to work once the page is loaded.' },
    },
    {
      '@type': 'Question',
      name: 'Is it really free forever?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. There are no premium tiers, watermarks, or hidden fees. We built this tool because we believe essential business administration should not require a monthly subscription.' },
    },
    {
      '@type': 'Question',
      name: 'Do I need an account to create an invoice?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. We require zero signup. There are no passwords to remember, no marketing emails, and no onboarding tutorials to skip.' },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the invoice with my own currency and tax rates?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can customize currencies, adjust dynamic tax rates on a per-item basis, and add custom notes or payment terms.' },
    },
  ],
};

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: FileText, title: 'Smart Invoicing', desc: 'Create professional invoices in seconds with auto-numbering, tax calculations, and multi-currency support.', accent: '#a78bfa' },
    { icon: Users, title: 'Client Management', desc: 'Keep all your clients organized in one place. Store contacts, billing info, and history effortlessly.', accent: '#34d399' },
    { icon: TrendingUp, title: 'Revenue Analytics', desc: 'Track your earnings, pending payments, and overdue invoices with beautiful real-time dashboards.', accent: '#fb923c' },
    { icon: Globe, title: 'Multi-Currency', desc: 'Invoice clients worldwide in MAD, USD, EUR, AED, GBP and more — all in one place.', accent: '#38bdf8' },
    { icon: Shield, title: 'PDF Export', desc: 'Generate pixel-perfect PDF invoices with your logo, bank details and custom notes.', accent: '#f472b6' },
    { icon: Moon, title: 'Dark Mode', desc: 'Work comfortably day or night. EasyInvofy adapts to your environment automatically.', accent: '#facc15' },
  ];

  const steps = [
    { num: '01', title: 'Add Your Company', desc: 'Set up your brand: logo, address, tax ID, and bank account.' },
    { num: '02', title: 'Add Clients', desc: 'Import or manually add your clients in seconds.' },
    { num: '03', title: 'Create Invoices', desc: 'Fill in items, set taxes and discounts, choose currency.' },
    { num: '04', title: 'Export & Send', desc: 'Download a beautiful PDF and send it to your client.' },
  ];

  const testimonials = [
    { name: 'Michael T.', role: 'Freelance Designer', location: 'United States', text: 'I used to spend 30 minutes formatting each invoice in Word. Now it takes under 2 minutes. The PDF quality is exactly what my clients expect.', stars: 5 },
    { name: 'Sarah L.', role: 'Marketing Consultant', location: 'United Kingdom', text: 'The multi-currency support is a game changer. I work with clients in the US, UAE, and Europe — invoicing in their local currency builds trust instantly.', stars: 5 },
    { name: 'Youssef A.', role: 'Web Developer', location: 'Morocco', text: 'Safi, clean, and no account needed. I send invoices in MAD and EUR to different clients every week. This tool just works and respects my privacy.', stars: 5 },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0a0a0f' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        transform: `translateY(${scrollY * 0.1}px)`,
      }} />
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)' }} />

      {/* NAV */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
            <ReceiptText className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'var(--font-poppins)' }}>EasyInvofy</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
        </div>
        <Link href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
          Get Started <ChevronRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 border" style={{ background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)', color: '#a78bfa' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            No account needed · Free forever · Works offline
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
            Free Online <br className="hidden sm:block" />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #34d399 50%, #fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Invoice Generator
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 50px rgba(124,58,237,0.5)' }}>
              Get Started — It&apos;s Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#features" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium border transition-all duration-200" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              See Features
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[{ val: '10+', label: 'Currencies' }, { val: '0s', label: 'Setup time' }, { val: '100%', label: 'Free' }, { val: '∞', label: 'Invoices' }].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: '#a78bfa' }}>{val}</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="relative mt-20 max-w-5xl mx-auto"
        >
          <div className="rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', boxShadow: '0 0 100px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.6)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(234,179,8,0.6)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(34,197,94,0.6)' }} />
              <div className="flex-1 mx-4 h-6 rounded-lg flex items-center px-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>invoiceflow.app/dashboard</span>
              </div>
            </div>
            <div className="p-6 flex gap-4" style={{ minHeight: '280px' }}>
              <div className="w-36 flex-shrink-0 space-y-1.5">
                {['Dashboard', 'Invoices', 'Clients', 'New Invoice', 'Settings'].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: i === 0 ? 'rgba(139,92,246,0.3)' : 'transparent', color: i === 0 ? '#a78bfa' : 'rgba(255,255,255,0.25)' }}>
                    <div className="w-3 h-3 rounded" style={{ background: 'currentColor', opacity: 0.6 }} />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {[{ label: 'Revenue', val: '$24,500', color: '#34d399' }, { label: 'Invoices', val: '48', color: '#38bdf8' }, { label: 'Clients', val: '12', color: '#a78bfa' }, { label: 'Pending', val: '5', color: '#fb923c' }].map(({ label, val, color }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
                      <p className="text-base font-bold mt-1" style={{ color }}>{val}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  {[{ inv: 'INV-2025-0042', client: 'TechFlow Inc', status: 'paid', amt: '$1,200' }, { inv: 'INV-2025-0041', client: 'Nova Design', status: 'sent', amt: '$850' }, { inv: 'INV-2025-0040', client: 'Atlas Agency', status: 'draft', amt: '$3,400' }].map(({ inv, client, status, amt }) => (
                    <div key={inv} className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{inv}</span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{client}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: status === 'paid' ? 'rgba(52,211,153,0.15)' : status === 'sent' ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.07)', color: status === 'paid' ? '#34d399' : status === 'sent' ? '#38bdf8' : 'rgba(255,255,255,0.3)' }}>{status}</span>
                      <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{amt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 blur-3xl opacity-30 rounded-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #34d399)' }} />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#a78bfa' }}>Everything you need</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Built for professionals</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>All the features you need to run your freelance or small business invoicing.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}18` }}>
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
              <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#34d399' }}>Simple process</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Up and running in minutes</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <div className="relative z-10">
                <p className="text-5xl font-bold mb-4 leading-none" style={{ fontFamily: 'var(--font-poppins)', color: 'rgba(139,92,246,0.3)' }}>{num}</p>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#fb923c' }}>What people say</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>Loved by freelancers</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, location, text, stars }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl p-6 border"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>&ldquo;{text}&rdquo;</p>
              <div>
                <p className="font-semibold text-white text-sm">{name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{role} · {location}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Testimonials reflect typical user experiences. Last names abbreviated for privacy.
        </p>
      </section>

      {/* SEO INFO & FAQ */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24 mb-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div>
             <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Beautiful Invoices, Zero Friction.</h2>
             <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                The modern freelancer needs tools that get out of the way. When it's time to bill a client, the last thing you want is a forced account creation screen, a forgotten password, or a sprawling dashboard of features you don’t need. 
             </p>
             <p className="leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Our <strong>free online invoice generator</strong> (no signup) is built on a radically simple philosophy: respect your time and protect your data. Unlike traditional paid accounting software that locks your business behind monthly subscriptions and paywalls, our tool is accessible instantly. You don't need a login. You don’t need a credit card. You simply open your browser, enter your details, and download a pristine, professional PDF ready to send.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-xl font-semibold mb-3">Absolute Privacy by Design.</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>By operating directly within your browser, we eliminate backend servers that hoard your financial data. Your business details, client addresses, and line items never leave your device.</p>
             </div>
             <div>
                <h3 className="text-xl font-semibold mb-3">Offline-First Architecture.</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>Because it runs locally, you can even generate invoices while entirely disconnected from the internet—perfect for working on the go or from remote job sites.</p>
             </div>
             <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-3">No Subscriptions. No Hidden Fees.</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>Stop paying for bloated software just to request a payment. Step away from cumbersome spreadsheets and complex formatting. Generate pixel-perfect, beautifully structured invoices in seconds, completely free, and completely yours.</p>
             </div>
          </div>

          <div className="pt-12 mt-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
             <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-poppins)' }}>Frequently Asked Questions</h2>
             <div className="space-y-4">
                {[
                  { q: "Is my financial data safe?", a: "Yes. Your privacy is our priority. All data is processed entirely within your local browser. We do not have databases, and your client details, line items, and totals are never transmitted to our servers. Your data remains strictly on your device." },
                  { q: "Can I use this invoice generator offline?", a: "Absolutely. Because our tool functions as a local web application, it doesn't require an active internet connection to work. Once the page is loaded, you can create and download professional PDFs entirely offline." },
                  { q: "Is it really free forever?", a: "Yes. There are no premium tiers, watermarks, or hidden fees. We built this tool because we believe essential business administration shouldn't require a monthly subscription." },
                  { q: "Do I need an account to create an invoice?", a: "No. We require zero signup. There are no passwords to remember, no marketing emails to unsubscribe from, and no onboarding tutorials to skip. Just open the page and start typing." },
                  { q: "Can I customize the invoice with my own currency and tax rates?", a: "Yes. You can customize currencies, adjust dynamic tax rates on a per-item basis, and add custom notes or payment terms to ensure the final document aligns perfectly with your business requirements." }
                ].map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden border"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(52,211,153,0.05) 100%)', borderColor: 'rgba(139,92,246,0.2)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6 border" style={{ background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)', color: '#a78bfa' }}>
              <CheckCircle className="w-3.5 h-3.5" /> Free forever · No credit card · No account
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>Ready to get paid?</h2>
            <p className="max-w-lg mx-auto mb-10 text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>Join thousands of freelancers and small businesses who invoice smarter.</p>
            <Link href="/dashboard" className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 60px rgba(124,58,237,0.6)' }}>
              Start Invoicing Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-8 py-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
            <ReceiptText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-poppins)', color: 'rgba(255,255,255,0.7)' }}>EasyInvofy</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} EasyInvofy · Built for professionals</p>
        <div className="flex gap-4 md:gap-6 text-xs flex-wrap justify-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <a href="#features" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>Features</a>
          <a href="#how" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>How it works</a>
          <Link href="/about" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>About Us</Link>
          <Link href="/privacy" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>Terms</Link>
          <Link href="/cookies" className="hover:text-white transition-colors" style={{ color: 'inherit' }}>Cookies</Link>
        </div>
      </footer>
    </div>
  );
}
