import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Search, X } from "lucide-react";
import { additionalProjects } from "@/data/additional-projects";
import womenPoliceBattalionImg from "@/assets/women-police-battalion.jpg";
import constructionRailway1 from "@/assets/construction-railway-1.jpg";
import constructionRailway2 from "@/assets/construction-railway-2.jpg";
import constructionBuilding1 from "@/assets/construction-building-1.jpg";
import constructionBuilding2 from "@/assets/construction-building-2.jpg";
import constructionRoad1 from "@/assets/construction-road-1.jpg";
import constructionRoad2 from "@/assets/construction-road-2.jpg";
import constructionInstitutional1 from "@/assets/construction-institutional-1.jpg";
import constructionInstitutional2 from "@/assets/construction-institutional-2.jpg";

const projectImageOverrides: Record<string, string> = {
  "veerangna uda devi women police battalion": womenPoliceBattalionImg,
};

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
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

// Construction-in-progress photos by category.
const categoryImages: Record<Exclude<Category, "All">, string[]> = {
  Railway: [constructionRailway1, constructionRailway2],
  Buildings: [constructionBuilding1, constructionBuilding2, constructionInstitutional2],
  "Roads & Bridges": [constructionRoad1, constructionRoad2],
  Institutional: [constructionInstitutional1, constructionInstitutional2, constructionBuilding1],
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
  const key = p.name.toLowerCase();
  const override = Object.keys(projectImageOverrides).find((k) => key.includes(k));
  const image = override ? projectImageOverrides[override] : pickImage(p.category, counters[p.category]++);
  return { ...p, image };
});

const categories: Category[] = ["All", "Railway", "Buildings", "Roads & Bridges", "Institutional"];

function ProjectsPage() {
  const { category: searchCategory } = Route.useSearch();
  const initial: Category = (categories as string[]).includes(searchCategory ?? "")
    ? (searchCategory as Category)
    : "All";
  const [active, setActive] = useState<Category>(initial);
  const [query, setQuery] = useState("");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  useEffect(() => {
    if (searchCategory && (categories as string[]).includes(searchCategory)) {
      setActive(searchCategory as Category);
    }
  }, [searchCategory]);

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

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elegant)]"
            >
              <button
                type="button"
                onClick={() => setLightbox(p)}
                className="relative aspect-[4/3] overflow-hidden bg-secondary text-left"
                aria-label={`Enlarge image of ${p.name}`}
              >
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
              </button>
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

      {lightbox && (() => {
        const idx = filtered.findIndex((p) => p.name === lightbox.name);
        const go = (delta: number) => {
          if (filtered.length === 0) return;
          const next = (idx + delta + filtered.length) % filtered.length;
          setLightbox(filtered[next]);
        };
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-fade-in"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            tabIndex={-1}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            <div
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-xl bg-card shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.name}
                className="max-h-[75vh] w-full object-contain"
              />
              <div className="border-t border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{lightbox.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{lightbox.client}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                    {lightbox.category}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-foreground/75">
                  <MapPin className="h-4 w-4 text-accent" />
                  {lightbox.location}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
