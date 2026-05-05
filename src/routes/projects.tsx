import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — G.S. Express Pvt. Ltd." },
      { name: "description", content: "Marquee projects delivered by G.S. Express across roads, bridges, railway stations, medical colleges, hostels and institutional infrastructure." },
    ],
  }),
  component: ProjectsPage,
});

type Category = "All" | "Railway" | "Buildings" | "Roads & Bridges" | "Institutional";

interface Project {
  name: string;
  client: string;
  location: string;
  value?: string;
  category: Exclude<Category, "All">;
  status?: "Completed" | "In Progress";
}

const projects: Project[] = [
  { name: "Kashi Railway Station Redevelopment", client: "Indian Railways", location: "Kashi, U.P.", value: "₹304.61 Cr", category: "Railway", status: "In Progress" },
  { name: "Jalna Railway Station", client: "Indian Railways", location: "Jalna, Maharashtra", value: "₹189.04 Cr", category: "Railway", status: "In Progress" },
  { name: "Aurangabad Railway Station", client: "Indian Railways", location: "Aurangabad, Maharashtra", value: "₹189.04 Cr", category: "Railway", status: "In Progress" },
  { name: "Major Bridges 466/468/469 across Gomti", client: "Northern Railway", location: "Lucknow, U.P.", value: "₹58.30 Cr", category: "Roads & Bridges", status: "In Progress" },
  { name: "SN Medical College", client: "UPPWD", location: "Agra, U.P.", value: "₹335.21 Cr", category: "Buildings", status: "In Progress" },
  { name: "Veerangna Uda Devi Women Police Battalion", client: "UPPWD", location: "Lucknow, U.P.", value: "₹238.02 Cr", category: "Institutional", status: "In Progress" },
  { name: "State Fire-Fighting College", client: "UPPWD", location: "Unnao, U.P.", value: "₹176.45 Cr", category: "Institutional", status: "In Progress" },
  { name: "500-bed Advance Pediatric Center, SGPGI", client: "UPPWD", location: "Lucknow, U.P.", value: "₹142.46 Cr", category: "Buildings", status: "In Progress" },
  { name: "High Court Judges Residences", client: "UPPWD", location: "Lucknow & Prayagraj", value: "₹109.92 Cr", category: "Buildings", status: "In Progress" },
  { name: "Passenger Terminal Building, ICP Sunauli", client: "Land Ports Authority of India", location: "Sunauli, U.P.", value: "₹82.65 Cr", category: "Institutional", status: "Completed" },
  { name: "MBBS & Nursing Hostel, Dr RMLIMS", client: "UPPWD", location: "Lucknow, U.P.", value: "₹78.72 Cr", category: "Buildings", status: "Completed" },
  { name: "Pratapgarh Bypass", client: "UPPWD", location: "Pratapgarh, U.P.", value: "₹76.01 Cr", category: "Roads & Bridges", status: "Completed" },
  { name: "Widening to Four-Lane CC Road", client: "UPPWD", location: "Pratapgarh, U.P.", value: "₹147.74 Cr", category: "Roads & Bridges", status: "Completed" },
  { name: "Government Medical College", client: "UPRNN Ltd.", location: "Basti, U.P.", value: "₹136.32 Cr", category: "Buildings", status: "Completed" },
  { name: "Siddharthnagar University, Kapilvastu", client: "UPRNN Ltd.", location: "Siddharthnagar, U.P.", value: "₹49.93 Cr", category: "Buildings", status: "Completed" },
  { name: "High Court Conference Hall, VVIP Suite & Museum", client: "C&DS, UP Jal Nigam", location: "Prayagraj, U.P.", value: "₹37.55 Cr", category: "Institutional", status: "Completed" },
  { name: "Bank of India Zonal Office & Quarters", client: "Bank of India", location: "Lucknow, U.P.", value: "₹48.35 Cr", category: "Buildings", status: "Completed" },
  { name: "Underpass at NH-28 (Lucknow-Faizabad)", client: "NHAI", location: "Lucknow, U.P.", value: "₹47.13 Cr", category: "Roads & Bridges", status: "Completed" },
  { name: "Sky Walk at Shastri Chowk", client: "PWD Bridge Const. Div.", location: "Raipur, Chhattisgarh", value: "₹42.55 Cr", category: "Roads & Bridges", status: "Completed" },
  { name: "Bahraich Bypass NH-28C (NHDP-IV)", client: "PWD NH Div. Lucknow", location: "Bahraich, U.P.", value: "₹43.48 Cr", category: "Roads & Bridges", status: "Completed" },
  { name: "Atal Residential Schools", client: "UPPWD", location: "Basti / Banda / Prayagraj", category: "Buildings", status: "Completed" },
  { name: "Forensic Science Labs", client: "UPPWD", location: "Ayodhya / Banda / Basti", category: "Institutional", status: "In Progress" },
  { name: "Academic Block & Hostel Cluster, IIM Raipur", client: "RITES", location: "Raipur, Chhattisgarh", value: "₹183.44 Cr", category: "Buildings", status: "In Progress" },
  { name: "Flyover across NH-30, Kamal Vihar", client: "PWD Bridge Const. Div.", location: "Raipur, Chhattisgarh", value: "₹19.90 Cr", category: "Roads & Bridges", status: "Completed" },
];

const categories: Category[] = ["All", "Railway", "Buildings", "Roads & Bridges", "Institutional"];

function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Our Projects</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-6xl">Marquee Projects</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            A selection from 1000+ delivered and 36 ongoing projects across India.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.name} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/70">
                  {p.category}
                </span>
                {p.status && (
                  <span className={`text-xs font-semibold ${p.status === "Completed" ? "text-primary" : "text-accent"}`}>
                    {p.status}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
              <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm text-foreground/75">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-accent" />
                  {p.location}
                </div>
                {p.value && (
                  <div className="ml-auto flex items-center gap-1 font-semibold text-primary">
                    <IndianRupee className="h-4 w-4" />
                    {p.value.replace("₹", "")}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
