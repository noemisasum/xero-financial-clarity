# Aqount Financial Clarity Diagnostic — Methodology Spec (v1)

Status: Draft (v1)

This document defines the **v1 scoring methodology** for the Aqount Financial Clarity Diagnostic.

It is a **product + engineering contract**:
- Engineering implements these rules exactly.
- UX uses the same concepts/wording to explain results.
- Results are **repeatable** and can be versioned (v1, v2…) without changing historical runs.

---

## Goals

- Provide an **explainable** clarity score (no black box).
- Identify **structural issues** that reduce decision-ready reporting.
- Produce **actionable next steps** for improving reporting clarity.
- Avoid storing or exposing sensitive transactional details where possible.

Non-goals (v1):
- Industry benchmarking claims.
- “AI” or ML-based inference.
- Perfect accounting correctness checks.

---

## Inputs (Xero)

Read-only access. Data pulled is limited to what is required to compute structural signals.

Typical inputs used in v1 (exact endpoints may vary):
- Chart of accounts (active + types)
- Tracking categories (presence + options)
- Contacts (counts; duplicates signals)
- Invoices/Bills (counts/status for hygiene signals, if used)
- Bank accounts / reconciliation indicators (if accessible)
- Journals / manual journals counts (if accessible)

> v1 should prefer **counts, patterns, and metadata** over amounts.

---

## Outputs

Each diagnostic run produces:

- **Overall Clarity Score (0–100)**
- **5 dimension scores (0–100)**
- For each dimension:
  - Top findings (plain English)
  - Signals (pass/warn/fail), with evidence (counts/examples)
  - Recommended actions

---

## Scoring model

### Dimension scoring

Each dimension starts at **100** and applies penalties from signals.

- `pass` → 0 penalty
- `warn` → partial penalty
- `fail` → full penalty

Scores are clamped: `0 <= score <= 100`.

### Overall score

Default (v1): equal weights.

`overall = round((D1 + D2 + D3 + D4 + D5) / 5)`

> We can later introduce weights, but v1 should remain simple and explainable.

### Severity and penalty (v1 baseline)

Signals are assigned a severity and penalty:

- **Minor**: warn −3, fail −6
- **Major**: warn −6, fail −12

Notes:
- Keep each dimension to ~6–10 signals.
- Avoid making any single signal dominate the entire score.

---

## The 5 dimensions (v1)

> These dimension names must match the scorecard.
> If the scorecard wording changes, update this spec and bump methodology version.

### D1) Chart of Accounts Structure

Focus: whether the chart of accounts supports clean reporting and analysis.

Signals (v1):

1. **Overly granular operating expenses** (Major)
   - Warn: unusually high count of active expense accounts
   - Fail: extremely high count leading to noisy P\&L
   - Evidence: counts by account type; top categories by count
   - Why it matters: too many lines hides patterns and increases misc coding.
   - Fix: consolidate to reporting-friendly rollups.

2. **Overuse of vague accounts** (Major)
   - Trigger words: “misc”, “other”, “general”, “sundry”, “various” (case-insensitive)
   - Warn/Fail based on count of such accounts.
   - Evidence: list of vague accounts.
   - Fix: rename / replace with specific categories.

3. **Inconsistent naming conventions** (Minor)
   - Evidence: duplicates ignoring case/punctuation; inconsistent prefixes; inconsistent use of codes.
   - Fix: standardise naming and optionally introduce a naming guide.

4. **Account type misalignment indicators** (Major)
   - Heuristic flags (v1): revenue-like names in expense types, etc.
   - Evidence: flagged accounts.
   - Fix: reclassify accounts to correct types.

5. **Inactive clutter** (Minor)
   - High ratio of inactive to active accounts.
   - Fix: archive unused accounts.

---

### D2) Categorisation Consistency

Focus: whether day-to-day coding is consistent enough to trust trends.

Signals (v1):

1. **High concentration into catch-all buckets** (Major)
   - Look for postings to “other/misc/sundry” accounts.
   - Evidence: % of lines / count.
   - Fix: replace catch-all usage with defined categories.

2. **Vendor/contact inconsistency** (Major)
   - Same contact mapped to many different accounts (proxy for inconsistent coding).
   - Evidence: top contacts by distinct account count.
   - Fix: introduce coding rules / automation.

3. **Tracking categories not used (when present)** (Minor)
   - If tracking categories exist but are rarely used, signal potential reporting gap.
   - Evidence: usage rate.
   - Fix: define default tracking usage.

4. **Frequent uncategorised / suspense usage** (Major)
   - Use of suspense/clearing accounts.
   - Evidence: counts.
   - Fix: clearing workflow and monthly review.

---

### D3) Reporting Design and Groupings

Focus: whether the structure supports management reporting (not just statutory books).

Signals (v1):

1. **P\&L readability risk** (Major)
   - Proxy: too many expense accounts that would create long P\&L lines.
   - Evidence: expense account count.
   - Fix: regroup accounts into a management-friendly structure.

2. **COGS vs OPEX separation** (Major)
   - Heuristic: missing/limited COGS structure where a product/service business likely needs it.
   - Evidence: presence/absence of cost accounts.
   - Fix: define direct vs indirect cost categories.

3. **Reporting rollups not obvious** (Minor)
   - Lack of consistent prefixes/codes that imply rollups.
   - Fix: lightweight coding scheme.

---

### D4) Cash Flow Visibility Signals

Focus: whether the system supports predictable cash visibility.

Signals (v1):

1. **Bank feed / reconciliation indicators** (Major)
   - If accessible: reconciliation status, presence of bank accounts.
   - Evidence: counts/status.
   - Fix: enable bank feeds and implement reconciliation cadence.

2. **AR/AP hygiene proxy** (Major)
   - If accessible: counts of overdue invoices/bills.
   - Evidence: counts by ageing.
   - Fix: collections/payables workflow.

3. **Short-term liabilities structure** (Minor)
   - Heuristic: missing payables/credit card accounts.
   - Fix: proper liability categorisation.

---

### D5) Bookkeeping Hygiene Indicators

Focus: operational hygiene signals that correlate with reporting clarity.

Signals (v1):

1. **High volume of manual journals** (Major)
   - Evidence: count of manual journals over recent periods.
   - Fix: automate recurring entries and reduce end-of-month patching.

2. **Suspense/clearing unresolved** (Major)
   - Evidence: usage patterns and persistence.
   - Fix: monthly clearing checklist.

3. **Contact duplication/clutter** (Minor)
   - Evidence: duplicate names, large inactive counts.
   - Fix: contact cleanup.

---

## Evidence and storage rules (privacy)

- Prefer **aggregated evidence** (counts, ratios, flags) over raw transaction details.
- Do not store full transaction line items in v1.
- Limit “examples” to account names and high-level metadata.

---

## Copy rules (results explanations)

- Explain **what we saw** and **why it matters** in plain language.
- Avoid shaming language.
- Provide **specific next steps**.
- Avoid em dashes and arrow characters in user-facing text.

---

## Versioning

- All stored results must include `diagnosticVersion`.
- Changes to penalties, thresholds, or signals require:
  - updating this file
  - bumping the version label in code (`v1` → `v2`)

---

## Open questions (to resolve before implementation)

1) Confirm the exact 5 dimension names as displayed in the scorecard UI.
2) Confirm which data endpoints are acceptable for v1 (accounts only vs include invoices/bills/journals).
3) Confirm whether we should run the diagnostic over a time window (e.g. last 90 days) for consistency checks.
