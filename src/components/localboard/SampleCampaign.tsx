import type { LucideIcon } from "lucide-react";
import { QrCode, Sparkles, Users, MapPin, Megaphone, Wallet, LineChart } from "lucide-react";
import { sampleCampaign } from "@/data/localboardDemo";

export const SampleCampaign = () => {
  return (
    <section id="sample" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            04: The aha moment
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            See what the agent creates.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            One URL becomes a complete local campaign board.
          </p>
        </div>

        <div className="mt-12 glass-card rounded-3xl p-8 md:p-10 bg-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-6 border-b border-border/60">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Sample input
              </div>
              <div className="mt-1 font-display text-xl">
                {sampleCampaign.business} · {sampleCampaign.location}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-sm font-light text-muted-foreground">
                Generated in 38 seconds
              </span>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-5">
            <InfoCard icon={Users} label="Audience" value={sampleCampaign.audience} />
            <InfoCard icon={Megaphone} label="Campaign angle" value={sampleCampaign.name} />
            <InfoCard icon={Wallet} label="Offer" value={sampleCampaign.offer} />
          </div>

          <div className="mt-5 grid lg:grid-cols-3 gap-5">
            {sampleCampaign.recommendedAreas.map((area) => (
              <div key={area.name} className="rounded-2xl bg-background/60 border border-border/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-xs font-light uppercase tracking-wider">{area.name}</span>
                  </div>
                  <span className="font-display text-xl tracking-tight">{area.score}/100</span>
                </div>
                <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                  {area.reason}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-background/60 border border-border/70 p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs font-light uppercase tracking-wider">Creative output</span>
              </div>
              <div className="mt-4 space-y-4">
                {sampleCampaign.creatives.slice(0, 3).map((creative) => (
                  <div key={creative.format} className="rounded-xl bg-card border border-border/70 p-4">
                    <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                      {creative.format}
                    </div>
                    <div className="mt-2 font-light">{creative.headline}</div>
                    <div className="mt-1 text-sm font-light text-muted-foreground">{creative.body}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-background/60 border border-border/70 p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <QrCode className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs font-light uppercase tracking-wider">Placements and tracking</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {sampleCampaign.placements.map((placement) => (
                  <div key={placement.type} className="rounded-xl bg-card border border-border/70 p-4">
                    <div className="font-display text-2xl tracking-tight">{placement.count}</div>
                    <div className="text-sm font-light text-muted-foreground">{placement.type}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border/70 p-4 warm-bg">
                <div className="grid grid-cols-3 gap-3">
                  <Metric label="QR scans" value={String(sampleCampaign.tracking.qrScans)} />
                  <Metric label="WA clicks" value={String(sampleCampaign.tracking.whatsappClicks)} />
                  <Metric label="Leads" value={String(sampleCampaign.tracking.leads)} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 warm-bg">
            <div className="flex items-center gap-3">
              <LineChart className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <div>
                <div className="text-xs font-light uppercase tracking-wider text-muted-foreground">
                  Tracking
                </div>
                <div className="mt-0.5 font-light">
                  QR scans · WhatsApp clicks · reserved orders · area-wise source tracking
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-card border border-border/70">
                {sampleCampaign.landingSlug}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-background/60 border border-border/70 p-5 hover:border-primary/40 transition">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="w-4 h-4" strokeWidth={1.5} />
      <span className="text-xs font-light uppercase tracking-wider">{label}</span>
    </div>
    <div className="mt-3 font-light text-foreground leading-relaxed">{value}</div>
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-xs font-light text-muted-foreground">{label}</div>
    <div className="mt-0.5 font-display text-2xl tracking-tight">{value}</div>
  </div>
);
