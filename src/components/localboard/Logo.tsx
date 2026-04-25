// Minimal LocalBoard mark: a rounded board tile with an offset local signal dot.
// Matches the static SVG logo assets in public.

type Props = { className?: string };

export const Logo = ({ className = "" }: Props) => {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-lg bg-surface-warm">
        <span className="h-3.5 w-3.5 rounded-[4px] bg-foreground" />
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-[3px] border-background" />
      </span>
      <span className="font-display text-lg tracking-tight">localboard</span>
    </span>
  );
};
