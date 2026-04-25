import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, ExternalLink, QrCode } from "lucide-react";
import { Logo } from "@/components/localboard/Logo";
import { getDisplayCampaign, getStoredAgentResult } from "@/services/localboardAgent";

const CampaignBoard = () => {
  const displayCampaign = getDisplayCampaign(getStoredAgentResult());

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card/70 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" aria-label="LocalBoard home">
            <Logo />
          </Link>
          <Link
            to="/agent-run"
            className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Run again
          </Link>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-primary">
                Generated campaign board · {displayCampaign.mode === "demo" ? "Demo fallback" : `${displayCampaign.mode} extraction`}
              </div>
              <h1 className="mt-4 font-display text-4xl md:text-6xl tracking-tight text-balance">
                {displayCampaign.campaign.name}
              </h1>
              <p className="mt-4 text-lg font-light text-muted-foreground max-w-2xl">
                {displayCampaign.campaign.angle}
              </p>
              {displayCampaign.sourceUrl && (
                <p className="mt-3 text-xs font-light text-muted-foreground">
                  Source: {displayCampaign.sourceUrl}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Approve campaign", "Export brief", "Preview landing page"].map((action) => (
                <button
                  key={action}
                  className={`px-4 py-2 rounded-full text-sm font-light transition ${
                    action === "Approve campaign"
                      ? "bg-primary text-primary-foreground hover:opacity-95"
                      : "border border-border bg-card hover:bg-secondary"
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            <BoardCard title="Business summary">
              <dl className="space-y-3 text-sm font-light">
                <Info label="Business" value={displayCampaign.business.name} />
                <Info label="Category" value={displayCampaign.business.category} />
                <Info label="Sub-category" value={displayCampaign.business.subCategory} />
                <Info label="Location" value={displayCampaign.business.location} />
                <Info label="Goal" value={displayCampaign.business.conversionGoal} />
              </dl>
            </BoardCard>

            <BoardCard title="Audience">
              <p className="font-light leading-relaxed">{displayCampaign.business.audience}</p>
              <div className="mt-4 rounded-xl warm-bg border border-border/70 p-4 text-sm font-light">
                Primary CTA: {displayCampaign.campaign.primaryCta}
              </div>
            </BoardCard>

            <BoardCard title="Offer and budget">
              <dl className="space-y-3 text-sm font-light">
                <Info label="Offer" value={displayCampaign.campaign.offer} />
                <Info label="Duration" value={displayCampaign.campaign.duration} />
                <Info label="Starter budget" value={displayCampaign.campaign.budget} />
              </dl>
            </BoardCard>
          </div>

          <div className="mt-5 grid lg:grid-cols-3 gap-5">
            <BoardCard title="Best areas" className="lg:col-span-2">
              <div className="grid md:grid-cols-3 gap-4">
                {displayCampaign.recommendedAreas.map((area) => (
                  <div key={area.name} className="rounded-2xl bg-background/60 border border-border/70 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-light">{area.name}</div>
                      <div className="font-display text-xl tracking-tight">{area.score}</div>
                    </div>
                    <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                      {area.reason}
                    </p>
                  </div>
                ))}
              </div>
            </BoardCard>

            <BoardCard title="Launch checklist">
              <ul className="space-y-2.5 text-sm font-light">
                {displayCampaign.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </BoardCard>
          </div>

          <div className="mt-5 grid lg:grid-cols-4 gap-5">
            {displayCampaign.placements.map((placement, index) => (
              <BoardCard key={placement} title={placement}>
                <div className="font-display text-3xl tracking-tight">{index + 1}</div>
                <div className="mt-2 text-sm font-light text-muted-foreground">
                  Recommended placement type
                </div>
              </BoardCard>
            ))}
          </div>

          <div className="mt-5 grid lg:grid-cols-2 gap-5">
            <BoardCard title="Creative preview">
              <div className="space-y-4">
                {displayCampaign.creatives.map((creative) => (
                  <div key={creative.format} className="rounded-2xl bg-background/60 border border-border/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                        {creative.format}
                      </div>
                      <button className="text-muted-foreground hover:text-foreground transition" aria-label={`Copy ${creative.format}`}>
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 font-light">{creative.headline}</div>
                    <p className="mt-1 text-sm font-light text-muted-foreground">{creative.body}</p>
                    <div className="mt-3 text-xs font-mono px-2.5 py-1 rounded-full bg-card border border-border/70 inline-flex">
                      {creative.cta}
                    </div>
                  </div>
                ))}
              </div>
            </BoardCard>

            <div className="space-y-5">
              <BoardCard title="QR landing page preview">
                <div className="rounded-3xl warm-bg border border-border/70 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {displayCampaign.business.name}
                      </div>
                      <h3 className="mt-3 font-display text-3xl tracking-tight">
                        {displayCampaign.campaign.name} Near {displayCampaign.business.location}
                      </h3>
                    </div>
                    <div className="w-20 h-20 rounded-2xl bg-card border border-border/70 grid place-items-center shrink-0">
                      <QrCode className="w-10 h-10 text-primary" strokeWidth={1.4} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-light text-muted-foreground">
                    {displayCampaign.campaign.offer} Share your name, phone, and preferred time to
                    continue on WhatsApp.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-light">
                    <div className="rounded-xl bg-card border border-border/70 px-3 py-2">Name</div>
                    <div className="rounded-xl bg-card border border-border/70 px-3 py-2">Phone</div>
                    <div className="rounded-xl bg-card border border-border/70 px-3 py-2 col-span-2">Preferred time</div>
                  </div>
                  <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-light">
                    Book on WhatsApp
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </BoardCard>

              <BoardCard title="Tracking dashboard">
                <div className="grid grid-cols-2 gap-4">
                  <Metric label="QR scans" value={String(displayCampaign.tracking.qrScans)} />
                  <Metric label="WhatsApp clicks" value={String(displayCampaign.tracking.whatsappClicks)} />
                  <Metric label="Leads" value={String(displayCampaign.tracking.leads)} />
                  <Metric label="Trial bookings" value={String(displayCampaign.tracking.trialBookings)} />
                  <Metric label="Cost per lead" value={displayCampaign.tracking.costPerLead} />
                  <Metric label="Proof uploads" value={displayCampaign.tracking.proofUploads} />
                </div>
                <div className="mt-4 text-sm font-light text-muted-foreground">
                  Best area: {displayCampaign.tracking.bestArea} · Best placement: {displayCampaign.tracking.bestPlacement}
                </div>
              </BoardCard>
            </div>
          </div>

          <BoardCard title="Vendor outreach drafts" className="mt-5">
            <div className="grid lg:grid-cols-2 gap-4">
              {displayCampaign.outreachDrafts.map((draft) => (
                <div key={draft.type} className="rounded-2xl bg-background/60 border border-border/70 p-4">
                  <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                    {draft.type}
                  </div>
                  <p className="mt-3 text-sm font-light leading-relaxed">{draft.message}</p>
                  <div className="mt-3 text-xs font-light text-muted-foreground">
                    Draft only. Human approval required before sending.
                  </div>
                </div>
              ))}
            </div>
          </BoardCard>
        </div>
      </section>
    </main>
  );
};

const BoardCard = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <section className={`rounded-3xl bg-card border border-border/70 p-6 ${className}`}>
    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
      {title}
    </div>
    {children}
  </section>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-xs text-muted-foreground uppercase tracking-wider">{label}</dt>
    <dd className="mt-1">{value}</dd>
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-background/60 border border-border/70 p-4">
    <div className="text-xs font-light text-muted-foreground">{label}</div>
    <div className="mt-1 font-display text-2xl tracking-tight">{value}</div>
  </div>
);

export default CampaignBoard;
