import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import SkeletonScreen from '@/components/SkeletonScreen'

export const metadata: Metadata = {
  title: {
    default: 'Bistro Montréal — Fine Dining',
    template: '%s | Bistro Montréal',
  },
  description: 'French-inspired cuisine crafted from the finest local Québec ingredients. Fine dining in the heart of Montréal since 2009.',
  openGraph: {
    siteName: 'Bistro Montréal',
    type: 'website',
    locale: 'en_CA',
    url: 'https://bist-mont.vercel.app',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Bistro Montréal — Fine Dining',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bistro Montréal — Fine Dining',
    description: 'French-inspired cuisine crafted from the finest local Québec ingredients. Fine dining in the heart of Montréal since 2009.',
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Bistro Montréal',
  url: 'https://bist-mont.vercel.app',
  logo: 'https://bist-mont.vercel.app/favicon.svg',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85',
  description: 'French-inspired cuisine crafted from the finest local Québec ingredients. Fine dining in the heart of Montréal since 2009.',
  telephone: '+15145550192',
  email: 'hello@bistromontreal.com',
  foundingDate: '2009',
  priceRange: '$$$',
  servesCuisine: ['French', 'Québécois'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1420 Rue Peel',
    addressLocality: 'Montréal',
    addressRegion: 'QC',
    postalCode: 'H3A 1S8',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.5022,
    longitude: -73.5744,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday','Wednesday','Thursday'], opens: '17:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday','Saturday'], opens: '17:00', closes: '23:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '17:00', closes: '21:30' },
  ],
  hasMenu: 'https://bist-mont.vercel.app/menu',
  acceptsReservations: true,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '312',
    bestRating: '5',
  },
  sameAs: [
    'https://instagram.com',
    'https://facebook.com',
    'https://x.com',
    'https://tiktok.com',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <SkeletonScreen />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}