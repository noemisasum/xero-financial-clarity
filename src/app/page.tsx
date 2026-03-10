import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2">
      <div
        aria-hidden
        className="h-9 w-9 rounded-xl border border-[var(--border)] bg-white shadow-sm"
      >
        <div className="h-full w-full rounded-xl bg-[linear-gradient(135deg,transparent_0%,transparent_40%,var(--accent-soft)_100%)]" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight text-[color:var(--heading)]">
          Aqount
        </div>
        <div className="text-xs text-zinc-500">Financial Clarity Diagnostic</div>
      </div>
    </div>
  );
}

function Icon({ name }: { name: "spark" | "grid" | "tag" | "chart" | "link" | "scan" | "score" }) {
  const common =
    "h-5 w-5 text-[color:var(--accent)] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]";

  switch (name) {
    case "spark":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
          <path d="M19 14l.8 2.6L22 18l-2.2.7L19 21l-.8-2.3L16 18l2.2-.4L19 14z" />
        </svg>
      );
    case "grid":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 4h7v7H4V4z" />
          <path d="M13 4h7v7h-7V4z" />
          <path d="M4 13h7v7H4v-7z" />
          <path d="M13 13h7v7h-7v-7z" />
        </svg>
      );
    case "tag":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 12l-8 8-10-10V2h8L20 12z" />
          <path d="M7 7h.01" />
        </svg>
      );
    case "chart":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 3v18h18" />
          <path d="M7 14l3-3 4 4 6-8" />
        </svg>
      );
    case "link":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
          <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1" />
        </svg>
      );
    case "scan":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M4 7V6a2 2 0 0 1 2-2h1" />
          <path d="M17 4h1a2 2 0 0 1 2 2v1" />
          <path d="M20 17v1a2 2 0 0 1-2 2h-1" />
          <path d="M7 20H6a2 2 0 0 1-2-2v-1" />
          <path d="M7 12h10" />
        </svg>
      );
    case "score":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 20a8 8 0 1 0-8-8" />
          <path d="M12 12l4-2" />
          <path d="M12 12v-6" />
        </svg>
      );
    default:
      return null;
  }
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]";

  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`${base} border border-[var(--border)] bg-white text-[color:var(--link)] hover:bg-zinc-50`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} bg-[color:var(--link)] text-white hover:opacity-90`}
    >
      {children}
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base leading-7 text-zinc-600">{lead}</p>
      ) : null}
    </div>
  );
}

function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_0_rgba(17,24,39,0.02),0_10px_30px_rgba(17,24,39,0.05)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft)] ring-1 ring-[color:var(--border)]">
          {icon}
        </div>
        <div className="text-sm font-semibold text-zinc-950">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}

function ProductMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,var(--accent-soft),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(17,24,39,0.06),transparent_55%)]" />
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="text-sm font-semibold text-zinc-950">
            Aqount Financial Clarity Diagnostic
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="text-xs text-zinc-500">Read-only analysis</div>
          </div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-5">
            <div className="flex items-baseline justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Financial Clarity Score
              </div>
              <div className="text-xs text-zinc-500">Sample</div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div className="text-4xl font-semibold tracking-tight text-zinc-950">
                64
                <span className="text-lg text-zinc-500">/100</span>
              </div>
              <div className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-zinc-900">
                Moderate
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white ring-1 ring-[color:var(--border)]">
              <div
                className="h-full rounded-full bg-[color:var(--accent)]"
                style={{ width: "64%" }}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Highlights structural issues that may be affecting reporting,
              visibility, and decision-making.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Diagnostics snapshot
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Chart of Accounts Structure", 7, 10],
                ["Categorisation Consistency", 5, 10],
                ["Reporting Clarity", 6, 10],
                ["Cash Flow Visibility", 4, 10],
                ["Bookkeeping Hygiene", 8, 10],
              ].map(([label, value, outOf]) => {
                const pct = (Number(value) / Number(outOf)) * 100;
                return (
                  <div key={String(label)}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-zinc-900">{label}</div>
                      <div className="font-semibold text-zinc-950">
                        {value} <span className="text-zinc-400">/</span> {outOf}
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-zinc-900"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] bg-white px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs text-zinc-600">
              Org: Example Trading Pte. Ltd.
            </div>
            <div className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs text-zinc-600">
              Ledger: Xero
            </div>
            <div className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs text-zinc-600">
              Region: Southeast Asia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:var(--background)]/80 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <LogoMark />
            <div className="flex items-center gap-3">
              <Link
                href="#how"
                className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 sm:inline"
              >
                How it works
              </Link>
              <Link
                href="#why"
                className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 sm:inline"
              >
                Why Aqount
              </Link>
              <Button href="/api/xero/connect">Connect Xero</Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container>
          <div className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-zinc-600">
                <Icon name="spark" />
                <span>Specialist diagnostic by Aqount</span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-5xl">
                What’s Your Financial Clarity Score?
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                Many SMEs across Southeast Asia use Xero, but still struggle with
                messy charts of accounts, weak reporting structure, and limited
                cash flow visibility. Aqount’s Financial Clarity Diagnostic
                analyzes your accounting structure and highlights issues that
                may be affecting financial decision-making.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/api/xero/connect">Connect Xero</Button>
                <Button href="#how" variant="secondary">
                  See How It Works
                </Button>
              </div>
              <div className="mt-3 text-sm text-zinc-500">
                Secure read-only analysis of your Xero accounting structure.
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:max-w-lg">
                {[
                  ["Finance-system focused", "Built for structure, not vanity."],
                  ["Designed for SMEs", "Founder-friendly, decision-ready."],
                  ["Read-only diagnostic", "No bookkeeping changes required."],
                  ["Built by Aqount", "Trusted accounting partner."],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm"
                  >
                    <div className="text-sm font-semibold text-zinc-950">
                      {k}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <ProductMockup />
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="border-y border-[var(--border)] bg-white">
        <Container>
          <div className="grid gap-4 py-6 text-sm text-zinc-600 sm:grid-cols-4">
            {[
              "Built by Aqount",
              "Designed for SMEs using Xero",
              "Finance-system focused",
              "Read-only diagnostic",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <SectionHeading
              eyebrow="The reality"
              title="Accounting Software Doesn’t Automatically Create Financial Clarity"
              lead="Many businesses already use Xero, but their financial systems are not structured well enough to support real business decisions."
            />
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-zinc-950">
                What we look for
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                We assess structure, consistency, and reporting readiness—then
                translate findings into a clear, actionable score.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              icon={<Icon name="grid" />}
              title="Messy chart of accounts"
              description="Overlapping accounts, unclear groupings, and inconsistent naming reduce reporting reliability."
            />
            <Card
              icon={<Icon name="tag" />}
              title="Inconsistent expense categorisation"
              description="Ad-hoc coding makes margins and cost drivers hard to interpret month to month."
            />
            <Card
              icon={<Icon name="chart" />}
              title="Poor reporting clarity"
              description="Reports exist, but they don’t tell a coherent story for decision-making."
            />
            <Card
              icon={<Icon name="score" />}
              title="Limited cash flow visibility"
              description="Without the right structure, cash flow views and forecasting remain reactive."
            />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how" className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="How the Diagnostic Works"
            lead="A simple, secure flow designed for SMEs—productized, but backed by specialist thinking."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: <Icon name="link" />,
                title: "Connect your Xero organisation",
                desc: "Authorize a secure, read-only connection (no changes to your data).",
              },
              {
                icon: <Icon name="scan" />,
                title: "Automated financial structure analysis",
                desc: "We evaluate your chart of accounts and reporting readiness across key dimensions.",
              },
              {
                icon: <Icon name="score" />,
                title: "Receive your Financial Clarity Score",
                desc: "Get a scorecard and prioritized findings—built for real operator decisions.",
              },
            ].map((s, idx) => (
              <div
                key={s.title}
                className="relative rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-soft)] ring-1 ring-[color:var(--border)]">
                    {s.icon}
                  </div>
                  <div className="text-sm font-semibold text-zinc-950">
                    {idx + 1}. {s.title}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Score section */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Output"
              title="A clear scorecard you can act on"
              lead="This diagnostic evaluates how well your accounting system supports reporting, visibility, and decision-making."
            />
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)]">
              <div className="text-sm font-semibold text-zinc-950">
                Financial Clarity Score
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div className="text-4xl font-semibold tracking-tight text-zinc-950">
                  64 <span className="text-lg text-zinc-500">/ 100</span>
                </div>
                <div className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-zinc-900">
                  Sample output
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["Chart of Accounts Structure", "7 / 10"],
                  ["Categorisation Consistency", "5 / 10"],
                  ["Reporting Clarity", "6 / 10"],
                  ["Cash Flow Visibility", "4 / 10"],
                  ["Bookkeeping Hygiene", "8 / 10"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-zinc-50 px-4 py-3"
                  >
                    <div className="text-sm font-medium text-zinc-900">{k}</div>
                    <div className="text-sm font-semibold text-zinc-950">{v}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Built to identify structure issues—not just surface-level
                bookkeeping noise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What you receive */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Deliverables"
            title="What you receive"
            lead="A productized diagnostic experience—supported by Aqount specialists when you’re ready to act on findings."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              icon={<Icon name="score" />}
              title="Financial System Health Score"
              description="A single score that reflects the decision-readiness of your accounting structure."
            />
            <Card
              icon={<Icon name="scan" />}
              title="Structural Issue Detection"
              description="Pinpoints patterns in your chart of accounts and reporting setup that reduce clarity."
            />
            <Card
              icon={<Icon name="chart" />}
              title="Cash Flow Visibility Analysis"
              description="Highlights signals that may impact cash visibility and planning confidence."
            />
            <Card
              icon={<Icon name="spark" />}
              title="Expert Review by Aqount Specialists"
              description="Optional follow-up: translate scorecard findings into practical finance operations improvements."
            />
          </div>
        </Container>
      </section>

      {/* Who this is for */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Audience"
            title="Who this is for"
            lead="A quick diagnostic that respects your time—and matches the realities of running an SME in Southeast Asia."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "SMEs already using Xero",
                desc: "You have accounting software in place, but aren’t confident your structure supports good reporting.",
              },
              {
                title: "Growing businesses",
                desc: "Your team is scaling and you need clearer visibility—before finance complexity compounds.",
              },
              {
                title: "Founders & operators",
                desc: "You want decision-ready numbers, not just compliance outputs.",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold text-zinc-950">
                  {x.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{x.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Aqount */}
      <section id="why" className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Aqount"
              title="Why Aqount"
              lead="Aqount is positioned as a trusted accounting and bookkeeping partner. This diagnostic is built from real finance operations work—productized into a fast, credible scorecard."
            />
            <div className="space-y-4">
              {[
                {
                  title: "Finance operations expertise",
                  desc: "Grounded in the systems that produce reliable reports—charts of accounts, coding logic, and controls.",
                },
                {
                  title: "Practical advisory, not generic software",
                  desc: "The output is meant to be acted on—so you can improve reporting and decision-making outcomes.",
                },
                {
                  title: "Built around real SME pain points",
                  desc: "Messy structures are common. We focus on clarity, consistency, and usefulness—without jargon.",
                },
                {
                  title: "Automation + specialist review",
                  desc: "A modern diagnostic flow, backed by specialists who can help implement improvements if needed.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
                >
                  <div className="text-sm font-semibold text-zinc-950">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)] sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
            <div className="relative">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Discover Your Financial Clarity Score
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                A complimentary diagnostic for SMEs across Southeast Asia using
                Xero.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/api/xero/connect">Connect Xero</Button>
                <div className="text-sm text-zinc-500">
                  No bookkeeping changes. Secure read-only analysis.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-white py-10">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
            <div>
              <div className="text-sm font-semibold text-[color:var(--heading)]">
                Aqount
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Financial clarity specialists for SMEs using Xero across
                Southeast Asia.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <a
                href="https://aqount.tech"
                className="text-sm font-medium text-[color:var(--link)] hover:opacity-90"
                target="_blank"
                rel="noreferrer"
              >
                aqount.tech
              </a>
              <a
                href="/privacy"
                className="text-sm font-medium text-[color:var(--link)] hover:opacity-90"
              >
                Privacy Policy
              </a>
              <a
                href="https://aqount.tech/contact"
                className="text-sm font-medium text-[color:var(--link)] hover:opacity-90"
                target="_blank"
                rel="noreferrer"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-xs text-zinc-500">
            © {new Date().getFullYear()} Aqount. Aqount Financial Clarity
            Diagnostic is a specialist product experience by Aqount.
          </div>
        </Container>
      </footer>
    </div>
  );
}
