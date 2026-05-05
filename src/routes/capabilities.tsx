import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: "Capabilities — G.S. Express Pvt. Ltd." },
      { name: "description", content: "Government registrations, financial strength and engineering capabilities of G.S. Express Pvt. Ltd." },
    ],
  }),
  component: CapabilitiesPage,
});

const registrations = [
  ["Public Work Department (U.P.)", "A Class", "Unlimited"],
  ["Irrigation Department", "AA Class", "Unlimited"],
  ["Lucknow Development Authority", "A Class", "Unlimited"],
  ["UPRNN Ltd.", "All Works", "Unlimited"],
  ["U.P. Bridge Corporation Ltd.", "All Works", "Unlimited"],
  ["National Highway Authority of India", "All Works", "Unlimited"],
  ["Ministry of Road Transport & Highways", "All Works", "Unlimited"],
  ["U.P. Awas Evam Vikas Parishad Limited", "A Class", "Unlimited"],
  ["U.P. State Warehousing Corporation", "All Works", "Unlimited"],
  ["Public Work Department Chhattisgarh", "AA Class", "Unlimited"],
  ["Public Work Department Bihar", "AA Class", "Unlimited"],
  ["UP State Industrial Development Corporation", "All Works", "Unlimited"],
  ["Construction & Design Services (C&DS)", "All Works", "Unlimited"],
  ["Land Ports Authority of India (LPAI)", "All Works", "Unlimited"],
];

const financials = [
  { fy: "2020-21", assets: "11,088", liab: "9,655", ratio: "1.15" },
  { fy: "2021-22", assets: "17,654", liab: "14,229", ratio: "1.24" },
  { fy: "2022-23", assets: "17,460", liab: "14,065", ratio: "1.24" },
  { fy: "2023-24", assets: "23,487", liab: "17,718", ratio: "1.32" },
  { fy: "2024-25", assets: "26,561", liab: "19,510", ratio: "1.36" },
  { fy: "2025-26", assets: "29,846", liab: "17,287", ratio: "1.73" },
];

const kpis = [
  { v: "5.28%", l: "Net Profit Margin" },
  { v: "7.79%", l: "PBT Margin" },
  { v: "0.63", l: "Debt-to-Equity" },
  { v: "1.40", l: "Current Ratio" },
  { v: "15.09%", l: "Return on Equity" },
  { v: "1.18×", l: "Asset Turnover" },
];

function CapabilitiesPage() {
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Capabilities</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-6xl">Strength, Eligibility & Reach</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            Backed by AA / A-class registrations across central and state authorities, and a balance
            sheet that supports execution of high-value EPC projects.
          </p>
        </div>
      </section>

      {/* KPIs */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent">Financial Strength</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Key Performance Indicators</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {kpis.map((k) => (
            <div key={k.l} className="rounded-xl border border-border bg-card p-5 text-center shadow-[var(--shadow-card)]">
              <div className="text-2xl font-bold text-primary">{k.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{k.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Overview */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Financial Overview</h2>
          <p className="mt-2 text-muted-foreground">Six-year summary in ₹ Lakhs</p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Financial Year</th>
                  <th className="px-5 py-3 text-right font-semibold">Current Assets</th>
                  <th className="px-5 py-3 text-right font-semibold">Current Liabilities</th>
                  <th className="px-5 py-3 text-right font-semibold">Current Ratio</th>
                </tr>
              </thead>
              <tbody>
                {financials.map((f, i) => (
                  <tr key={f.fy} className={i % 2 ? "bg-secondary/50" : ""}>
                    <td className="px-5 py-3 font-medium text-foreground">{f.fy}</td>
                    <td className="px-5 py-3 text-right text-foreground/85">{f.assets}</td>
                    <td className="px-5 py-3 text-right text-foreground/85">{f.liab}</td>
                    <td className="px-5 py-3 text-right font-semibold text-primary">{f.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Revenue CAGR ≈ <strong className="text-foreground">43%</strong> with FY 2025-26 revenue of approximately
            <strong className="text-foreground"> ₹805 Cr</strong>.
          </p>
        </div>
      </section>

      {/* Registrations */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Government Registrations & Tender Eligibility
        </h2>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
          <table className="w-full text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Department</th>
                <th className="px-5 py-3 text-left font-semibold">Category</th>
                <th className="px-5 py-3 text-left font-semibold">Tendering Limit</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(([d, c, l], i) => (
                <tr key={d} className={i % 2 ? "bg-secondary/50" : ""}>
                  <td className="px-5 py-3 font-medium text-foreground">{d}</td>
                  <td className="px-5 py-3 text-foreground/85">{c}</td>
                  <td className="px-5 py-3 font-semibold text-accent">{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Geography */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Geographic Presence</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            36 ongoing projects across 8 states.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Chhattisgarh", "Gujarat", "Bihar", "Assam", "Meghalaya"].map((s) => (
              <span key={s} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
