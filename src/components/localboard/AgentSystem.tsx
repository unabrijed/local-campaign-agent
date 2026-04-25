import { Bot, CheckCircle2 } from "lucide-react";
import { agentModules } from "@/data/localboardDemo";

export const AgentSystem = () => {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            05: Agent system
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            A team of agents for local campaign execution.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            LocalBoard feels like an operator because each module owns a clear job: understand the
            business, map the city, generate the campaign, prepare launch ops, and report what worked.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentModules.map((agent, index) => (
            <div
              key={agent.name}
              className="relative rounded-2xl bg-card border border-border/70 p-6 hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-xl warm-bg grid place-items-center border border-border/50">
                  <Bot className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-xs text-muted-foreground/60">
                  agent {index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl tracking-tight">{agent.name}</h3>
              <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                {agent.body}
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-light text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" strokeWidth={1.8} />
                Connected to campaign board output
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
