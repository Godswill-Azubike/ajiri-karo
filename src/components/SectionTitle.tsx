"use client";

import { motion } from "framer-motion";

export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="relative z-10 mb-10 text-center sm:mb-14">
      <motion.p
        className="font-script text-[2.4rem] leading-tight font-semibold text-mauve sm:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {kicker}
      </motion.p>
      <motion.h2
        className="mt-1 font-serif text-[1.55rem] font-semibold tracking-[0.1em] text-plum uppercase sm:text-4xl sm:tracking-[0.12em]"
        initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      <svg viewBox="0 0 240 24" className="mx-auto mt-4 w-44 sm:w-56" aria-hidden>
        <motion.path
          d="M2 12 C40 12 60 2 90 12 S 110 22 120 12 S 150 2 170 12 S 210 12 238 12"
          fill="none"
          stroke="#a3307e"
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.path
          d="M120 4 l3 8 -3 8 -3 -8z"
          fill="#a3307e"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1.2, type: "spring" }}
          style={{ transformOrigin: "120px 12px" }}
        />
      </svg>
    </div>
  );
}
