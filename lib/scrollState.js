export const scrollState = {
  progress: 0,
  mouseX: 0,
  mouseY: 0,
  reducedMotion: false,
};

export const cameraPath = [
  {
    position: [3.6, 5.4, 14.2],
    lookAt: [0.1, 1.3, 0.2],
  },
  {
    position: [-9.4, 3.4, 5.8],
    lookAt: [-6.8, 1.3, -0.6],
  },
  {
    position: [0.4, 6.4, 11.2],
    lookAt: [0.2, 0.9, -3.4],
  },
  {
    position: [12.6, 4.8, 5.4],
    lookAt: [8.2, 1.5, -2.8],
  },
  {
    position: [6.5, 2.9, 11.8],
    lookAt: [6.4, 1.55, 7.6],
  },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

export function sampleCamera(progress) {
  const max = cameraPath.length - 1;
  const scaled = Math.min(max, Math.max(0, progress * max));
  const index = Math.floor(scaled);
  const t = smoothstep(scaled - index);
  const from = cameraPath[index];
  const to = cameraPath[Math.min(index + 1, max)];

  return {
    position: [
      lerp(from.position[0], to.position[0], t),
      lerp(from.position[1], to.position[1], t),
      lerp(from.position[2], to.position[2], t),
    ],
    lookAt: [
      lerp(from.lookAt[0], to.lookAt[0], t),
      lerp(from.lookAt[1], to.lookAt[1], t),
      lerp(from.lookAt[2], to.lookAt[2], t),
    ],
  };
}

export function chapterWeight(progress, index, total) {
  const x = progress * (total - 1);
  return Math.max(0, 1 - Math.abs(x - index) * 1.25);
}
