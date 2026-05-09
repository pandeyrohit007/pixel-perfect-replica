import indiaMap from "@/assets/india-map.png";

// Approximate percent positions on the india-map.png artwork.
const locations = [
  { name: "Lucknow", state: "Uttar Pradesh", x: 48, y: 38 },
  { name: "Agra", state: "Uttar Pradesh", x: 42, y: 38 },
  { name: "Prayagraj", state: "Uttar Pradesh", x: 50, y: 42 },
  { name: "Bahraich", state: "Uttar Pradesh", x: 50, y: 34 },
  { name: "Pratapgarh", state: "Uttar Pradesh", x: 51, y: 41 },
  { name: "Basti", state: "Uttar Pradesh", x: 54, y: 36 },
  { name: "Aurangabad", state: "Maharashtra", x: 39, y: 60 },
  { name: "Jalna", state: "Maharashtra", x: 41, y: 60 },
  { name: "Raipur", state: "Chhattisgarh", x: 53, y: 56 },
  { name: "Unnao", state: "Uttar Pradesh", x: 47, y: 39 },
  { name: "Sunauli", state: "Uttar Pradesh", x: 55, y: 33 },
  { name: "Siddharthnagar", state: "Uttar Pradesh", x: 55, y: 34 },
  { name: "Ayodhya", state: "Uttar Pradesh", x: 51, y: 37 },
  { name: "Banda", state: "Uttar Pradesh", x: 47, y: 43 },
];

export function IndiaPresenceMap() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Pan-India Footprint</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Our Geographical Presence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/75">
            Delivering projects across 8 states — with active execution sites in Uttar Pradesh,
            Maharashtra and Chhattisgarh.
          </p>
        </div>

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-2xl">
          <img
            src={indiaMap}
            alt="Map of India showing G.S. Express project locations"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-contain opacity-90 animate-fade-in"
          />
          {locations.map((l, i) => (
            <div
              key={l.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${l.x}%`, top: `${l.y}%`, animationDelay: `${i * 120}ms` }}
            >
              <span className="absolute inset-0 -m-2 rounded-full bg-accent/60 animate-ping" />
              <span className="relative block h-3 w-3 rounded-full bg-accent ring-2 ring-background shadow-md" />
              <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {l.name}, {l.state}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2 text-xs">
          {Array.from(new Set(locations.map((l) => l.state))).map((s) => (
            <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-foreground/80">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
