import type { NextConfig } from "next";

// Note: headers() runs at the edge on Vercel and is a good place to set
// baseline security headers for all routes.
const nextConfig: NextConfig = {
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
