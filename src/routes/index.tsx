import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Train, Construction, Factory, CheckCircle2, TrendingUp, Award, Users } from "lucide-react";
import { BuildingAnimation } from "@/components/building-animation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G.S. Express Pvt. Ltd. — Building the Future" },
      { name: "description", content: "Leading EPC partner delivering roads, bridges, railway stations and buildings across India. ₹805 Cr revenue, 1000+ projects, 700+ employees." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "1000+", label: "Projects Executed" },
  { value: "₹805 Cr", label: "Annual Revenue" },
  { value: "700+", label: "Employees" },
  { value: "36", label: "Projects in Progress" },
];

const sectors = [
  { icon: Construction, title: "Roads & Highways", desc: "700+ road projects across 8 states with NHAI & MoRTH eligibility." },
  { icon: Building2, title: "Bridges, Flyovers, ROBs & RUBs", desc: "50+ bridges including major rail and river crossings." },
  { icon: Train, title: "Railway Infrastructure", desc: "4 railway station redevelopment projects: Kashi, Prayagraj, Aurangabad, Jalna." },
  { icon: Factory, title: "Institutional Buildings", desc: "Hospitals, medical colleges, hostels, courts and government complexes." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute inset-0 opacity-80 text-white pointer-events-none">
          <BuildingAnimation />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Leading EPC Player
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Building<br />the Future
            </h1>
            <p className="mt-6 max-w-2xl text-lg opacity-90 lg:text-xl">
              G.S. Express Pvt. Ltd. is a capable, execution-driven EPC partner delivering large-scale
              roads, bridges, railway stations and institutional infrastructure across India.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-accent)] px-6 py-3 text-sm font-semibold shadow-lg hover:opacity-95">
                View Our Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/10">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border px-0 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-secondary px-6 py-10 text-center">
              <div className="text-3xl font-bold text-primary lg:text-4xl">{s.value}</div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About brief */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">About Us</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            An execution-driven EPC partner since 2006
          </h2>
        </div>
        <div className="mt-8 lg:mt-0 space-y-4 text-foreground/80 leading-relaxed">
          <p>
            G.S. Express began as a proprietorship founded by Mr. G.S. Anand, executing civil contracting
            for organisations such as DoT, BSNL, Reliance Telecom, REA, Airtel and MES.
          </p>
          <p>
            Incorporated in 2006 with its head office in Lucknow, the company has delivered <strong>1000+ projects</strong>
            with a strong record of timely completion. Today it operates on the EPC model with an
            in-house structural and MEPF design team, modern machinery and an annual revenue of ~₹805 Cr.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent">
            Read more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Areas of Excellence</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Our Businesses</h2>
            </div>
            <Link to="/businesses" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
              All businesses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <div key={s.title} className="group rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent">Why G.S. Express</div>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Strength, scale and a track record of timely delivery
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: TrendingUp, t: "43% Revenue CAGR", d: "Consistent growth from ₹110 Cr to ₹805 Cr." },
            { icon: CheckCircle2, t: "100% Timely Completion", d: "Delivered to client-defined quality and deadlines." },
            { icon: Award, t: "AA / A-Class Eligibility", d: "Registered with NHAI, MoRTH, PWD, LPAI and more." },
            { icon: Users, t: "In-house Engineering", d: "Structural and MEPF design team with skilled workforce." },
          ].map((f) => (
            <div key={f.t} className="border-t-2 border-accent pt-5">
              <f.icon className="h-6 w-6 text-accent" />
              <div className="mt-3 font-semibold text-foreground">{f.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-2xl bg-[image:var(--gradient-hero)] px-6 py-14 text-center text-primary-foreground shadow-[var(--shadow-elegant)] lg:px-16 lg:py-20">
          <h2 className="text-3xl font-bold lg:text-4xl">Partner with us on your next infrastructure project</h2>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            From concept to commissioning — we deliver complex EPC projects with speed, precision and quality.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-accent)] px-6 py-3 text-sm font-semibold shadow-lg hover:opacity-95">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
