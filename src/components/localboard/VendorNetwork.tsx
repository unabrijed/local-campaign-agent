import { Store, ArrowRight } from "lucide-react";
import { vendorPlacementTypes } from "@/data/localboardDemo";

export const VendorNetwork = () => {
  return (
    <section id="vendors" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">
              07: Billboard and placement network
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
              A new ad network made of real local attention.
            </h2>
            <p className="mt-4 text-lg font-light text-muted-foreground">
              LocalBoard can turn billboards, hoardings, cafes, gyms, salons, coworking
              spaces, apartments, restaurants, and local venues into measurable ad placements.
              Owners list their inventory once; advertisers get matched by area, congestion,
              crowd type, and brand fit.
            </p>
            <a
              href="#billboard-owners"
              className="mt-8 inline-flex items-center gap-2 text-sm font-light px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition"
            >
              List your board on LocalBoard
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {vendorPlacementTypes.map((type) => (
              <div key={type} className="rounded-2xl bg-card border border-border/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl warm-bg grid place-items-center border border-border/50">
                    <Store className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="font-light">{type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
