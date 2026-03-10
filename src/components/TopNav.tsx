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
            <Image
              src="/brand/aqount-logo.png"
              alt="Aqount"
              width={150}
              height={38}
              priority
              className="h-8 w-auto"
            />
            <span className="hidden text-xs font-medium text-zinc-500 sm:inline">
              Financial Clarity Diagnostic
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            {/* Match aqount.tech nav structure */}
            <Link
              href="https://aqount.tech/about/"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              About
            </Link>

            <Link
              href="https://aqount.tech/#services"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Services
            </Link>

            <Link
              href="https://aqount.tech/contact/"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-medium text-[color:var(--link)] hover:opacity-90 sm:inline"
            >
              Contact
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
