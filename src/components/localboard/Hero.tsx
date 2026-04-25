import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Globe } from "lucide-react";
import { agentRunSteps, coverageAreas, demoWebsiteUrl, sampleCampaign } from "@/data/localboardDemo";

const terminalLines = agentRunSteps.map((step) => `> ${step.title}: ${step.detail}`);

export const Hero = () => {
  const [visible, setVisible] = useState(0);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (visible >= terminalLines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 480);
    return () => clearTimeout(t);
  }, [visible]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedUrl = url.trim() || demoWebsiteUrl;
    navigate(`/agent-run?url=${encodeURIComponent(submittedUrl)}`);
  };

  return (
    <section id="hero" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 warm-bg pointer-events-none opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-card/60 backdrop-blur text-xs font-light text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              Built in Bengaluru for local campaign launches
            </div>

            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-balance">
              Turn any website into a{" "}
              <span className="relative">
                <span className="relative z-10 text-primary">
                  Bangalore
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-primary/15 rounded-full -z-0" />
              </span>{" "}
              street campaign.
            </h1>

            <p className="mt-6 text-lg font-light text-muted-foreground max-w-xl leading-relaxed">
              LocalBoard is an AI agent that reads your business, picks the right Bangalore areas,
              generates campaign ideas, creates QR landing pages, and prepares vendor outreach, all
              in one run.
            </p>

            {/* URL input */}
            <div className="mt-8 max-w-xl">
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2">
                <div className="flex items-center gap-2 px-4 flex-1 min-w-0">
                  <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    className="flex-1 bg-transparent outline-none py-3 text-base font-light placeholder:text-muted-foreground/70"
                  />
                </div>
                <button className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-light hover:opacity-95 transition">
                  Run the LocalBoard Agent
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </button>
              </form>
              <a href="#sample" className="mt-4 text-sm font-light text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1.5">
                <span className="underline underline-offset-4 decoration-border">
                  View sample Indiranagar campaign
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="mt-6 text-xs font-light text-muted-foreground/80 max-w-md leading-relaxed">
              Now mapping {coverageAreas.join(", ")}.
            </p>
          </div>

          {/* Right: Terminal + Campaign card */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {/* Terminal */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">
                  localboard.agent
                </span>
              </div>
              <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[260px]">
                {terminalLines.slice(0, visible).map((line, i) => (
                  <div
                    key={i}
                    className="terminal-line text-foreground/90"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {line.includes("Building launch board") ? (
                      <span className="text-primary">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                {visible < terminalLines.length && (
                  <span className="inline-block w-2 h-4 bg-primary align-middle animate-blink ml-1" />
                )}
              </div>
            </div>

            {/* Campaign board card overlapping */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-10 lg:-right-6 lg:w-[78%] glass-card rounded-2xl p-5 bg-card">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  LocalBoard Campaign
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">
                  READY
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground font-light">Campaign</div>
                  <div className="mt-0.5 font-light">{sampleCampaign.name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-light">Offer</div>
                  <div className="mt-0.5 font-light">{sampleCampaign.offer}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground font-light">Best areas</div>
                  <div className="mt-0.5 font-light">
                    {sampleCampaign.recommendedAreas.map((area) => area.name).join(" · ")}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground font-light mb-1.5">Placements</div>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleCampaign.placements.map((p) => (
                      <span
                        key={p.type}
                        className="text-xs font-light px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {p.count} {p.type.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-border/60">
                  <div className="text-xs text-muted-foreground font-light">Tracking</div>
                  <div className="mt-0.5 font-light">QR scans + WhatsApp leads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
