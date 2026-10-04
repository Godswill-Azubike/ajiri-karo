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
    <section className="relative overflow-hidden px-5 py-20 sm:py-28">
      <FlowerCorner position="tr" />
      <FlowerCorner position="bl" />
      <SectionTitle kicker="How it began" title="Our Love Story" />

      <div ref={ref} className="relative z-10 mx-auto max-w-3xl">
        {/* growing line */}
        <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-blush sm:left-1/2 sm:-ml-px" />
        <motion.div
          style={{ scaleY: line }}
          className="absolute top-0 bottom-0 left-5 w-0.5 origin-top bg-gradient-to-b from-magenta to-mauve sm:left-1/2 sm:-ml-px"
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
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                  <Flower size={40} petals={6} color={i % 2 ? "#d9c9f2" : "#d98cb8"} />
                </motion.div>
                <motion.div
                  className={`ml-14 w-full card rounded-3xl p-6 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${right ? "sm:ml-auto" : ""}`}
                  initial={{ opacity: 0, y: 50, x: right ? 24 : -24 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-block rounded-full bg-gradient-to-r from-mauve to-magenta px-3 py-1 text-xs font-semibold tracking-widest text-white">
                    {s.year}
                  </span>
                  <h3 className="mt-3 font-serif text-[1.45rem] font-semibold text-plum sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-plum/80">{s.text}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
