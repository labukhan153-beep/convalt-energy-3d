"use client";

import { AdaptiveDpr } from "@react-three/drei";
import CameraRig from "@/components/three/CameraRig";
import Lights from "@/components/three/Lights";
import World from "@/components/three/World";
import { usePerformanceTier } from "@/lib/usePerformanceTier";

export default function Experience() {
  const tier = usePerformanceTier();
  const low = tier === "low";

  return (
    <>
      <AdaptiveDpr pixelated />
      <color attach="background" args={["#05070a"]} />
      <fog attach="fog" args={["#05070a", 14, 48]} />
      <Lights />
      <World low={low} />
      <CameraRig mobile={low} />
    </>
  );
}
