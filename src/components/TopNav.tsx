import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:var(--background)]/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="inline-flex">
              <Image
                src="/brand/aqount-lockup-transparent.png"
                alt="Aqount Financial Clarity Diagnostic"
                width={260}
                height={56}
                priority
                className="h-8 w-auto sm:h-9"
              />
            </div>
          </Link>

          <nav className="flex items-center gap-5">
            <Link
              href="/#how"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              How it works
            </Link>

            <Link
              href="/#scorecard"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Sample Scorecard
            </Link>

            <Link
              href="/#methodology"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Methodology
            </Link>

            <Link
              href="/insights"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Insights
            </Link>

            <div>
              <Button
                href="/api/xero/connect"
                className="px-4 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm"
              >
                Run Diagnostic
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
