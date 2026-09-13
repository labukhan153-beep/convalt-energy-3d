import Navigation from "@/components/layout/Navigation";

export default function SiteShell({ children }) {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Navigation />
      <div className="min-h-dvh">{children}</div>
    </div>
  );
}
