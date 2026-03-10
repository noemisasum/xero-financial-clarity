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
                src="/brand/aqount-logo.png"
                alt="Aqount"
                width={150}
                height={38}
                priority
                className="h-8 w-auto"
              />
              <span className="hidden pt-1 pl-8 text-[11px] font-medium text-zinc-500 sm:block">
                Financial Clarity Diagnostic
              </span>
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
        <div className="pb-4 sm:hidden">
          <Button href="/api/xero/connect">Connect Xero</Button>
        </div>
      </Container>
    </header>
  );
}
