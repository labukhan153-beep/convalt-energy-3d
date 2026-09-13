export default function BrandMark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0 text-accent"
      >
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M20 8 L32 20 L20 32 L8 20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-semibold tracking-[0.18em] text-foreground uppercase">
          Convalt
        </span>
        <span className="mt-1 text-[0.62rem] font-medium tracking-[0.32em] text-muted uppercase">
          Energy
        </span>
      </span>
    </span>
  );
}
