import { Check, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/data/localboardDemo";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-28 warm-bg">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            08: Packaging
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Start with a campaign board. Scale with placements.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            For the hackathon demo, pricing is shown as future packaging around the agent run and
            local launch workflow.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 border bg-card ${
                index === 1 ? "border-primary/40 shadow-card" : "border-border/70"
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {plan.name}
              </div>
              <div className="mt-4 font-display text-3xl tracking-tight">{plan.price}</div>
              <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                {plan.body}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-light">
                    <Check className="mt-0.5 w-4 h-4 text-primary shrink-0" strokeWidth={1.8} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/agent-run"
                className={`mt-8 inline-flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 text-sm font-light transition ${
                  index === 1
                    ? "bg-primary text-primary-foreground hover:opacity-95"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                Run the LocalBoard Agent
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
