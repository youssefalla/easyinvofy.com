'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function CookieConsent() {
  const [consent, setConsent] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored) {
      setConsent(stored);
    } else {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setConsent('declined');
    setVisible(false);
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-4WC70CC0HK"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4WC70CC0HK');`}
          </Script>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1427392565221232"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      )}

      {visible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] px-4 py-4 md:px-6 md:py-5"
          style={{
            background: 'rgba(10,10,15,0.97)',
            borderTop: '1px solid rgba(139,92,246,0.35)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex items-start gap-3 flex-1">
              <div
                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}
              >
                <svg className="w-4 h-4" style={{ color: '#a78bfa' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">We use cookies &amp; analytics</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  This site uses Google AdSense for ads and Google Analytics to measure traffic.
                  Accepting allows cookies for personalized advertising.{' '}
                  <Link href="/cookies" className="underline hover:text-violet-400 transition-colors">
                    Cookie Policy
                  </Link>{' '}
                  ·{' '}
                  <Link href="/privacy" className="underline hover:text-violet-400 transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-medium transition-all hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
