import { Check } from "lucide-react";

const stages = ["Planning", "Creative ready", "Outreach ready", "Ready to launch"];

export const LaunchBoard = () => {
  return (
    <section className="py-28 warm-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            06 — The output
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Every campaign gets a launch board.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            Track what the agent created and what is ready to launch.
          </p>
        </div>

        <div className="mt-12 glass-card rounded-3xl p-6 md:p-8 bg-card">
          {/* Status stepper */}
          <div className="rounded-2xl bg-background/60 border border-border/60 p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Campaign status
            </div>
            <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
              {stages.map((stage, i) => (
                <div key={stage} className="flex items-center gap-2 md:gap-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full grid place-items-center text-xs ${
                        i < 3
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground border border-border"
                      }`}
                    >
                      {i < 3 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-sm font-light ${i < 3 ? "text-foreground" : "text-muted-foreground"}`}>
                      {stage}
                    </span>
                  </div>
                  {i < stages.length - 1 && (
                    <div className={`w-6 md:w-12 h-px ${i < 2 ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Widgets */}
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            <Widget title="Area plan">
              <div className="flex flex-wrap gap-1.5">
                {["Indiranagar", "Domlur", "Koramangala"].map((a) => (
                  <span key={a} className="text-xs font-light px-2.5 py-1 rounded-full bg-secondary">{a}</span>
                ))}
              </div>
            </Widget>

            <Widget title="Placement mix">
              <div className="grid grid-cols-2 gap-2 text-sm font-light">
                <Stat label="Cafés" value="6" />
                <Stat label="Salons" value="4" />
                <Stat label="Apartments" value="3" />
                <Stat label="Coworking" value="2" />
              </div>
            </Widget>

            <Widget title="Creative assets">
              <ul className="text-sm font-light space-y-1.5">
                <li className="flex items-center gap-2"><Dot /> Poster copy</li>
                <li className="flex items-center gap-2"><Dot /> Table card copy</li>
                <li className="flex items-center gap-2"><Dot /> WhatsApp flyer</li>
                <li className="flex items-center gap-2"><Dot /> QR landing page</li>
              </ul>
            </Widget>

            <Widget title="Tracking" className="md:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                <Metric label="QR scans" value="312" trend="+18%" />
                <Metric label="WA clicks" value="84" trend="+9%" />
                <Metric label="Leads" value="27" trend="+24%" />
              </div>
              <div className="mt-3 text-xs font-light text-muted-foreground">
                Best-performing: Indiranagar café cards · 142 scans
              </div>
            </Widget>

            <Widget title="Vendor outreach">
              <div className="text-sm font-light">
                <div className="text-2xl font-display tracking-tight text-foreground">5</div>
                <div className="text-muted-foreground">draft messages ready for review</div>
              </div>
              <button className="mt-3 text-xs font-light px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition">
                Review drafts →
              </button>
            </Widget>
          </div>
        </div>
      </div>
    </section>
  );
};

const Widget = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl bg-background/60 border border-border/60 p-5 ${className}`}>
    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">{title}</div>
    {children}
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between rounded-lg bg-secondary/60 px-2.5 py-1.5">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-display">{value}</span>
  </div>
);

const Metric = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div>
    <div className="text-xs font-light text-muted-foreground">{label}</div>
    <div className="mt-0.5 flex items-baseline gap-2">
      <span className="font-display text-2xl tracking-tight">{value}</span>
      <span className="text-xs text-success font-light">{trend}</span>
    </div>
  </div>
);

const Dot = () => <span className="w-1.5 h-1.5 rounded-full bg-primary" />;
