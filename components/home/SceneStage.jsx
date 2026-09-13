"use client";

import dynamic from "next/dynamic";
import { usePerformanceTier } from "@/lib/usePerformanceTier";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
});

export default function SceneStage() {
  const tier = usePerformanceTier();

  return (
    <div className="absolute inset-0 overflow-hidden" data-webgl-stage>
      <div className="absolute inset-0 bg-atmosphere" />
      <div className="energy-grid absolute inset-0 opacity-30" />
      <div className="energy-horizon absolute inset-x-0 bottom-0 h-1/2" />
      <SceneCanvas low={tier === "low"} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background/70" />
    </div>
  );
}
