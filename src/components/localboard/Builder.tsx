export const Builder = () => {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-primary">
          07 — Builder energy
        </span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight text-balance">
          Built for builders who ship.
        </h2>
        <p className="mt-5 text-lg font-light text-muted-foreground leading-relaxed">
          LocalBoard was designed as an AI agent sprint: no decks, no manual campaign planning, just
          a working campaign generated from a website.
        </p>
        <p className="mt-6 font-light text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
          We wanted to make local advertising feel as easy as prompting. Paste a website, let the
          agent understand the business, map Bangalore, generate the campaign, and prepare the
          launch board.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-border bg-card/60">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
          Built in Bengaluru, for businesses trying to be seen in Bengaluru
        </div>
      </div>
    </section>
  );
};
