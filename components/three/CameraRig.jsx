"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sampleCamera, scrollState } from "@/lib/scrollState";

const look = new THREE.Vector3();
const target = new THREE.Vector3();

export default function CameraRig({ mobile }) {
  const { camera, size } = useThree();
  const initialized = useRef(false);

  useLayoutEffect(() => {
    camera.fov = mobile ? 52 : size.width < 1024 ? 46 : 40;
    camera.near = 0.1;
    camera.far = 90;
    camera.updateProjectionMatrix();
  }, [camera, mobile, size.width]);

  useFrame((_, delta) => {
    const { position, lookAt } = sampleCamera(scrollState.progress);
    const parallax = scrollState.reducedMotion ? 0 : 0.55;
    target.set(
      position[0] + scrollState.mouseX * parallax,
      position[1] + scrollState.mouseY * parallax * 0.45,
      position[2],
    );
    look.set(lookAt[0], lookAt[1], lookAt[2]);

    const alpha = scrollState.reducedMotion
      ? 1
      : 1 - Math.exp(-(initialized.current ? 3.2 : 12) * delta);

    camera.position.lerp(target, alpha);
    camera.lookAt(look);
    initialized.current = true;
  });

  return null;
}
