import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Faq from "@/components/Faq";
import Icon from "@/components/Icon";
import ScorecardMock from "@/components/ScorecardMock";
import SectionHeading from "@/components/SectionHeading";
import Stepper from "@/components/Stepper";
import TrustChips from "@/components/TrustChips";

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

function ProductMockupHero() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,var(--accent-soft),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(17,24,39,0.06),transparent_55%)]" />
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="text-sm font-semibold text-[color:var(--heading)]">
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
              <div className="text-4xl font-semibold tracking-tight text-[color:var(--heading)]">
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
              Fast, structured signals on reporting readiness and cash visibility.
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
              Scope: Structure + coding patterns
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
                Get Your Financial Clarity Score — in minutes
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                Connect your Xero organisation for a secure, read-only diagnostic
                that evaluates your chart of accounts structure, categorisation
                consistency, reporting clarity, and cash flow visibility—so you
                can get decision-ready numbers, faster.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/api/xero/connect">Connect Xero</Button>
                <Button href="#scorecard" variant="secondary">
                  Preview the Scorecard
                </Button>
              </div>
              <div className="mt-3 text-sm text-zinc-500">
                Read-only access. No posting, no changes. You can revoke access
                anytime.
              </div>

              <TrustChips />

              <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-lg">
                {[
                  ["Score + 5-dimension breakdown", "Clarity in one view."],
                  ["Flags structural issues", "Find what blocks insight."],
                  ["Built for SME operators", "Founder-friendly outputs."],
                  ["Backed by Aqount", "Finance ops + advisory."],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm"
                  >
                    <div className="text-sm font-semibold text-[color:var(--heading)]">
                      {k}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <ProductMockupHero />
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="border-y border-[var(--border)] bg-white">
        <Container>
          <div className="grid gap-4 py-6 text-sm text-zinc-600 sm:grid-cols-4">
            {[
              "Built by Aqount (finance ops + advisory)",
              "Designed for SMEs on Xero (SEA-first)",
              "Read-only diagnostic (no changes to ledger)",
              "Actionable scorecard (issues + next steps)",
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
              title="Xero is powerful — but it doesn’t guarantee financial clarity"
              lead="Most SMEs adopt accounting software and still struggle to get reliable, decision-ready reporting because the underlying financial structure isn’t designed for management insight. When accounts and categorisation aren’t consistent, reports become hard to trust—and cash decisions get reactive."
            />
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-[color:var(--heading)]">
                Why it matters
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                The result is slower decisions, less confidence in margins, and
                higher risk of cash surprises—especially as the business grows.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              icon={<Icon name="grid" />}
              title="Messy chart of accounts"
              description="Too many overlapping accounts → reporting becomes noisy and hard to interpret."
            />
            <Card
              icon={<Icon name="tag" />}
              title="Inconsistent categorisation"
              description="The same spend lands in different buckets → margins and cost drivers shift unpredictably."
            />
            <Card
              icon={<Icon name="chart" />}
              title="Poor reporting clarity"
              description="You get statements, not insight → decision-making becomes slower and riskier."
            />
            <Card
              icon={<Icon name="score" />}
              title="Limited cash flow visibility"
              description="Without structure, cash views stay reactive → runway surprises happen."
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
            lead="A simple 3-step flow designed for busy operators. Secure, read-only, and purpose-built for Xero SMEs."
          />
          <Stepper />
        </Container>
      </section>

      {/* Score section */}
      <section id="scorecard" className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Output"
              title="Your scorecard: clarity, broken down"
              lead="This diagnostic evaluates how well your accounting system supports reporting, visibility, and decision-making—then summarises results in a score you can understand immediately."
            />
            <ScorecardMock />
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
              description="A fast indicator of how decision-ready your structure is—plus a breakdown across key dimensions."
            />
            <Card
              icon={<Icon name="scan" />}
              title="Structural Issues Detected"
              description="Highlights patterns that reduce reporting reliability and clarity—so you know what to fix first."
            />
            <Card
              icon={<Icon name="chart" />}
              title="Cash Visibility Signals"
              description="Finds issues that commonly cause reactive cash decisions and weak forecasting foundations."
            />
            <Card
              icon={<Icon name="spark" />}
              title="Specialist Review (Optional)"
              description="Aqount can help translate findings into practical finance operations improvements when you’re ready."
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
                desc: "You’re compliant, but reporting doesn’t feel decision-ready.",
              },
              {
                title: "Growing businesses",
                desc: "Complexity is increasing—structure needs to catch up before it becomes painful.",
              },
              {
                title: "Founders & finance leads",
                desc: "You want numbers you can trust for hiring, spend, and runway decisions.",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold text-[color:var(--heading)]">
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
              lead="This diagnostic is built from what we see repeatedly in finance operations optimisation, financial modelling, and Virtual CFO work. We’ve productised those checks into a scorecard—so SMEs can get clarity faster, without starting from scratch."
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
                  <div className="text-sm font-semibold text-[color:var(--heading)]">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Security / hesitation reducers */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Security"
            title="A security-first diagnostic"
            lead="Designed to reduce hesitation for founders and finance leads. Read-only access, no posting, and no changes to your books."
          />
          <Faq />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)] sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--accent-soft)] blur-2xl" />
            <div className="relative">
              <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-3xl">
                Discover Your Financial Clarity Score
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                A complimentary, read-only diagnostic for SMEs across Southeast
                Asia using Xero.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/api/xero/connect">Connect Xero</Button>
                <div className="text-sm text-zinc-500">
                  Read-only. No bookkeeping changes. Typical completion: 3–5
                  minutes.
                </div>
              </div>
              <div className="mt-3 text-xs text-zinc-500">
                After connecting, you’ll select your organisation and receive a
                scorecard preview.
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
