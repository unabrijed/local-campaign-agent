// Minimal LocalBoard mark: a small filled square with an offset dot.
// Reads as "a place on a board / a pin on a grid" without literal pin iconography.

type Props = { className?: string };

export const Logo = ({ className = "" }: Props) => {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-block w-5 h-5">
        <span className="absolute inset-0 rounded-[5px] bg-foreground" />
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary border-2 border-background" />
      </span>
      <span className="font-display text-lg tracking-tight">localboard</span>
    </span>
  );
};
