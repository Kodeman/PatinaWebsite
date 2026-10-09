import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
  // Avoid trailing-slash redirects on PostHog ingest endpoints (rely on trailing slashes)
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.patina.cloud' }],
        destination: 'https://patina.cloud/:path*',
        permanent: true,
      },
      { source: '/waitlist', destination: '/founding', permanent: true },
      { source: '/join', destination: '/founding', permanent: true },
      { source: '/founding-circle', destination: '/founding', permanent: true },
      // Keep old discovery links and their campaign parameters useful.
      { source: '/materials', destination: '/makers', permanent: false },
      { source: '/furniture/:path*', destination: '/makers', permanent: true },
      // Campaign print vanity paths (temporary; campaigns end). See docs/marketing/utm-convention.md.
      { source: '/parade', destination: '/designers?utm_source=moll-drive&utm_medium=print&utm_campaign=2026-10-moll-drive', permanent: false },
      { source: '/studio-door', destination: '/designers?utm_source=patina&utm_medium=print&utm_campaign=2026-10-studio-door', permanent: false },
      { source: '/hire', destination: '/designers?utm_source=patina&utm_medium=print&utm_campaign=2026-10-first-hire', permanent: false },
    ];
  },
  async rewrites() {
    // First-party reverse proxy to PostHog (mitigates ad/tracking blockers).
    // Static/array rules must precede the catch-all. See:
    // https://posthog.com/docs/advanced/proxy/nextjs
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/array/:path*',
        destination: 'https://us-assets.i.posthog.com/array/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
