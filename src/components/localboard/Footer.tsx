import { MapPin } from "lucide-react";

const cols = [
  { title: "Product", items: ["Run agent", "Sample campaign", "Bangalore map", "Launch board"] },
  { title: "Areas", items: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "MG Road", "Jayanagar"] },
  { title: "Use cases", items: ["Fitness studios", "Clinics", "Cafés", "Salons", "Coaching centers", "D2C popups"] },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-primary grid place-items-center">
                <MapPin className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.2} />
              </div>
              <span className="font-display text-lg tracking-tight">localboard</span>
            </div>
            <p className="mt-4 text-sm font-light text-muted-foreground max-w-xs">
              Website in. Bangalore campaign out.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm font-light text-foreground/80 hover:text-foreground transition">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm font-light text-muted-foreground">
            Google Ads knows keywords.{" "}
            <span className="text-foreground">LocalBoard knows streets.</span>
          </p>
          <p className="text-xs font-light text-muted-foreground">
            © {new Date().getFullYear()} LocalBoard · Made in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
};
