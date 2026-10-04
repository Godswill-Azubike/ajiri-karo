"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08 });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    return () => lenis.destroy();
  }, []);
  return null;
}

/** Smoothly scroll to a y position, via Lenis when it's running. */
export function scrollToY(y: number, duration = 2.2) {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) lenis.scrollTo(y, { duration });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
