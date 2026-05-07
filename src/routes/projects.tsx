import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { additionalProjects } from "@/data/additional-projects";

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
  category: Exclude<Category, "All">;
  status?: "Completed" | "In Progress";
  image: string;
}

// Demo images grouped by category (Unsplash). Replace with real photos when available.
const categoryImages: Record<Exclude<Category, "All">, string[]> = {
  Railway: [
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1517242810446-cc8951b2be40?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1583116716552-ed3492052206?auto=format&fit=crop&w=1200&q=70",
  ],
  Buildings: [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
  ],
  "Roads & Bridges": [
    "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1473221326025-9183b464bb7e?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=70",
  ],
  Institutional: [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?auto=format&fit=crop&w=1200&q=70",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70",
  ],
};

function pickImage(category: Exclude<Category, "All">, index: number) {
  const pool = categoryImages[category];
  return pool[index % pool.length];
}

const baseProjects: Omit<Project, "image">[] = [
  { name: "Kashi Railway Station Redevelopment", client: "Indian Railways", location: "Kashi, U.P.", category: "Railway", status: "In Progress" },
  { name: "Jalna Railway Station", client: "Indian Railways", location: "Jalna, Maharashtra", category: "Railway", status: "In Progress" },
  { name: "Aurangabad Railway Station", client: "Indian Railways", location: "Aurangabad, Maharashtra", category: "Railway", status: "In Progress" },
  { name: "Major Bridges 466/468/469 across Gomti", client: "Northern Railway", location: "Lucknow, U.P.", category: "Roads & Bridges", status: "In Progress" },
  { name: "SN Medical College", client: "UPPWD", location: "Agra, U.P.", category: "Buildings", status: "In Progress" },
  { name: "Veerangna Uda Devi Women Police Battalion", client: "UPPWD", location: "Lucknow, U.P.", category: "Institutional", status: "In Progress" },
  { name: "State Fire-Fighting College", client: "UPPWD", location: "Unnao, U.P.", category: "Institutional", status: "In Progress" },
  { name: "500-bed Advance Pediatric Center, SGPGI", client: "UPPWD", location: "Lucknow, U.P.", category: "Buildings", status: "In Progress" },
  { name: "High Court Judges Residences", client: "UPPWD", location: "Lucknow & Prayagraj", category: "Buildings", status: "In Progress" },
  { name: "Passenger Terminal Building, ICP Sunauli", client: "Land Ports Authority of India", location: "Sunauli, U.P.", category: "Institutional", status: "Completed" },
  { name: "MBBS & Nursing Hostel, Dr RMLIMS", client: "UPPWD", location: "Lucknow, U.P.", category: "Buildings", status: "Completed" },
  { name: "Pratapgarh Bypass", client: "UPPWD", location: "Pratapgarh, U.P.", category: "Roads & Bridges", status: "Completed" },
  { name: "Widening to Four-Lane CC Road", client: "UPPWD", location: "Pratapgarh, U.P.", category: "Roads & Bridges", status: "Completed" },
  { name: "Government Medical College", client: "UPRNN Ltd.", location: "Basti, U.P.", category: "Buildings", status: "Completed" },
  { name: "Siddharthnagar University, Kapilvastu", client: "UPRNN Ltd.", location: "Siddharthnagar, U.P.", category: "Buildings", status: "Completed" },
  { name: "High Court Conference Hall, VVIP Suite & Museum", client: "C&DS, UP Jal Nigam", location: "Prayagraj, U.P.", category: "Institutional", status: "Completed" },
  { name: "Bank of India Zonal Office & Quarters", client: "Bank of India", location: "Lucknow, U.P.", category: "Buildings", status: "Completed" },
  { name: "Underpass at NH-28 (Lucknow-Faizabad)", client: "NHAI", location: "Lucknow, U.P.", category: "Roads & Bridges", status: "Completed" },
  { name: "Sky Walk at Shastri Chowk", client: "PWD Bridge Const. Div.", location: "Raipur, Chhattisgarh", category: "Roads & Bridges", status: "Completed" },
  { name: "Bahraich Bypass NH-28C (NHDP-IV)", client: "PWD NH Div. Lucknow", location: "Bahraich, U.P.", category: "Roads & Bridges", status: "Completed" },
  { name: "Atal Residential Schools", client: "UPPWD", location: "Basti / Banda / Prayagraj", category: "Buildings", status: "Completed" },
  { name: "Forensic Science Labs", client: "UPPWD", location: "Ayodhya / Banda / Basti", category: "Institutional", status: "In Progress" },
  { name: "Academic Block & Hostel Cluster, IIM Raipur", client: "RITES", location: "Raipur, Chhattisgarh", category: "Buildings", status: "In Progress" },
  { name: "Flyover across NH-30, Kamal Vihar", client: "PWD Bridge Const. Div.", location: "Raipur, Chhattisgarh", category: "Roads & Bridges", status: "Completed" },
];

const counters: Record<Exclude<Category, "All">, number> = {
  Railway: 0,
  Buildings: 0,
  "Roads & Bridges": 0,
  Institutional: 0,
};

const seenNames = new Set(baseProjects.map((p) => p.name.toLowerCase()));
const extras: Omit<Project, "image">[] = additionalProjects
  .filter((p) => !seenNames.has(p.name.toLowerCase()))
  .map((p) => ({ ...p }));

const projects: Project[] = [...baseProjects, ...extras].map((p) => {
  const image = pickImage(p.category, counters[p.category]++);
  return { ...p, image };
});

const categories: Category[] = ["All", "Railway", "Buildings", "Roads & Bridges", "Institutional"];

function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    });
  }, [active, query]);

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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search project, client or location"
              className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filtered.length} of {projects.length} projects
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                  <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {p.category}
                  </span>
                  {p.status && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground ${
                        p.status === "Completed" ? "bg-primary" : "bg-accent"
                      }`}
                    >
                      {p.status}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold leading-snug text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
                <div className="mt-auto flex items-center gap-1.5 border-t border-border pt-4 text-sm text-foreground/75">
                  <MapPin className="h-4 w-4 text-accent" />
                  {p.location}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
