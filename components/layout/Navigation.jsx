"use client";

import { useEffect, useState } from "react";
import BrandMark from "@/components/brand/BrandMark";
import { navItems } from "@/lib/site";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { threshold: [0.35, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8 lg:px-10">
        <a href="#hero" aria-label="Convalt Energy home" onClick={() => setOpen(false)}>
          <BrandMark />
        </a>

        <nav className="hidden min-w-0 items-center justify-end gap-4 xl:gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-[0.62rem] font-medium tracking-[0.14em] uppercase transition-colors xl:text-[0.65rem] xl:tracking-[0.18em] ${
                active === item.href
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={`absolute block h-px w-5 bg-foreground transition-transform ${
              open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute block h-px w-5 bg-foreground transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block h-px w-5 bg-foreground transition-transform ${
              open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-background/95 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col px-5 py-6 sm:px-8" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-sm tracking-[0.22em] text-foreground uppercase"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
