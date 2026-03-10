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
            <div className="flex flex-col leading-none">
              <Image
                src="/brand/aqount-lockup.png"
                alt="Aqount Financial Clarity Diagnostic"
                width={260}
                height={56}
                priority
                className="h-9 w-auto"
              />
            </div>
          </Link>

          <nav className="flex items-center gap-5">
            <Link
              href="#how"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              How it works
            </Link>

            <Link
              href="#scorecard"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Sample Scorecard
            </Link>

            <Link
              href="#methodology"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Methodology
            </Link>

            <Link
              href="#faq"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              FAQ
            </Link>

            <div className="hidden sm:block">
              <Button href="/api/xero/connect">Connect Xero</Button>
            </div>
          </nav>
        </div>

        {/* Mobile actions */}
        <div className="pb-3 sm:hidden">
          <div className="flex items-center justify-start">
            <Button href="/api/xero/connect">Run Diagnostic</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
