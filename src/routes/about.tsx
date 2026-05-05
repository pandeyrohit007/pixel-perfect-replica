import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Building2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — G.S. Express Pvt. Ltd." },
      { name: "description", content: "Founded in 2006 in Lucknow, G.S. Express Pvt. Ltd. is an EPC infrastructure company with 1000+ projects, 700+ employees and ~₹805 Cr revenue." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Foundation & Future Vision"
        subtitle="From a proprietorship in civil contracting to a leading EPC infrastructure partner."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5 text-foreground/85 leading-relaxed">
            <p>
              GS Express Pvt. Ltd. began its journey as a proprietorship firm founded by Mr. G.S. Anand,
              undertaking civil contracting work for various government and private departments. During its
              early years, the firm successfully executed projects for reputable organisations such as the
              Department of Telecommunications (DoT), BSNL, Reliance Telecom, Railway Electrification (REA),
              Airtel and Military Engineering Services (MES).
            </p>
            <p>
              Building on this foundation, the firm was incorporated in <strong>2006 as GS Express Pvt. Ltd.</strong>,
              with its Head Office in Lucknow. Over the years the company has successfully delivered
              <strong> 1000+ projects</strong> across government departments and infrastructure sectors,
              maintaining a strong track record of <strong>100% timely completion</strong> in line with
              client-defined quality and deadlines.
            </p>
            <p>
              With a strong team of engineers, in-house designers and architects, skilled manpower and
              modern machinery, GS Express has developed the capability to execute projects efficiently
              while maintaining high standards of quality and safety. Today the company operates on the
              <strong> EPC (Engineering, Procurement & Construction)</strong> model, enabling end-to-end
              project execution from planning to final delivery. With an annual revenue of approximately
              <strong> ₹805 Cr.</strong>, GS Express continues to expand across the country.
            </p>
          </div>
          <aside className="space-y-4">
            <FactCard label="Founded" value="2006" />
            <FactCard label="Headquarters" value="Lucknow, U.P." />
            <FactCard label="Revenue (FY 25-26)" value="~₹805 Cr" />
            <FactCard label="Employees" value="700+" />
            <FactCard label="Active States" value="8" />
          </aside>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-2 lg:px-8">
          <PillarCard
            icon={Eye}
            title="Vision"
            body="To build reliable and high-quality infrastructure that supports India’s development while becoming a trusted partner for large-scale projects through strong execution, innovation and commitment to timely delivery."
          />
          <PillarCard
            icon={Target}
            title="Mission"
            body="Deliver complex EPC projects with speed, precision and quality — leveraging in-house design, skilled engineering and modern machinery to consistently meet client-defined standards and timelines."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent">Leadership</div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Anand Group</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Sandeep Anand</h3>
            <p className="text-sm text-muted-foreground">Managing Director</p>
            <p className="mt-3 text-sm text-foreground/75">
              Leading the company’s EPC strategy, business development and execution excellence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-[image:var(--gradient-hero)] text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg opacity-90">{subtitle}</p>}
      </div>
    </section>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold text-primary">{value}</div>
    </div>
  );
}

function PillarCard({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="rounded-xl bg-card p-8 shadow-[var(--shadow-card)] border border-border">
      <Icon className="h-8 w-8 text-accent" />
      <h3 className="mt-4 text-2xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 text-foreground/80 leading-relaxed">{body}</p>
    </div>
  );
}
