import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://easyinvofy.com'),
  title: 'Free Online Invoice Generator (No Signup) | EasyInvofy',
  description: 'Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.',
  keywords: ['invoice generator', 'free invoicing software', 'freelance invoice maker', 'PDF invoice', 'business billing tool', 'free online invoice generator no signup'],
  authors: [{ name: 'EasyInvofy' }],
  alternates: {
    canonical: 'https://easyinvofy.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://easyinvofy.com',
    siteName: 'EasyInvofy',
    title: 'Free Online Invoice Generator (No Signup) | EasyInvofy',
    description: 'Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EasyInvofy Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Invoice Generator (No Signup) | EasyInvofy',
    description: 'Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.',
    creator: '@EasyInvofy',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1427392565221232" />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'EasyInvofy',
              url: 'https://easyinvofy.com',
              description: 'Free online invoice generator. No signup required, offline-first, and 100% free forever.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Multi-currency support (USD, EUR, GBP, MAD, AED and more)',
                'Professional PDF export',
                'No signup required',
                'Offline-first architecture',
                'Client management',
                'Revenue analytics',
              ],
              publisher: {
                '@type': 'Organization',
                name: 'EasyInvofy',
                url: 'https://easyinvofy.com',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
