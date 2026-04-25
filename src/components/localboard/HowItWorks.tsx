import { Globe, MapPinned, Wand2, Send, LineChart } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Paste your website",
    body: "We understand your business, audience, price point, location, offer, and brand tone.",
  },
  {
    icon: MapPinned,
    title: "Map Bangalore areas",
    body: "The agent recommends where your campaign should show up — from Indiranagar cafés to Koramangala coworking spaces.",
  },
  {
    icon: Wand2,
    title: "Generate campaign assets",
    body: "Campaign angles, poster copy, table-card copy, WhatsApp copy, QR CTAs, and landing page content.",
  },
  {
    icon: Send,
    title: "Prepare launch outreach",
    body: "Vendor outreach drafts for cafés, salons, gyms, apartments, coworking spaces, and local partners.",
  },
  {
    icon: LineChart,
    title: "Track local leads",
    body: "Every placement gets QR, WhatsApp, coupon, or landing-page tracking. Offline becomes measurable.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            01 — Agent workflow
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            From website to local campaign in one agent run.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            LocalBoard removes the manual work of planning, writing, placing, and tracking a local
            campaign.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative rounded-2xl bg-card border border-border/70 p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-warm grid place-items-center border border-border/50">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
