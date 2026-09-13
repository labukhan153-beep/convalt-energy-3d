"use client";

import { useEffect, useState } from "react";

export function usePerformanceTier() {
  const [tier, setTier] = useState("high");

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 8;
    const next =
      reduce || mobile || cores <= 4 || memory <= 4 ? "low" : "high";
    setTier(next);
  }, []);

  return tier;
}
