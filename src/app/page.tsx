import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";
import Icon from "@/components/Icon";
import ScorecardMock from "@/components/ScorecardMock";
import SectionHeading from "@/components/SectionHeading";
import Stepper from "@/components/Stepper";
import TrustChips from "@/components/TrustChips";
import TopNav from "@/components/TopNav";

function ProductMockupHero() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,var(--accent-soft),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(17,24,39,0.06),transparent_55%)]" />
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_1px_0_rgba(17,24,39,0.02),0_25px_70px_rgba(17,24,39,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
          <div>
            <div className="text-sm font-semibold text-[color:var(--heading)]">
              Example Trading Pte. Ltd.
            </div>
            <div className="mt-0.5 text-xs text-zinc-500">
              Generated on: 10 Mar 2026
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="text-xs text-zinc-500">Read-only analysis</div>
          </div>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-zinc-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Financial Clarity Score
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
              Your accounting structure provides partial reporting visibility,
              but several areas may limit decision-making clarity.
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
                    <div className="flex items-start justify-between gap-3 text-sm">
                      <div className="min-w-0 text-zinc-900">
                        <span className="block whitespace-normal leading-5">
                          {label}
                        </span>
                      </div>
                      <div className="shrink-0 whitespace-nowrap font-semibold tabular-nums text-zinc-950">
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

      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container>
          <div className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[color:var(--heading)] sm:text-5xl">
                Is your financial data actually{" "}
                <span className="underline decoration-[color:var(--accent)] decoration-2 underline-offset-4">
                  decision-ready
                </span>
                ?
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
                Many businesses use Xero but still struggle with messy charts of
                accounts, inconsistent expense categorisation, and unclear
                financial reporting. This AI-assisted diagnostic analyses your
                accounting structure and quickly reveals whether your financial
                data is truly decision-ready.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/api/xero/connect">Get Your Clarity Score</Button>
                <Button href="#scorecard" variant="secondary">
                  Preview the Scorecard
                </Button>
              </div>
              <TrustChips />
            </div>

            <ProductMockupHero />
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="The reality"
                title={
                  <>
                    Financial clarity depends on{" "}
                    <span className="underline decoration-[color:var(--accent)] decoration-2 underline-offset-4">
                      structure
                    </span>
                  </>
                }
                lead="Most businesses adopt accounting software and still struggle to get reliable, decision-ready reporting because the underlying financial structure is not designed for management insight. When accounts and categorisation are inconsistent, reports become difficult to trust. Cash decisions then become reactive."
              />

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-zinc-50 p-5 text-sm leading-6 text-zinc-700">
                <span className="font-semibold text-[color:var(--heading)]">
                  Result:
                </span>{" "}
                Slower decisions, less confidence in margins, and higher risk of
                cash surprises, especially as the business grows.
              </div>
            </div>

            <div className="grid items-stretch gap-5 sm:grid-cols-2">
              <Card
                icon={<Icon name="grid" />}
                title="Messy Chart of Accounts"
                description="Too many overlapping accounts. Reporting becomes noisy and hard to interpret."
              />
              <Card
                icon={<Icon name="tag" />}
                title="Inconsistent Expense Coding"
                description="The same spend lands in different buckets. Margins and cost drivers shift unpredictably."
              />
              <Card
                icon={<Icon name="chart" />}
                title="Poor Reporting Clarity"
                description="You get statements, not insight. Decision-making becomes slower and riskier."
              />
              <Card
                icon={<Icon name="score" />}
                title="Limited Cash Flow Visibility"
                description="Without structure, cash views stay reactive. Runway surprises happen."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how" className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <SectionHeading
              eyebrow="Process"
              title="How the diagnostic works"
            />

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {[
                "Read-only access",
                "~1 minute",
                "Access auto-revoked",
              ].map((t) => (
                <div
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-zinc-600"
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <Stepper />
        </Container>
      </section>

      {/* Score section */}
      <section id="scorecard" className="py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Output"
              title={
                <>
                  Your scorecard:{" "}
                  <span className="underline decoration-[color:var(--accent)] decoration-2 underline-offset-4">
                    clarity
                  </span>
                  , broken down
                </>
              }
              lead="This diagnostic evaluates how well your accounting system supports reporting, visibility, and decision-making—then summarises results in a score you can understand immediately."
            />
          </div>

          <div className="mt-10">
            <ScorecardMock />
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-lg font-semibold tracking-tight text-[color:var(--heading)]">
                Ready to see your Financial Clarity Score?
              </div>
              <Button href="/api/xero/connect">Get Your Clarity Score</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Why this diagnosis works */}
      <section id="methodology" className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Methodology"
            title="Why this diagnosis works"
            lead="Because financial clarity isn’t a software problem. It’s built on structure. Our diagnostic checks the underlying design choices that determine whether your financial data produces decision-ready reporting."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Card
              icon={<Icon name="score" />}
              title="Looks Beyond “Correct” Bookkeeping"
              description="Even accurate transactions can produce unclear reporting when accounts and coding logic are inconsistent. We assess structural clarity, not just compliance."
            />
            <Card
              icon={<Icon name="scan" />}
              title="Built on Repeatable Structure Signals"
              description="We evaluate patterns in accounts, categories, and reporting setup that consistently predict whether reporting will be decision-ready."
            />
            <Card
              icon={<Icon name="chart" />}
              title="Converts Findings into Practical Next Steps"
              description="You don’t just get a score. You get prioritised issues and recommended fixes that improve clarity without overhauling your whole system."
            />
            <Card
              icon={<Icon name="spark" />}
              title="Backed by Certified Accounting Professionals"
              description="This diagnostic reflects what Aqount teams see across finance operations, reporting clean-ups, and advisory work with growing businesses."
            />
          </div>
        </Container>
      </section>

      {/* FAQ (Audience + Why Aqount + Security) */}
      <section id="faq" className="py-14 sm:py-20">
        <Container>
          <FaqAccordion
            eyebrow="FAQ"
            title="Frequently asked questions"
            lead="Quick answers for founders and finance leads evaluating a read-only diagnostic." 
            items={[
              {
                q: "Who is this for?",
                a: (
                  <div className="space-y-2">
                    <p>
                      This diagnostic is designed for founders, finance leads,
                      and operators who use Xero but want clearer management
                      reporting.
                    </p>
                    <p>
                      It is particularly useful for growing businesses where
                      financial data exists but decision-making still feels
                      reactive—often due to inconsistent account structures,
                      categorisation, or reporting design.
                    </p>
                  </div>
                ),
              },
              {
                q: "Why Aqount?",
                a: (
                  <div className="space-y-2">
                    <p>
                      Aqount specialises in finance operations and reporting
                      systems for growing companies across Southeast Asia.
                    </p>
                    <p>
                      This diagnostic reflects patterns we see repeatedly when
                      reviewing accounting systems: messy charts of accounts,
                      inconsistent expense coding, and reporting structures that
                      make financial insight difficult.
                    </p>
                    <p>
                      The clarity score provides a quick signal of whether your
                      current setup supports reliable decision-making.
                    </p>
                  </div>
                ),
              },
              {
                q: "Is this read-only? Will it change my books?",
                a: (
                  <div className="space-y-2">
                    <p>
                      Yes. The diagnostic uses read-only access to your Xero
                      organisation.
                    </p>
                    <p>
                      It does not post transactions, modify data, or change your
                      accounting structure.
                    </p>
                    <p>
                      Access is automatically revoked after the diagnostic is
                      completed.
                    </p>
                  </div>
                ),
              },
              {
                q: "What does the diagnostic analyse?",
                a: (
                  <div className="space-y-2">
                    <p>
                      The tool reviews structural signals within your accounting
                      system, including:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Chart of accounts structure",
                        "Expense categorisation patterns",
                        "Reporting groupings",
                        "Cash flow visibility signals",
                        "General bookkeeping hygiene indicators",
                      ].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <p>
                      These signals are summarised into a Financial Clarity
                      Score and a breakdown across key dimensions.
                    </p>
                  </div>
                ),
              },
              {
                q: "How long does it take?",
                a: (
                  <div className="space-y-2">
                    <p>
                      Most diagnostics complete in under one minute once access
                      is authorised.
                    </p>
                    <p>
                      You will immediately receive a clarity scorecard showing
                      your overall score, breakdown by dimension, and key
                      structural issues detected.
                    </p>
                  </div>
                ),
              },
              {
                q: "What do I receive at the end?",
                a: (
                  <div className="space-y-2">
                    <p>You receive a Financial Clarity Scorecard, which includes:</p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Your overall clarity score",
                        "A breakdown across five reporting dimensions",
                        "Key structural issues detected in your accounting setup",
                        "Recommended next steps to improve reporting clarity",
                      ].map((x) => (
                        <li key={x} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--accent)]" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <p>
                      This helps identify where your accounting structure may be
                      limiting decision-ready reporting.
                    </p>
                  </div>
                ),
              },
              {
                q: "Do I need to be a Xero expert to understand the results?",
                a: (
                  <div className="space-y-2">
                    <p>
                      No. The scorecard is designed to be understandable for
                      founders and operators, not just accountants.
                    </p>
                    <p>
                      It highlights structural issues and explains how they
                      affect financial visibility and decision-making.
                    </p>
                  </div>
                ),
              },
              {
                q: "What happens after the diagnostic?",
                a: (
                  <div className="space-y-2">
                    <p>The diagnostic is designed to give you a clear starting point.</p>
                    <p>
                      Some businesses choose to implement improvements
                      internally. Others engage Aqount to help restructure
                      reporting, improve categorisation frameworks, or build
                      management reporting systems.
                    </p>
                    <p>
                      There is no obligation to engage Aqount after running the
                      diagnostic.
                    </p>
                  </div>
                ),
              },
              {
                q: "Is my financial data secure?",
                a: (
                  <div className="space-y-2">
                    <p>
                      Yes. The diagnostic only reads structural metadata from
                      your Xero organisation.
                    </p>
                    <p>
                      No financial data is stored, edited, or shared. Access is
                      limited to the duration of the diagnostic and
                      automatically revoked afterward.
                    </p>
                  </div>
                ),
              },
]}
          />
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
                A complimentary, read-only diagnostic tool for growing business
                using Xero.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/api/xero/connect">Get Your Clarity Score</Button>
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
