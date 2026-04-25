import { QrCode, Sparkles, Users, MapPin, Megaphone, Wallet, LineChart } from "lucide-react";

const blocks = [
  {
    icon: Users,
    label: "Detected audience",
    value: "Working professionals, women 24–42, premium residents, lifestyle buyers.",
  },
  {
    icon: MapPin,
    label: "Recommended areas",
    value: "Indiranagar · Domlur · Koramangala · MG Road",
  },
  {
    icon: Sparkles,
    label: "Best placements",
    value: "Premium salons, cafés, apartment communities, coworking lobbies.",
  },
  {
    icon: Megaphone,
    label: "Campaign angle",
    value: "Glow-up consultation 10 minutes from your office.",
  },
  {
    icon: QrCode,
    label: "Generated CTA",
    value: "Scan to book your first consultation.",
  },
  {
    icon: Wallet,
    label: "Starter budget",
    value: "₹15,000 local launch budget.",
  },
];

export const SampleCampaign = () => {
  return (
    <section id="sample" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            03 — The aha moment
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            See what the agent builds.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            One URL becomes a complete local campaign board.
          </p>
        </div>

        <div className="mt-12 glass-card rounded-3xl p-8 md:p-10 bg-gradient-board">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-6 border-b border-border/60">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Sample input
              </div>
              <div className="mt-1 font-display text-xl">
                Premium skin clinic · Indiranagar
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-sm font-light text-muted-foreground">
                Generated in 38 seconds
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {blocks.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.label}
                  className="rounded-2xl bg-background/60 border border-border/70 p-5 hover:border-primary/40 transition"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-xs font-light uppercase tracking-wider">
                      {b.label}
                    </span>
                  </div>
                  <div className="mt-3 font-light text-foreground leading-relaxed">
                    {b.value}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-warm">
            <div className="flex items-center gap-3">
              <LineChart className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <div>
                <div className="text-xs font-light uppercase tracking-wider text-muted-foreground">
                  Tracking
                </div>
                <div className="mt-0.5 font-light">
                  QR scans · WhatsApp clicks · consultation leads
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-card border border-border/70">
                qr-localboard.app/aurafit
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
