"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { sideCannons } from "./confetti";
import { Flower } from "./Flowers";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pt-20 pb-28 text-center">
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 60 }}
        onViewportEnter={() => sideCannons(2200)}
      >
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}>
              <Flower size={40} petals={5 + i} color={["#d98cb8", "#d9c9f2", "#8e2a5a"][i]} />
            </motion.div>
          ))}
        </div>
        <p className="mt-6 font-serif text-lg italic text-plum/80">We can&apos;t wait to celebrate with you</p>
        <p className="shimmer-text mt-2 py-1 font-script text-6xl font-bold sm:text-7xl">
          {wedding.bride} &amp; {wedding.groom}
        </p>
        <p className="mt-4 text-xs font-semibold tracking-[0.18em] text-magenta uppercase sm:text-sm sm:tracking-[0.3em]">{wedding.displayDate}</p>
        <motion.p
          className="mt-6 inline-block rounded-full bg-white/70 px-5 py-2 font-semibold text-plum shadow"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {wedding.hashtag}
        </motion.p>
      </motion.div>
    </footer>
  );
}
