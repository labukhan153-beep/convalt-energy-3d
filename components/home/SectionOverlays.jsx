"use client";

import { chapters } from "@/lib/site";

export default function SectionOverlays({ overlayRefs }) {
  return (
    <div className="pointer-events-none relative z-10 h-full">
      {chapters.map((chapter, index) => (
        <article
          key={chapter.id}
          ref={(node) => {
            overlayRefs.current[index] = node;
          }}
          className="absolute inset-0 flex flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16"
          style={{
            opacity: index === 0 ? 1 : 0,
            transform: "translate3d(0, 0, 0)",
            transition: "opacity 420ms ease, transform 420ms ease",
          }}
          aria-hidden={index !== 0}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.68rem] font-medium tracking-[0.38em] text-accent uppercase">
                {chapter.kicker}
              </p>
              {index === 0 ? (
                <h1 className="font-display mt-4 max-w-xl text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                  {chapter.title}
                </h1>
              ) : (
                <h2 className="font-display mt-4 max-w-xl text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
                  {chapter.title}
                </h2>
              )}
              <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg">
                {chapter.body}
              </p>
              {chapter.cta ? (
                <a
                  href={chapter.cta.href}
                  className="pointer-events-auto mt-8 inline-flex items-center border border-accent/70 px-5 py-3 text-[0.68rem] font-medium tracking-[0.28em] text-foreground uppercase transition-colors hover:bg-accent hover:text-background"
                >
                  {chapter.cta.label}
                </a>
              ) : null}
            </div>
            <p className="hidden max-w-xs text-[0.7rem] leading-6 tracking-[0.12em] text-muted uppercase xl:block">
              Solar manufacturing · Power generation · Data centers · Recycling
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
