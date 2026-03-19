import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Replace with your actual production domain
    const baseUrl = 'https://easyinvofy.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard',
                '/invoices',
                '/new-invoice',
                '/clients',
                '/settings',
                '/private/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
