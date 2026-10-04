"use client";

import { motion } from "framer-motion";

export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="relative z-10 mb-12 text-center">
      <motion.p
        className="font-script text-4xl text-rose sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {kicker}
      </motion.p>
      <motion.h2
        className="mt-1 font-serif text-3xl tracking-wide text-wine uppercase sm:text-4xl"
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.12em" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.15 }}
      >
        {title}
      </motion.h2>
      <svg viewBox="0 0 240 24" className="mx-auto mt-4 w-56" aria-hidden>
        <motion.path
          d="M2 12 C40 12 60 2 90 12 S 110 22 120 12 S 150 2 170 12 S 210 12 238 12"
          fill="none"
          stroke="#c9a24d"
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M120 4 l3 8 -3 8 -3 -8z"
          fill="#c9a24d"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, type: "spring" }}
          style={{ transformOrigin: "120px 12px" }}
        />
      </svg>
    </div>
  );
}
