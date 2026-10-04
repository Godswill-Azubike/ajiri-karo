"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { Flower, FlowerCorner } from "./Flowers";

const placeholders = [
  "linear-gradient(135deg,#f8c8d0,#ffd8be)",
  "linear-gradient(135deg,#ffd8be,#e8cf8a)",
  "linear-gradient(135deg,#e98ba3,#f8c8d0)",
  "linear-gradient(135deg,#fde2f0,#c9a24d)",
  "linear-gradient(135deg,#fff1e0,#f4a7b9)",
  "linear-gradient(135deg,#f4a7b9,#e8cf8a)",
];
const heights = ["h-64", "h-48", "h-56", "h-72", "h-52", "h-60"];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const photos = wedding.gallery;

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <FlowerCorner position="tl" />
      <FlowerCorner position="br" />
      <SectionTitle kicker="Moments" title="Our Gallery" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl columns-2 gap-4 md:columns-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {photos.map((src, i) => (
          <motion.button
            type="button"
            key={i}
            onClick={() => src && setOpen(i)}
            variants={{ hidden: { opacity: 0, y: 50, scale: 0.85 }, show: { opacity: 1, y: 0, scale: 1 } }}
            whileHover={{ scale: 1.03, rotate: i % 2 ? 1.5 : -1.5 }}
            className={`relative mb-4 block w-full overflow-hidden rounded-2xl shadow-lg ring-4 ring-white ${heights[i % heights.length]}`}
            style={{ background: placeholders[i % placeholders.length] }}
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="flex h-full w-full flex-col items-center justify-center text-white/90">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                  <Flower size={56} color="#ffffffcc" inner="#ffffff88" />
                </motion.span>
                <span className="mt-2 font-script text-2xl">{wedding.initials}</span>
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {open !== null && photos[open] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-wine/80 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              src={photos[open]}
              alt=""
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl ring-4 ring-white"
              initial={{ scale: 0.6, rotate: -6 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
