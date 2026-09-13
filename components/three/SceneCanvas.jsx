"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "@/components/three/Experience";

export default function SceneCanvas({ low }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={low ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 42, near: 0.1, far: 90, position: [3.6, 5.4, 14.2] }}
        frameloop="always"
      >
        <Experience />
      </Canvas>
    </div>
  );
}
