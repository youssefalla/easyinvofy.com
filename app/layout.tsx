import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

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
  metadataBase: new URL('https://invoiceflow.app'), // Replace with your actual production URL when deploying
  title: 'Free Online Invoice Generator (No Signup) | InvoiceFlow',
  description: 'Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.',
  keywords: ['invoice generator', 'free invoicing software', 'freelance invoice maker', 'PDF invoice', 'business billing tool', 'free online invoice generator no signup'],
  authors: [{ name: 'InvoiceFlow' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://invoiceflow.app',
    siteName: 'InvoiceFlow',
    title: 'Free Online Invoice Generator (No Signup) | InvoiceFlow',
    description: 'Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.',
    images: [
      {
        url: '/og-image.png', // Add an actual image to your public folder later
        width: 1200,
        height: 630,
        alt: 'InvoiceFlow Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Invoice Generator (No Signup) | InvoiceFlow',
    description: 'Create professional PDF invoices instantly with our free online invoice generator. No signup required, offline-first, and 100% free forever.',
    creator: '@InvoiceFlow',
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
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
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
        {children}
      </body>
    </html>
  );
}
