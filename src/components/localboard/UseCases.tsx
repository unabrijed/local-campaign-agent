import { Dumbbell, HeartPulse, Coffee, Scissors, GraduationCap, ShoppingBag } from "lucide-react";

const cases = [
  { icon: Dumbbell, title: "Fitness studios", body: "Launch trial offers across apartments, cafés, gyms, and coworking spaces." },
  { icon: HeartPulse, title: "Clinics", body: "Drive appointment bookings through salons, apartments, offices, and premium areas." },
  { icon: Coffee, title: "Cafés & restaurants", body: "Promote openings and events through nearby colleges, offices, PGs, and street partners." },
  { icon: Scissors, title: "Salons & spas", body: "Reach lifestyle customers through cafés, apartments, gyms, and boutique retail." },
  { icon: GraduationCap, title: "Coaching centers", body: "Promote batches through student zones, colleges, and parent-heavy neighborhoods." },
  { icon: ShoppingBag, title: "D2C popups", body: "Drive local footfall through cafés, creators, event spaces, and QR coupons." },
];

export const UseCases = () => {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">
            05 — Who it's for
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
            For businesses that need local demand.
          </h2>
          <p className="mt-4 text-lg font-light text-muted-foreground">
            LocalBoard helps local operators show up where their next customers already are.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="group rounded-2xl bg-card border border-border/70 p-6 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-warm grid place-items-center border border-border/50 group-hover:scale-105 transition">
                  <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                  {c.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
