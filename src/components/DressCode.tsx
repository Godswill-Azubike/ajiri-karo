"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";

export default function DressCode() {
  return (
    <section className="relative overflow-hidden px-4 py-24">
      <FlowerCorner position="tr" />
      <SectionTitle kicker="Colours of the day" title="Dress Code" />
      <motion.p
        className="relative z-10 mx-auto max-w-xl text-center font-serif text-lg italic text-wine/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {wedding.dressCode.note}
      </motion.p>
      <motion.div
        className="relative z-10 mt-10 flex flex-wrap justify-center gap-6 sm:gap-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {wedding.dressCode.colors.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex flex-col items-center"
            variants={{ hidden: { opacity: 0, scale: 0, rotate: -120 }, show: { opacity: 1, scale: 1, rotate: 0 } }}
            transition={{ type: "spring", stiffness: 90, damping: 10 }}
          >
            <motion.div
              className="h-20 w-20 rounded-full shadow-xl ring-4 ring-white sm:h-24 sm:w-24"
              style={{ background: `radial-gradient(circle at 30% 30%, #ffffffaa, ${c.hex} 55%)` }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.15 }}
            />
            <span className="mt-3 text-sm tracking-widest text-wine uppercase">{c.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
