import { useState } from "react";
import { audienceFilters, bangaloreAreas, billboardInventory, hotspots } from "@/data/localboardDemo";

type Area = {
  name: string;
  x: number; // %
  y: number; // %
  bestFor: string;
  audience: string;
  placements: string;
  score: number;
  reason: string;
  size?: "sm" | "md" | "lg";
};

const areas: Area[] = bangaloreAreas;

const sizeMap = { sm: "w-2 h-2", md: "w-3 h-3", lg: "w-4 h-4" };

export const BangaloreMap = () => {
  const [hover, setHover] = useState<Area | null>(areas[0]);

  return (
    <section id="map" className="relative py-28">
      <div className="absolute inset-0 warm-bg opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            03: City-native
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Built for Bangalore's local attention map.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            LocalBoard does not just generate ads. It recommends where your audience actually moves,
            waits, works, eats, discovers, and notices high-attention billboard inventory.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {hotspots.map((hotspot) => (
            <div key={`${hotspot.area}-${hotspot.microZone}`} className="rounded-2xl bg-card border border-border/70 p-5">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {hotspot.congestion} congestion
              </div>
              <h3 className="mt-2 font-display text-xl tracking-tight">
                {hotspot.area}: {hotspot.microZone}
              </h3>
              <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                {hotspot.landmark} · {hotspot.bestTime}
              </p>
              <div className="mt-4 text-sm font-light">
                {hotspot.suggestedPlacement}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {audienceFilters.map((filter) => (
            <button
              key={filter}
              className="text-xs font-light px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 transition"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] rounded-3xl glass-card overflow-hidden bg-card">
              {/* faux map grid */}
              <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              {/* faux roads */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M5,40 Q40,30 60,38 T98,42" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" />
                <path d="M10,70 Q35,60 55,68 T95,60" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" />
                <path d="M40,5 Q48,40 52,60 T58,98" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" />
                <path d="M70,5 Q72,30 75,55 T82,98" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" />
              </svg>

              {/* watermark */}
              <div className="absolute top-5 left-5 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                Bengaluru · live attention map
              </div>

              {/* pins */}
              {areas.map((a) => (
                <button
                  key={a.name}
                  onMouseEnter={() => setHover(a)}
                  onFocus={() => setHover(a)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                >
                  <span className="relative flex items-center justify-center">
                    <span className={`${sizeMap[a.size || "md"]} rounded-full bg-primary animate-pin-pulse`} />
                  </span>
                  <span
                    className={`mt-1.5 block text-[11px] font-light whitespace-nowrap transition ${
                      hover?.name === a.name ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {a.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-7 h-full bg-card">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Hovered area
              </div>
              <h3 className="mt-2 font-display text-3xl tracking-tight">
                {hover?.name || "Indiranagar"}
              </h3>

              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Match score
                  </dt>
                  <dd className="mt-1 font-display text-3xl tracking-tight">
                    {hover?.score}/100
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Best for
                  </dt>
                  <dd className="mt-1 font-light">{hover?.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Audience
                  </dt>
                  <dd className="mt-1 font-light">{hover?.audience}</dd>
                </div>
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Suggested placements
                  </dt>
                  <dd className="mt-1 font-light">{hover?.placements}</dd>
                </div>
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Why it works
                  </dt>
                  <dd className="mt-1 font-light">{hover?.reason}</dd>
                </div>
              </dl>

              <div className="mt-8 pt-6 border-t border-border/60 text-sm font-light text-muted-foreground">
                Hover any pin. The agent maps each area to your business profile.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 glass-card rounded-3xl p-6 bg-card">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-primary">
                Sample board inventory
              </div>
              <h3 className="mt-2 font-display text-3xl tracking-tight">
                Board owners can list high-attention placements.
              </h3>
            </div>
            <a href="#billboard-owners" className="text-sm font-light px-4 py-2 rounded-full border border-border hover:bg-secondary transition">
              Add your board
            </a>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {billboardInventory.map((board) => (
              <div key={board.title} className="rounded-2xl bg-background/60 border border-border/70 p-4">
                <div className="text-xs font-light uppercase tracking-wider text-muted-foreground">
                  {board.placementType}
                </div>
                <div className="mt-2 font-light">{board.title}</div>
                <div className="mt-2 text-sm font-light text-muted-foreground">
                  {board.estimatedFootfall} · {board.weeklyPrice}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
