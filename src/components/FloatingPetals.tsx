"use client";

import { useEffect, useState } from "react";

type Petal = { left: number; size: number; duration: number; delay: number; drift: number; hue: string; kind: "petal" | "dot" };

const hues = ["#f4a7b9", "#f8c8d0", "#ffd8be", "#e98ba3", "#e8cf8a", "#fbd3dd"];

/** Petals and gold flecks drifting down the whole page. Generated on the client to avoid hydration mismatch. */
export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = window.innerWidth < 640 ? 14 : 26;
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        duration: 10 + Math.random() * 14,
        delay: -Math.random() * 20,
        drift: (Math.random() - 0.5) * 160,
        hue: hues[i % hues.length],
        kind: i % 4 === 0 ? "dot" : "petal",
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      <style>{`
        @keyframes petal-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          10% { opacity: .9; }
          90% { opacity: .9; }
          100% { transform: translate3d(var(--drift), 110vh, 0) rotate(540deg); opacity: 0; }
        }
      `}</style>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block will-change-transform"
          style={{
            left: `${p.left}%`,
            width: p.kind === "dot" ? p.size / 2.5 : p.size,
            height: p.kind === "dot" ? p.size / 2.5 : p.size * 0.75,
            background: p.hue,
            borderRadius: p.kind === "dot" ? "50%" : "150% 0 150% 0",
            boxShadow: p.kind === "dot" ? `0 0 8px ${p.hue}` : undefined,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
