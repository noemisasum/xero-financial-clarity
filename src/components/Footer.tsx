import Link from "next/link";
import Container from "@/components/Container";

export default function Footer({
  includeHomepageAnchors = false,
}: {
  includeHomepageAnchors?: boolean;
}) {
  const howHref = includeHomepageAnchors ? "/#how" : "#how";
  const scorecardHref = includeHomepageAnchors ? "/#scorecard" : "#scorecard";
  const faqHref = includeHomepageAnchors ? "/#faq" : "#faq";

  return (
    <footer className="border-t border-[var(--border)] bg-white py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* On mobile: show Product + Company first, then brand/copyright at the end.
              On desktop: keep brand/copyright block on the left (via ordering). */}
          <div className="order-2 sm:order-2">
            <div className="text-sm font-semibold text-[color:var(--heading)]">
              Product
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="text-[color:var(--link)] hover:opacity-90">
                  Financial Clarity Diagnostic
                </a>
              </li>
              <li>
                <a
                  href={scorecardHref}
                  className="text-[color:var(--link)] hover:opacity-90"
                >
                  Sample Scorecard
                </a>
              </li>
              <li>
                <a href={howHref} className="text-[color:var(--link)] hover:opacity-90">
                  How it works
                </a>
              </li>
              <li>
                <a href={faqHref} className="text-[color:var(--link)] hover:opacity-90">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/api/xero/connect"
                  className="text-[color:var(--link)] hover:opacity-90"
                >
                  Run Diagnostic
                </a>
              </li>
            </ul>
          </div>

          <div className="order-3 sm:order-3">
            <div className="text-sm font-semibold text-[color:var(--heading)]">
              Company
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://aqount.tech/about/"
                  className="text-[color:var(--link)] hover:opacity-90"
                  target="_blank"
                  rel="noreferrer"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://aqount.tech/finance-operations-optimization/"
                  className="text-[color:var(--link)] hover:opacity-90"
                  target="_blank"
                  rel="noreferrer"
                >
                  Services
                </a>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-[color:var(--link)] hover:opacity-90"
                >
                  Insights
                </Link>
              </li>
              <li>
                <a
                  href="https://aqount.tech/contact/"
                  className="text-[color:var(--link)] hover:opacity-90"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://aqount.tech/privacy-policy/"
                  className="text-[color:var(--link)] hover:opacity-90"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="order-4 sm:order-1 lg:col-span-2">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/aqount-logo.png"
                alt="Aqount"
                className="h-8 w-auto"
              />
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
              Financial clarity specialists for Xero-powered businesses.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/97445870"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center text-zinc-500 hover:text-zinc-700"
                aria-label="Aqount LinkedIn"
                title="LinkedIn"
              >
                {/* Simple LinkedIn mark (no border) */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0zM7.06 20.45H3.56V9h3.5v11.45zM5.31 7.43c-1.12 0-2.03-.91-2.03-2.03 0-1.12.91-2.03 2.03-2.03s2.03.91 2.03 2.03c0 1.12-.91 2.03-2.03 2.03zM20.45 20.45h-3.5v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67h-3.5V9h3.36v1.56h.05c.47-.9 1.62-1.86 3.33-1.86 3.56 0 4.22 2.35 4.22 5.4v6.35z" />
                </svg>
              </a>
            </div>

            <div className="mt-6 text-xs text-zinc-500 sm:mt-8">
              © {new Date().getFullYear()} Aqount. Financial Clarity Diagnostic is a product
              by Aqount. All rights reserved.
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/xero-silver-partner-badge.png"
                alt="Xero Silver Partner"
                className="h-12 w-auto"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/acca-badge.svg"
                alt="ACCA"
                className="h-12 w-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
