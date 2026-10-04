"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { FlowerCorner } from "./Flowers";

export default function DressCode() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:py-28">
      <FlowerCorner position="tr" />
      <SectionTitle kicker="Colours of the day" title="Dress Code" />
      <motion.p
        className="relative z-10 mx-auto max-w-xl text-center font-serif text-base leading-relaxed text-plum/80 italic sm:text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
      >
        {wedding.dressCode.note}
      </motion.p>
      <motion.div
        className="relative z-10 mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-2 gap-y-8 sm:gap-x-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {wedding.dressCode.colors.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex w-[6.4rem] flex-col items-center text-center whitespace-nowrap sm:w-36"
            variants={{ hidden: { opacity: 0, scale: 0, rotate: -120 }, show: { opacity: 1, scale: 1, rotate: 0 } }}
            transition={{ type: "spring", stiffness: 90, damping: 10 }}
          >
            <motion.div
              className="h-16 w-16 rounded-full shadow-xl ring-4 ring-white sm:h-24 sm:w-24"
              style={{ background: `radial-gradient(circle at 30% 30%, #ffffffaa, ${c.hex} 55%)` }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.15 }}
            />
            <span className="mt-3 text-[0.7rem] tracking-[0.14em] text-plum uppercase sm:text-sm sm:tracking-[0.18em]">{c.name}</span>
            <span className="mt-0.5 text-[0.6rem] tracking-[0.12em] text-mauve uppercase sm:text-[0.65rem]">{c.pantone}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
