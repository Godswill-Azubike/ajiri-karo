"use client";

import { motion } from "framer-motion";

/** A delicate floral sprig that draws itself between sections. */
export default function Divider() {
  return (
    <div className="relative z-10 flex justify-center py-2" aria-hidden>
      <svg viewBox="0 0 220 40" className="w-48 sm:w-60">
        <motion.path
          d="M4 20 H82 M138 20 H216"
          stroke="#b9a2e3"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.g
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "110px 20px" }}
        >
          <path d="M92 20 C98 12 104 12 108 18 C102 20 98 22 92 20Z" fill="#7f9c4a" />
          <path d="M128 20 C122 12 116 12 112 18 C118 20 122 22 128 20Z" fill="#7f9c4a" />
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="110" cy="13" rx="3.6" ry="6" fill="#d98cb8" transform={`rotate(${r} 110 20)`} />
          ))}
          <circle cx="110" cy="20" r="3" fill="#a3307e" />
          <circle cx="96" cy="26" r="1.6" fill="#b9a2e3" />
          <circle cx="124" cy="26" r="1.6" fill="#b9a2e3" />
        </motion.g>
      </svg>
    </div>
  );
}
