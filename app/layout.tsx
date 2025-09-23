import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

/**
 * Site constants
 */
const siteName = 'TrustPlane';
const titleDefault = 'TrustPlane — Approve once. Governed canary in ≤ 7 days.';
const description =
  'Enterprise AI control plane: identity, governance, and connectors to get pilots to audited production in your cloud.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'),
  applicationName: siteName,
  title: {
    default: titleDefault,
    template: '%s — TrustPlane'
  },
  description,
  keywords: [
    'AI governance',
    'enterprise AI',
    'control plane',
    'SAML',
    'SCIM',
    'RBAC',
    'ABAC',
    'BYOK',
    'OPA',
    'Cedar',
    'Databricks',
    'Snowflake',
    'ServiceNow',
    'Splunk',
    'Datadog'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: titleDefault,
    description,
    url: '/',
    siteName,
    type: 'website',
    images: [
      {
        url: '/og/trustplane-hero.png',
        width: 1200,
        height: 630,
        alt: 'TrustPlane — Approve once. Governed canary in ≤ 7 days.'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: titleDefault,
    description,
    images: ['/og/trustplane-hero.png']
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [{ url: '/icons/apple-touch-icon.png' }],
    shortcut: ['/favicon.ico'],
    other: [{ rel: 'mask-icon', url: '/icons/safari-pinned-tab.svg' }]
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F14' }
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  category: 'technology'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

const manrope = Manrope({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`bg-white text-black ${manrope.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] bg-gray-50 text-gray-900 antialiased scroll-smooth">
        {/* Accessible skip link for keyboard users */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow ring-2 ring-orange-500"
        >
          Skip to content
        </a>

        <SWRConfig
          value={{
            // Keep your existing pattern: provide promises as fallback
            // so components that read them can suspend intentionally.
            // (Matches your previous file’s comment/approach.)
            fallback: {
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          {/* Focus target for the skip link */}
          <div id="content" tabIndex={-1}>
            {children}
          </div>
        </SWRConfig>
      </body>
    </html>
  );
}
