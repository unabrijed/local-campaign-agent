import { ArrowRight, Globe } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 glow-bg" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center bg-card">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-balance leading-[1.05]">
            Your next customer may be{" "}
            <span className="text-primary">
              three streets away.
            </span>
          </h2>
          <p className="mt-5 text-lg font-light text-muted-foreground max-w-xl mx-auto">
            Run the LocalBoard Agent and create your first Bangalore campaign from your website.
          </p>

          <div className="mt-10 max-w-xl mx-auto">
            <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex items-center gap-2 px-4 flex-1 min-w-0">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="url"
                  placeholder="https://yourbusiness.com"
                  className="flex-1 bg-transparent outline-none py-3 font-light placeholder:text-muted-foreground/70"
                />
              </div>
              <button className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-light hover:opacity-95 transition">
                Run the agent
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
            <button className="mt-4 text-sm font-light text-muted-foreground hover:text-foreground transition">
              or explore Bangalore areas →
            </button>
          </div>

          <p className="mt-10 text-xs font-light text-muted-foreground/80 max-w-md mx-auto">
            Starting with Indiranagar, Koramangala, HSR Layout, Whitefield, MG Road, Church Street,
            Domlur, and Jayanagar.
          </p>
        </div>
      </div>
    </section>
  );
};
