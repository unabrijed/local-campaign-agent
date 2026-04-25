import { Logo } from "./Logo";

export const Nav = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass-card rounded-full px-5 py-2.5 flex items-center justify-between">
          <a href="#" aria-label="LocalBoard home">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-light text-muted-foreground">
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#map" className="hover:text-foreground transition">Bangalore map</a>
            <a href="#sample" className="hover:text-foreground transition">Sample campaign</a>
            <a href="#difference" className="hover:text-foreground transition">Why us</a>
          </nav>
          <a
            href="#hero"
            className="text-sm font-light px-4 py-1.5 rounded-full bg-foreground text-background hover:opacity-90 transition"
          >
            Run agent
          </a>
        </div>
      </div>
    </header>
  );
};
