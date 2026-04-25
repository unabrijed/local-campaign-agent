import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Globe, Loader2 } from "lucide-react";
import { agentRunSteps, demoWebsiteUrl } from "@/data/localboardDemo";
import { Logo } from "@/components/localboard/Logo";
import {
  getDisplayCampaign,
  runWebsiteAgent,
  type WebsiteAgentResult,
} from "@/services/localboardAgent";

const stepDelayMs = 650;

const AgentRun = () => {
  const [searchParams] = useSearchParams();
  const submittedUrl = searchParams.get("url") || demoWebsiteUrl;
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [agentResult, setAgentResult] = useState<WebsiteAgentResult | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(true);

  useEffect(() => {
    if (visibleSteps >= agentRunSteps.length) return;
    const timer = setTimeout(() => setVisibleSteps((count) => count + 1), stepDelayMs);
    return () => clearTimeout(timer);
  }, [visibleSteps]);

  useEffect(() => {
    let cancelled = false;
    setIsFetchingLive(true);
    setAgentError(null);

    runWebsiteAgent(submittedUrl)
      .then((result) => {
        if (!cancelled) setAgentResult(result);
      })
      .catch((error) => {
        if (!cancelled) {
          setAgentError(error instanceof Error ? error.message : "Live agent failed.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsFetchingLive(false);
      });

    return () => {
      cancelled = true;
    };
  }, [submittedUrl]);

  const progress = useMemo(
    () => Math.round((visibleSteps / agentRunSteps.length) * 100),
    [visibleSteps],
  );
  const isComplete = visibleSteps >= agentRunSteps.length;
  const displayCampaign = getDisplayCampaign(agentResult);
  const canOpenBoard = isComplete && !isFetchingLive;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-card/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" aria-label="LocalBoard home">
            <Logo />
          </Link>
          <Link
            to="/campaign/shoonya-store"
            className="text-sm font-light px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 transition"
          >
            View campaign board
          </Link>
        </div>
      </header>

      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 warm-bg opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-card/60 text-xs font-light text-muted-foreground">
                <Globe className="w-3 h-3 text-primary" />
                Running LocalBoard Agent for {submittedUrl}
              </div>
              <h1 className="mt-5 font-display text-4xl md:text-6xl tracking-tight text-balance">
                Building your Bangalore campaign board.
              </h1>
              <p className="mt-4 text-lg font-light text-muted-foreground max-w-2xl">
                The agent endpoint fetches the website, extracts business details, scores Bangalore
                areas, writes creative copy, drafts vendor outreach, and stores the latest result for
                the campaign board.
              </p>
              <div className="mt-4 text-xs font-light text-muted-foreground">
                {isFetchingLive
                  ? "Fetching live website details..."
                  : agentResult
                    ? `Live extraction complete using ${agentResult.mode === "llm" ? "LLM agent" : "heuristic agent"} mode.`
                    : `Live extraction unavailable: ${agentError}. Showing demo fallback.`}
              </div>
            </div>
            <div className="rounded-2xl bg-card border border-border/70 p-5 min-w-[220px]">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Agent progress
              </div>
              <div className="mt-3 font-display text-4xl tracking-tight">{progress}%</div>
              <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 glass-card rounded-3xl overflow-hidden bg-card">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">
                  localboard.agent.run
                </span>
              </div>
              <div className="p-6 space-y-4">
                {agentRunSteps.slice(0, visibleSteps).map((step, index) => {
                  const done = index < visibleSteps - 1 || isComplete;
                  return (
                    <div key={step.title} className="terminal-line flex items-start gap-4">
                      <div
                        className={`mt-0.5 w-7 h-7 rounded-full grid place-items-center shrink-0 ${
                          done ? "bg-primary text-primary-foreground" : "bg-secondary"
                        }`}
                      >
                        {done ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                          {step.agent}
                        </div>
                        <div className="mt-1 font-light">{step.title}</div>
                        <div className="mt-1 text-sm font-light text-muted-foreground">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="lg:col-span-2 glass-card rounded-3xl p-6 bg-card">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Campaign board filling in
              </div>
              <h2 className="mt-3 font-display text-3xl tracking-tight">
                {displayCampaign.campaign.name}
              </h2>
              <div className="mt-5 space-y-4">
                <PreviewBlock visible={visibleSteps >= 2} label="Business" value={`${displayCampaign.business.name} · ${displayCampaign.business.category}`} />
                <PreviewBlock visible={visibleSteps >= 3} label="Audience" value={displayCampaign.business.audience} />
                <PreviewBlock visible={visibleSteps >= 4} label="Best areas" value={displayCampaign.recommendedAreas.map((area) => area.name).join(" · ")} />
                <PreviewBlock visible={visibleSteps >= 6} label="Campaign angle" value={displayCampaign.campaign.angle} />
                <PreviewBlock visible={visibleSteps >= 8} label="QR landing page" value={displayCampaign.campaign.landingSlug} />
                <PreviewBlock visible={visibleSteps >= 9} label="Outreach drafts" value={`${displayCampaign.outreachDrafts.length} drafts ready for human review`} />
              </div>

              <Link
                to="/campaign/shoonya-store"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-light transition ${
                  canOpenBoard
                    ? "bg-primary text-primary-foreground hover:opacity-95"
                    : "bg-secondary text-muted-foreground pointer-events-none"
                }`}
              >
                {isFetchingLive ? "Waiting for live extraction" : "Open campaign board"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

const PreviewBlock = ({
  visible,
  label,
  value,
}: {
  visible: boolean;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-background/60 border border-border/60 p-4">
    <div className="text-xs font-light uppercase tracking-wider text-muted-foreground">{label}</div>
    <div className={`mt-2 font-light transition ${visible ? "text-foreground" : "text-muted-foreground/40 blur-[2px]"}`}>
      {visible ? value : "Waiting for agent output"}
    </div>
  </div>
);

export default AgentRun;
