"use client";

export default function Lights() {
  return (
    <>
      <hemisphereLight args={["#1a2c34", "#05070a", 0.55]} />
      <ambientLight intensity={0.12} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.15}
        color="#f2e4c9"
      />
      <directionalLight
        position={[-10, 6, -8]}
        intensity={0.28}
        color="#3dd6c6"
      />
    </>
  );
}
