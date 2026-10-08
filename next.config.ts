import type { NextConfig } from "next";

// Note: headers() runs at the edge on Vercel and is a good place to set
// baseline security headers for all routes.
const nextConfig: NextConfig = {
  async redirects() {
    // Clarity insights consolidated to aqount.tech (Oct 2026).
    // Articles now live on the main WordPress site; keep this list
    // in sync if new insights are published on aqount.tech instead.
    const insights: Array<[string, string]> = [
      ["13-week-cash-flow-forecast-startups", "13-week-cash-flow-forecast-startups"],
      ["what-does-a-virtual-cfo-do-deliverables-first-30-days", "what-does-a-virtual-cfo-do-deliverables-first-30-days"],
      ["virtual-cfo-cost-pricing", "virtual-cfo-cost-pricing"],
      ["virtual-cfo-vs-fractional-cfo-vs-accountant", "virtual-cfo-vs-fractional-cfo-vs-accountant"],
      ["clean-up-xero-chart-of-accounts", "clean-up-xero-chart-of-accounts"],
      ["financial-clarity-scorecard", "financial-clarity-scorecard"],
    ];
    return [
      ...insights.map(([from, to]) => ({
        source: `/insights/${from}`,
        destination: `https://aqount.tech/${to}/`,
        permanent: true,
      })),
      {
        source: "/insights",
        destination: "https://aqount.tech/category/insights/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Mitigate clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // Reduce referrer leakage
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Opt out of powerful features by default
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
            ].join(", "),
          },

          // Cross-origin isolation defaults (conservative)
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },

          // CSP: start in Report-Only to avoid accidental breakage.
          // Tighten later (remove unsafe-* and add nonces/hashes) once audited.
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "img-src 'self' data: https:",
              "style-src 'self' 'unsafe-inline'",
              // Next.js injects inline scripts; keep report-only for now.
              "script-src 'self' 'unsafe-inline' https:",
              "connect-src 'self' https:",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
