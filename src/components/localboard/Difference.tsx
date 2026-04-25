import { Check, X } from "lucide-react";

const rows = [
  ["Area selection", "Manual, by media buyers", "AI recommends Bangalore areas"],
  ["Placements", "Mostly billboards & hoardings", "Cafés, salons, gyms, apartments, coworking, events"],
  ["Creatives", "User brings their own", "AI generates posters, copy, CTAs"],
  ["Vendor coordination", "Manual outreach", "Agent prepares vendor outreach drafts"],
  ["Tracking", "Weak / impressions only", "QR, WhatsApp, coupons, landing pages"],
  ["Built for", "Media buyers", "Local businesses, founders, operators"],
];

export const Difference = () => {
  return (
    <section id="difference" className="py-28 bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            04 — Why us
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Not another billboard marketplace. An agent that builds the campaign.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            LocalBoard is not just for booking ad spaces. It plans, creates, prepares, and tracks
            your local campaign.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {/* Traditional */}
          <div className="rounded-3xl bg-card/60 border border-border/70 p-7">
            <div className="flex items-center gap-2 pb-5 border-b border-border/70">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              <span className="text-sm font-light text-muted-foreground">
                Traditional outdoor ad platform
              </span>
            </div>
            <ul className="mt-5 space-y-4">
              {rows.map(([label, trad]) => (
                <li key={label} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/60 mt-1 shrink-0" />
                  <div>
                    <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                      {label}
                    </div>
                    <div className="font-light text-muted-foreground/90">{trad}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* LocalBoard */}
          <div className="relative rounded-3xl p-7 bg-card border-2 border-primary/30 shadow-card">
            <div className="absolute -top-3 left-7 text-[10px] font-medium uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground">
              LocalBoard
            </div>
            <div className="flex items-center gap-2 pb-5 border-b border-border/70">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-sm font-light text-foreground">
                AI agent that ships campaigns
              </span>
            </div>
            <ul className="mt-5 space-y-4">
              {rows.map(([label, , lb]) => (
                <li key={label} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-1 shrink-0" strokeWidth={2} />
                  <div>
                    <div className="text-xs font-light text-muted-foreground uppercase tracking-wider">
                      {label}
                    </div>
                    <div className="font-light text-foreground">{lb}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-display text-3xl md:text-4xl tracking-tight text-balance">
            Google Ads knows keywords.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              LocalBoard knows streets.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
