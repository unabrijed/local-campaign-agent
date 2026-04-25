import { useState } from "react";

type Area = {
  name: string;
  x: number; // %
  y: number; // %
  audience: string;
  types: string;
  placements: string;
  size?: "sm" | "md" | "lg";
};

const areas: Area[] = [
  { name: "Indiranagar", x: 58, y: 38, size: "lg", audience: "Premium professionals, lifestyle buyers", types: "Cafés, fitness, salons, boutique retail", placements: "Café cards, salon mirrors, apartment posters" },
  { name: "Koramangala", x: 50, y: 55, size: "lg", audience: "Startups, students, young professionals", types: "Restaurants, coworking, cafés", placements: "Coworking screens, café cards, posters" },
  { name: "HSR Layout", x: 60, y: 70, size: "md", audience: "Founders, families, professionals", types: "Clinics, coaching, fitness, wellness", placements: "Apartment posters, clinic counters" },
  { name: "Whitefield", x: 86, y: 45, size: "md", audience: "IT, enterprise, gated communities", types: "IT parks, apartments, offices", placements: "Office screens, gated society boards" },
  { name: "MG Road", x: 45, y: 30, size: "md", audience: "High footfall, weekend discovery", types: "Cafés, retail, nightlife, events", placements: "Street-level posters, café tables" },
  { name: "Church Street", x: 42, y: 33, size: "sm", audience: "Footfall, evening crowds", types: "Cafés, bars, retail", placements: "Café tables, retail counters" },
  { name: "Domlur", x: 52, y: 42, size: "sm", audience: "Lifestyle residents, professionals", types: "Cafés, gyms, salons", placements: "Apartment posters, gym mirrors" },
  { name: "Jayanagar", x: 32, y: 65, size: "md", audience: "Families, legacy locals", types: "Clinics, coaching, retail", placements: "Clinic counters, school zones" },
  { name: "JP Nagar", x: 36, y: 75, size: "sm", audience: "Families, professionals", types: "Retail, clinics, fitness", placements: "Apartment boards, retail counters" },
  { name: "Bellandur", x: 72, y: 60, size: "sm", audience: "IT residents, gated communities", types: "Apartments, coworking, gyms", placements: "Society boards, gym mirrors" },
];

const sizeMap = { sm: "w-2 h-2", md: "w-3 h-3", lg: "w-4 h-4" };

export const BangaloreMap = () => {
  const [hover, setHover] = useState<Area | null>(areas[0]);

  return (
    <section id="map" className="relative py-28">
      <div className="absolute inset-0 warm-bg opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            02 — City-native
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Built for Bangalore's local attention map.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            LocalBoard starts with Bangalore's high-value neighborhoods and recommends where your
            business should be seen.
          </p>
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
                    Best audience
                  </dt>
                  <dd className="mt-1 font-light">{hover?.audience}</dd>
                </div>
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Best campaign types
                  </dt>
                  <dd className="mt-1 font-light">{hover?.types}</dd>
                </div>
                <div>
                  <dt className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    Example placements
                  </dt>
                  <dd className="mt-1 font-light">{hover?.placements}</dd>
                </div>
              </dl>

              <div className="mt-8 pt-6 border-t border-border/60 text-sm font-light text-muted-foreground">
                Hover any pin — the agent maps each area to your business profile.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
