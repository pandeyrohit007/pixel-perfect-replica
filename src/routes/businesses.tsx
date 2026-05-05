import { createFileRoute } from "@tanstack/react-router";
import { Construction, Building2, Train, Landmark, Cog, Hammer } from "lucide-react";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [
      { title: "Businesses — G.S. Express Pvt. Ltd." },
      { name: "description", content: "Areas of excellence: roads, highways, bridges, railway stations, institutional buildings, urban infrastructure and specialized EPC." },
    ],
  }),
  component: BusinessesPage,
});

const businesses = [
  {
    icon: Construction,
    title: "Roads & Highways",
    body: "From bypasses and four-lane CC roads to NHAI EPC packages, GS Express has delivered 700+ road projects across 8 states.",
    bullets: ["NH widening & strengthening", "EPC two/four-lane projects", "State highways & ODRs"],
  },
  {
    icon: Building2,
    title: "Bridges, Flyovers, ROBs & RUBs",
    body: "Major and minor bridges including PSC slab and open-web steel girder structures over rivers and railway lines.",
    bullets: ["Flyovers & sky-walks", "Road over / under bridges", "Steel & PSC structures"],
  },
  {
    icon: Train,
    title: "Railway Infrastructure & Station Redevelopment",
    body: "Currently executing 4 railway station development projects including Kashi, Prayagraj, Aurangabad and Jalna.",
    bullets: ["Station redevelopment", "Steel railway bridges", "Signalling & associated works"],
  },
  {
    icon: Landmark,
    title: "Institutional & Government Buildings",
    body: "Medical colleges, hospitals, hostels, academic blocks, courts, police battalions and government quarters.",
    bullets: ["Medical colleges & hospitals", "Hostels & academic blocks", "Police & defence facilities"],
  },
  {
    icon: Hammer,
    title: "Urban Infrastructure & City Development",
    body: "Comprehensive city-development packages including drainage, roads, public buildings and beautification works.",
    bullets: ["Drainage & culverts", "Public realm upgrades", "City beautification"],
  },
  {
    icon: Cog,
    title: "Specialized EPC & Public Infrastructure",
    body: "Land ports, forensic science labs, fire-fighting colleges and specialised institutional EPC packages.",
    bullets: ["Integrated land ports", "Forensic science labs", "Specialised public buildings"],
  },
];

function BusinessesPage() {
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Our Businesses</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-6xl">Areas of Excellence</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            Six core sectors where we deliver integrated EPC solutions — backed by in-house design,
            modern machinery and a 700-strong workforce.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <div key={b.title} className="group flex flex-col rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {b.bullets.map((it) => (
                  <li key={it} className="flex gap-2 text-foreground/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
