"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneStage from "@/components/home/SceneStage";
import SectionOverlays from "@/components/home/SectionOverlays";
import { chapters } from "@/lib/site";
import { chapterWeight, scrollState } from "@/lib/scrollState";

export default function HomeExperience() {
  const rootRef = useRef(null);
  const overlayRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollState.reducedMotion = reduced;

    const applyOverlays = (progress) => {
      overlayRefs.current.forEach((node, index) => {
        if (!node) return;
        const weight = chapterWeight(progress, index, chapters.length);
        const visible = weight > 0.08;
        node.style.opacity = String(weight);
        node.style.transform = `translate3d(0, ${(1 - weight) * 18}px, 0)`;
        node.style.pointerEvents = weight > 0.5 ? "auto" : "none";
        node.setAttribute("aria-hidden", visible ? "false" : "true");
      });
    };

    const startProgress = () => {
      const height = rootRef.current?.offsetHeight || 1;
      const max = Math.max(1, height - window.innerHeight);
      return Math.min(1, Math.max(0, window.scrollY / max));
    };

    scrollState.progress = startProgress();
    applyOverlays(scrollState.progress);

    const onMouse = (event) => {
      if (reduced) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      scrollState.mouseX = x;
      scrollState.mouseY = -y;
    };

    let trigger;
    const ctx = gsap.context(() => {
      trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          applyOverlays(self.progress);
        },
      });
    }, rootRef);

    const sync = () => {
      if (!trigger) return;
      trigger.update();
      scrollState.progress = trigger.progress;
      applyOverlays(trigger.progress);
    };

    requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    window.addEventListener("resize", sync);
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("mousemove", onMouse);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full"
      style={{ height: `${chapters.length * 100}dvh` }}
      aria-label="Convalt Energy experience"
    >
      <div className="sticky top-0 h-dvh min-h-[40rem] overflow-hidden">
        <SceneStage />
        <SectionOverlays overlayRefs={overlayRefs} />
      </div>

      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          id={chapter.id}
          className="pointer-events-none absolute left-0 h-dvh min-h-[40rem] w-px"
          style={{ top: `${index * 100}dvh` }}
          aria-hidden="true"
        />
      ))}
    </section>
  );
}
