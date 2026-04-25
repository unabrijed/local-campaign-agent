import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { sampleCampaign } from "@/data/localboardDemo";

const stages = ["Planning", "Creative Ready", "Vendor Approval", "Live", "Completed"];

export const LaunchBoard = () => {
  return (
    <section className="py-28 warm-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            06: Tracking
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Offline campaigns should feel as trackable as digital ads.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            Track the campaign status, budget, placements, leads, QR scans, proof uploads, and the
            next best action from one launch board.
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
                        i < 4
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground border border-border"
                      }`}
                    >
                      {i < 4 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-sm font-light ${i < 4 ? "text-foreground" : "text-muted-foreground"}`}>
                      {stage}
                    </span>
                  </div>
                  {i < stages.length - 1 && (
                    <div className={`w-6 md:w-12 h-px ${i < 3 ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Widgets */}
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            <Widget title="Area plan">
              <div className="flex flex-wrap gap-1.5">
                {sampleCampaign.recommendedAreas.map((a) => (
                  <span key={a.name} className="text-xs font-light px-2.5 py-1 rounded-full bg-secondary">{a.name}</span>
                ))}
              </div>
              <div className="mt-4 text-sm font-light text-muted-foreground">
                Budget: <span className="text-foreground">{sampleCampaign.budget}</span>
              </div>
            </Widget>

            <Widget title="Placement mix">
              <div className="grid grid-cols-2 gap-2 text-sm font-light">
                {sampleCampaign.placements.map((placement) => (
                  <Stat key={placement.type} label={placement.type.replace(" table cards", "").replace(" mirror stickers", "").replace(" posters", "").replace(" lobby screens", "")} value={String(placement.count)} />
                ))}
              </div>
              <div className="mt-3 text-xs font-light text-muted-foreground">
                {sampleCampaign.tracking.placementsTotal} total · {sampleCampaign.tracking.placementsConfirmed} confirmed · {sampleCampaign.tracking.placementsPending} pending
              </div>
            </Widget>

            <Widget title="Creative assets">
              <ul className="text-sm font-light space-y-1.5">
                {sampleCampaign.creatives.slice(0, 4).map((creative) => (
                  <li key={creative.format} className="flex items-center gap-2"><Dot /> {creative.format}</li>
                ))}
              </ul>
            </Widget>

            <Widget title="Tracking" className="md:col-span-2">
              <div className="grid grid-cols-3 gap-3">
                <Metric label="QR scans" value={String(sampleCampaign.tracking.qrScans)} trend="+18%" />
                <Metric label="WA clicks" value={String(sampleCampaign.tracking.whatsappClicks)} trend="+9%" />
                <Metric label="Leads" value={String(sampleCampaign.tracking.leads)} trend="+24%" />
              </div>
              <div className="mt-3 text-xs font-light text-muted-foreground">
                Best area: {sampleCampaign.tracking.bestArea} · Best placement: {sampleCampaign.tracking.bestPlacement} · Reserved orders: {sampleCampaign.tracking.trialBookings}
              </div>
            </Widget>

            <Widget title="Vendor outreach">
              <div className="text-sm font-light">
                <div className="text-2xl font-display tracking-tight text-foreground">{sampleCampaign.outreachDrafts.length}</div>
                <div className="text-muted-foreground">draft messages ready for human review</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Proof uploads: {sampleCampaign.tracking.proofUploads}
                </div>
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

const Widget = ({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) => (
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
