import { Map, Palette, Send, ScanLine } from "lucide-react";

const problems = [
  {
    icon: Map,
    title: "Guessing locations",
    body: "Businesses do not know whether to advertise near cafes, apartments, gyms, offices, or events.",
  },
  {
    icon: Palette,
    title: "Creative friction",
    body: "Posters, flyers, QR pages, and WhatsApp copy all take time to create.",
  },
  {
    icon: Send,
    title: "Vendor chaos",
    body: "Cafe owners, apartment managers, gyms, salons, and local venues are hard to coordinate manually.",
  },
  {
    icon: ScanLine,
    title: "No measurement",
    body: "Offline campaigns usually lack QR tracking, lead capture, proof images, and area-wise performance.",
  },
];

export const Problem = () => {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            01: The local gap
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            Local businesses should not need a media buyer to be seen.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            Most local businesses know they need visibility, but they do not know which area to
            target, what to print, whom to contact, or how to track results. LocalBoard turns that
            messy process into one agent-powered launch board.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="rounded-2xl bg-card border border-border/70 p-6 hover:shadow-card transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl warm-bg grid place-items-center border border-border/50">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl tracking-tight">{problem.title}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                  {problem.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
