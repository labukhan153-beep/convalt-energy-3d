"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

const dummy = new THREE.Object3D();

function SolarArray({ columns, rows, origin, color }) {
  const mesh = useRef(null);
  const count = columns * rows;

  useLayoutEffect(() => {
    const instance = mesh.current;
    if (!instance) return;

    let index = 0;
    for (let x = 0; x < columns; x += 1) {
      for (let z = 0; z < rows; z += 1) {
        dummy.position.set(
          origin[0] + (x - (columns - 1) / 2) * 1.15,
          origin[1],
          origin[2] + (z - (rows - 1) / 2) * 1.45,
        );
        dummy.rotation.set(-0.52, 0, 0);
        dummy.updateMatrix();
        instance.setMatrixAt(index, dummy.matrix);
        index += 1;
      }
    }
    instance.instanceMatrix.needsUpdate = true;
  }, [columns, origin, rows]);

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      frustumCulled={false}
      castShadow={false}
      receiveShadow={false}
    >
      <boxGeometry args={[1.02, 0.035, 1.28]} />
      <meshStandardMaterial
        color={color}
        metalness={0.72}
        roughness={0.22}
        emissive="#123d3a"
        emissiveIntensity={0.28}
      />
    </instancedMesh>
  );
}

function Facility() {
  const volumes = useMemo(
    () => [
      [0, 0.9, 0, 4.8, 1.8, 2.4],
      [2.8, 1.4, -1.1, 2.2, 2.8, 1.6],
      [-2.6, 0.7, 1.2, 2.4, 1.4, 1.8],
      [0.4, 0.35, 2.2, 3.2, 0.7, 1.1],
    ],
    [],
  );

  return (
    <group position={[-7.4, 0, -1.2]}>
      {volumes.map(([x, y, z, w, h, d], index) => (
        <mesh key={index} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#1b2733" : "#243140"}
            metalness={0.38}
            roughness={0.46}
            emissive="#1a4f4a"
            emissiveIntensity={index === 1 ? 0.18 : 0.06}
          />
        </mesh>
      ))}
      {[-1.4, 0, 1.4].map((x) => (
        <mesh key={x} position={[x, 2.15, 0.2]}>
          <boxGeometry args={[0.9, 0.05, 1.4]} />
          <meshStandardMaterial
            color="#2a6f6a"
            metalness={0.6}
            roughness={0.25}
            emissive="#3dd6c6"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function GenerationTowers() {
  return (
    <group position={[0.6, 0, -6.4]}>
      {[-3.2, -1.1, 1.1, 3.2].map((x, index) => (
        <mesh key={x} position={[x, 1.6 + index * 0.12, 0]}>
          <cylinderGeometry args={[0.14, 0.2, 3.2, 8]} />
          <meshStandardMaterial
            color="#2c3846"
            metalness={0.55}
            roughness={0.35}
            emissive="#d4a25a"
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataHall() {
  const racks = useMemo(() => {
    const items = [];
    for (let x = 0; x < 5; x += 1) {
      for (let z = 0; z < 3; z += 1) {
        items.push([x * 1.15, 1.15 + ((x + z) % 2) * 0.25, z * 1.3]);
      }
    }
    return items;
  }, []);

  return (
    <group position={[7.8, 0, -3.4]}>
      <mesh position={[2.2, 0.08, 1.2]}>
        <boxGeometry args={[7.2, 0.16, 4.6]} />
        <meshStandardMaterial color="#121820" metalness={0.2} roughness={0.7} />
      </mesh>
      {racks.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <boxGeometry args={[0.72, 2.3, 0.9]} />
          <meshStandardMaterial
            color="#1a2430"
            metalness={0.48}
            roughness={0.32}
            emissive="#3dd6c6"
            emissiveIntensity={index % 3 === 0 ? 0.22 : 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function RecyclingLoop() {
  const satellites = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    satellites.current.forEach((mesh, index) => {
      if (!mesh) return;
      const angle = t * 0.35 + index * ((Math.PI * 2) / 5);
      mesh.position.set(Math.cos(angle) * 2.1, 1.7 + Math.sin(t + index) * 0.12, Math.sin(angle) * 2.1);
      mesh.rotation.y = angle;
    });
  });

  return (
    <group position={[6.4, 0.2, 7.8]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.7, 0]}>
        <torusGeometry args={[2.1, 0.06, 8, 48]} />
        <meshStandardMaterial
          color="#3dd6c6"
          metalness={0.7}
          roughness={0.2}
          emissive="#3dd6c6"
          emissiveIntensity={0.35}
        />
      </mesh>
      {Array.from({ length: 5 }).map((_, index) => (
        <mesh
          key={index}
          ref={(node) => {
            satellites.current[index] = node;
          }}
        >
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshStandardMaterial
            color="#d4a25a"
            metalness={0.5}
            roughness={0.3}
            emissive="#d4a25a"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function EnergyCore() {
  const inner = useRef(null);
  const shell = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y = t * 0.25;
      inner.current.rotation.z = t * 0.12;
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.08;
    }
  });

  return (
    <group position={[0, 2.8, 0.2]}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#3dd6c6"
          emissive="#3dd6c6"
          emissiveIntensity={0.9}
          metalness={0.2}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color="#3dd6c6" wireframe transparent opacity={0.28} />
      </mesh>
      <pointLight color="#3dd6c6" intensity={1.6} distance={18} />
    </group>
  );
}

function Sparks({ count }) {
  const points = useRef(null);
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 36;
      data[i * 3 + 1] = Math.random() * 10 + 0.4;
      data[i * 3 + 2] = (Math.random() - 0.5) * 32;
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!points.current || scrollState.reducedMotion) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8be8dc"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

export default function World({ low }) {
  const root = useRef(null);
  const columns = low ? 6 : 9;
  const rows = low ? 5 : 8;

  useFrame((state) => {
    if (!root.current || scrollState.reducedMotion) return;
    const t = state.clock.elapsedTime;
    const drift = scrollState.progress * 0.35;
    root.current.position.y = Math.sin(t * 0.35) * 0.08;
    root.current.rotation.y = Math.sin(t * 0.12) * 0.018 + scrollState.mouseX * 0.04;
    root.current.position.x = Math.sin(t * 0.18 + drift) * 0.12;
  });

  return (
    <group ref={root}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#070b10" metalness={0.1} roughness={0.92} />
      </mesh>

      <Grid
        position={[0, 0.01, 0]}
        args={[40, 40]}
        cellSize={1.2}
        cellThickness={0.6}
        cellColor="#1b2a33"
        sectionSize={6}
        sectionThickness={1}
        sectionColor="#2d5c57"
        fadeDistance={38}
        fadeStrength={1.4}
        infiniteGrid
      />

      <EnergyCore />
      <SolarArray
        columns={columns}
        rows={rows}
        origin={[0.2, 0.42, 3.4]}
        color="#16343c"
      />
      <SolarArray
        columns={Math.max(4, columns - 3)}
        rows={Math.max(3, rows - 3)}
        origin={[-1.2, 0.42, -8.8]}
        color="#1a3f38"
      />
      <Facility />
      <GenerationTowers />
      <DataHall />
      <RecyclingLoop />
      <Sparks count={low ? 140 : 280} />
    </group>
  );
}
