"use client";

import { motion } from "framer-motion";

type FlowerProps = {
  petals?: number;
  color?: string;
  inner?: string;
  center?: string;
  size?: number;
  className?: string;
};

/** A simple SVG flower: petals rotated around a center, with an inner petal layer. */
export function Flower({ petals = 6, color = "#f4a7b9", inner = "#f8c8d0", center = "#c9a24d", size = 80, className }: FlowerProps) {
  const step = 360 / petals;
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} aria-hidden>
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse key={`o${i}`} cx="0" cy="-24" rx="15" ry="25" fill={color} transform={`rotate(${i * step})`} opacity="0.95" />
      ))}
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse key={`i${i}`} cx="0" cy="-14" rx="9" ry="15" fill={inner} transform={`rotate(${i * step + step / 2})`} />
      ))}
      <circle r="9" fill={center} />
      <circle r="4" fill="#fff3c4" />
    </svg>
  );
}

function Leaf({ rotate, x, y, size = 46 }: { rotate: number; x: number; y: number; size?: number }) {
  return (
    <svg
      viewBox="0 0 40 80"
      width={size * 0.5}
      height={size}
      style={{ position: "absolute", left: x, top: y, transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M20 0 C40 25 40 55 20 80 C0 55 0 25 20 0Z" fill="#9cb98a" />
      <path d="M20 5 L20 75" stroke="#7a9a6a" strokeWidth="1.5" />
    </svg>
  );
}

const corners = {
  tl: "top-0 left-0",
  tr: "top-0 right-0 -scale-x-100",
  bl: "bottom-0 left-0 -scale-y-100",
  br: "bottom-0 right-0 -scale-100",
};

/** A blooming cluster of flowers and leaves for section corners. */
export function FlowerCorner({ position = "tl", scale = 1 }: { position?: keyof typeof corners; scale?: number }) {
  return (
    <div className={`pointer-events-none absolute ${corners[position]} z-0`} aria-hidden>
      <motion.div
        className="relative h-44 w-44 origin-top-left"
        style={{ scale }}
        initial={{ opacity: 0, scale: 0.3 * scale, rotate: -30 }}
        whileInView={{ opacity: 1, scale, rotate: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: [0, 3, 0, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf rotate={-60} x={70} y={-6} />
          <Leaf rotate={150} x={-4} y={64} />
          <Leaf rotate={-20} x={96} y={30} size={36} />
          <div className="absolute -left-6 -top-6"><Flower size={96} color="#f4a7b9" inner="#fbd3dd" /></div>
          <div className="absolute left-16 top-2"><Flower size={56} petals={5} color="#ffd8be" inner="#fff1e0" /></div>
          <div className="absolute left-0 top-16"><Flower size={60} petals={8} color="#e98ba3" inner="#f8c8d0" /></div>
          <div className="absolute left-14 top-16"><Flower size={30} petals={5} color="#fff" inner="#fde2f0" center="#e8cf8a" /></div>
        </motion.div>
      </motion.div>
    </div>
  );
}
