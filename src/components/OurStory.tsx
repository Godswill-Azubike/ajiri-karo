"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionTitle from "./SectionTitle";
import { Flower, FlowerCorner } from "./Flowers";

export default function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section className="relative overflow-hidden px-4 py-24">
      <FlowerCorner position="tr" />
      <FlowerCorner position="bl" />
      <SectionTitle kicker="How it began" title="Our Love Story" />

      <div ref={ref} className="relative z-10 mx-auto max-w-3xl">
        {/* growing line */}
        <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-blush sm:left-1/2 sm:-ml-px" />
        <motion.div
          style={{ scaleY: line }}
          className="absolute top-0 bottom-0 left-5 w-0.5 origin-top bg-gradient-to-b from-gold to-rose sm:left-1/2 sm:-ml-px"
        />

        <div className="space-y-12">
          {wedding.story.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <div key={s.year} className="relative flex">
                <motion.div
                  className="absolute left-5 top-6 z-10 -ml-5 sm:left-1/2"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                  <Flower size={40} petals={6} color={i % 2 ? "#ffd8be" : "#f4a7b9"} />
                </motion.div>
                <motion.div
                  className={`ml-14 w-full rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-blush backdrop-blur sm:ml-0 sm:w-[calc(50%-2.5rem)] ${right ? "sm:ml-auto" : ""}`}
                  initial={{ opacity: 0, x: right ? 80 : -80, rotate: right ? 4 : -4 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 60, damping: 14 }}
                  whileHover={{ y: -6, rotate: right ? 1 : -1 }}
                >
                  <span className="inline-block rounded-full bg-gradient-to-r from-rose to-gold px-3 py-1 text-xs font-semibold tracking-widest text-white">
                    {s.year}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-wine">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-wine/75">{s.text}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
